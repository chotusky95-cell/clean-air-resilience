import React, { useState } from 'react';
import { 
  Milestone, Calendar, CheckCircle2, Clock, 
  Sparkles, Target, TrendingUp, Layers, Users, Zap
} from 'lucide-react';

export default function RoadmapTimeline() {
  const [activePhase, setActivePhase] = useState('ALL');

  const phases = [
    {
      id: "phase_1",
      tag: "NEAR-TERM",
      period: "0 – 1 Month",
      title: "Pilot in High-Impact Districts & Hyperlocal Fusion",
      progress: 92,
      status: "CURRENTLY ACTIVE (PILOT)",
      color: "emerald",
      milestones: [
        { title: "Pilot in high-impact districts (Sangrur, Dhuri, Ludhiana, Anand Vihar, Jahangirpuri, Bawana)", status: "COMPLETED" },
        { title: "Strengthen multi-source data ingestion (NASA FIRMS VIIRS + CPCB CAAQMS + Open-Meteo)", status: "COMPLETED" },
        { title: "AI/ML Forecasting calibration (HistGradientBoosting with R² = 0.86, MAE = 18.7)", status: "COMPLETED" },
        { title: "Deliver real-time automated alerts & SOP dispatch to stakeholders", status: "IN_PROGRESS" }
      ],
      impact_target: "32% reduction in unmitigated peak emergency days in pilot corridors"
    },
    {
      id: "phase_2",
      tag: "3-MONTH PLAN",
      period: "1 – 3 Months",
      title: "Interstate Expansion, Mobile & WhatsApp Feedback Loop",
      progress: 45,
      status: "SCHEDULED",
      color: "cyan",
      milestones: [
        { title: "Expand monitoring and early warning to 45+ districts across PB, HR, DL, UP, RJ", status: "IN_PROGRESS" },
        { title: "Integrate high-resolution multi-spectral satellite imagery and boundary layer LIDAR", status: "SCHEDULED" },
        { title: "Launch full automated WhatsApp & IVR hotline alert system for farmers and citizens", status: "IN_PROGRESS" },
        { title: "Enable crowdsourced citizen ground-truth verification and community feedback loop", status: "COMPLETED" }
      ],
      impact_target: "100,000+ farmers onboarded with ₹1,200/acre bio-decomposer grants"
    },
    {
      id: "phase_3",
      tag: "1-YEAR PLAN",
      period: "3 – 12 Months",
      title: "Nationwide Scaling, Federated Learning & Policy Resilience",
      progress: 15,
      status: "STRATEGIC HORIZON",
      color: "purple",
      milestones: [
        { title: "Nationwide Indo-Gangetic Plains scaling with privacy-preserving Federated Learning (FedAvg)", status: "IN_PROGRESS" },
        { title: "Executive Decision Policy Dashboards with live economic & health ROI calculation", status: "COMPLETED" },
        { title: "Rigorous longitudinal impact measurement & reduction of severe pollution episodes", status: "SCHEDULED" },
        { title: "Drive long-term agricultural CRM behavior change and regional climate resilience", status: "SCHEDULED" }
      ],
      impact_target: "Avert 44,000+ premature mortalities and save $12B+ in national healthcare burden"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/40 via-darkCard to-blue-950/30 border border-teal-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-teal-500/30">
              <Milestone className="w-3.5 h-3.5" />
              Strategic Implementation (Slide 5)
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Our Vision Forward: Impact & Roadmap
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Driving cleaner air, smarter decisions, and healthier communities—together. A phased plan to scale impact and empower multi-stakeholder action.
            </p>
          </div>

          <div className="text-right bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Overarching Mission:</span>
            <div className="text-sm font-extrabold text-teal-300 mt-0.5">
              "Cleaner Air. Stronger Communities. Smarter Tomorrow."
            </div>
          </div>
        </div>
      </div>

      {/* 3 Phased Roadmap Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <div 
            key={phase.id}
            className={`bg-darkCard border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all ${
              phase.color === 'emerald' ? 'border-emerald-500/40' : (phase.color === 'cyan' ? 'border-cyan-500/30' : 'border-purple-500/30')
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  phase.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                  (phase.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30')
                }`}>
                  {phase.tag}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {phase.period}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{phase.title}</h3>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Phase Progress:</span>
                    <span className="font-bold text-white">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${
                        phase.color === 'emerald' ? 'bg-emerald-500' : (phase.color === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500')
                      }`} 
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Deliverables:</span>
                {phase.milestones.map((ms, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    {ms.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : ms.status === 'IN_PROGRESS' ? (
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0 mt-0.5"></div>
                    )}
                    <span className={ms.status === 'COMPLETED' ? 'text-slate-200' : 'text-slate-400'}>
                      {ms.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Target */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Targeted Outcome:</span>
              <p className="text-teal-300 font-medium mt-0.5">{phase.impact_target}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Recognition Footer (Slide 1 & 5) */}
      <div className="bg-darkCard border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-slate-400 font-medium">Developed for Google Developer Groups (GDG) on Campus Hackathon</span>
          <div className="text-white font-bold text-sm">
            Team Bharat Innovates — Rungta College of Engineering and Technology (RCET), Bhilai
          </div>
          <p className="text-slate-400">
            Aditya Raj (Team Leader), Nitin Kumar Jha, Ayush Kumar
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase">Architecture:</span>
            <div className="font-bold text-emerald-400">Federated & Open-Source</div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Geographical Focus:</span>
            <div className="font-bold text-cyan-400">Delhi NCR & Indo-Gangetic Plains</div>
          </div>
        </div>
      </div>
    </div>
  );
}
