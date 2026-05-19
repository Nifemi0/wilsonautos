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
  navy: { border: 'border-t-[3px] border-t-gray-800', glow: 'bg-gray-50 text-gray-800', text: 'text-gray-900' },
  amber: { border: 'border-t-[3px] border-t-amber-500', glow: 'bg-amber-50 text-amber-600', text: 'text-gray-900' },
  green: { border: 'border-t-[3px] border-t-emerald-500', glow: 'bg-emerald-50 text-emerald-600', text: 'text-gray-900' },
  red:   { border: 'border-t-[3px] border-t-rose-500', glow: 'bg-rose-50 text-rose-600', text: 'text-gray-900' },
}

export default function StatsCard({ label, value, icon, color = 'navy', sub, trend }: StatsCardProps) {
  const t = colorThemes[color]
  return (
    <div className={`bg-white border border-gray-200 ${t.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.glow}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-body font-medium px-2 py-0.5 rounded-md border border-gray-200 bg-gray-50 text-gray-600 flex items-center gap-1">
            <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            {trend}
          </span>
        )}
      </div>
      <p className="font-display font-semibold text-3xl text-gray-900 tracking-tight leading-none mb-1.5">{value}</p>
      <p className="font-body text-xs font-medium text-gray-500 tracking-wide">{label}</p>
      {sub && <p className="font-body text-[11px] text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

