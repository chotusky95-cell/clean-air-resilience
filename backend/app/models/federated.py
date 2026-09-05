"""
Pydantic schemas for Federated Learning & Multi-State Model Exchange
"""
from typing import List, Dict, Optional
from pydantic import BaseModel

class FederatedNode(BaseModel):
    node_id: str
    state_or_agency: str       # e.g., "Punjab Pollution Control Board (PPCB)", "DPCC Delhi", "HSPCB Haryana"
    jurisdiction: str
    active_sensors_count: int
    local_samples_trained: int
    model_version: str
    status: str                # "Active / Synchronized", "Training Local Batch", "Awaiting Aggregation"
    last_sync_timestamp: str
    gradient_norm: float

class FederatedAggregationResponse(BaseModel):
    round_number: int
    participating_nodes: List[str]
    global_model_version: str
    aggregated_loss: float
    accuracy_gain_pct: float
    privacy_mechanism: str     # "Differential Privacy (epsilon=0.5, delta=1e-5)"
    raw_data_shared: bool      # Always False
    timestamp: str
