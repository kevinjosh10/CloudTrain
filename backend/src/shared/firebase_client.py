import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def get_firestore_client():
    """
    Initializes and returns a Firebase Firestore client.
    Reuses the existing app if already initialized.
    """
    if not firebase_admin._apps:
        creds_json_str = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        if creds_json_str:
            try:
                creds_dict = json.loads(creds_json_str)
                cred = credentials.Certificate(creds_dict)
                firebase_admin.initialize_app(cred)
            except Exception as e:
                print(f"Error loading Firebase credentials from env var: {e}")
                raise
        else:
            # Fallback to Application Default Credentials
            firebase_admin.initialize_app()
    
    return firestore.client()
