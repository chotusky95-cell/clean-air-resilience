"""
Router for AI/ML 72-Hour AQI & Fire Forecasts
"""
from fastapi import APIRouter
from app.models.forecast import ForecastResponse, ModelEvaluationMetrics
from app.services.ml_engine import ml_engine
from app.services.data_ingestion import load_stations_data

router = APIRouter(prefix="/forecast", tags=["AI/ML Forecasting Engine"])

@router.get("/delhi-ncr", response_model=ForecastResponse, summary="Get 72-hour hyperlocal AQI forecast for Delhi NCR")
def get_delhi_forecast():
    stations = load_stations_data()
    # Calculate current average NCR AQI and PM2.5
    avg_aqi = int(sum(s.aqi for s in stations[:10]) / 10)
    avg_pm25 = float(sum(s.pm25 for s in stations[:10]) / 10)
    return ml_engine.generate_72h_forecast(current_aqi=avg_aqi, current_pm25=avg_pm25)

@router.get("/metrics", response_model=ModelEvaluationMetrics, summary="Get peer-reviewed model performance metrics (R², MAE, RMSE, MAPE)")
def get_metrics():
    return ml_engine.get_metrics()
