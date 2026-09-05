"""
Automated Graded Response Action Plan (GRAP) Decision Engine
Evaluates proactive triggers 48 hours in advance based on AI forecasts
"""
from typing import List
from app.models.grap import GRAPStatusResponse, GRAPStageInfo, GRAPActionItem

def evaluate_grap_status(current_aqi: int = 348, peak_forecast_48h: int = 428) -> GRAPStatusResponse:
    # Determine current reactive stage
    if current_aqi > 450:
        current_stage = 4
    elif current_aqi >= 401:
        current_stage = 3
    elif current_aqi >= 301:
        current_stage = 2
    elif current_aqi >= 201:
        current_stage = 1
    else:
        current_stage = 0
        
    # Determine projected 48h stage
    if peak_forecast_48h > 450:
        projected_stage = 4
    elif peak_forecast_48h >= 401:
        projected_stage = 3
    elif peak_forecast_48h >= 301:
        projected_stage = 2
    elif peak_forecast_48h >= 201:
        projected_stage = 1
    else:
        projected_stage = 0
        
    is_proactive = projected_stage > current_stage
    rationale = (
        f"Proactive Stage {projected_stage} triggered: AI model predicts AQI rising from {current_aqi} to {peak_forecast_48h} within 48 hours due to upwind crop-burning smoke and nocturnal inversion. Immediate pre-emptive enforcement advised."
        if is_proactive else
        f"Stage {current_stage} active based on current AQI {current_aqi}. Maintain ongoing mitigation measures."
    )
    
    stages: List[GRAPStageInfo] = [
        GRAPStageInfo(
            stage_number=1,
            stage_name="Stage I - 'Poor' Air Quality",
            aqi_range="201 - 300 AQI",
            is_active=current_stage >= 1 or projected_stage >= 1,
            is_proactively_triggered=projected_stage >= 1 and current_stage < 1,
            lead_time_hours=48 if is_proactive else 0,
            summary="Dust suppression, mechanized road sweeping, ban on open garbage burning, periodic water sprinkling.",
            action_items=[
                GRAPActionItem(
                    id="grap_1_mcd_01",
                    department="MCD / NDMC",
                    title="Mechanized Sweeping & Anti-Smog Guns",
                    description="Deploy 78 mechanized road sweepers and 120 anti-smog guns across high-density traffic corridors.",
                    priority="High",
                    status="Active",
                    assigned_jurisdiction="All 12 Delhi Municipal Zones"
                ),
                GRAPActionItem(
                    id="grap_1_pwd_02",
                    department="PWD Delhi",
                    title="Water Sprinkling at Construction Hotspots",
                    description="Sprinkle treated effluent water twice daily on Ring Road, Outer Ring Road, and arterial bypasses.",
                    priority="Medium",
                    status="Active",
                    assigned_jurisdiction="PWD Arterial Corridors"
                ),
                GRAPActionItem(
                    id="grap_1_dpcc_03",
                    department="DPCC",
                    title="Enforce Ban on Open Biomass Burning",
                    description="Night patrol squads to monitor landfill sites (Ghazipur, Bhalswa) and prevent waste burning.",
                    priority="Critical",
                    status="Active",
                    assigned_jurisdiction="East & North Delhi Landfill Buffers"
                )
            ]
        ),
        GRAPStageInfo(
            stage_number=2,
            stage_name="Stage II - 'Very Poor' Air Quality",
            aqi_range="301 - 400 AQI",
            is_active=current_stage >= 2 or projected_stage >= 2,
            is_proactively_triggered=projected_stage >= 2 and current_stage < 2,
            lead_time_hours=48 if (projected_stage >= 2 and current_stage < 2) else 0,
            summary="Diesel generator curbs, synchronized traffic signals, 50% hike in parking fees, augmented public transit.",
            action_items=[
                GRAPActionItem(
                    id="grap_2_power_01",
                    department="Discoms (BSES/TPDDL)",
                    title="Strict Diesel Generator Ban",
                    description="Ban DG sets except for emergency healthcare, metro rail, and essential disaster services.",
                    priority="Critical",
                    status="Active",
                    assigned_jurisdiction="Commercial Complexes & Industrial Hubs"
                ),
                GRAPActionItem(
                    id="grap_2_traffic_02",
                    department="Delhi Traffic Police",
                    title="Synchronized Signal Timing at Congestion Points",
                    description="Eliminate vehicular idling at 42 critical bottleneck junctions (ITO, Kashmere Gate, Ashram, Dhaula Kuan).",
                    priority="High",
                    status="Active",
                    assigned_jurisdiction="Central & South Traffic Circles"
                ),
                GRAPActionItem(
                    id="grap_2_dmrc_03",
                    department="DMRC & DTC",
                    title="Enhance Metro & Electric Bus Frequency",
                    description="Operate 60 additional daily metro train trips and add 200 feeder electric buses to reduce private car usage.",
                    priority="High",
                    status="Active",
                    assigned_jurisdiction="NCR Metro Feeder Network"
                )
            ]
        ),
        GRAPStageInfo(
            stage_number=3,
            stage_name="Stage III - 'Severe' Air Quality",
            aqi_range="401 - 450 AQI",
            is_active=current_stage >= 3 or projected_stage >= 3,
            is_proactively_triggered=projected_stage >= 3 and current_stage < 3,
            lead_time_hours=48 if (projected_stage >= 3 and current_stage < 3) else 0,
            summary="Total ban on non-essential construction, ban on BS-III petrol & BS-IV diesel LMVs, hybrid schooling.",
            action_items=[
                GRAPActionItem(
                    id="grap_3_transport_01",
                    department="Transport Department Delhi/NCR",
                    title="Prohibit BS-III Petrol & BS-IV Diesel Cars",
                    description="Impose ₹20,000 fine on plying of non-compliant BS-III petrol and BS-IV diesel private passenger vehicles.",
                    priority="Critical",
                    status="Pending Dispatch" if is_proactive else "Active",
                    assigned_jurisdiction="NCR Border Checkposts & City Entryways"
                ),
                GRAPActionItem(
                    id="grap_3_mcd_02",
                    department="MCD / DDA / CPWD",
                    title="Halt All Non-Essential Construction & Demolition",
                    description="Cease earthwork, piling, and demolition on all private and non-metro public infrastructure projects.",
                    priority="Critical",
                    status="Pending Dispatch" if is_proactive else "Active",
                    assigned_jurisdiction="All C&D Sites in NCR"
                ),
                GRAPActionItem(
                    id="grap_3_edu_03",
                    department="Directorate of Education",
                    title="Switch Primary Schools (Classes Nursery-V) to Online",
                    description="Issue directive suspending physical classroom attendance for young children to prevent acute toxic exposure.",
                    priority="High",
                    status="Pending Dispatch" if is_proactive else "Active",
                    assigned_jurisdiction="All Govt & Private Schools (NCR)"
                )
            ]
        ),
        GRAPStageInfo(
            stage_number=4,
            stage_name="Stage IV - 'Severe+' Air Quality Emergency",
            aqi_range="> 450 AQI",
            is_active=current_stage >= 4 or projected_stage >= 4,
            is_proactively_triggered=projected_stage >= 4 and current_stage < 4,
            lead_time_hours=48 if (projected_stage >= 4 and current_stage < 4) else 0,
            summary="Ban on non-essential heavy trucks entering Delhi, 50% Work-from-Home mandate, emergency odd-even vehicle curbs.",
            action_items=[
                GRAPActionItem(
                    id="grap_4_police_01",
                    department="Delhi Police & Transport Enforcement",
                    title="Total Ban on Heavy Trucks (Non-EV/CNG/BS-VI)",
                    description="Divert non-essential inter-state commercial trucks through Eastern and Western Peripheral Expressways.",
                    priority="Critical",
                    status="Pending Dispatch",
                    assigned_jurisdiction="Kundli, Singhu, Tikri, Badarpur Borders"
                ),
                GRAPActionItem(
                    id="grap_4_gad_02",
                    department="General Administration Dept",
                    title="Mandatory 50% Remote Work (WFH)",
                    description="Order 50% staff in public and private sector offices to work from home to minimize commuter traffic.",
                    priority="High",
                    status="Pending Dispatch",
                    assigned_jurisdiction="All Delhi NCR Corporate & Govt Offices"
                )
            ]
        )
    ]
    
    return GRAPStatusResponse(
        current_aqi=current_aqi,
        current_stage=current_stage,
        projected_stage_48h=projected_stage,
        proactive_action_recommended=is_proactive,
        trigger_rationale=rationale,
        stages=stages
    )
