"""
Unit and Integration Tests for Citizen Reporting, War Room, and Impact Assessment
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_citizen_reports_endpoints():
    # Test GET list
    resp = client.get("/api/v1/citizen/reports")
    assert resp.status_code == 200
    reports = resp.json()
    assert len(reports) >= 3
    assert reports[0]["reporter_name"] is not None

    # Test POST new report
    payload = {
        "reporter_name": "Ayush Kumar (RCET Bhilai)",
        "reporter_phone": "+91 99988 77766",
        "incident_type": "Stubble Burning Plume",
        "location_name": "Ludhiana Bypass, Punjab",
        "district": "Ludhiana",
        "state": "Punjab",
        "latitude": 30.9010,
        "longitude": 75.8573,
        "description": "Field test report of agricultural burning plume.",
        "severity_level": "SEVERE"
    }
    post_resp = client.post("/api/v1/citizen/report", json=payload)
    assert post_resp.status_code == 200
    data = post_resp.json()
    assert data["reporter_name"] == "Ayush Kumar (RCET Bhilai)"
    assert data["ai_confidence_score"] >= 0.85
    assert "CAQM" in data["whatsapp_dispatch_payload"]

def test_war_room_endpoints():
    # Test GET interstate status
    resp = client.get("/api/v1/war-room/interstate-status")
    assert resp.status_code == 200
    states = resp.json()
    assert len(states) == 4
    state_codes = [s["state_code"] for s in states]
    assert "DL" in state_codes
    assert "PB" in state_codes

    # Test GET smoke flux
    flux_resp = client.get("/api/v1/war-room/smoke-flux")
    assert flux_resp.status_code == 200
    flux = flux_resp.json()
    assert flux["heading_deg"] == 315.0
    assert flux["smoke_mass_transport_kg_hr"] > 0

    # Test GET joint actions
    actions_resp = client.get("/api/v1/war-room/coordination-log")
    assert actions_resp.status_code == 200
    actions = actions_resp.json()
    assert len(actions) >= 3

def test_impact_assessment_endpoints():
    # Test GET macro stakes
    resp = client.get("/api/v1/impact/macro-stakes")
    assert resp.status_code == 200
    stakes = resp.json()
    assert "1.67 Million" in stakes["national_air_pollution_deaths_annual"]
    assert "$36.8 Billion" in stakes["economic_burden_usd_annual"]

    # Test GET vulnerability ratings
    vuln_resp = client.get("/api/v1/impact/vulnerability-map") if False else client.get("/api/v1/impact/vulnerability-ratings")
    assert vuln_resp.status_code == 200
    ratings = vuln_resp.json()
    assert len(ratings) >= 5

    # Test GET live benefits calculation
    benefits_resp = client.get("/api/v1/impact/calculate-benefits?current_aqi=420&reduction_pct=40")
    assert benefits_resp.status_code == 200
    benefits = benefits_resp.json()
    assert benefits["dalys_averted_today"] > 0
    assert benefits["hospitalization_costs_saved_inr_crores"] > 0
