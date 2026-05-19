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
  navy: { border: 'border-2 border-[#0A0A0A]', glow: 'bg-transparent text-[#0A0A0A]', text: 'text-[#0A0A0A]' },
  amber: { border: 'border-2 border-[#0A0A0A]', glow: 'bg-transparent text-[#0A0A0A]', text: 'text-[#0A0A0A]' },
  green: { border: 'border-2 border-[#0A0A0A]', glow: 'bg-transparent text-[#0A0A0A]', text: 'text-[#0A0A0A]' },
  red:   { border: 'border-2 border-[#0A0A0A]', glow: 'bg-transparent text-[#0A0A0A]', text: 'text-[#0A0A0A]' },
}

export default function StatsCard({ label, value, icon, color = 'navy', sub, trend }: StatsCardProps) {
  const t = colorThemes[color]
  return (
    <div className={`bg-white border-2 border-[#0A0A0A] rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-none flex items-center justify-center border-2 border-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${t.glow}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-body font-bold px-2.5 py-1 rounded-full border-2 border-[#0A0A0A] bg-white text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            {trend}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-3.5xl text-[#0A0A0A] tracking-tighter uppercase leading-none mb-1.5">{value}</p>
      <p className="font-body text-xs font-bold text-[#404040] uppercase tracking-wider">{label}</p>
      {sub && <p className="font-body text-[11px] text-[#404040] mt-1 font-bold">{sub}</p>}
    </div>
  )
}

