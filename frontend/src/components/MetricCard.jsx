import React from 'react';

export default function MetricCard({ title, value, unit, subtitle, icon: Icon, color = 'emerald', trend, badge }) {
  const colorMap = {
    emerald: 'from-emerald-500/10 to-teal-500/5 text-emerald-400 border-emerald-500/20',
    amber: 'from-amber-500/10 to-yellow-500/5 text-amber-400 border-amber-500/20',
    rose: 'from-rose-500/10 to-red-500/5 text-rose-400 border-rose-500/20',
    purple: 'from-purple-500/10 to-fuchsia-500/5 text-purple-400 border-purple-500/20',
    cyan: 'from-cyan-500/10 to-blue-500/5 text-cyan-400 border-cyan-500/20',
    orange: 'from-orange-500/10 to-amber-500/5 text-orange-400 border-orange-500/20',
  };

  const activeColor = colorMap[color] || colorMap.emerald;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b ${activeColor} bg-[#111827] border p-5 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-slate-600`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white">{value}</span>
            {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 shadow-inner`}>
          {Icon && <Icon className="w-5 h-5 text-inherit" />}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
        <span className="text-slate-400">{subtitle}</span>
        {badge && (
          <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
            {badge}
          </span>
        )}
        {trend && (
          <span className={`font-semibold ${trend.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
