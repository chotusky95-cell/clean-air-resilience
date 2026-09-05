"""
Test FastAPI endpoints including API Key Auth
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert "api_key_auth" in response.json()

def test_get_api_keys():
    response = client.get("/api/v1/auth/keys")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3
    assert data[0]["key"].startswith("agy_live_")

def test_create_api_key():
    payload = {
        "name": "Haryana HSPCB Special Drone Unit",
        "role": "STATE_AGENCY",
        "rate_limit_rpm": 180
    }
    response = client.post("/api/v1/auth/keys", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Haryana HSPCB Special Drone Unit"
    assert data["key"].startswith("agy_live_state_agency_")

def test_validate_api_key():
    headers = {"X-API-Key": "agy_live_admin_9f4b82c1"}
    response = client.post("/api/v1/auth/keys/validate", headers=headers)
    assert response.status_code == 200
    assert response.json()["is_valid"] is True
    assert response.json()["role"] == "ADMIN"

def test_external_providers():
    response = client.get("/api/v1/auth/external-providers")
    assert response.status_code == 200
    assert len(response.json()) >= 3

def test_get_stations():
    response = client.get("/api/v1/stations")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 10

def test_get_stations_summary():
    response = client.get("/api/v1/stations/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["avg_ncr_aqi"] > 0

def test_get_hotspots():
    response = client.get("/api/v1/hotspots")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 10

def test_get_forecast():
    response = client.get("/api/v1/forecast/delhi-ncr")
    assert response.status_code == 200
    data = response.json()
    assert len(data["timeline"]) == 72

def test_get_grap():
    response = client.get("/api/v1/grap/status")
    assert response.status_code == 200
    data = response.json()
    assert len(data["stages"]) == 4

def test_simulator():
    payload = {
        "stubble_reduction_pct": 50.0,
        "wind_direction_deg": 315.0,
        "wind_speed_kmh": 8.0,
        "odd_even_traffic_active": True,
        "artificial_rain_cloud_seeding": False,
        "industrial_shutdown_pct": 20.0
    }
    response = client.post("/api/v1/simulator/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["overall_aqi_reduction_pct"] > 0

def test_alerts():
    response = client.get("/api/v1/alerts")
    assert response.status_code == 200
    data = response.json()
    assert len(data["farmer_sms_queue"]) > 0

def test_federated():
    response = client.get("/api/v1/federated/nodes")
    assert response.status_code == 200
    assert len(response.json()) >= 3
