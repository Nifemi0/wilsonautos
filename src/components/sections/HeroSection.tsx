'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const makes = ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Hyundai']
const bodyTypes = ['SUV', 'Sedan', 'Pickup', 'Hatchback', 'Bus', 'Coupe']
const priceRanges = [
  { label: 'Under ₦5M', value: '0-5000000' },
  { label: '₦5M – ₦10M', value: '5000000-10000000' },
  { label: '₦10M – ₦20M', value: '10000000-20000000' },
  { label: '₦20M – ₦40M', value: '20000000-40000000' },
  { label: 'Above ₦40M', value: '40000000-999999999' },
]

export default function HeroSection() {
  const router = useRouter()
  const [make, setMake] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (make) params.set('make', make)
    if (bodyType) params.set('bodyType', bodyType.toLowerCase())
    if (priceRange) {
      const [min, max] = priceRange.split('-')
      params.set('priceMin', min)
      params.set('priceMax', max)
    }
    router.push(`/inventory?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center bg-[#1E2030] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2030] via-[#2a2d45] to-[#141622]" />
        {/* Gold accent circles */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/8 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-8 h-px bg-[#F59E0B]" />
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase">
              Wilson Express Autos
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 animate-fade-in-up delay-100">
            Find Your{' '}
            <span className="text-shimmer">Perfect Car</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 animate-fade-in-up delay-200">
            Quality used cars at the best prices in Nigeria. Browse tokunbo and Nigerian-used vehicles from top makes.
          </p>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 animate-fade-in-up delay-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-white/60 font-body text-xs font-medium mb-1.5 uppercase tracking-wide">Make</label>
                <select
                  id="hero-make-filter"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1E2030]">All Makes</option>
                  {makes.map((m) => (
                    <option key={m} value={m} className="bg-[#1E2030]">{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/60 font-body text-xs font-medium mb-1.5 uppercase tracking-wide">Body Type</label>
                <select
                  id="hero-bodytype-filter"
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1E2030]">All Types</option>
                  {bodyTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#1E2030]">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/60 font-body text-xs font-medium mb-1.5 uppercase tracking-wide">Price Range</label>
                <select
                  id="hero-price-filter"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1E2030]">Any Price</option>
                  {priceRanges.map((r) => (
                    <option key={r.value} value={r.value} className="bg-[#1E2030]">{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              id="hero-search-btn"
              onClick={handleSearch}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2030] font-display font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-base tracking-wide flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search Inventory
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in-up delay-400">
            {[
              { value: '500+', label: 'Cars Sold' },
              { value: '22', label: 'Cars Available' },
              { value: '100%', label: 'Verified' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-bold text-[#F59E0B] text-3xl">{stat.value}</p>
                <p className="font-body text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[#F59E0B] rounded-full" />
        </div>
      </div>
    </section>
  )
}
