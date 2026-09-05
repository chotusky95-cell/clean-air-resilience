import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Send, 
  Building2, 
  Truck, 
  School, 
  Factory, 
  Zap,
  Sparkles 
} from 'lucide-react';

export default function GRAPActionBoard({ grapStatus }) {
  const [selectedStage, setSelectedStage] = useState(grapStatus?.projected_stage_48h || 3);
  const [dispatchedItems, setDispatchedItems] = useState({});

  const stages = grapStatus?.stages || [];
  const currentStageInfo = stages.find(s => s.stage_number === selectedStage) || stages[0];

  const handleDispatch = (itemId) => {
    setDispatchedItems(prev => ({ ...prev, [itemId]: true }));
  };

  const getStageColor = (num) => {
    switch (num) {
      case 1: return 'from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-400';
      case 2: return 'from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-400';
      case 3: return 'from-purple-500/20 to-fuchsia-500/10 border-purple-500/40 text-purple-400';
      case 4: return 'from-rose-950/60 to-red-950/40 border-red-600 text-rose-300';
      default: return 'from-slate-800 to-slate-900 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Proactive vs Reactive Decision Paradigm */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-[#111827] to-cyan-950/40 p-6 rounded-2xl border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Proactive Decision Engine
              </span>
              <span className="text-xs text-slate-400">Commission for Air Quality Management (CAQM)</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-2">
              Proactive Graded Response Action Plan (GRAP) Dashboard
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Traditional CAQM triggers are reactive, waiting for 24h AQI averages to cross thresholds. Our platform forecasts spikes 48h ahead to trigger pre-emptive dust suppression, transport bans, and industrial curbs.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 shrink-0 text-center md:text-right">
            <div className="text-xs text-slate-400 uppercase font-semibold">Active AI Recommendation</div>
            <div className="text-xl font-extrabold text-rose-400 mt-1 flex items-center justify-center md:justify-end gap-1.5">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              Stage {grapStatus?.projected_stage_48h || 3} Pre-Emptive Activation
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
              +48 Hours Lead Time Guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* Stage Stepper Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const isSelected = selectedStage === stage.stage_number;
          const isProjected = grapStatus?.projected_stage_48h === stage.stage_number;

          return (
            <button
              key={stage.stage_number}
              onClick={() => setSelectedStage(stage.stage_number)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
                  : 'bg-[#111827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">STAGE {stage.stage_number}</span>
                {isProjected && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                    ⚡ 48h Trigger
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white mt-1.5">{stage.stage_name.split(' - ')[1]}</h4>
              <p className="text-xs text-slate-400 mt-1">{stage.aqi_range}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail & Action Items Checklist */}
      {currentStageInfo && (
        <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">{currentStageInfo.stage_name}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentStageInfo.aqi_range}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{currentStageInfo.summary}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Total SOP Work Orders:</span>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md">
                {currentStageInfo.action_items.length} Assigned
              </span>
            </div>
          </div>

          {/* Departmental SOP Work Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Departmental Standard Operating Procedures (SOPs) & Field Work Orders
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStageInfo.action_items.map((item) => {
                const isDone = dispatchedItems[item.id] || item.status === 'Active';

                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-700/80 text-cyan-300 border border-slate-600">
                          {item.department}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          item.priority === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.priority}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{item.assigned_jurisdiction}</span>
                      
                      <button
                        onClick={() => handleDispatch(item.id)}
                        disabled={isDone}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isDone
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                        {isDone ? 'Dispatched' : 'Dispatch Order'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
