"""
Health, Epidemiological & Economic Burden Assessment Models
(Derived from IHME GBD 2019, World Bank 2019, and Lelieveld et al. 2015)
"""
from pydantic import BaseModel
from typing import List, Dict

class MacroHealthStakes(BaseModel):
    national_air_pollution_deaths_annual: str  # 1.67 Million (18% of national deaths)
    economic_burden_usd_annual: str  # $36.8 Billion (1.36% of GDP)
    labor_productivity_loss_usd_annual: str  # $95 Billion
    crop_burning_mortality_range_annual: str  # 44,000 – 98,000 deaths
    oct_nov_seasonal_spike_multiplier: str  # 4x – 6x vs summer baseline
    critical_window_severe_pct: str  # 70% – 80% of annual severe episodes

class DistrictVulnerabilityRating(BaseModel):
    district_name: str
    state: str
    population: int
    vulnerability_index: float  # 0.0 - 1.0
    primary_risk_driver: str
    respiratory_admission_surge_pct: float
    pediatric_asthma_risk_level: str
    elderly_copd_advisory: str

class LiveInterventionBenefits(BaseModel):
    active_grap_stage: str
    predicted_aqi_reduction: float
    dalys_averted_today: int
    premature_mortalities_averted_today: int
    hospitalization_costs_saved_inr_crores: float
    workdays_saved_today: int
