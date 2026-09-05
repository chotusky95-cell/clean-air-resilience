"""
Configuration and constants for Clean Air & Climate Resilience Platform
"""
import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_NAME: str = "Clean Air & Climate Resilience Platform (Bharat Innovates)"
    APP_VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Regional Geospatial Bounding Boxes (Indo-Gangetic Plains)
    NCR_CENTER: dict = {"lat": 28.6139, "lon": 77.2090}
    PUNJAB_CENTER: dict = {"lat": 30.9010, "lon": 75.8573}
    HARYANA_CENTER: dict = {"lat": 29.0588, "lon": 76.0856}
    
    # Default Stubble Burning Critical Window (Oct 1 - Nov 30)
    SEASONAL_WINDOW_START: str = "10-01"
    SEASONAL_WINDOW_END: str = "11-30"
    
    # GRAP AQI Thresholds
    GRAP_STAGE_1_THRESHOLD: int = 201  # Poor (201-300)
    GRAP_STAGE_2_THRESHOLD: int = 301  # Very Poor (301-400)
    GRAP_STAGE_3_THRESHOLD: int = 401  # Severe (401-450)
    GRAP_STAGE_4_THRESHOLD: int = 450  # Severe+ (>450)
    
    # Model evaluation metrics benchmark (from peer-reviewed paper)
    BENCHMARK_METRICS: dict = {
        "aqi_r2": 0.86,
        "aqi_mae": 18.7,
        "aqi_rmse": 26.9,
        "aqi_mape": 12.3,
        "fire_r2": 0.81,
        "fire_mae": 112.4,
        "fire_rmse": 158.6,
        "fire_mape": 14.6
    }

settings = Settings()
