"""
CAQM Inter-State War Room & Cross-Border Governance Models
"""
from pydantic import BaseModel
from typing import List, Dict

class StateGovernanceStatus(BaseModel):
    state_code: str  # DL, PB, HR, UP
    state_name: str
    agency_name: str  # DPCC, PPCB, HSPCB, UPPCB
    active_aqi_avg: float
    stubble_fires_active: int
    enforcement_squads_deployed: int
    happy_seeders_operating: int
    bio_decomposer_acres_sprayed: int
    anti_smog_guns_active: int
    mechanized_sweeping_km: float
    interstate_bs6_compliance_pct: float
    status_color: str  # emerald, amber, rose

class CrossBorderSmokeFlux(BaseModel):
    corridor_name: str  # North-West Punjab-Haryana to Delhi NCR
    heading_deg: float  # 315° NW
    wind_speed_kmh: float
    smoke_mass_transport_kg_hr: float
    stubble_contribution_to_delhi_pct: float
    inversion_layer_height_m: int
    airmass_transit_time_hrs: float

class JointCoordinationAction(BaseModel):
    id: str
    timestamp: str
    initiating_agency: str
    target_agency: str
    action_type: str
    description: str
    status: str
