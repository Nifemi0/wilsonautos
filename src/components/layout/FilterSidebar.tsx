'use client'

import { useCallback } from 'react'
import { FilterState } from '@/types'

const makes = ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Hyundai']
const bodyTypeOptions = ['suv', 'sedan', 'pickup', 'hatchback', 'bus', 'coupe']

interface FilterSidebarProps {
  filters: FilterState
  onChange: (key: keyof FilterState, value: string | string[]) => void
  onReset: () => void
  onApply?: () => void
  isDrawer?: boolean
}

export default function FilterSidebar({ filters, onChange, onReset, onApply, isDrawer }: FilterSidebarProps) {
  const toggleBodyType = useCallback((type: string) => {
    const current = filters.bodyType
    onChange('bodyType', current.includes(type) ? current.filter(t => t !== type) : [...current, type])
  }, [filters.bodyType, onChange])

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <h3 className="font-display font-bold text-[#0A0A0A] text-[10px] mb-4 uppercase tracking-widest">{label}</h3>
      {children}
    </div>
  )

  const RadioGroup = ({
    name, options, value, fieldKey,
  }: { name: string; options: { value: string; label: string }[]; value: string; fieldKey: keyof FilterState }) => (
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={e => onChange(fieldKey, e.target.value)}
            className="w-4 h-4 accent-[#0A0A0A]"
          />
          <span className="font-body text-xs font-bold uppercase tracking-widest text-[#404040] group-hover:text-[#0A0A0A] transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  )
  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between border-b-2 border-[#E5E5E5] pb-4 mb-2">
        <h2 className="font-display font-bold text-[#0A0A0A] text-lg uppercase tracking-tight">Parameters</h2>
        <button onClick={onReset} className="text-[#404040] hover:text-[#0A0A0A] font-body text-[10px] font-bold uppercase tracking-widest transition-colors">
          Reset All
        </button>
      </div>

      {/* Make */}
      <Field label="Make">
        <div className="relative">
          <select
            id="filter-make"
            value={filters.make}
            onChange={e => onChange('make', e.target.value)}
            className="w-full appearance-none bg-white border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-3 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">All Marques</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#0A0A0A]">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </Field>

      {/* Body Type */}
      <Field label="Silhouette">
        <div className="space-y-3">
          {bodyTypeOptions.map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.bodyType.includes(type)}
                onChange={() => toggleBodyType(type)}
                className="w-4 h-4 accent-[#0A0A0A]"
              />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#404040] group-hover:text-[#0A0A0A] transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </Field>

      {/* Condition */}
      <Field label="Condition">
        <RadioGroup
          name="condition"
          fieldKey="condition"
          value={filters.condition}
          options={[
            { value: '', label: 'All Conditions' },
            { value: 'tokunbo', label: 'Tokunbo' },
            { value: 'nigerian-used', label: 'Nigerian Used' },
          ]}
        />
      </Field>

      {/* Price */}
      <Field label="Price Range (₦)">
        <div className="grid grid-cols-2 gap-3">
          {(['priceMin', 'priceMax'] as const).map((key, i) => (
            <div key={key}>
              <label className="text-[10px] text-[#404040] font-body font-bold uppercase tracking-widest block mb-2">{i === 0 ? 'Min' : 'Max'}</label>
              <input
                type="number"
                id={`filter-${key}`}
                placeholder={i === 0 ? '0' : 'Any'}
                value={filters[key]}
                onChange={e => onChange(key, e.target.value)}
                className="w-full bg-white border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-3 py-3 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </Field>

      {/* Transmission */}
      <Field label="Transmission">
        <RadioGroup
          name="transmission"
          fieldKey="transmission"
          value={filters.transmission}
          options={[
            { value: '', label: 'All' },
            { value: 'automatic', label: 'Automatic' },
            { value: 'manual', label: 'Manual' },
          ]}
        />
      </Field>

      {/* Fuel */}
      <Field label="Fuel Type">
        <RadioGroup
          name="fuelType"
          fieldKey="fuelType"
          value={filters.fuelType}
          options={[
            { value: '', label: 'All' },
            { value: 'petrol', label: 'Petrol' },
            { value: 'diesel', label: 'Diesel' },
          ]}
        />
      </Field>

      {/* Year */}
      <Field label="Year Range">
        <div className="grid grid-cols-2 gap-3">
          {(['yearMin', 'yearMax'] as const).map((key, i) => (
            <div key={key}>
              <label className="text-[10px] text-[#404040] font-body font-bold uppercase tracking-widest block mb-2">{i === 0 ? 'From' : 'To'}</label>
              <input
                type="number"
                id={`filter-${key}`}
                placeholder={i === 0 ? '2015' : '2024'}
                value={filters[key]}
                onChange={e => onChange(key, e.target.value)}
                className="w-full bg-white border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-3 py-3 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </Field>

      {/* Mobile Apply */}
      {isDrawer && (
        <button
          id="drawer-apply-btn"
          onClick={onApply}
          className="w-full bg-[#0A0A0A] hover:bg-white text-white hover:text-[#0A0A0A] border-2 border-[#0A0A0A] font-body font-bold py-4 text-xs uppercase tracking-widest transition-colors mt-8"
        >
          Apply Parameters
        </button>
      )}
    </aside>
  )
}
