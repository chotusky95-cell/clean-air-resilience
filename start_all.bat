@echo off
title Bharat Innovates - Clean Air & Climate Resilience Platform
echo ======================================================================
echo           BHARAT INNOVATES: CLEAN AIR & CLIMATE RESILIENCE
echo ======================================================================
echo Starting Unified Server (React Frontend + FastAPI Backend + OpenAPI) ...
echo.

cd /d "%~dp0backend"

echo Opening Web App in your default browser at http://localhost:8000 ...
start http://localhost:8000

echo Launching FastAPI Server on port 8000 ...
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000
pause
