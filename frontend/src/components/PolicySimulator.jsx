import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Wind, 
  Car, 
  CloudRain, 
  Factory, 
  HeartHandshake, 
  DollarSign 
} from 'lucide-react';
import { runSimulation } from '../services/api';

export default function PolicySimulator() {
  const [stubbleReduction, setStubbleReduction] = useState(50);
  const [windDir, setWindDir] = useState(315);
  const [oddEven, setOddEven] = useState(true);
  const [cloudSeeding, setCloudSeeding] = useState(false);
  const [industrialCurb, setIndustrialCurb] = useState(25);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const executeSimulation = async () => {
    setLoading(true);
    const result = await runSimulation({
      stubble_reduction_pct: stubbleReduction,
      wind_direction_deg: windDir,
      wind_speed_kmh: 8.0,
      odd_even_traffic_active: oddEven,
      artificial_rain_cloud_seeding: cloudSeeding,
      industrial_shutdown_pct: industrialCurb
    });
    setSimulationResult(result);
    setLoading(false);
  };

  useEffect(() => {
    executeSimulation();
  }, [stubbleReduction, windDir, oddEven, cloudSeeding, industrialCurb]);

  const resetDefaults = () => {
    setStubbleReduction(0);
    setWindDir(315);
    setOddEven(false);
    setCloudSeeding(false);
    setIndustrialCurb(0);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            "What-If" Policy & Environmental Intervention Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulate multi-state policy decisions and environmental factors to immediately forecast impacts on Delhi NCR air quality, health outcomes, and economic savings.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset to Baseline
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Sliders & Toggles */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Policy Control Knobs
          </h3>

          {/* 1. Stubble Burning Reduction */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> Stubble Fire Reduction (Bio-Decomposer / In-situ CRM)
              </span>
              <span className="font-mono font-bold text-emerald-400">{stubbleReduction}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={stubbleReduction}
              onChange={(e) => setStubbleReduction(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Unmitigated)</span>
              <span>50% (High Subsidy)</span>
              <span>100% (Zero Burning)</span>
            </div>
          </div>

          {/* 2. Wind Direction Shift */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-cyan-400" /> Regional Wind Heading (315° = Delhi Corridor)
              </span>
              <span className="font-mono font-bold text-cyan-400">{windDir}°</span>
            </div>
            <input
              type="range"
              min="180"
              max="360"
              step="5"
              value={windDir}
              onChange={(e) => setWindDir(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>180° (South)</span>
              <span className="text-amber-400 font-bold">315° (NW Direct Plume)</span>
              <span>360° (North)</span>
            </div>
          </div>

          {/* 3. Industrial Output Curb */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-purple-400" /> Industrial Output Curb
              </span>
              <span className="font-mono font-bold text-purple-400">{industrialCurb}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={industrialCurb}
              onChange={(e) => setIndustrialCurb(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* 4. Toggles: Odd-Even and Cloud Seeding */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-all">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Odd-Even Traffic Enforcement</div>
                  <div className="text-[10px] text-slate-400">Restricts private vehicle numbers by 50%</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={oddEven}
                onChange={(e) => setOddEven(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-all">
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-white">Cloud Seeding / Artificial Rain</div>
                  <div className="text-[10px] text-slate-400">Scavenges particulates via wet deposition</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={cloudSeeding}
                onChange={(e) => setCloudSeeding(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>
          </div>
        </div>

        {/* Right 2 Columns: Live Calculated Curve & Impact Scorecard */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Real-Time Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111827] p-4 rounded-xl border border-emerald-500/30 shadow-lg">
              <p className="text-[11px] font-semibold text-slate-400 uppercase">Peak AQI Reduction</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-400">
                  {simulationResult?.overall_aqi_reduction_pct || 0}%
                </span>
                <span className="text-xs text-slate-400">
                  ({simulationResult?.baseline_peak_aqi || 450} → {simulationResult?.simulated_peak_aqi || 280})
                </span>
              </div>
            </div>

            <div className="bg-[#111827] p-4 rounded-xl border border-cyan-500/30 shadow-lg">
              <p className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" /> Est. Lives Protected
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-cyan-400">
                  {simulationResult?.lives_protected_est_annual?.toLocaleString() || 0}
                </span>
                <span className="text-xs text-slate-400">per year</span>
              </div>
            </div>

            <div className="bg-[#111827] p-4 rounded-xl border border-amber-500/30 shadow-lg">
              <p className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Health Costs Saved
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-400">
                  ${simulationResult?.health_cost_saved_usd_millions || 0}M
                </span>
                <span className="text-xs text-slate-400">annual burden</span>
              </div>
            </div>
          </div>

          {/* Comparison Line Chart */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">Baseline vs. Simulated Policy Curve (72h)</h4>
                <p className="text-xs text-slate-400">{simulationResult?.scenario_summary || 'Running simulation...'}</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-rose-500"></span>
                  <span className="text-slate-400">Baseline (No Action)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-400"></span>
                  <span className="text-emerald-400 font-bold">Simulated Policy</span>
                </div>
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationResult?.timeline || []} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="hours_ahead" stroke="#64748b" fontSize={11} label={{ value: 'Hours Ahead', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[50, 500]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <ReferenceLine y={401} stroke="#a855f7" strokeDasharray="4 4" label={{ value: 'Severe Threshold (401)', fill: '#d8b4fe', fontSize: 10 }} />
                  <ReferenceLine y={301} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Very Poor (301)', fill: '#fca5a5', fontSize: 10 }} />
                  
                  <Line
                    type="monotone"
                    dataKey="baseline_aqi"
                    name="Baseline AQI"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="simulated_aqi"
                    name="Simulated Policy AQI"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
