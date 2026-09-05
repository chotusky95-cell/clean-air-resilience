"""
Router for Automated Graded Response Action Plan (GRAP)
"""
from fastapi import APIRouter
from app.models.grap import GRAPStatusResponse
from app.services.grap_service import evaluate_grap_status
from app.services.data_ingestion import load_stations_data
from app.services.ml_engine import ml_engine

router = APIRouter(prefix="/grap", tags=["Automated GRAP Actions"])

@router.get("/status", response_model=GRAPStatusResponse, summary="Get active and proactively triggered GRAP stages with SOPs")
def get_grap_status():
    stations = load_stations_data()
    avg_aqi = int(sum(s.aqi for s in stations[:10]) / 10)
    avg_pm25 = float(sum(s.pm25 for s in stations[:10]) / 10)
    forecast = ml_engine.generate_72h_forecast(current_aqi=avg_aqi, current_pm25=avg_pm25)
    
    # Peak forecast over next 48h
    peak_48h = max(p.predicted_aqi for p in forecast.timeline[:48])
    return evaluate_grap_status(current_aqi=avg_aqi, peak_forecast_48h=peak_48h)
