"""
Citizen Ground-Truth & WhatsApp Reporting Models
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class CitizenReportCreate(BaseModel):
    reporter_name: str = Field(...)
    reporter_phone: str = Field(...)
    incident_type: str = Field(...)
    location_name: str = Field(...)
    district: str = Field(...)
    state: str = Field(...)
    latitude: float = Field(...)
    longitude: float = Field(...)
    description: str = Field(...)
    severity_level: str = Field("HIGH")
    image_url: Optional[str] = None


class CitizenReport(CitizenReportCreate):
    id: str
    reported_at: str
    verification_status: str  # VERIFIED_AI, PENDING_INSPECTION, DISPATCHED_ACTION, RESOLVED
    ai_confidence_score: float  # e.g., 0.94 (94%)
    assigned_agency: str  # e.g., "PPCB Quick Response Flying Squad - Unit 04"
    action_taken: Optional[str] = None
    whatsapp_dispatch_payload: str
