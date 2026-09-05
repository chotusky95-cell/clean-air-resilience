"""
Router for NASA FIRMS Active Fire Hotspots
"""
from typing import List
from fastapi import APIRouter
from app.models.hotspot import FireHotspot, HotspotSummary
from app.services.data_ingestion import load_hotspots_data, get_hotspot_summary

router = APIRouter(prefix="/hotspots", tags=["NASA FIRMS Fire Hotspots"])

@router.get("", response_model=List[FireHotspot], summary="List all active satellite stubble burning hotspots")
def get_hotspots():
    return load_hotspots_data()

@router.get("/summary", response_model=HotspotSummary, summary="Get summary metrics of active fires and cumulative FRP")
def get_summary():
    hotspots = load_hotspots_data()
    return get_hotspot_summary(hotspots)
