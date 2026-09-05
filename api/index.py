"""
Vercel Serverless Function Entry Point for FastAPI Backend
"""
import sys
import os

# Add backend to sys.path so app modules can be loaded properly
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from app.main import app
except Exception as e:
    from fastapi import FastAPI
    app = FastAPI(title="Clean Air & Climate Resilience Platform")
    @app.get("/health")
    def health():
        return {"status": "healthy", "mode": "fallback", "error": str(e)}

