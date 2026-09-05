import React, { useState } from 'react';
import { 
  Share2, 
  Server, 
  Cpu, 
  ShieldCheck, 
  ExternalLink, 
  RefreshCw, 
  Code2, 
  CheckCircle2, 
  Database,
  Lock 
} from 'lucide-react';
import { triggerFederatedAggregate } from '../services/api';

export default function FederatedHub({ nodes = [] }) {
  const [aggregationResult, setAggregationResult] = useState(null);
  const [aggregating, setAggregating] = useState(false);

  const handleAggregate = async () => {
    setAggregating(true);
    const result = await triggerFederatedAggregate();
    setAggregationResult(result);
    setAggregating(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Privacy-Preserving Collaborative AI
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-2">
            Federated Learning Hub & Multi-State OpenAPI Interoperability
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            States (Punjab, Haryana, Delhi, Uttar Pradesh) train local Gradient Boosting models on regional telemetry. Only mathematical gradient weights are exchanged—no sensitive raw sensor or industrial emissions data is shared across state borders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-md transition-all"
          >
            <Code2 className="w-4 h-4 text-emerald-400" /> Interactive OpenAPI (/docs)
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={handleAggregate}
            disabled={aggregating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${aggregating ? 'animate-spin' : ''}`} />
            {aggregating ? 'Aggregating...' : 'Trigger FedAvg Aggregation'}
          </button>
        </div>
      </div>

      {/* Aggregation Result Alert */}
      {aggregationResult && (
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#111827] to-cyan-950/60 p-5 rounded-2xl border border-emerald-500/40 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">
                Federated Averaging Round #{aggregationResult.round_number} Successfully Completed
              </h4>
            </div>
            <span className="text-xs font-mono text-cyan-300">{aggregationResult.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-slate-400">Global Model Version</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{aggregationResult.global_model_version}</div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-slate-400">Accuracy Gain Across States</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">+{aggregationResult.accuracy_gain_pct}%</div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-slate-400">Privacy Mechanism</div>
              <div className="text-xs font-semibold text-cyan-300 mt-0.5 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Differential Privacy (ε=0.5)
              </div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-slate-400">Raw Data Shared</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">
                NO (100% On-Premises Privacy)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 State Nodes Cards Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" /> Participating State Edge Nodes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodes.map((node) => (
            <div
              key={node.node_id}
              className="bg-[#111827] p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {node.node_id}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{node.state_or_agency}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{node.jurisdiction}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Sensors Deployed:</span>
                  <span className="font-bold text-white">{node.active_sensors_count}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Local Samples Trained:</span>
                  <span className="font-bold text-white font-mono">{node.local_samples_trained.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Gradient Norm (L2):</span>
                  <span className="font-mono text-emerald-400 font-semibold">{node.gradient_norm}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Node Status:</span>
                  <span className="text-[11px] font-semibold text-emerald-400">{node.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OpenAPI Endpoint Interoperability Contract Box */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          Standardized OpenAPI 3.0 Interoperability Contract
        </h3>
        <p className="text-xs text-slate-300">
          State pollution control boards (CPCB, DPCC, PPCB, HSPCB) can integrate their automated decision-making pipelines against these public REST endpoints:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70">
            <span className="text-emerald-400 font-bold">GET</span> /api/v1/stations
            <p className="text-[10px] text-slate-400 font-sans mt-1">Live ground sensor metrics & source attribution</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70">
            <span className="text-emerald-400 font-bold">GET</span> /api/v1/forecast/delhi-ncr
            <p className="text-[10px] text-slate-400 font-sans mt-1">72-hour hyperlocal AQI predictions & confidence bands</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70">
            <span className="text-cyan-400 font-bold">POST</span> /api/v1/simulator/simulate
            <p className="text-[10px] text-slate-400 font-sans mt-1">Policy intervention calculation & health impact assessment</p>
          </div>
        </div>
      </div>

    </div>
  );
}
