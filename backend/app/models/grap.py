"""
Pydantic schemas for Automated Graded Response Action Plan (GRAP)
"""
from typing import List, Optional
from pydantic import BaseModel

class GRAPActionItem(BaseModel):
    id: str
    department: str  # e.g., "MCD", "Delhi Traffic Police", "PWD", "DDA", "Transport Dept"
    title: str
    description: str
    priority: str    # "Critical", "High", "Medium"
    status: str      # "Active", "Pending Dispatch", "Completed"
    assigned_jurisdiction: str

class GRAPStageInfo(BaseModel):
    stage_number: int
    stage_name: str
    aqi_range: str
    is_active: bool
    is_proactively_triggered: bool
    lead_time_hours: int
    summary: str
    action_items: List[GRAPActionItem]

class GRAPStatusResponse(BaseModel):
    current_aqi: int
    current_stage: int
    projected_stage_48h: int
    proactive_action_recommended: bool
    trigger_rationale: str
    stages: List[GRAPStageInfo]
