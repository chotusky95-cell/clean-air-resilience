import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Flame, 
  TrendingUp, 
  ShieldAlert, 
  Sliders, 
  BellRing, 
  Share2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Key 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, grapStatus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'map', label: 'GIS & Hotspots', icon: Wind },
    { id: 'forecast', label: '72h AI Forecast', icon: TrendingUp },
    { id: 'grap', label: 'GRAP Decision Board', icon: ShieldAlert },
    { id: 'simulator', label: 'Policy Simulator', icon: Sliders },
    { id: 'alerts', label: 'Alerts & Farmer SMS', icon: BellRing },
    { id: 'federated', label: 'Federated OpenAPI', icon: Share2 },
    { id: 'apikeys', label: 'API Keys & Auth', icon: Key },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 shadow-xl px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
            <Wind className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Bharat Innovates
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Clean Air AI
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 font-medium">
              <span>RCET Bhilai</span>
              <span>•</span>
              <span className="text-cyan-400">Delhi NCR & Indo-Gangetic Plains</span>
            </p>
          </div>

          {/* Proactive Stage Badge (Mobile) */}
          <div className="md:hidden">
            {grapStatus?.proactive_action_recommended ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> GRAP Stage {grapStatus.projected_stage_48h}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-1 ring-white/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Info: Live Time & Proactive Alert Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{time.toLocaleTimeString('en-IN', { hour12: false })} IST</span>
          </div>

          {grapStatus?.proactive_action_recommended ? (
            <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md bg-gradient-to-r from-rose-950/80 to-amber-950/80 text-rose-300 border border-rose-600/40 shadow-sm animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>⚡ Proactive GRAP Stage {grapStatus.projected_stage_48h}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRAP Stage II (Standard)</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
