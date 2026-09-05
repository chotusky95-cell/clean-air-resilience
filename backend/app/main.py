"""
Clean Air & Climate Resilience Platform - FastAPI Application
Team Bharat Innovates
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.routers import (
    aqi_router,
    hotspots_router,
    forecasts_router,
    grap_router,
    simulator_router,
    alerts_router,
    federated_router,
    auth_router
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    ## Clean Air and Climate Resilience (Bharat Innovates)
    
    Federated, API-first environmental intelligence platform for Delhi NCR and the Indo-Gangetic Plains.
    """,
    openapi_tags=[
        {"name": "API Key & Authentication Server", "description": "Generate, validate, and manage role-based API keys"},
        {"name": "AQI Ground Stations", "description": "CPCB monitoring stations, live air quality, and source attributions"},
        {"name": "NASA FIRMS Fire Hotspots", "description": "Satellite active fire detections and state distributions"},
        {"name": "AI/ML Forecasting Engine", "description": "72-hour hyperlocal forecast curves and metrics"},
        {"name": "Automated GRAP Actions", "description": "Proactive 48h early triggers and SOP checklists"},
        {"name": "Policy & Climate Simulator", "description": "Interactive What-If policy scenario calculations"},
        {"name": "Multi-Channel Alert Center", "description": "Farmer SMS alerts and citizen health warnings"},
        {"name": "Federated Learning Hub", "description": "Interstate collaborative model training"}
    ]
)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers with version prefix
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(aqi_router, prefix=settings.API_V1_STR)
app.include_router(hotspots_router, prefix=settings.API_V1_STR)
app.include_router(forecasts_router, prefix=settings.API_V1_STR)
app.include_router(grap_router, prefix=settings.API_V1_STR)
app.include_router(simulator_router, prefix=settings.API_V1_STR)
app.include_router(alerts_router, prefix=settings.API_V1_STR)
app.include_router(federated_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "platform": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "api_key_auth": "Active",
        "mode": "Dual-Mode (Live Ingestion + High-Fidelity Historical Calibration)"
    }

# Mount built production React Frontend on root /
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if not os.path.exists(frontend_dist):
    frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "dist"))
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")

