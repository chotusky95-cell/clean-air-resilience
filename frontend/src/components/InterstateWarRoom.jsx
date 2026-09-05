import React, { useState, useEffect } from 'react';
import { 
  Building2, Radio, Wind, Compass, ShieldCheck, 
  Flame, CheckCircle, AlertOctagon, TrendingUp, 
  Truck, Droplets, RefreshCw, Send, Users
} from 'lucide-react';
import { fetchWarRoomStatus, fetchSmokeFlux, fetchWarRoomActions } from '../services/api';

export default function InterstateWarRoom() {
  const [states, setStates] = useState([]);
  const [flux, setFlux] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dispatchedDirective, setDispatchedDirective] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [statesData, fluxData, actionsData] = await Promise.all([
      fetchWarRoomStatus(),
      fetchSmokeFlux(),
      fetchWarRoomActions()
    ]);
    setStates(statesData);
    setFlux(fluxData);
    setActions(actionsData);
    setLoading(false);
  };

  const handleIssueDirective = () => {
    setDispatchedDirective(true);
    setTimeout(() => setDispatchedDirective(false), 3500);
    
    // Prepend simulated new joint directive
    const newAction = {
      id: `jc_${Date.now()}`,
      timestamp: "Just now",
      initiating_agency: "CAQM Central War Room (Aditya Raj, Team Leader)",
      target_agency: "PPCB (Punjab) & DPCC (Delhi)",
      action_type: "Emergency Joint SOP Order",
      description: "Directing 100% deployment of in-situ bio-decomposers in Sangrur-Barnala and immediate Stage-III anti-smog misting across Delhi Border Corridors.",
      status: "DISPATCHED_ACTIVE"
    };
    setActions([newAction, ...actions]);
  };

  return (
    <div className="space-y-6">
      {/* War Room Header */}
      <div className="bg-gradient-to-r from-slate-900 via-darkCard to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-cyan-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              CAQM Multi-State Command & Control
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Inter-State Joint Environmental War Room
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Automating interstate coordination across 4 state pollution control boards (DPCC Delhi, PPCB Punjab, HSPCB Haryana, UPPCB UP) to eliminate administrative delays and track trans-boundary smoke transport.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleIssueDirective}
              disabled={dispatchedDirective}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/40 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>{dispatchedDirective ? 'Joint Directive Dispatched!' : 'Issue CAQM Joint Directive'}</span>
            </button>
            <button
              onClick={loadData}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
              title="Refresh War Room Telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Border Smoke Flux Telemetry */}
      {flux && (
        <div className="bg-darkCard border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">
                Trans-Boundary Smoke Mass Flux Telemetry (315° NW Corridor)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
              ● Active Smoke Plume Funneling into Delhi NCR
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Wind Direction</span>
              <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center gap-1">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>315° NW</span>
              </div>
              <span className="text-[10px] text-slate-400">Direct Delhi Alignment</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Wind Transport Speed</span>
              <div className="text-xl font-bold text-white mt-1">{flux.wind_speed_kmh} km/h</div>
              <span className="text-[10px] text-amber-400">Low Dispersion Index</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Smoke Mass Flux</span>
              <div className="text-xl font-bold text-rose-400 mt-1">{flux.smoke_mass_transport_kg_hr.toLocaleString()} kg/hr</div>
              <span className="text-[10px] text-rose-400">PM2.5 Inflow Rate</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Stubble Share in NCR</span>
              <div className="text-xl font-bold text-amber-400 mt-1">{flux.stubble_contribution_to_delhi_pct}%</div>
              <span className="text-[10px] text-amber-400">Of Delhi Total PM2.5</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Inversion Ceiling</span>
              <div className="text-xl font-bold text-purple-400 mt-1">{flux.inversion_layer_height_m} m</div>
              <span className="text-[10px] text-purple-400">Boundary Layer Trap</span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Airmass Transit Time</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{flux.airmass_transit_time_hrs} hrs</div>
              <span className="text-[10px] text-emerald-400">Early Warning Horizon</span>
            </div>
          </div>
        </div>
      )}

      {/* 4 State Board Governance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {states.map((state) => (
          <div 
            key={state.state_code}
            className="bg-darkCard border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    state.status_color === 'rose' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                  }`}></div>
                  <h3 className="text-base font-bold text-white">{state.state_name}</h3>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {state.state_code}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-medium truncate">
                {state.agency_name}
              </div>

              {/* State AQI & Active Fires */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400">State Avg AQI</span>
                  <div className={`text-xl font-extrabold mt-0.5 ${
                    state.active_aqi_avg >= 400 ? 'text-purple-400' : (state.active_aqi_avg >= 300 ? 'text-rose-400' : 'text-amber-400')
                  }`}>
                    {state.active_aqi_avg}
                  </div>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] text-slate-400">Active Satellite Fires</span>
                  <div className="text-xl font-extrabold text-rose-400 mt-0.5">
                    {state.stubble_fires_active.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Enforcement Resources Telemetry */}
              <div className="space-y-2 text-xs bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    Field Flying Squads:
                  </span>
                  <span className="font-bold text-white">{state.enforcement_squads_deployed} Units</span>
                </div>

                {state.happy_seeders_operating > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      Happy Seeders Operating:
                    </span>
                    <span className="font-bold text-emerald-400">{state.happy_seeders_operating.toLocaleString()} Machines</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-teal-400" />
                    Bio-Decomposer Spray:
                  </span>
                  <span className="font-bold text-teal-400">{state.bio_decomposer_acres_sprayed.toLocaleString()} Acres</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    Anti-Smog Guns Active:
                  </span>
                  <span className="font-bold text-purple-400">{state.anti_smog_guns_active} Guns</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Interstate BS-VI Bus:</span>
                  <span className="font-bold text-amber-400">{state.interstate_bs6_compliance_pct}% Compliance</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Joint Inter-Agency Coordination Log */}
      <div className="bg-darkCard border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Live Joint Inter-Agency SOP Coordination Feed
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Auto-Syncing with CAQM Registry</span>
        </div>

        <div className="space-y-3">
          {actions.map((act) => (
            <div 
              key={act.id}
              className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {act.action_type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {act.initiating_agency} ➔ <strong className="text-white">{act.target_agency}</strong>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">({act.timestamp})</span>
                </div>
                <p className="text-xs text-slate-300">
                  {act.description}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold shrink-0 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ✓ {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
