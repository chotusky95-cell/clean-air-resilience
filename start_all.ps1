# Clean Air & Climate Resilience Platform Unified Launcher
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "       BHARAT INNOVATES: CLEAN AIR & CLIMATE RESILIENCE" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Opening Web App in your browser at http://localhost:8000 ..." -ForegroundColor Yellow
Start-Process "http://localhost:8000"

Set-Location "$scriptDir\backend"
Write-Host "Starting Unified Server on http://localhost:8000 ..." -ForegroundColor Green
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000
