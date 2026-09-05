import React, { useState } from 'react';
import { 
  BellRing, 
  Smartphone, 
  ShieldAlert, 
  Heart, 
  Send, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Building, 
  Flame,
  PhoneCall 
} from 'lucide-react';

export default function AlertCenter({ alertsData }) {
  const [activeTab, setActiveTab] = useState('farmers'); // 'farmers', 'citizens', 'authorities'
  const [customPhone, setCustomPhone] = useState('+91 98765-43210');
  const [selectedTehsil, setSelectedTehsil] = useState('Dhuri, Sangrur (Punjab)');
  const [smsSent, setSmsSent] = useState(false);

  const healthAdvisories = alertsData?.health_advisories || [];
  const farmerQueue = alertsData?.farmer_sms_queue || [];
  const authorityDispatches = alertsData?.authority_dispatches || [];

  const handleSendCustomSMS = (e) => {
    e.preventDefault();
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Selector Banner */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BellRing className="w-5 h-5 text-emerald-400" />
            Multi-Stakeholder Alert & Advisory Dispatch Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automated, targeted communication across the environmental value chain: vernacular SMS for farmers, emergency dispatches for District Magistrates, and proactive health advisories for citizens.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('farmers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'farmers'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Farmer SMS Center
          </button>

          <button
            onClick={() => setActiveTab('citizens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'citizens'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Citizen Health Advisories
          </button>

          <button
            onClick={() => setActiveTab('authorities')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'authorities'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" /> Magistrate Dispatches
          </button>
        </div>
      </div>

      {/* 1. Farmer SMS Dispatcher & Mobile Phone Simulator */}
      {activeTab === 'farmers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dispatch Control Form */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Send className="w-4 h-4 text-emerald-400" /> Hyperlocal Farmer SMS Dispatcher
            </h3>

            <p className="text-xs text-slate-400">
              When satellite sensors detect high stubble burning density in upwind blocks, automated vernacular SMS offer immediate bio-decomposer spraying and financial subsidies.
            </p>

            <form onSubmit={handleSendCustomSMS} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Tehsil / Block</label>
                <select
                  value={selectedTehsil}
                  onChange={(e) => setSelectedTehsil(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-emerald-500"
                >
                  <option>Dhuri, Sangrur (Punjab)</option>
                  <option>Jagraon, Ludhiana (Punjab)</option>
                  <option>Sunam, Sangrur (Punjab)</option>
                  <option>Assandh, Karnal (Haryana)</option>
                  <option>Guhla, Kaithal (Haryana)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Farmer Mobile Number</label>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500"
                  placeholder="+91 98XXX-XXXXX"
                />
              </div>

              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
                <div><strong>Language:</strong> Punjabi / Gurmukhi</div>
                <div><strong>Incentive Offer:</strong> ₹1,200/acre in-situ CRM grant</div>
                <div><strong>Nearest KVK:</strong> Sangrur Krishi Vigyan Kendra</div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" /> Send Vernacular SMS Advisory
              </button>

              {smsSent && (
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SMS successfully dispatched via Gov SMS Gateway to {customPhone}!</span>
                </div>
              )}
            </form>
          </div>

          {/* Mobile Screen SMS Preview */}
          <div className="lg:col-span-2 bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Live Dispatched SMS Queue (Punjab & Haryana Stubble Hotspots)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmerQueue.map((sms) => (
                <div
                  key={sms.id}
                  className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/60 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> {sms.recipient_phone_masked}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {sms.language}
                    </span>
                  </div>

                  <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200 leading-relaxed font-sans shadow-inner">
                    {sms.message_text}
                  </div>

                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <div><strong>Tehsil:</strong> {sms.recipient_tehsil}, {sms.recipient_district}</div>
                    <div><strong>Incentive:</strong> {sms.subsidy_offer}</div>
                    <div className="text-slate-500">{sms.sent_timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Citizen Health Advisories */}
      {activeTab === 'citizens' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthAdvisories.map((advisory, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {advisory.risk_level}
                  </span>
                  <Heart className="w-4 h-4 text-rose-400" />
                </div>

                <h3 className="text-base font-bold text-white mb-2">{advisory.target_group}</h3>

                <ul className="space-y-2 text-xs text-slate-300">
                  {advisory.actionable_advice.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>N95 Mask: Mandatory</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  <span>Outdoor Cardio: Avoid</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. District Magistrate & SDM Dispatches */}
      {activeTab === 'authorities' && (
        <div className="space-y-4">
          {authorityDispatches.map((dispatch) => (
            <div
              key={dispatch.id}
              className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{dispatch.officer_title}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                      {dispatch.alert_level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    District: {dispatch.district} | Predicted Spike Arrival: <strong className="text-amber-300">{dispatch.projected_spike_time}</strong>
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  Channel: {dispatch.broadcast_channel}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Mandated Emergency Field Directives:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {dispatch.recommended_sops.map((sop, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200">
                      <span className="text-emerald-400 font-bold mr-1">#{i + 1}</span> {sop}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
