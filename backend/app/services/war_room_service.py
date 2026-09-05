"""
CAQM Inter-State War Room & Cross-Border Governance Service
"""
from typing import List, Dict
from app.models.war_room import StateGovernanceStatus, CrossBorderSmokeFlux, JointCoordinationAction

def get_interstate_governance_status() -> List[StateGovernanceStatus]:
    return [
        StateGovernanceStatus(
            state_code="DL",
            state_name="Delhi NCR",
            agency_name="Delhi Pollution Control Committee (DPCC)",
            active_aqi_avg=384.2,
            stubble_fires_active=2,
            enforcement_squads_deployed=120,
            happy_seeders_operating=0,
            bio_decomposer_acres_sprayed=5000,
            anti_smog_guns_active=240,
            mechanized_sweeping_km=1420.5,
            interstate_bs6_compliance_pct=94.2,
            status_color="rose"
        ),
        StateGovernanceStatus(
            state_code="PB",
            state_name="Punjab",
            agency_name="Punjab Pollution Control Board (PPCB)",
            active_aqi_avg=218.0,
            stubble_fires_active=1420,
            enforcement_squads_deployed=280,
            happy_seeders_operating=31200,
            bio_decomposer_acres_sprayed=145000,
            anti_smog_guns_active=45,
            mechanized_sweeping_km=320.0,
            interstate_bs6_compliance_pct=82.0,
            status_color="rose"
        ),
        StateGovernanceStatus(
            state_code="HR",
            state_name="Haryana",
            agency_name="Haryana State Pollution Control Board (HSPCB)",
            active_aqi_avg=265.4,
            stubble_fires_active=340,
            enforcement_squads_deployed=195,
            happy_seeders_operating=18400,
            bio_decomposer_acres_sprayed=92000,
            anti_smog_guns_active=85,
            mechanized_sweeping_km=580.0,
            interstate_bs6_compliance_pct=89.5,
            status_color="amber"
        ),
        StateGovernanceStatus(
            state_code="UP",
            state_name="Uttar Pradesh (West)",
            agency_name="Uttar Pradesh Pollution Control Board (UPPCB)",
            active_aqi_avg=312.8,
            stubble_fires_active=110,
            enforcement_squads_deployed=140,
            happy_seeders_operating=9500,
            bio_decomposer_acres_sprayed=48000,
            anti_smog_guns_active=110,
            mechanized_sweeping_km=710.0,
            interstate_bs6_compliance_pct=86.0,
            status_color="amber"
        )
    ]

def get_smoke_flux_telemetry() -> CrossBorderSmokeFlux:
    # Modeled flux using 315° NW transport corridor physics
    return CrossBorderSmokeFlux(
        corridor_name="Majha-Malwa to Delhi Trans-Boundary Airmass Corridor",
        heading_deg=315.0,
        wind_speed_kmh=8.4,
        smoke_mass_transport_kg_hr=14850.0,
        stubble_contribution_to_delhi_pct=48.6,
        inversion_layer_height_m=320,
        airmass_transit_time_hrs=22.5
    )

def get_joint_coordination_log() -> List[JointCoordinationAction]:
    return [
        JointCoordinationAction(
            id="jc_001",
            timestamp="18 mins ago",
            initiating_agency="CAQM Central Secretariat",
            target_agency="PPCB (Punjab) & HSPCB (Haryana)",
            action_type="Satellite Ingress Alert",
            description="312 new VIIRS fire clusters detected in Sangrur-Tarn Taran belt; requested immediate field deployment of CRM bio-decomposer units.",
            status="ACKNOWLEDGED"
        ),
        JointCoordinationAction(
            id="jc_002",
            timestamp="42 mins ago",
            initiating_agency="DPCC (Delhi)",
            target_agency="Delhi Traffic Police & Transport Dept",
            action_type="GRAP Stage III Enforcement",
            description="Ban on non-BS-VI diesel interstate buses entered enforcement at Singhu and Tikri border checkpoints.",
            status="ACTIVE_ENFORCEMENT"
        ),
        JointCoordinationAction(
            id="jc_003",
            timestamp="1 hour ago",
            initiating_agency="HSPCB (Haryana)",
            target_agency="MCD East / PWD Delhi",
            action_type="Cross-Border Dust Suppression",
            description="Joint boundary misting along Kundli-Manesar-Palwal (KMP) expressway with 12 high-capacity anti-smog bowsers.",
            status="COMPLETED"
        )
    ]
