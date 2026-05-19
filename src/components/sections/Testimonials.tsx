'use client'

import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Emeka Okafor',
    location: 'Lagos, Nigeria',
    avatar: 'EO',
    color: 'from-orange-400 to-amber-500',
    rating: 5,
    text: 'I bought my 2019 Toyota Camry from Wilson Express Autos and the experience was seamless. The car was exactly as described, papers were clean, and the price was fair. I will definitely come back!',
    car: '2019 Toyota Camry',
    carEmoji: '🚗',
    verified: true,
  },
  {
    id: 2,
    name: 'Fatima Aliyu',
    location: 'Abuja, Nigeria',
    avatar: 'FA',
    color: 'from-emerald-400 to-teal-500',
    rating: 5,
    text: 'Wilson Express helped me find my dream Lexus RX 350. They were professional, patient, and transparent throughout the whole process. I felt no pressure at all. Highly recommend!',
    car: '2021 Lexus RX 350',
    carEmoji: '🚙',
    verified: true,
  },
  {
    id: 3,
    name: 'Chidi Nwachukwu',
    location: 'Port Harcourt, Nigeria',
    avatar: 'CN',
    color: 'from-blue-400 to-indigo-500',
    rating: 5,
    text: 'Best car dealership in Nigeria! I messaged them on WhatsApp and within 24 hours I was driving my Honda CR-V home. The vehicle inspection report gave me confidence. 5 stars!',
    car: '2019 Honda CR-V',
    carEmoji: '🚙',
    verified: true,
  },
  {
    id: 4,
    name: 'Blessing Osei',
    location: 'Lagos, Nigeria',
    avatar: 'BO',
    color: 'from-purple-400 to-pink-500',
    rating: 5,
    text: 'Purchased a 2020 BMW 5 Series. The entire process from WhatsApp inquiry to driving off the lot took just 2 days. Transparent, honest, and absolutely no hidden fees. Top class service!',
    car: '2020 BMW 5 Series',
    carEmoji: '🚘',
    verified: true,
  },
  {
    id: 5,
    name: 'Tunde Adeyemi',
    location: 'Ibadan, Nigeria',
    avatar: 'TA',
    color: 'from-rose-400 to-red-500',
    rating: 5,
    text: 'Wilson Express Autos delivered beyond expectations. I drove from Ibadan to Lagos just to buy from them — completely worth it. The car condition was exactly as shown in photos.',
    car: '2019 Mercedes C300',
    carEmoji: '🏎️',
    verified: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill={i < rating ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="2" className="w-4 h-4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-3 border-l-2 border-[#0A0A0A] pl-3 inline-block">
            Client Experiences
          </span>
          <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-5xl mb-4 tracking-tighter uppercase">
            Reputation
          </h2>
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-[#404040] font-body text-xs font-bold uppercase tracking-widest">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              500+ Clients
            </div>
            <div className="w-1 h-1 rounded-full bg-[#E5E5E5] hidden sm:block" />
            <div className="flex items-center gap-1 font-body text-xs font-bold uppercase tracking-widest text-[#404040]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#0A0A0A]">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <strong className="text-[#0A0A0A]">4.9</strong>/5 Rating
            </div>
            <div className="w-1 h-1 rounded-full bg-[#E5E5E5] hidden sm:block" />
            <div className="flex items-center gap-2 text-[#404040] font-body text-xs font-bold uppercase tracking-widest">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Verified
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="bg-[#FAFAFA] border-2 border-[#0A0A0A] p-8 sm:p-10 mb-8 relative shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]">
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="text-[#E5E5E5] font-display text-8xl leading-none mb-4 select-none">&ldquo;</div>
              <StarRating rating={testimonials[active].rating} />
              <p className="font-body text-[#0A0A0A] text-xl sm:text-2xl leading-relaxed mt-4 mb-8 font-medium">
                {testimonials[active].text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-white text-sm">{testimonials[active].avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-[#0A0A0A] text-lg">{testimonials[active].name}</p>
                    {testimonials[active].verified && (
                      <svg viewBox="0 0 24 24" fill="#0A0A0A" className="w-4 h-4">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-[#404040] text-xs font-bold uppercase tracking-widest">{testimonials[active].location}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="inline-flex items-center gap-2 bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] px-4 py-2 text-xs font-bold font-body uppercase tracking-widest">
                    {testimonials[active].carEmoji} {testimonials[active].car}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial selector pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-left p-4 border-2 transition-all duration-200 bg-white ${
                i === active
                  ? 'border-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]'
                  : 'border-[#E5E5E5] hover:border-[#404040]'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-[#0A0A0A] text-xs">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-display font-bold text-[#0A0A0A] text-sm leading-tight tracking-tight">{t.name}</p>
                  <p className="font-body text-[#404040] text-[9px] font-bold uppercase tracking-widest mt-0.5">{t.car}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
