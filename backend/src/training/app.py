import json
import os
import time
import urllib.parse
from io import BytesIO
import boto3
import joblib

from src.shared.firebase_client import get_firestore_client
from src.shared.ml_utils import train_and_evaluate, load_csv
from src.shared.validation import DatasetManifest

s3 = boto3.client('s3')
sqs = boto3.client('sqs')

def send_to_dlq(error_message: str, event_body: dict):
    dlq_url = os.environ.get('DLQ_URL')
    if not dlq_url:
        print(f"WARN: DLQ_URL not set. Error: {error_message}")
        return
    sqs.send_message(
        QueueUrl=dlq_url,
        MessageBody=json.dumps({"error": error_message, "event": event_body})
    )

def lambda_handler(event, context):
    """
    Triggered by S3 when a dataset CSV is uploaded to `datasets/{project_id}/{dataset_id}.csv`.
    A manifest file must exist at `datasets/{project_id}/manifest.json`.
    """
    print(f"Received event: {json.dumps(event)}")
    start_time = time.time()
    db = get_firestore_client()

    try:
        # 1. Parse S3 Event
        record = event['Records'][0]
        bucket = record['s3']['bucket']['name']
        key = urllib.parse.unquote_plus(record['s3']['object']['key'])
        
        if not key.endswith('.csv'):
            print("Not a CSV file, ignoring.")
            return

        # S3 Path Structure: datasets/{project_id}/{filename}.csv
        parts = key.split('/')
        if len(parts) < 3:
            raise ValueError(f"Invalid S3 key structure: {key}")
            
        project_id = parts[1]
        
        # 2. Load Manifest from S3 or Firebase
        # For this implementation, we will fetch the project metadata from Firebase
        project_ref = db.collection('projects').document(project_id)
        project_doc = project_ref.get()
        if not project_doc.exists:
            raise ValueError(f"Project {project_id} not found in Firebase.")
            
        project_data = project_doc.to_dict()
        manifest = DatasetManifest(
            target_column=project_data['target_column'],
            feature_columns=project_data['feature_columns'],
            model_type=project_data['model_type'],
            algorithm=project_data['algorithm']
        )
        
        # 3. Download and Load CSV
        response = s3.get_object(Bucket=bucket, Key=key)
        csv_body = response['Body'].read()
        
        # Validation checks
        if len(csv_body) > 10 * 1024 * 1024:
            raise ValueError("File size exceeds 10MB limit.")
            
        df = load_csv(BytesIO(csv_body))
        if len(df) > 100000:
            raise ValueError("Row count exceeds 100,000 limit.")
            
        # 4. Train Model
        print(f"Starting training for {project_id}...")
        model, metrics, trained_features = train_and_evaluate(
            df=df,
            target=manifest.target_column,
            features=manifest.feature_columns,
            model_type=manifest.model_type,
            algorithm=manifest.algorithm
        )
        
        # 5. Model Governance (Compare vs Production)
        current_version = project_data.get('current_version', 0)
        new_version = current_version + 1
        model_version_str = f"v{new_version}"
        
        # Promotion logic (simple version: always promote if it's the first one, or if accuracy/r2 improves)
        is_promoted = False
        prod_metrics = project_data.get('production_metrics', {})
        
        if not prod_metrics:
            is_promoted = True
        else:
            if manifest.model_type == "classification":
                if metrics.get("accuracy", 0) > prod_metrics.get("accuracy", 0):
                    is_promoted = True
            else:
                if metrics.get("r2", -float('inf')) > prod_metrics.get("r2", -float('inf')):
                    is_promoted = True

        # 6. Save Model to S3
        model_key = f"models/{project_id}/model-{model_version_str}.joblib"
        buffer = BytesIO()
        
        # We package the model AND the expected feature columns so inference knows what to expect
        model_package = {
            "model": model,
            "features": trained_features
        }
        joblib.dump(model_package, buffer)
        buffer.seek(0)
        
        s3.put_object(Bucket=bucket, Key=model_key, Body=buffer.getvalue())
        
        if is_promoted:
            prod_key = f"models/{project_id}/model-production.joblib"
            s3.copy_object(
                Bucket=bucket,
                CopySource={'Bucket': bucket, 'Key': model_key},
                Key=prod_key
            )
            
        duration = time.time() - start_time
        
        # 7. Update Firebase
        run_data = {
            "project_id": project_id,
            "model_version": model_version_str,
            "metrics": metrics,
            "algorithm": manifest.algorithm,
            "dataset_key": key,
            "promoted": is_promoted,
            "duration_seconds": round(duration, 2),
            "timestamp": firestore.SERVER_TIMESTAMP,
            "status": "success"
        }
        db.collection('training_runs').add(run_data)
        
        update_data = {
            "latest_run_status": "success",
            "last_training_time": firestore.SERVER_TIMESTAMP
        }
        if is_promoted:
            update_data['current_version'] = new_version
            update_data['production_metrics'] = metrics
            
        project_ref.update(update_data)
        
        print(f"Training completed successfully for {project_id}.")
        return {"statusCode": 200, "body": json.dumps("Training completed")}

    except Exception as e:
        print(f"Training failed: {e}")
        send_to_dlq(str(e), event)
        # Update Firebase with failure
        try:
            if 'project_id' in locals():
                db = get_firestore_client()
                db.collection('training_runs').add({
                    "project_id": project_id,
                    "status": "failed",
                    "error": str(e),
                    "timestamp": firestore.SERVER_TIMESTAMP
                })
                db.collection('projects').document(project_id).update({"latest_run_status": "failed"})
        except Exception as fb_err:
            print(f"Failed to write error to Firebase: {fb_err}")
            
        raise e
