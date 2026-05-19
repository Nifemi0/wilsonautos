'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
    <section className="relative min-h-screen pt-28 pb-20 bg-[#FAFAFA] overflow-hidden flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Typography & Search */}
          <div className="max-w-xl">
            <p className="font-body text-[#0A0A0A] font-medium tracking-widest uppercase text-xs sm:text-sm mb-6 animate-fade-in-up border-l-2 border-[#0A0A0A] pl-4">
              Premium Auto Gallery // Lagos, NG
            </p>
            
            <h1 className="font-display font-bold text-[#0A0A0A] text-6xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 animate-fade-in-up delay-100 uppercase">
              Curated.<br />
              <span className="text-[#404040]">Refined.</span><br />
              Driven.
            </h1>
            
            <p className="font-body text-[#404040] text-lg sm:text-xl leading-relaxed mb-12 animate-fade-in-up delay-200 font-light">
              We exhibit only the finest tokunbo and Nigerian-used vehicles. Clean aesthetics, cleaner papers.
            </p>

            {/* Brutalist Search Box */}
            <div className="bg-white border-2 border-[#0A0A0A] p-6 shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] animate-fade-in-up delay-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Select Make</label>
                  <select
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] rounded-none px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Any Make</option>
                    {makes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Body Type</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] rounded-none px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Any Type</option>
                    {bodyTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Budget</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#0A0A0A] rounded-none px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Any Price</option>
                    {priceRanges.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="w-full bg-[#0A0A0A] hover:bg-[#404040] text-white font-display font-bold py-4 transition-colors duration-200 text-sm uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Explore Collection
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Asymmetrical Imagery */}
          <div className="relative h-[600px] lg:h-[800px] w-full hidden sm:block animate-fade-in delay-500">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F3F4F6] rounded-full blur-3xl -z-10" />
            
            {/* Primary Image */}
            <div className="absolute top-10 right-0 w-[80%] h-[70%] z-20 overflow-hidden shadow-2xl">
              <Image
                src="https://www.edmunds.com/assets/m/mercedes-benz/gle-class-coupe/2021/oem/2021_mercedes-benz_gle-class-coupe_4dr-suv_amg-gle-53_fq_oem_1_600.jpg"
                alt="Mercedes-Benz 2021 GLE 450 Coupe"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>

            {/* Secondary Overlapping Image */}
            <div className="absolute bottom-10 left-0 w-[60%] h-[40%] z-30 overflow-hidden shadow-2xl border-4 border-[#FAFAFA]">
              <Image
                src="https://www.carpro.com/hs-fs/hubfs/2022-LexusRX-350-F-Sport-feature-carprousa.jpg"
                alt="Lexus RX350 2022 F-Sport"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            {/* Minimalist Decoration */}
            <div className="absolute -right-4 bottom-1/4 font-display text-[150px] font-bold text-[#E5E5E5] opacity-50 z-10 select-none rotate-90 origin-bottom-right leading-none tracking-tighter">
              WILSON
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
