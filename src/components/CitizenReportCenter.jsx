import React, { useState, useEffect } from 'react';
import { 
  Camera, MapPin, Send, AlertTriangle, CheckCircle2, 
  Clock, ShieldAlert, Sparkles, Phone, MessageSquare, 
  Filter, Eye, UploadCloud, RefreshCw, Check
} from 'lucide-react';
import { fetchCitizenReports, submitCitizenReport } from '../services/api';

export default function CitizenReportCenter() {
  const [reports, setReports] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    reporter_name: '',
    reporter_phone: '',
    incident_type: 'Stubble Burning Plume',
    district: 'Sangrur',
    state: 'Punjab',
    location_name: '',
    latitude: 30.2458,
    longitude: 75.8421,
    description: '',
    severity_level: 'HIGH',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop'
  });

  const locationPresets = [
    { label: "Sangrur Paddy Belt (PB)", district: "Sangrur", state: "Punjab", lat: 30.2458, lon: 75.8421 },
    { label: "Dhuri Bypass (PB)", district: "Sangrur", state: "Punjab", lat: 30.3708, lon: 75.8671 },
    { label: "Anand Vihar ISBT (DL)", district: "East Delhi", state: "Delhi", lat: 28.6469, lon: 77.3160 },
    { label: "Bawana Industrial Zone (DL)", district: "North Delhi", state: "Delhi", lat: 28.7997, lon: 77.0329 },
    { label: "Sector 62 Excavation (HR)", district: "Gurugram", state: "Haryana", lat: 28.4595, lon: 77.0266 },
    { label: "Karnal Highway GT Road (HR)", district: "Karnal", state: "Haryana", lat: 29.6857, lon: 76.9905 }
  ];

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const data = await fetchCitizenReports();
    setReports(data);
  };

  const handleLocationPreset = (preset) => {
    setFormData({
      ...formData,
      location_name: preset.label,
      district: preset.district,
      state: preset.state,
      latitude: preset.lat,
      longitude: preset.lon
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reporter_name || !formData.location_name || !formData.description) return;

    setSubmitting(true);
    const newReport = await submitCitizenReport(formData);
    setReports([newReport, ...reports]);
    setSubmitting(false);
    setShowModal(false);

    // Reset form
    setFormData({
      reporter_name: '',
      reporter_phone: '',
      incident_type: 'Stubble Burning Plume',
      district: 'Sangrur',
      state: 'Punjab',
      location_name: '',
      latitude: 30.2458,
      longitude: 75.8421,
      description: '',
      severity_level: 'HIGH',
      image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop'
    });
  };

  const filteredReports = reports.filter(r => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'STUBBLE') return r.incident_type.toLowerCase().includes('stubble');
    if (activeFilter === 'GARBAGE') return r.incident_type.toLowerCase().includes('garbage');
    if (activeFilter === 'DUST') return r.incident_type.toLowerCase().includes('construction') || r.incident_type.toLowerCase().includes('dust');
    return true;
  });

  const handleWhatsAppDispatch = (report) => {
    const text = encodeURIComponent(report.whatsapp_dispatch_payload);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-darkCard to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/30">
              <Camera className="w-3.5 h-3.5" />
              Citizen Ground-Truth & Community Feedback Loop
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Hyperlocal Incident & WhatsApp Dispatcher
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Crowdsourced ground verification bridging satellite blind spots. Every report triggers instant AI computer-vision confidence validation and generates direct WhatsApp nodal control room tickets.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 transition-all hover:scale-105"
          >
            <Camera className="w-5 h-5" />
            <span>Report Incident Now</span>
          </button>
        </div>

        {/* Live KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400">Total Ground Reports</span>
            <div className="text-2xl font-bold text-white mt-1">1,482</div>
            <span className="text-[10px] text-emerald-400">● 100% Geo-Tagged</span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400">AI Verification Accuracy</span>
            <div className="text-2xl font-bold text-cyan-400 mt-1">94.8%</div>
            <span className="text-[10px] text-slate-400">Computer Vision Verified</span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400">QRT Squads Dispatched</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">128 Squads</div>
            <span className="text-[10px] text-amber-400">Active Field Units</span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400">Avg Resolution Time</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">18.4 min</div>
            <span className="text-[10px] text-emerald-400">Target &lt; 30 mins</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-darkCard p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveFilter('STUBBLE')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'STUBBLE'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            🔥 Stubble Plumes
          </button>
          <button
            onClick={() => setActiveFilter('GARBAGE')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'GARBAGE'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            🗑️ Open Waste Burning
          </button>
          <button
            onClick={() => setActiveFilter('DUST')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'DUST'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            🏗️ C&D Dust Violations
          </button>
        </div>

        <button 
          onClick={loadReports}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Live Feed</span>
        </button>
      </div>

      {/* Reports Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div 
            key={report.id}
            className="bg-darkCard border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg group"
          >
            <div>
              {/* Image Preview Header */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <img 
                  src={report.image_url} 
                  alt={report.incident_type} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkCard via-transparent to-black/60"></div>
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    report.severity_level === 'SEVERE' ? 'bg-rose-500/90 text-white' : 'bg-amber-500/90 text-slate-900'
                  }`}>
                    {report.severity_level} SEVERITY
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    AI Conf: {Math.round(report.ai_confidence_score * 100)}%
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold">{report.reported_at}</span>
                  <span className="text-[11px] text-slate-400">#{report.id}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-base leading-snug">
                    {report.incident_type}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    report.verification_status === 'RESOLVED' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : report.verification_status === 'DISPATCHED_ACTION'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {report.verification_status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{report.location_name}, {report.district} ({report.state})</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                  "{report.description}"
                </p>

                {/* Assigned Action */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Assigned Squad:</span>
                    <span className="text-cyan-400 font-bold truncate max-w-[170px]">{report.assigned_agency}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-400 font-medium">Action: </span>
                    {report.action_taken}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Dispatch Buttons */}
            <div className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleWhatsAppDispatch(report)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Nodal</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(report.whatsapp_dispatch_payload);
                    setCopiedId(report.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
                >
                  {copiedId === report.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{copiedId === report.id ? 'Copied!' : 'Copy Ticket'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Citizen Report Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-darkCard border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Log Ground Pollution Incident</h3>
                  <p className="text-xs text-slate-400">Crowdsource real-world data directly to CAQM Nodal Control</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Location Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ⚡ Quick Regional Presets (Hyperlocal Hotspots)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {locationPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleLocationPreset(preset)}
                      className="text-left text-[11px] p-2 rounded-lg bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-all truncate"
                    >
                      📍 {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reporter Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.reporter_name}
                    onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp No. *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98123 45678"
                    value={formData.reporter_phone}
                    onChange={(e) => setFormData({ ...formData, reporter_phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Type</label>
                  <select
                    value={formData.incident_type}
                    onChange={(e) => setFormData({ ...formData, incident_type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Stubble Burning Plume">🔥 Stubble Burning Plume</option>
                    <option value="Open Garbage Burning">🗑️ Open Garbage / Plastic Burning</option>
                    <option value="Construction Dust Violation">🏗️ Construction Dust (C&D) Violation</option>
                    <option value="Industrial Black Smoke">🏭 Industrial Boiler Smoke</option>
                    <option value="Unpaved Road Heavy Dust">🚚 Road / Freight Heavy Dust</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Severity Rating</label>
                  <select
                    value={formData.severity_level}
                    onChange={(e) => setFormData({ ...formData, severity_level: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="LOW">Low (Localized Smoke)</option>
                    <option value="MEDIUM">Medium (Spreading across 1-2 acres)</option>
                    <option value="HIGH">High (Heavy plume affecting highway)</option>
                    <option value="SEVERE">Severe (Major fire cluster / toxic odor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Location / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Sangrur Grain Market, NH-7"
                  value={formData.location_name}
                  onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Description & Observation *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Describe smoke color, approximate area, nearby hospitals or schools affected..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              {/* Photo Simulation Badge */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300 font-medium">Simulated Image Attachment Ready</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  AI Auto-Scan On (94% Conf)
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting to CAQM...' : 'Log & Dispatch Incident'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
