"""
Pydantic schemas for Multi-Channel Alerts and Farmer/Citizen Advisories
"""
from typing import List, Optional
from pydantic import BaseModel

class CitizenHealthAdvisory(BaseModel):
    target_group: str          # "General Public", "Children & Elderly", "Asthmatics / Respiratory Patients"
    risk_level: str            # "Emergency", "Severe Risk", "Moderate Risk"
    actionable_advice: List[str]
    n95_mask_recommended: bool
    outdoor_exercise_safe: bool
    air_purifier_recommended: bool

class FarmerAdvisorySMS(BaseModel):
    id: str
    recipient_tehsil: str
    recipient_district: str
    recipient_state: str
    recipient_phone_masked: str
    language: str              # "Hindi", "Punjabi", "English"
    message_text: str
    subsidy_offer: str
    nearest_bio_decomposer_hub: str
    sent_timestamp: str

class DistrictAuthorityAlert(BaseModel):
    id: str
    district: str
    officer_title: str
    alert_level: str
    projected_spike_time: str
    recommended_sops: List[str]
    broadcast_channel: str     # "WhatsApp Official", "Emergency SMS", "NIC Portal"
    dispatched_at: str

class AlertsResponse(BaseModel):
    active_alerts_count: int
    health_advisories: List[CitizenHealthAdvisory]
    farmer_sms_queue: List[FarmerAdvisorySMS]
    authority_dispatches: List[DistrictAuthorityAlert]
