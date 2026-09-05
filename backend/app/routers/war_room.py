"""
CAQM Inter-State War Room & Cross-Border Governance Router
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.war_room import StateGovernanceStatus, CrossBorderSmokeFlux, JointCoordinationAction
from app.services.war_room_service import (
    get_interstate_governance_status,
    get_smoke_flux_telemetry,
    get_joint_coordination_log
)

router = APIRouter(prefix="/war-room", tags=["CAQM Inter-State War Room"])

@router.get("/interstate-status", response_model=List[StateGovernanceStatus])
def get_states_status():
    """
    Get live interstate governance, enforcement telemetry, and active resources across DL, PB, HR, and UP
    """
    return get_interstate_governance_status()

@router.get("/smoke-flux", response_model=CrossBorderSmokeFlux)
def get_smoke_flux():
    """
    Get modeled cross-border smoke mass transport rate (kg/hr) along 315° NW trajectory
    """
    return get_smoke_flux_telemetry()

@router.get("/coordination-log", response_model=List[JointCoordinationAction])
def get_joint_actions():
    """
    Get active inter-agency coordination orders and field dispatches
    """
    return get_joint_coordination_log()
