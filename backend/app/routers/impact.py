"""
Health & Economic Burden Assessment Router
"""
from fastapi import APIRouter, Query
from typing import List
from app.models.impact import MacroHealthStakes, DistrictVulnerabilityRating, LiveInterventionBenefits
from app.services.impact_service import (
    get_macro_health_stakes,
    get_district_vulnerability_ratings,
    calculate_live_benefits
)

router = APIRouter(prefix="/impact", tags=["Health & Economic Burden Assessment"])

@router.get("/macro-stakes", response_model=MacroHealthStakes)
def get_macro_stakes():
    """
    Get macro epidemiological and economic burden metrics (IHME GBD 2019, World Bank 2019)
    """
    return get_macro_health_stakes()

@router.get("/vulnerability-ratings", response_model=List[DistrictVulnerabilityRating])
def get_vulnerabilities():
    """
    Get district-wise health vulnerability scores and respiratory admission risks
    """
    return get_district_vulnerability_ratings()

@router.get("/calculate-benefits", response_model=LiveInterventionBenefits)
def get_benefits(
    current_aqi: float = Query(384.0, description="Baseline unmitigated AQI"),
    reduction_pct: float = Query(32.0, description="Target reduction percentage")
):
    """
    Calculate daily DALYs, premature mortalities averted, and healthcare cost savings under policy action
    """
    return calculate_live_benefits(current_aqi, reduction_pct)
