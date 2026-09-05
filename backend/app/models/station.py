"""
Pydantic schemas for CPCB Monitoring Stations and live AQI parameters
"""
from typing import Optional, Dict
from pydantic import BaseModel

class SourceAttribution(BaseModel):
    stubble: float
    vehicular: float
    dust: float
    industrial: float

class Station(BaseModel):
    id: str
    name: str
    state: str
    district: str
    lat: float
    lon: float
    aqi: int
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    o3: float
    temp_c: float
    humidity_pct: float
    wind_speed_kmh: float
    wind_dir_deg: float
    category: str
    source_attribution: SourceAttribution
    is_hotspot: bool

class StationSummary(BaseModel):
    total_stations: int
    avg_ncr_aqi: float
    max_aqi_station: str
    max_aqi_value: int
    critical_hotspots_count: int
    severe_stations_count: int
