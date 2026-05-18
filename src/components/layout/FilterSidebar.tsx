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
      <h3 className="font-display font-semibold text-[#1E2030] text-xs mb-3 uppercase tracking-wider">{label}</h3>
      {children}
    </div>
  )

  const RadioGroup = ({
    name, options, value, fieldKey,
  }: { name: string; options: { value: string; label: string }[]; value: string; fieldKey: keyof FilterState }) => (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={e => onChange(fieldKey, e.target.value)}
            className="w-4 h-4 accent-[#F59E0B]"
          />
          <span className="font-body text-sm text-gray-600 group-hover:text-[#1E2030] transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  )

  return (
    <aside className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-[#1E2030] text-xl">Filters</h2>
        <button onClick={onReset} className="text-[#F59E0B] font-body text-sm font-medium hover:underline">
          Reset All
        </button>
      </div>

      {/* Make */}
      <Field label="Make">
        <select
          id="filter-make"
          value={filters.make}
          onChange={e => onChange('make', e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-[#1E2030] focus:outline-none focus:border-[#F59E0B] bg-white"
        >
          <option value="">All Makes</option>
          {makes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </Field>

      {/* Body Type */}
      <Field label="Body Type">
        <div className="space-y-2">
          {bodyTypeOptions.map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.bodyType.includes(type)}
                onChange={() => toggleBodyType(type)}
                className="w-4 h-4 rounded accent-[#F59E0B]"
              />
              <span className="font-body text-sm text-gray-600 capitalize group-hover:text-[#1E2030] transition-colors">{type}</span>
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
        <div className="grid grid-cols-2 gap-2">
          {(['priceMin', 'priceMax'] as const).map((key, i) => (
            <div key={key}>
              <label className="text-xs text-gray-400 font-body block mb-1">{i === 0 ? 'Min' : 'Max'}</label>
              <input
                type="number"
                id={`filter-${key}`}
                placeholder={i === 0 ? '0' : 'Any'}
                value={filters[key]}
                onChange={e => onChange(key, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 font-body text-sm focus:outline-none focus:border-[#F59E0B]"
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
        <div className="grid grid-cols-2 gap-2">
          {(['yearMin', 'yearMax'] as const).map((key, i) => (
            <div key={key}>
              <label className="text-xs text-gray-400 font-body block mb-1">{i === 0 ? 'From' : 'To'}</label>
              <input
                type="number"
                id={`filter-${key}`}
                placeholder={i === 0 ? '2015' : '2024'}
                value={filters[key]}
                onChange={e => onChange(key, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 font-body text-sm focus:outline-none focus:border-[#F59E0B]"
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
          className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2030] font-display font-bold py-3.5 rounded-xl transition-colors"
        >
          Apply Filters
        </button>
      )}
    </aside>
  )
}
