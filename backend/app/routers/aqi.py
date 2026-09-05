"""
Router for CPCB Monitoring Stations and live AQI observations
"""
from typing import List
from fastapi import APIRouter, HTTPException
from app.models.station import Station, StationSummary
from app.services.data_ingestion import load_stations_data, get_station_summary

router = APIRouter(prefix="/stations", tags=["AQI Ground Stations"])

@router.get("", response_model=List[Station], summary="List all active ground AQI monitoring stations")
def get_stations():
    return load_stations_data()

@router.get("/summary", response_model=StationSummary, summary="Get regional summary statistics for Delhi NCR")
def get_summary():
    stations = load_stations_data()
    return get_station_summary(stations)

@router.get("/{station_id}", response_model=Station, summary="Get details for a specific monitoring station")
def get_station_by_id(station_id: str):
    stations = load_stations_data()
    for s in stations:
        if s.id == station_id:
            return s
    raise HTTPException(status_code=404, detail=f"Station '{station_id}' not found")
