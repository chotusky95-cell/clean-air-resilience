"""
Pydantic schemas for API Key Authentication & External Provider Integrations
"""
from typing import List, Optional
from pydantic import BaseModel

class APIKey(BaseModel):
    id: str
    key: str                   # e.g., "agy_live_admin_9f4b82c1"
    name: str                  # e.g., "Delhi DPCC Central Ingestion Key"
    role: str                  # "ADMIN", "STATE_AGENCY", "MUNICIPAL_OFFICER", "RESEARCHER", "PUBLIC"
    rate_limit_rpm: int        # Requests per minute
    total_requests_made: int
    created_at: str
    is_active: bool
    allowed_endpoints: List[str]

class APIKeyCreateRequest(BaseModel):
    name: str
    role: str = "STATE_AGENCY"
    rate_limit_rpm: int = 120

class APIKeyValidateResponse(BaseModel):
    is_valid: bool
    role: Optional[str] = None
    rate_limit_rpm: Optional[int] = None
    remaining_quota: Optional[int] = None
    message: str

class ExternalProviderStatus(BaseModel):
    provider_name: str         # e.g. "NASA FIRMS Satellite API"
    key_configured: bool
    status: str                # "Active / Connected", "Mock / Fallback Dataset Active"
    endpoint_url: str
    rate_limit: str
