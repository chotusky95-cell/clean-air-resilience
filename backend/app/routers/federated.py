"""
Router for Federated Learning & Interoperable Model Exchange
"""
from typing import List
from fastapi import APIRouter
from app.models.federated import FederatedNode, FederatedAggregationResponse
from app.services.federated_service import get_federated_nodes, trigger_federated_aggregation

router = APIRouter(prefix="/federated", tags=["Federated Learning Hub"])

@router.get("/nodes", response_model=List[FederatedNode], summary="List all participating state & agency edge nodes")
def list_nodes():
    return get_federated_nodes()

@router.post("/aggregate", response_model=FederatedAggregationResponse, summary="Trigger a federated aggregation round across edge nodes")
def aggregate_federated():
    return trigger_federated_aggregation()
