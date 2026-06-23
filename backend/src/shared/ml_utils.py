import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_absolute_error, mean_squared_error, r2_score
from io import BytesIO
import joblib

def load_csv(file_stream: BytesIO) -> pd.DataFrame:
    return pd.read_csv(file_stream)

def train_and_evaluate(df: pd.DataFrame, target: str, features: list, model_type: str, algorithm: str):
    # Select features and target
    X = df[features].copy()
    y = df[target]

    # Simple data cleaning for platform robustness
    X = X.fillna(0) # Fill numeric missing with 0
    # One-hot encode string features
    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    if model_type == "classification":
        if algorithm == "logistic_regression":
            model = LogisticRegression(max_iter=1000)
        elif algorithm == "decision_tree":
            model = DecisionTreeClassifier()
        elif algorithm == "random_forest":
            model = RandomForestClassifier(n_estimators=50) # Keep lightweight for Lambda
        else:
            raise ValueError(f"Unsupported algorithm {algorithm}")
    elif model_type == "regression":
        if algorithm == "linear_regression":
            model = LinearRegression()
        elif algorithm == "random_forest_regressor":
            model = RandomForestRegressor(n_estimators=50)
        else:
            raise ValueError(f"Unsupported algorithm {algorithm}")
    else:
        raise ValueError(f"Unsupported model type {model_type}")

    # Train
    model.fit(X_train, y_train)
    
    # Predict
    y_pred = model.predict(X_test)

    # Metrics
    metrics = {}
    if model_type == "classification":
        metrics = {
            "accuracy": float(accuracy_score(y_test, y_pred)),
            "precision": float(precision_score(y_test, y_pred, average='weighted', zero_division=0)),
            "recall": float(recall_score(y_test, y_pred, average='weighted', zero_division=0)),
            "f1": float(f1_score(y_test, y_pred, average='weighted', zero_division=0))
        }
    else:
        metrics = {
            "mae": float(mean_absolute_error(y_test, y_pred)),
            "rmse": float(mean_squared_error(y_test, y_pred) ** 0.5),
            "r2": float(r2_score(y_test, y_pred))
        }

    # X.columns is needed so inference knows the exact features after one-hot encoding
    return model, metrics, list(X.columns)
