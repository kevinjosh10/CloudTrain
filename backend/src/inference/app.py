import json
import os
import boto3
import joblib
import pandas as pd
from io import BytesIO
import time
from firebase_admin import firestore

from src.shared.firebase_client import get_firestore_client
from src.shared.validation import InferenceRequest

s3 = boto3.client('s3')

# Global cache for loaded models (Lambda execution context caching)
MODEL_CACHE = {}

def get_model(project_id: str):
    if project_id in MODEL_CACHE:
        print(f"Using cached model for {project_id}")
        return MODEL_CACHE[project_id]
        
    bucket = os.environ.get('STORAGE_BUCKET')
    key = f"models/{project_id}/model-production.joblib"
    
    print(f"Downloading model {key} from S3...")
    response = s3.get_object(Bucket=bucket, Key=key)
    body = response['Body'].read()
    
    model_package = joblib.load(BytesIO(body))
    MODEL_CACHE[project_id] = model_package
    return model_package

def lambda_handler(event, context):
    """
    Handles API Gateway requests to /predict.
    Validates input, loads the cached model, performs inference, and logs to Firebase.
    """
    try:
        body = json.loads(event.get('body', '{}'))
        req = InferenceRequest(**body)
    except Exception as e:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({"error": f"Invalid request format: {str(e)}"})
        }
        
    try:
        start_time = time.time()
        
        # 1. Retrieve Model
        model_package = get_model(req.project_id)
        model = model_package['model']
        expected_features = model_package['features']
        
        # 2. Prepare Features for Scikit-Learn
        if isinstance(req.features, list):
            if len(req.features) != len(expected_features):
                raise ValueError(f"Expected {len(expected_features)} features, got {len(req.features)}")
            df_input = pd.DataFrame([req.features], columns=expected_features)
        elif isinstance(req.features, dict):
            df_input = pd.DataFrame([req.features])
            for col in expected_features:
                if col not in df_input.columns:
                    df_input[col] = 0 # Default missing features to 0
            df_input = df_input[expected_features] # Align column order
        else:
            raise ValueError("Features must be a list or dictionary.")
            
        # 3. Perform Inference
        prediction = model.predict(df_input)[0]
        
        # Convert numpy types to native Python types for JSON serialization
        if hasattr(prediction, 'item'):
            prediction = prediction.item()
            
        latency_ms = int((time.time() - start_time) * 1000)
        
        # 4. Observability: Log to Firebase
        db = get_firestore_client()
        db.collection('predictions').add({
            "project_id": req.project_id,
            "features_received": req.features,
            "prediction": prediction,
            "latency_ms": latency_ms,
            "timestamp": firestore.SERVER_TIMESTAMP
        })
        
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({
                "prediction": prediction,
                "model_version": "production",
                "latency_ms": latency_ms
            })
        }
        
    except Exception as e:
        print(f"Inference error: {e}")
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }
