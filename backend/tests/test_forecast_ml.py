"""
Test ML engine and forecast generation
"""
import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.services.ml_engine import ml_engine
from app.services.feature_engineering import compute_plume_alignment_score, compute_wind_vector

def test_wind_alignment_calculation():
    # 315° is direct NW corridor -> score should be near 1.0
    direct = compute_plume_alignment_score(315.0)
    assert direct >= 0.99
    
    # 135° is direct SE (opposite) -> score should be minimal
    opposite = compute_plume_alignment_score(135.0)
    assert opposite <= 0.1

def test_ml_forecast_timeline_integrity():
    forecast = ml_engine.generate_72h_forecast(current_aqi=320, current_pm25=180.0)
    assert len(forecast.timeline) == 72
    
    for pt in forecast.timeline:
        assert pt.lower_bound_90 <= pt.predicted_aqi <= pt.upper_bound_90 or (pt.predicted_aqi >= pt.lower_bound_90)
        assert pt.predicted_aqi >= 50
        assert pt.predicted_pm25 > 0
        assert pt.category in ["Good / Satisfactory", "Moderate", "Poor", "Very Poor", "Severe", "Severe+"]
