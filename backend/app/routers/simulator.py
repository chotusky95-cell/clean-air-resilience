"""
Router for Policy & Climate Intervention Simulator
"""
from fastapi import APIRouter
from app.models.simulator import ScenarioInput, SimulatorResponse
from app.services.simulator_service import run_policy_simulation

router = APIRouter(prefix="/simulator", tags=["Policy & Climate Simulator"])

@router.post("/simulate", response_model=SimulatorResponse, summary="Simulate effect of policy interventions on AQI & health outcomes")
def simulate_scenario(scenario: ScenarioInput):
    return run_policy_simulation(scenario)
