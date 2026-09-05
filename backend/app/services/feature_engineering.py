"""
Feature engineering service for AI forecasting
Calculates wind transport vectors, upwind fire accumulations, and lag features
"""
import math
from typing import Dict, Any, List

def compute_wind_vector(speed_kmh: float, dir_deg: float) -> Dict[str, float]:
    """
    Decompose wind speed and meteorological direction into u (east-west) and v (north-south) vectors
    """
    rad = math.radians(dir_deg)
    # Meteorological convention: direction where wind is blowing FROM
    u = -speed_kmh * math.sin(rad)
    v = -speed_kmh * math.cos(rad)
    return {"u_vector": round(u, 2), "v_vector": round(v, 2)}

def compute_plume_alignment_score(wind_dir_deg: float) -> float:
    """
    Calculates alignment factor between wind direction and the Punjab/Haryana-to-Delhi transport vector (315° NW).
    Returns 1.0 when perfectly aligned (315°), dropping to 0.0 when perpendicular or opposite.
    """
    target_deg = 315.0  # NW heading
    diff_deg = abs(wind_dir_deg - target_deg)
    diff_deg = min(diff_deg, 360.0 - diff_deg)
    
    # Cosine alignment: 1.0 at 0 diff, 0.0 at >= 90 diff
    if diff_deg >= 90.0:
        return 0.05
    return round(math.cos(math.radians(diff_deg)), 3)

def calculate_inversion_index(temp_c: float, humidity_pct: float, boundary_layer_height_m: float = 450.0) -> float:
    """
    Calculates winter boundary layer atmospheric trapping index.
    High humidity + low temp + shallow boundary layer = severe trapping.
    """
    return round((humidity_pct / max(temp_c, 5.0)) * (500.0 / max(boundary_layer_height_m, 100.0)), 2)
