import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Flame, Wind, MapPin, Eye, Filter, Info, ShieldCheck, Activity, Layers } from 'lucide-react';

// Fix leaflet icon default assets
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper for AQI colors
const getAQIColor = (aqi) => {
  if (aqi <= 50) return '#10b981'; // Good
  if (aqi <= 100) return '#84cc16'; // Satisfactory
  if (aqi <= 200) return '#eab308'; // Moderate
  if (aqi <= 300) return '#f97316'; // Poor
  if (aqi <= 400) return '#ef4444'; // Very Poor
  return '#a855f7'; // Severe / Severe+
};

// Custom HTML DivIcon for Stations
const createStationIcon = (station) => {
  const bg = getAQIColor(station.aqi);
  return L.divIcon({
    className: 'custom-station-pin',
    html: `
      <div style="
        background: ${bg};
        color: #fff;
        font-weight: 800;
        font-size: 11px;
        padding: 3px 7px;
        border-radius: 9999px;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
      ">
        <span>${station.aqi}</span>
      </div>
    `,
    iconSize: [40, 22],
    iconAnchor: [20, 11]
  });
};

// Custom HTML DivIcon for NASA FIRMS Fire Hotspots
const createFireIcon = (frp) => {
  const size = Math.min(36, Math.max(20, frp * 0.28));
  return L.divIcon({
    className: 'custom-fire-pin',
    html: `
      <div style="
        background: radial-gradient(circle, #f97316 20%, #dc2626 80%);
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid #ffedd5;
        box-shadow: 0 0 16px #ef4444;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="color: #fff; font-size: 10px; font-weight: bold;">🔥</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

export default function MapView({ stations = [], hotspots = [], hotspotSummary, onSelectStation }) {
  const [showFires, setShowFires] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showPlumeCone, setShowPlumeCone] = useState(true);
  const [showWindVectors, setShowWindVectors] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Default focus center: Haryana-Punjab-Delhi intersection
  const center = [29.65, 76.5];

  // Simulated wind trajectory streamlines from Punjab to Delhi NCR
  const windStreamlines = [
    [[31.1, 75.2], [30.5, 75.9], [29.8, 76.6], [28.65, 77.2]], // Main Amritsar/Ludhiana -> Delhi corridor
    [[30.8, 74.8], [30.1, 75.5], [29.4, 76.3], [28.5, 77.1]], // Bathinda -> Rohtak -> South Delhi
    [[31.4, 75.5], [30.7, 76.2], [30.0, 76.9], [28.7, 77.3]], // Jalandhar -> Patiala -> Karnal -> East Delhi
  ];

  // Stubble burning smoke transport cone coordinates
  const plumeConeCoords = [
    [31.3, 74.5], // Punjab West
    [31.4, 76.2], // Punjab East
    [28.4, 77.5], // Delhi East
    [28.3, 76.8], // Delhi West
  ];

  return (
    <div className="relative w-full h-[680px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0b0f19]">
      
      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap items-center gap-2 bg-[#111827]/90 backdrop-blur-md p-2 rounded-xl border border-slate-700 shadow-xl">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 px-2">
          <Layers className="w-3.5 h-3.5 text-emerald-400" /> Layers:
        </span>

        <button
          onClick={() => setShowStations(!showStations)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            showStations ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> AQI Stations ({stations.length})
        </button>

        <button
          onClick={() => setShowFires(!showFires)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            showFires ? 'bg-rose-600 text-white shadow-sm animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5" /> NASA FIRMS Fires ({hotspots.length})
        </button>

        <button
          onClick={() => setShowWindVectors(!showWindVectors)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            showWindVectors ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wind className="w-3.5 h-3.5" /> Wind Streamlines (NW 315°)
        </button>

        <button
          onClick={() => setShowPlumeCone(!showPlumeCone)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            showPlumeCone ? 'bg-amber-600/80 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Smoke Plume Cone
        </button>
      </div>

      {/* Legend & Summary Card Overlay (Top Right) */}
      <div className="absolute top-4 right-4 z-[1000] hidden md:block bg-[#111827]/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl max-w-xs text-xs">
        <h4 className="font-bold text-slate-200 flex items-center justify-between border-b border-slate-700/80 pb-1.5 mb-2">
          <span>Regional AQI Legend</span>
          <span className="text-[10px] text-slate-400">CPCB Standards</span>
        </h4>
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span><span>Good (0-50)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span><span>Moderate (101-200)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span><span>Poor (201-300)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span><span>Very Poor (301-400)</span></div>
          <div className="flex items-center gap-1.5 col-span-2"><span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]"></span><span>Severe / Emergency (401-500+)</span></div>
        </div>

        {hotspotSummary && (
          <div className="mt-2.5 pt-2 border-t border-slate-700/80 text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Fire FRP:</span>
              <span className="font-bold text-rose-400">{hotspotSummary.total_frp_mw} MW</span>
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-slate-400">Peak Fire Cluster:</span>
              <span className="font-semibold text-amber-300">{hotspotSummary.highest_frp_district}</span>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet Map Component */}
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        {/* CartoDB Dark Matter base tile */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Smoke Plume Dispersion Cone */}
        {showPlumeCone && (
          <Polyline
            positions={plumeConeCoords}
            pathOptions={{
              color: '#f97316',
              fillColor: '#ea580c',
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: '6, 6'
            }}
          />
        )}

        {/* Animated Wind Streamlines */}
        {showWindVectors && windStreamlines.map((line, idx) => (
          <Polyline
            key={`wind-${idx}`}
            positions={line}
            pathOptions={{
              color: '#06b6d4',
              weight: 3,
              opacity: 0.75,
              dashArray: '10, 14',
            }}
          />
        ))}

        {/* NASA FIRMS Active Fire Hotspots */}
        {showFires && hotspots.map((h) => (
          <Marker
            key={h.id}
            position={[h.lat, h.lon]}
            icon={createFireIcon(h.frp_mw)}
            eventHandlers={{
              click: () => {
                setSelectedItem({ type: 'fire', data: h });
              }
            }}
          >
            <Popup>
              <div className="p-1 min-w-[200px] text-slate-100">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold border-b border-slate-700 pb-1 mb-1.5">
                  <Flame className="w-4 h-4" /> Active Farm Fire Hotspot
                </div>
                <div className="text-xs space-y-1">
                  <div><strong>Location:</strong> {h.tehsil}, {h.district} ({h.state})</div>
                  <div><strong>Fire Radiative Power (FRP):</strong> <span className="text-amber-400 font-bold">{h.frp_mw} MW</span></div>
                  <div><strong>Brightness Temp:</strong> {h.brightness_k} K</div>
                  <div><strong>Satellite Sensor:</strong> {h.satellite}</div>
                  <div><strong>Confidence:</strong> {h.confidence}%</div>
                  <div><strong>Biomass Type:</strong> {h.biomass_type}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* CPCB Monitoring Stations */}
        {showStations && stations.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lon]}
            icon={createStationIcon(s)}
            eventHandlers={{
              click: () => {
                setSelectedItem({ type: 'station', data: s });
                if (onSelectStation) onSelectStation(s);
              }
            }}
          >
            <Popup>
              <div className="p-1 min-w-[220px] text-slate-100">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
                  <span className="font-bold text-emerald-400">{s.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded font-extrabold text-white" style={{ background: getAQIColor(s.aqi) }}>
                    AQI {s.aqi}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <div><strong>Category:</strong> {s.category}</div>
                  <div><strong>PM2.5:</strong> <span className="text-rose-400 font-bold">{s.pm25} µg/m³</span> | <strong>PM10:</strong> {s.pm10} µg/m³</div>
                  <div><strong>Wind:</strong> {s.wind_speed_kmh} km/h from {s.wind_dir_deg}° (NW)</div>
                  <div><strong>Temp / Humidity:</strong> {s.temp_c}°C / {s.humidity_pct}%</div>
                  <div className="mt-2 pt-1 border-t border-slate-700/80">
                    <strong>Source Attribution:</strong>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
                      <span className="text-amber-400">🔥 Stubble: {s.source_attribution.stubble}%</span>
                      <span className="text-cyan-400">🚗 Vehicular: {s.source_attribution.vehicular}%</span>
                      <span className="text-yellow-300">🏗️ Dust: {s.source_attribution.dust}%</span>
                      <span className="text-purple-400">🏭 Industry: {s.source_attribution.industrial}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Detail Inspector Drawer (Bottom Left) */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-[#111827]/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl max-w-sm w-full text-xs animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <span className="font-bold text-white text-sm flex items-center gap-1.5">
              {selectedItem.type === 'station' ? <MapPin className="w-4 h-4 text-emerald-400" /> : <Flame className="w-4 h-4 text-rose-400" />}
              {selectedItem.type === 'station' ? selectedItem.data.name : `${selectedItem.data.district} Fire (${selectedItem.data.tehsil})`}
            </span>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          {selectedItem.type === 'station' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Air Quality Index (AQI):</span>
                <span className="text-base font-extrabold" style={{ color: getAQIColor(selectedItem.data.aqi) }}>
                  {selectedItem.data.aqi} ({selectedItem.data.category})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-slate-800/60 p-2 rounded-lg text-[11px]">
                <div>PM2.5: <span className="font-bold text-white">{selectedItem.data.pm25} µg/m³</span></div>
                <div>PM10: <span className="font-bold text-white">{selectedItem.data.pm10} µg/m³</span></div>
                <div>NO₂: <span className="font-bold text-white">{selectedItem.data.no2} ppb</span></div>
                <div>SO₂: <span className="font-bold text-white">{selectedItem.data.so2} ppb</span></div>
              </div>
              <div className="text-[11px] text-slate-300">
                <span className="text-slate-400">Stubble Smoke Impact:</span>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: `${selectedItem.data.source_attribution.stubble}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Farm Stubble: {selectedItem.data.source_attribution.stubble}%</span>
                  <span>Vehicular/Other: {100 - selectedItem.data.source_attribution.stubble}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-400">Fire Radiative Power:</span>
                <span className="text-rose-400 font-extrabold text-sm">{selectedItem.data.frp_mw} MW</span>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-lg text-[11px] space-y-1">
                <div>Satellite: {selectedItem.data.satellite}</div>
                <div>Detection Confidence: {selectedItem.data.confidence}%</div>
                <div>Acquisition Time: {selectedItem.data.acq_date} {selectedItem.data.acq_time}</div>
                <div>Tehsil / Block: {selectedItem.data.tehsil}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
