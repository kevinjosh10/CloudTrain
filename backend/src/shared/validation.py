from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Any, Union

class DatasetManifest(BaseModel):
    target_column: str
    feature_columns: List[str]
    model_type: Literal["classification", "regression"]
    algorithm: str

class InferenceRequest(BaseModel):
    project_id: str
    features: List[float]

class InferenceResponse(BaseModel):
    prediction: Union[float, str, int]
    model_version: str

class ModelMetadata(BaseModel):
    project_id: str
    model_version: str
    accuracy: float
    algorithm: str
    dataset: str
    promoted: bool
    duration_seconds: float
    timestamp: str
