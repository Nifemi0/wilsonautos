import React from 'react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  color?: 'navy' | 'amber' | 'green' | 'red'
  sub?: string
  trend?: string
}

const colorThemes = {
  navy: { border: 'border-t-4 border-t-[#1E2030]', glow: 'bg-[#1E2030]/5 text-[#1E2030]', text: 'text-[#1E2030]' },
  amber: { border: 'border-t-4 border-t-[#F59E0B]', glow: 'bg-[#F59E0B]/10 text-[#D97706]', text: 'text-[#1E2030]' },
  green: { border: 'border-t-4 border-t-emerald-500', glow: 'bg-emerald-50 text-emerald-600', text: 'text-[#1E2030]' },
  red:   { border: 'border-t-4 border-t-rose-500', glow: 'bg-rose-50 text-rose-600', text: 'text-[#1E2030]' },
}

export default function StatsCard({ label, value, icon, color = 'navy', sub, trend }: StatsCardProps) {
  const t = colorThemes[color]
  return (
    <div className={`bg-white/90 backdrop-blur-md border border-gray-100 ${t.border} rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.035)] hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.glow}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-body font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center gap-1">
            <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            {trend}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-3.5xl text-[#1E2030] tracking-tight leading-none mb-1.5">{value}</p>
      <p className="font-body text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      {sub && <p className="font-body text-[11px] text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

