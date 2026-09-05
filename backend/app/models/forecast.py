"""
Pydantic schemas for AI/ML AQI & Fire Hotspot Forecasts
"""
from typing import List, Optional
from pydantic import BaseModel

class ForecastHourPoint(BaseModel):
    timestamp: str
    hours_ahead: int
    predicted_aqi: int
    lower_bound_90: int
    upper_bound_90: int
    predicted_pm25: float
    stubble_contribution_pct: float
    wind_speed_kmh: float
    wind_dir_deg: float
    category: str
    grap_stage_triggered: str

class ModelEvaluationMetrics(BaseModel):
    model_name: str
    aqi_r2: float
    aqi_mae: float
    aqi_rmse: float
    aqi_mape: float
    fire_r2: float
    fire_mae: float
    fire_rmse: float
    fire_mape: float
    training_samples: int
    features_used: List[str]

class ForecastResponse(BaseModel):
    region: str
    generated_at: str
    current_aqi: int
    peak_forecast_aqi: int
    peak_forecast_hour: int
    proactive_warning: str
    metrics: ModelEvaluationMetrics
    timeline: List[ForecastHourPoint]
