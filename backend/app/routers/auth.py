"""
Router for API Key Management, Token Generation & External Providers
"""
from typing import List, Optional
from fastapi import APIRouter, Header, HTTPException, Query
from app.models.auth import (
    APIKey, 
    APIKeyCreateRequest, 
    APIKeyValidateResponse, 
    ExternalProviderStatus
)
from app.services.auth_service import (
    list_api_keys, 
    generate_api_key, 
    validate_api_key, 
    revoke_api_key, 
    get_external_providers_status
)

router = APIRouter(prefix="/auth", tags=["API Key & Authentication Server"])

@router.get("/keys", response_model=List[APIKey], summary="List all active state & municipal API keys")
def get_all_keys():
    return list_api_keys()

@router.post("/keys", response_model=APIKey, summary="Generate a new API Key for state agency or developer")
def create_key(req: APIKeyCreateRequest):
    return generate_api_key(req)

@router.post("/keys/validate", response_model=APIKeyValidateResponse, summary="Validate an API Key from header or body")
def check_key(
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    api_key_query: Optional[str] = Query(None, alias="api_key")
):
    key_to_check = x_api_key or api_key_query or "agy_live_public_demo_key"
    return validate_api_key(key_to_check)

@router.delete("/keys/{key_id}", summary="Revoke an existing API Key")
def revoke_key(key_id: str):
    success = revoke_api_key(key_id)
    if not success:
        raise HTTPException(status_code=404, detail="API Key ID not found")
    return {"status": "success", "message": f"API Key '{key_id}' successfully revoked"}

@router.get("/external-providers", response_model=List[ExternalProviderStatus], summary="Status of NASA FIRMS, CPCB, and Weather API keys")
def get_providers():
    return get_external_providers_status()
