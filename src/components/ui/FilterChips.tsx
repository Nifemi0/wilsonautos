'use client'

import { useCallback } from 'react'
import { FilterState } from '@/types'

interface FilterChipsProps {
  filters: FilterState
  searchQuery: string
  onRemoveFilter: (key: keyof FilterState, value?: string) => void
  onClearSearch: () => void
  onClearAll: () => void
}

const LABEL_MAP: Partial<Record<keyof FilterState, string>> = {
  make: 'Make',
  condition: 'Condition',
  transmission: 'Transmission',
  fuelType: 'Fuel',
  priceMin: 'Min Price',
  priceMax: 'Max Price',
  yearMin: 'From Year',
  yearMax: 'To Year',
}

function formatChipValue(key: keyof FilterState, value: string): string {
  if (key === 'priceMin' || key === 'priceMax') return '₦' + Number(value).toLocaleString('en-NG')
  if (key === 'condition') return value === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function FilterChips({ filters, searchQuery, onRemoveFilter, onClearSearch, onClearAll }: FilterChipsProps) {
  const chips: { label: string; onRemove: () => void }[] = []

  // Search chip
  if (searchQuery.trim().length >= 2) {
    chips.push({ label: `"${searchQuery.trim()}"`, onRemove: onClearSearch })
  }

  // Simple string filters
  const simpleKeys: (keyof FilterState)[] = ['make', 'condition', 'transmission', 'fuelType', 'priceMin', 'priceMax', 'yearMin', 'yearMax']
  for (const key of simpleKeys) {
    const val = filters[key] as string
    if (val) {
      chips.push({
        label: `${LABEL_MAP[key]}: ${formatChipValue(key, val)}`,
        onRemove: () => onRemoveFilter(key, ''),
      })
    }
  }

  // Multi-select bodyType
  for (const bt of filters.bodyType) {
    chips.push({
      label: bt.charAt(0).toUpperCase() + bt.slice(1),
      onRemove: () => {
        const next = filters.bodyType.filter(t => t !== bt)
        onRemoveFilter('bodyType', bt)
      },
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="font-body text-xs text-gray-400 uppercase tracking-wide font-semibold mr-1">Active:</span>
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 bg-[#1E2030] text-white text-xs font-body font-medium px-3 py-1.5 rounded-full"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            aria-label={`Remove ${chip.label} filter`}
            className="w-3.5 h-3.5 rounded-full bg-white/20 hover:bg-[#F59E0B] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-2 h-2">
              <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
            </svg>
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="font-body text-xs text-[#F59E0B] hover:text-[#D97706] font-semibold underline underline-offset-2 ml-1 transition-colors"
      >
        Clear all
      </button>
    </div>
  )
}
