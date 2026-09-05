"""
Citizen Ground-Truth & Community Reporting Router
"""
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.citizen_report import CitizenReport, CitizenReportCreate
from app.services.citizen_service import get_all_reports, submit_citizen_report


router = APIRouter(prefix="/citizen", tags=["Citizen Ground-Truth & Community Reports"])

@router.get("/reports", response_model=List[CitizenReport])
def list_citizen_reports():
    """
    Retrieve all verified and pending citizen pollution incident reports
    """
    return get_all_reports()

@router.post("/report", response_model=CitizenReport)
def create_citizen_report(report_in: CitizenReportCreate):
    """
    Submit a citizen-reported environmental incident (stubble fire, garbage burning, construction dust)
    """
    return submit_citizen_report(report_in)
