"""
Citizen Reporting & WhatsApp Dispatch Service
"""
import uuid
import datetime
from typing import List
from app.models.citizen_report import CitizenReport, CitizenReportCreate

# In-memory store initialized with seed real-world ground reports from high-density hotspots
SEED_CITIZEN_REPORTS = [
    CitizenReport(
        id="cit_rep_101",
        reporter_name="Harjit Singh Sandhu",
        reporter_phone="+91 98765 43210",
        incident_type="Stubble Burning Plume",
        location_name="Dhuri-Barnala Road, Sangrur",
        district="Sangrur",
        state="Punjab",
        latitude=30.2458,
        longitude=75.8421,
        description="Fresh crop residue burning spotted across ~12 acres of combine-harvested paddy. Thick dark plume spreading towards NH-7.",
        severity_level="SEVERE",
        image_url="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop",
        reported_at="12 mins ago",
        verification_status="DISPATCHED_ACTION",
        ai_confidence_score=0.96,
        assigned_agency="PPCB Quick Response Flying Squad - Unit 04",
        action_taken="Squad dispatched with 2 water misting bowsers; CRM tractor deployed.",
        whatsapp_dispatch_payload="🚨 *CAQM EMERGENCE REPORT #101*\n📍 *Location*: Dhuri-Barnala Road, Sangrur (30.2458, 75.8421)\n🔥 *Incident*: Stubble Burning Plume (12 acres)\n⚠️ *AI Confidence*: 96% | Status: Dispatched"
    ),
    CitizenReport(
        id="cit_rep_102",
        reporter_name="Pooja Sharma",
        reporter_phone="+91 98112 34567",
        incident_type="Construction Dust Violation",
        location_name="Sector 62 Commercial Zone, Gurugram",
        district="Gurugram",
        state="Haryana",
        latitude=28.4595,
        longitude=77.0266,
        description="Uncovered 20ft soil excavation pile without required anti-smog gun and windbreak green nets. Heavy airborne PM10.",
        severity_level="HIGH",
        image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop",
        reported_at="35 mins ago",
        verification_status="VERIFIED_AI",
        ai_confidence_score=0.92,
        assigned_agency="HSPCB Environmental Enforcement Wing",
        action_taken="Notice generated with ₹50,000 environmental penalty draft.",
        whatsapp_dispatch_payload="🚨 *CAQM VIOLATION REPORT #102*\n📍 *Location*: Sector 62, Gurugram (28.4595, 77.0266)\n🏗️ *Incident*: Uncovered C&D Dust Pile\n⚠️ *AI Confidence*: 92% | Status: Verified"
    ),
    CitizenReport(
        id="cit_rep_103",
        reporter_name="Anil Verma",
        reporter_phone="+91 99100 88776",
        incident_type="Open Garbage Burning",
        location_name="Near Ghazipur Border / Anand Vihar",
        district="East Delhi",
        state="Delhi",
        latitude=28.6280,
        longitude=77.3150,
        description="Municipal solid waste set on fire along roadside drain. Toxic plastic smoke blowing towards residential societies.",
        severity_level="SEVERE",
        image_url="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop",
        reported_at="1 hour ago",
        verification_status="RESOLVED",
        ai_confidence_score=0.98,
        assigned_agency="MCD East Zone Sanitation Quick Response",
        action_taken="Doused within 18 minutes by MCD fire tender; surveillance drone logged footage.",
        whatsapp_dispatch_payload="🚨 *CAQM MUNICIPAL REPORT #103*\n📍 *Location*: Anand Vihar / Ghazipur (28.6280, 77.3150)\n🗑️ *Incident*: Open Municipal Burning\n⚠️ *AI Confidence*: 98% | Status: Resolved"
    )
]

def get_all_reports() -> List[CitizenReport]:
    return SEED_CITIZEN_REPORTS

def submit_citizen_report(data: CitizenReportCreate) -> CitizenReport:
    report_id = f"cit_rep_{uuid.uuid4().hex[:6]}"
    now_str = datetime.datetime.now().strftime("%I:%M %p (Just now)")
    
    # Calculate simulated AI verification confidence
    ai_conf = 0.94 if "stubble" in data.incident_type.lower() or "fire" in data.incident_type.lower() else 0.89
    
    agency_map = {
        "Punjab": "PPCB Quick Response Flying Squad",
        "Haryana": "HSPCB Rapid Environmental Cell",
        "Delhi": "DPCC & MCD Anti-Pollution Taskforce",
        "Uttar Pradesh": "UPPCB Ghaziabad/Noida Regional Wing"
    }
    assigned = agency_map.get(data.state, "CAQM Central Nodal Cell")
    
    whatsapp_msg = (
        f"🚨 *CAQM CITIZEN REPORT #{report_id}*\n"
        f"👤 *Reporter*: {data.reporter_name} ({data.reporter_phone})\n"
        f"📍 *Location*: {data.location_name}, {data.district} ({data.latitude:.4f}, {data.longitude:.4f})\n"
        f"⚠️ *Type*: {data.incident_type} | Severity: {data.severity_level}\n"
        f"📝 *Details*: {data.description}\n"
        f"🤖 *AI Confidence*: {int(ai_conf*100)}% | Assigned to {assigned}"
    )
    
    new_report = CitizenReport(
        id=report_id,
        reporter_name=data.reporter_name,
        reporter_phone=data.reporter_phone,
        incident_type=data.incident_type,
        location_name=data.location_name,
        district=data.district,
        state=data.state,
        latitude=data.latitude,
        longitude=data.longitude,
        description=data.description,
        severity_level=data.severity_level,
        image_url=data.image_url or "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop",
        reported_at=now_str,
        verification_status="VERIFIED_AI",
        ai_confidence_score=ai_conf,
        assigned_agency=assigned,
        action_taken=f"Auto-logged into CAQM GIS Registry; SMS ticket dispatched to {data.reporter_phone}.",
        whatsapp_dispatch_payload=whatsapp_msg
    )
    
    SEED_CITIZEN_REPORTS.insert(0, new_report)
    return new_report
