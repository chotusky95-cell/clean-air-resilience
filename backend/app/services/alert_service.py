"""
Multi-Channel Alert & Advisory Engine
Generates Citizen health advisories, Farmer SMS in Hindi/Punjabi, and District Magistrate dispatches
"""
from datetime import datetime
from typing import List
from app.models.alert import AlertsResponse, CitizenHealthAdvisory, FarmerAdvisorySMS, DistrictAuthorityAlert

def get_live_alerts() -> AlertsResponse:
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M IST")
    
    health_advisories = [
        CitizenHealthAdvisory(
            target_group="Children & Elderly (>65 yrs)",
            risk_level="Severe Emergency",
            actionable_advice=[
                "Avoid all early morning outdoor walks, jogging, or cycling.",
                "Ensure indoor air purifiers remain active with closed windows.",
                "Consult a pediatrician/geriatrician immediately if wheezing or eye irritation develops."
            ],
            n95_mask_recommended=True,
            outdoor_exercise_safe=False,
            air_purifier_recommended=True
        ),
        CitizenHealthAdvisory(
            target_group="Asthma & Respiratory Patients",
            risk_level="Severe Emergency",
            actionable_advice=[
                "Keep emergency bronchodilator inhalers accessible at all times.",
                "Wear an N95/FFP2 respirator when stepping outdoors.",
                "Avoid cooking with unventilated gas or incense indoors."
            ],
            n95_mask_recommended=True,
            outdoor_exercise_safe=False,
            air_purifier_recommended=True
        ),
        CitizenHealthAdvisory(
            target_group="General Population",
            risk_level="Very Poor / High Risk",
            actionable_advice=[
                "Wear N95 masks during daily commute on two-wheelers or public transport.",
                "Avoid high-intensity outdoor cardio workouts during peak smog hours (06:00 - 10:00).",
                "Utilize metro transit rather than personal combustion vehicles."
            ],
            n95_mask_recommended=True,
            outdoor_exercise_safe=False,
            air_purifier_recommended=True
        )
    ]
    
    farmer_sms_queue = [
        FarmerAdvisorySMS(
            id="sms_pb_sangrur_01",
            recipient_tehsil="Dhuri",
            recipient_district="Sangrur",
            recipient_state="Punjab",
            recipient_phone_masked="+91 98765-XXXX1",
            language="Punjabi",
            message_text="ਕਿਸਾਨ ਵੀਰੋ: ਪਰਾਲੀ ਨੂੰ ਅੱਗ ਨਾ ਲਗਾਓ। ਖੇਤੀਬਾੜੀ ਵਿਭਾਗ ਵੱਲੋਂ ਧੂਰੀ ਬਲਾਕ ਵਿੱਚ ਮੁਫ਼ਤ ਬਾਇਓ-ਡੀਕੰਪੋਜ਼ਰ ਸਪਰੇਅ ਮਸ਼ੀਨਾਂ ਅਤੇ ₹1200/ਏਕੜ ਪ੍ਰੋਤਸਾਹਨ ਉਪਲਬਧ ਹੈ। ਬੁਕਿੰਗ ਲਈ 1800-180-1551 ਡਾਇਲ ਕਰੋ।",
            subsidy_offer="₹1,200/acre in-situ CRM cash incentive + Free Pusa Bio-Decomposer",
            nearest_bio_decomposer_hub="Dhuri Krishi Vigyan Kendra (KVK)",
            sent_timestamp=now_str
        ),
        FarmerAdvisorySMS(
            id="sms_pb_ludhiana_02",
            recipient_tehsil="Jagraon",
            recipient_district="Ludhiana",
            recipient_state="Punjab",
            recipient_phone_masked="+91 98140-XXXX4",
            language="Punjabi",
            message_text="ਜ਼ਰੂਰੀ ਸੂਚਨਾ: ਉਪਗ੍ਰਹਿ (Satellite) ਵੱਲੋਂ ਜਗਰਾਓਂ ਖੇਤਰ ਵਿੱਚ ਧੂੰਏਂ ਦਾ ਸੰਕੇਤ ਮਿਲਿਆ ਹੈ। ਹੈਪੀ ਸੀਡਰ (Happy Seeder) ਮਸ਼ੀਨ 80% ਸਬਸਿਡੀ 'ਤੇ ਪੰਚਾਇਤ ਦਫ਼ਤਰ ਤੋਂ ਪ੍ਰਾਪਤ ਕਰੋ। ਵਾਤਾਵਰਣ ਬਚਾਓ।",
            subsidy_offer="80% Subsidized Super Seeder / Happy Seeder rental",
            nearest_bio_decomposer_hub="PAU Extension Center, Jagraon",
            sent_timestamp=now_str
        ),
        FarmerAdvisorySMS(
            id="sms_hr_karnal_03",
            recipient_tehsil="Assandh",
            recipient_district="Karnal",
            recipient_state="Haryana",
            recipient_phone_masked="+91 94160-XXXX8",
            language="Hindi",
            message_text="किसान भाई: पराली न जलाएं। हरियाणा सरकार द्वारा ₹1,000 प्रति एकड़ प्रोत्साहन राशि एवं कस्टम हायरिंग सेंटर से पराली प्रबंधन बेलर मशीन उपलब्ध है। संपर्क: 1800-180-2117।",
            subsidy_offer="₹1,000/acre direct DBT transfer for non-burning verification",
            nearest_bio_decomposer_hub="Karnal Custom Hiring Center (CHC)",
            sent_timestamp=now_str
        )
    ]
    
    authority_dispatches = [
        DistrictAuthorityAlert(
            id="auth_del_east_01",
            district="East Delhi",
            officer_title="District Magistrate / SDM Preet Vihar",
            alert_level="CRITICAL - Proactive GRAP Stage III",
            projected_spike_time="+28h (AQI 425 Expected)",
            recommended_sops=[
                "Deploy 14 anti-smog water mist trucks on Anand Vihar ISBT corridor.",
                "Enforce immediate closure of ready-mix concrete and stone crushing plants.",
                "Issue joint inspections with Traffic ACP to impound non-BS6 commercial trucks."
            ],
            broadcast_channel="WhatsApp Official + Emergency SMS",
            dispatched_at=now_str
        ),
        DistrictAuthorityAlert(
            id="auth_hr_gurugram_02",
            district="Gurugram",
            officer_title="Deputy Commissioner Gurugram",
            alert_level="HIGH - Proactive GRAP Stage II/III",
            projected_spike_time="+36h (AQI 390 Expected)",
            recommended_sops=[
                "Inspect diesel generator ban across Cyber City and Udyog Vihar IT corridors.",
                "Enhance Gurugram Metropolitan City Bus feeder routes by 30%."
            ],
            broadcast_channel="NIC Portal Broadcast",
            dispatched_at=now_str
        )
    ]
    
    return AlertsResponse(
        active_alerts_count=len(farmer_sms_queue) + len(authority_dispatches),
        health_advisories=health_advisories,
        farmer_sms_queue=farmer_sms_queue,
        authority_dispatches=authority_dispatches
    )
