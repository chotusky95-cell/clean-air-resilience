import React, { useState, useEffect } from 'react';
import { 
  Key, 
  ShieldCheck, 
  Copy, 
  Check, 
  Plus, 
  Server, 
  Terminal, 
  Globe, 
  ExternalLink, 
  AlertCircle,
  Lock,
  Cpu
} from 'lucide-react';
import { 
  fetchApiKeys, 
  generateNewApiKey, 
  validateKey, 
  fetchExternalProviders,
  getClientApiKey,
  setClientApiKey
} from '../services/api';

export default function ApiKeyPortal() {
  const [keys, setKeys] = useState([]);
  const [providers, setProviders] = useState([]);
  const [activeKey, setActiveKey] = useState(getClientApiKey());
  const [keyValidation, setKeyValidation] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  
  // New Key Form State
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState('STATE_AGENCY');
  const [newKeyRpm, setNewKeyRpm] = useState(180);
  const [generating, setGenerating] = useState(false);

  const loadAuthData = async () => {
    const [allKeys, allProviders] = await Promise.all([
      fetchApiKeys(),
      fetchExternalProviders()
    ]);
    setKeys(allKeys);
    setProviders(allProviders);
    
    // Validate current active key
    const val = await validateKey(activeKey);
    setKeyValidation(val);
  };

  useEffect(() => {
    loadAuthData();
  }, [activeKey]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectActiveKey = (keyStr) => {
    setActiveKey(keyStr);
    setClientApiKey(keyStr);
  };

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!newKeyName) return;
    setGenerating(true);
    const created = await generateNewApiKey(newKeyName, newKeyRole, Number(newKeyRpm));
    if (created) {
      setKeys(prev => [created, ...prev]);
      setNewKeyName('');
      handleSelectActiveKey(created.key);
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> API Key Server & Developer Gateway
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-2">
            API Authentication, Rate Quotas & External Provider Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Secure REST access for State Pollution Control Boards, Municipal Enforcement Units, and Research Partners. Generate scoped API keys with rate-limiting and audit telemetry.
          </p>
        </div>

        <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <div className="text-xs">
            <span className="text-slate-400 block">Active Auth Header:</span>
            <span className="font-mono text-emerald-400 font-bold">{activeKey.slice(0, 18)}...</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Generate API Key Form */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="w-4 h-4 text-emerald-400" /> Issue New Scoped API Key
          </h3>

          <form onSubmit={handleCreateKey} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Key Name / Client Organization</label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Delhi Traffic Police Enforcement Unit"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Role & Authorization Level</label>
              <select
                value={newKeyRole}
                onChange={(e) => setNewKeyRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500"
              >
                <option value="STATE_AGENCY">STATE_AGENCY (PPCB / DPCC / HSPCB)</option>
                <option value="ADMIN">ADMIN (CAQM Full Control)</option>
                <option value="MUNICIPAL_OFFICER">MUNICIPAL_OFFICER (MCD / PWD)</option>
                <option value="RESEARCHER">RESEARCHER (Academic / Non-profit)</option>
                <option value="PUBLIC">PUBLIC (Rate-limited citizen)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Rate Limit Quota (Requests / Minute)</label>
              <input
                type="number"
                min="10"
                max="1200"
                value={newKeyRpm}
                onChange={(e) => setNewKeyRpm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> {generating ? 'Generating Token...' : 'Generate API Key'}
            </button>
          </form>

          {/* Key Validation Card */}
          {keyValidation && (
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              keyValidation.is_valid
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{keyValidation.message}</span>
              </div>
              {keyValidation.is_valid && (
                <div className="text-[11px] text-slate-300 flex justify-between pt-1">
                  <span>Quota: {keyValidation.rate_limit_rpm} req/min</span>
                  <span>Active Role: <strong className="text-white">{keyValidation.role}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 2 Columns: Active Key Vault & External Data Providers */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Keys Table / Cards */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> Active API Keys Vault
              </span>
              <span className="text-xs text-slate-400 font-normal">{keys.length} Registered Keys</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {keys.map((k) => {
                const isSelected = activeKey === k.key;
                return (
                  <div
                    key={k.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/30'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{k.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-cyan-300 border border-slate-600">
                            {k.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 font-mono text-xs text-slate-300">
                          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700 select-all">
                            {k.key}
                          </span>
                          <button
                            onClick={() => handleCopy(k.key, k.id)}
                            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700"
                            title="Copy API Key"
                          >
                            {copiedKey === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleSelectActiveKey(k.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600'
                          }`}
                        >
                          {isSelected ? 'Active Key' : 'Use This Key'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Rate Limit: <strong className="text-white">{k.rate_limit_rpm} req/min</strong></span>
                      <span>Total Requests: <strong className="text-emerald-400">{k.total_requests_made}</strong></span>
                      <span>Issued: {k.created_at}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* External Data Provider Tokens Status */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              External Data Provider Gateway Integrations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {providers.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate max-w-[200px]">{p.provider_name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Connected
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">{p.status}</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">{p.endpoint_url}</div>
                  <div className="text-[10px] text-cyan-400 font-medium pt-1 border-t border-slate-700/50">
                    Quota: {p.rate_limit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Integration Snippet */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Quick Integration Code Snippet (cURL)
            </h3>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto relative">
              <pre className="text-emerald-400">curl -X GET "http://localhost:8000/api/v1/forecast/delhi-ncr" \
  -H "X-API-Key: {activeKey}" \
  -H "Accept: application/json"</pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
