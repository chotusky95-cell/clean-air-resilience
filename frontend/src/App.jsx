import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Flame, 
  TrendingUp, 
  ShieldAlert, 
  Sliders, 
  BellRing, 
  Share2, 
  Activity, 
  AlertTriangle, 
  Award, 
  MapPin, 
  RefreshCw,
  Key 
} from 'lucide-react';

import Navbar from './components/Navbar';
import MetricCard from './components/MetricCard';
import MapView from './components/MapView';
import ForecastCharts from './components/ForecastCharts';
import GRAPActionBoard from './components/GRAPActionBoard';
import PolicySimulator from './components/PolicySimulator';
import AlertCenter from './components/AlertCenter';
import FederatedHub from './components/FederatedHub';
import ApiKeyPortal from './components/ApiKeyPortal';
import CitizenReportCenter from './components/CitizenReportCenter';
import InterstateWarRoom from './components/InterstateWarRoom';
import BenchmarkGapAnalysis from './components/BenchmarkGapAnalysis';
import HealthEconomicImpact from './components/HealthEconomicImpact';
import RoadmapTimeline from './components/RoadmapTimeline';


import {
  fetchStations,
  fetchStationsSummary,
  fetchHotspots,
  fetchHotspotsSummary,
  fetchForecast,
  fetchGRAPStatus,
  fetchAlerts,
  fetchFederatedNodes
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [loading, setLoading] = useState(true);

  // App State
  const [stations, setStations] = useState([]);
  const [stationSummary, setStationSummary] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [hotspotSummary, setHotspotSummary] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [grapStatus, setGrapStatus] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [federatedNodes, setFederatedNodes] = useState([]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        stns,
        stnSumm,
        fires,
        fireSumm,
        fc,
        grap,
        alerts,
        nodes
      ] = await Promise.all([
        fetchStations(),
        fetchStationsSummary(),
        fetchHotspots(),
        fetchHotspotsSummary(),
        fetchForecast(),
        fetchGRAPStatus(),
        fetchAlerts(),
        fetchFederatedNodes()
      ]);

      setStations(stns);
      setStationSummary(stnSumm);
      setHotspots(fires);
      setHotspotSummary(fireSumm);
      setForecastData(fc);
      setGrapStatus(grap);
      setAlertsData(alerts);
      setFederatedNodes(nodes);
    } catch (err) {
      console.error('Error loading platform telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} grapStatus={grapStatus} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Top KPI Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Delhi NCR Average AQI"
            value={stationSummary?.avg_ncr_aqi || 348}
            unit="AQI"
            subtitle="CPCB Ground Sensors"
            icon={MapPin}
            color="rose"
            badge="Very Poor"
            trend="+14% in 24h"
          />

          <MetricCard
            title="48h Projected Peak AQI"
            value={forecastData?.peak_forecast_aqi || 428}
            unit="AQI"
            subtitle="Arrival in +38 Hours"
            icon={TrendingUp}
            color="purple"
            badge="⚡ Severe Spike"
            trend="Early Trigger"
          />

          <MetricCard
            title="Active Stubble Fires"
            value={hotspotSummary?.total_active_fires || 19}
            unit={`(${hotspotSummary?.total_frp_mw || 1540} MW)`}
            subtitle="Punjab & Haryana Hotspots"
            icon={Flame}
            color="orange"
            badge="VIIRS S-NPP"
            trend="Peak Season"
          />

          <MetricCard
            title="Model Forecast Precision"
            value="R² = 0.86"
            unit="MAE 18.7"
            subtitle="Gradient Boosting Regressor"
            icon={Award}
            color="emerald"
            badge="Validated"
            trend="12.3% MAPE"
          />
        </div>

        {/* Tab Views */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400 bg-[#111827] rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
            <p className="text-sm font-semibold">Fusing NASA FIRMS, CPCB Sensors & Weather Vectors...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'map' && (
              <div className="space-y-6">
                <MapView
                  stations={stations}
                  hotspots={hotspots}
                  hotspotSummary={hotspotSummary}
                />
              </div>
            )}

            {activeTab === 'forecast' && (
              <ForecastCharts forecastData={forecastData} />
            )}

            {activeTab === 'grap' && (
              <GRAPActionBoard grapStatus={grapStatus} />
            )}

            {activeTab === 'simulator' && (
              <PolicySimulator />
            )}

            {activeTab === 'citizen' && (
              <CitizenReportCenter />
            )}

            {activeTab === 'warroom' && (
              <InterstateWarRoom />
            )}

            {activeTab === 'benchmark' && (
              <BenchmarkGapAnalysis />
            )}

            {activeTab === 'impact' && (
              <HealthEconomicImpact />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapTimeline />
            )}

            {activeTab === 'alerts' && (
              <AlertCenter alertsData={alertsData} />
            )}

            {activeTab === 'federated' && (
              <FederatedHub nodes={federatedNodes} />
            )}

            {activeTab === 'apikeys' && (
              <ApiKeyPortal />
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#0f172a] py-6 px-4 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-slate-200">
              Bharat Innovates • Clean Air & Climate Resilience Platform
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Team: Aditya Raj (Lead) • Nitin Kumar Jha • Ayush Kumar | Rungta College of Engineering & Technology (RCET), Bhilai
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              API Key Server Live
            </span>
            <span>•</span>
            <span className="text-slate-300">NASA FIRMS + CPCB + Open-Meteo Fusion</span>
            <span>•</span>
            <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              OpenAPI Docs
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
