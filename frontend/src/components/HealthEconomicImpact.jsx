import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, DollarSign, Users, AlertTriangle, ShieldCheck, 
  TrendingDown, Activity, Sparkles, HelpCircle, ArrowRight
} from 'lucide-react';
import { fetchMacroHealthStakes, fetchDistrictVulnerabilities, calculateLiveBenefits } from '../services/api';

export default function HealthEconomicImpact() {
  const [macroStakes, setMacroStakes] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [currentAqi, setCurrentAqi] = useState(385);
  const [reductionPct, setReductionPct] = useState(35);
  const [liveBenefits, setLiveBenefits] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateBenefits();
  }, [currentAqi, reductionPct]);

  const loadData = async () => {
    const [stakes, vulns] = await Promise.all([
      fetchMacroHealthStakes(),
      fetchDistrictVulnerabilities()
    ]);
    setMacroStakes(stakes);
    setVulnerabilities(vulns);
  };

  const updateBenefits = async () => {
    const benefits = await calculateLiveBenefits(currentAqi, reductionPct);
    setLiveBenefits(benefits);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-darkCard to-amber-950/30 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-rose-500/30">
              <HeartPulse className="w-3.5 h-3.5" />
              Epidemiological & Fiscal Stakeholder Impact
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Health & Economic Burden Assessment
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Quantifying the life-and-death stakes cited in our presentation (IHME GBD 2019, World Bank, Lelieveld et al.) and simulating real-time DALYs and healthcare crores saved under proactive interventions.
            </p>
          </div>
        </div>
      </div>

      {/* Macro Stakes 4-Card Grid (Slide 2) */}
      {macroStakes && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-darkCard border border-rose-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">National Deaths / Year</span>
              <HeartPulse className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-rose-400 mt-2">1.67 Million</div>
            <p className="text-xs text-slate-400 mt-1">~18% of all national deaths in India</p>
            <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: IHME GBD (2019)</span>
          </div>

          <div className="bg-darkCard border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Health Burden / Year</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-400 mt-2">$36.8 Billion</div>
            <p className="text-xs text-slate-400 mt-1">1.36% of India's annual GDP</p>
            <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: World Bank (2019)</span>
          </div>

          <div className="bg-darkCard border border-purple-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Productivity Losses</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-purple-400 mt-2">$95.0 Billion</div>
            <p className="text-xs text-slate-400 mt-1">Due to lost workdays & illnesses</p>
            <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: World Bank (2019)</span>
          </div>

          <div className="bg-darkCard border border-cyan-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Crop-Residue Burning</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-2">44k – 98k</div>
            <p className="text-xs text-slate-400 mt-1">Premature deaths/yr tied to stubble</p>
            <span className="text-[10px] text-slate-500 font-mono block mt-2">Lelieveld et al. (ERL 2015)</span>
          </div>
        </div>
      )}

      {/* Interactive Live Benefits Calculator */}
      <div className="bg-darkCard border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Live Human & Fiscal Benefit Calculator (Under Active GRAP Actions)
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400">Epidemiological Dose-Response Model</span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Baseline Ambient AQI:</span>
              <span className="text-rose-400 font-bold">{currentAqi} AQI ({currentAqi >= 401 ? 'Severe+' : 'Very Poor'})</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="500" 
              value={currentAqi} 
              onChange={(e) => setCurrentAqi(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Target Mitigation Reduction %:</span>
              <span className="text-emerald-400 font-bold">{reductionPct}% Reduction</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="60" 
              value={reductionPct} 
              onChange={(e) => setReductionPct(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Metrics */}
        {liveBenefits && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Predicted AQI Drop</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                -{liveBenefits.predicted_aqi_reduction} pts
              </div>
              <span className="text-[10px] text-slate-400">Resulting AQI: {Math.round(currentAqi - liveBenefits.predicted_aqi_reduction)}</span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Lives Saved Today</span>
              <div className="text-2xl font-extrabold text-cyan-400 mt-1">
                +{liveBenefits.premature_mortalities_averted_today} Lives
              </div>
              <span className="text-[10px] text-cyan-400">NCR Population Cohort</span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">DALYs Averted</span>
              <div className="text-2xl font-extrabold text-purple-400 mt-1">
                +{liveBenefits.dalys_averted_today} DALYs
              </div>
              <span className="text-[10px] text-purple-400">Disability-Adjusted Years</span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Hospital Costs Saved</span>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">
                ₹{liveBenefits.hospitalization_costs_saved_inr_crores} Cr
              </div>
              <span className="text-[10px] text-amber-400">Daily Medical Savings</span>
            </div>
          </div>
        )}
      </div>

      {/* District-Wise Vulnerability Ratings */}
      <div className="bg-darkCard border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Hyperlocal District Health Vulnerability Scorecard
            </h2>
          </div>
          <span className="text-xs text-slate-400">Populations at Elevated Respiratory & Cardiac Risk</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vulnerabilities.map((vuln, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{vuln.district_name}</h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {vuln.state}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Population: {vuln.population.toLocaleString()}</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    vuln.vulnerability_index >= 0.9 ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    Risk Index: {Math.round(vuln.vulnerability_index * 100)}%
                  </span>
                </div>

                <div className="bg-black/30 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-slate-400 block text-[10px] uppercase">Primary Driver:</strong>
                  {vuln.primary_risk_driver}
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Respiratory Admission Surge:</span>
                    <strong className="text-rose-400">+{vuln.respiratory_admission_surge_pct}%</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Pediatric Asthma Risk:</span>
                    <strong className="text-amber-400">{vuln.pediatric_asthma_risk_level}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-400 font-bold block mb-0.5">Clinical Advisory:</span>
                {vuln.elderly_copd_advisory}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
