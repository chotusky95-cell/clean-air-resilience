"""
Pydantic schemas for What-If Policy & Climate Scenario Simulator
"""
from typing import List, Optional
from pydantic import BaseModel

class ScenarioInput(BaseModel):
    stubble_reduction_pct: float = 0.0      # 0 to 100% reduction in farm fires
    wind_direction_deg: float = 315.0       # Wind heading (315° NW is smoke corridor to Delhi)
    wind_speed_kmh: float = 8.0             # Regional wind speed
    odd_even_traffic_active: bool = False   # 15% reduction in vehicular emissions
    artificial_rain_cloud_seeding: bool = False  # 60% particulate washout
    industrial_shutdown_pct: float = 0.0    # 0 to 50% industrial curb

class SimulationResultPoint(BaseModel):
    hours_ahead: int
    baseline_aqi: int
    simulated_aqi: int
    delta_aqi: int
    baseline_pm25: float
    simulated_pm25: float
    simulated_category: str

class SimulatorResponse(BaseModel):
    scenario_summary: str
    baseline_peak_aqi: int
    simulated_peak_aqi: int
    overall_aqi_reduction_pct: float
    lives_protected_est_annual: int
    health_cost_saved_usd_millions: float
    timeline: List[SimulationResultPoint]
