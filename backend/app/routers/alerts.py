"""
Router for Multi-Channel Alerts, Farmer SMS, and Citizen Advisories
"""
from fastapi import APIRouter
from app.models.alert import AlertsResponse
from app.services.alert_service import get_live_alerts

router = APIRouter(prefix="/alerts", tags=["Multi-Channel Alert Center"])

@router.get("", response_model=AlertsResponse, summary="Get active health advisories, farmer SMS queue, and district dispatches")
def get_alerts():
    return get_live_alerts()
