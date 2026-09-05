"""
Pydantic schemas for NASA FIRMS satellite fire hotspots
"""
from typing import Optional, List
from pydantic import BaseModel

class FireHotspot(BaseModel):
    id: str
    lat: float
    lon: float
    district: str
    state: str
    frp_mw: float
    brightness_k: float
    confidence: int
    satellite: str
    acq_date: str
    acq_time: str
    tehsil: str
    biomass_type: str

class HotspotSummary(BaseModel):
    total_active_fires: int
    total_frp_mw: float
    punjab_fire_count: int
    haryana_fire_count: int
    up_fire_count: int
    highest_frp_district: str
    smoke_trajectory_heading: str
