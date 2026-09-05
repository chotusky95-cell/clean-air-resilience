"""
Clean Air & Climate Resilience Platform - Backend Server Runner
"""
import uvicorn
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

if __name__ == "__main__":
    print("=" * 60)
    print("  Bharat Innovates - Clean Air & Climate Resilience Server")
    print("=" * 60)
    print("Starting server on http://localhost:8000 ...")
    print("Open in your browser: http://localhost:8000")
    print("API Documentation:    http://localhost:8000/docs")
    print("=" * 60)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
