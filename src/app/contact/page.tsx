'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '', car: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Name: ${form.name}\nPhone: ${form.phone}\nCar Interested In: ${form.car || 'Not specified'}\n\nMessage:\n${form.message}`
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-2 border-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" className="w-8 h-8">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-2 tracking-tight uppercase">Transmission Secure</h3>
        <p className="font-body text-[#404040] text-sm">Dialogue initiated. Please proceed to WhatsApp for continuation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Identification *</label>
          <input
            type="text"
            required
            id="contact-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors placeholder-[#E5E5E5]"
          />
        </div>
        <div>
          <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Contact Sequence *</label>
          <input
            type="tel"
            required
            id="contact-phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+234 800 000 0000"
            className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors placeholder-[#E5E5E5]"
          />
        </div>
      </div>
      <div>
        <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Target Asset</label>
        <input
          type="text"
          id="contact-car"
          value={form.car}
          onChange={(e) => setForm({ ...form, car: e.target.value })}
          placeholder="e.g. 2019 Toyota Camry"
          className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors placeholder-[#E5E5E5]"
        />
      </div>
      <div>
        <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Parameters *</label>
        <textarea
          rows={5}
          required
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Specify requirements..."
          className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors resize-none placeholder-[#E5E5E5]"
        />
      </div>
      <button
        type="submit"
        id="contact-submit-btn"
        className="w-full bg-transparent border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white font-body font-bold py-4 text-xs uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-3"
      >
        Transmit Signal
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#0A0A0A] py-32 relative overflow-hidden">
          {/* Brutalist diagonal decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] skew-x-[-20deg] translate-x-1/4" />
          
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-l-2 border-white/20 pl-8 ml-4 sm:ml-8">
            <span className="text-[#E5E5E5] font-body font-bold text-[10px] tracking-widest uppercase block mb-6">Initialize Communication</span>
            <h1 className="font-display font-bold text-white text-5xl sm:text-7xl mb-6 tracking-tighter uppercase">Contact Portal</h1>
            <p className="font-body text-[#E5E5E5] text-lg max-w-xl uppercase tracking-wide">
              Direct access to our concierge team. Rapid response protocols active.
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              {/* WhatsApp - Primary CTA */}
              <div className="bg-[#0A0A0A] border-2 border-[#0A0A0A] p-10 text-white">
                <p className="font-body text-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest mb-4">Priority Channel</p>
                <h2 className="font-display font-bold text-white text-3xl mb-8 tracking-tight uppercase">Instant Dialogue</h2>
                <WhatsAppButton
                  phoneNumber="+2348000000000"
                  message="Hello Wilson Express Autos! I'd like to inquire about your inventory."
                  label="Connect via WhatsApp"
                  size="lg"
                  id="contact-whatsapp-btn"
                />
              </div>

              {/* Contact Details */}
              <div className="bg-white border-2 border-[#E5E5E5] p-10 space-y-8">
                <h3 className="font-display font-bold text-[#0A0A0A] text-2xl uppercase tracking-tight">Coordinates</h3>
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                      </svg>
                    ),
                    label: 'Voice Channel',
                    value: '+234 800 000 0000',
                    href: 'tel:+2348000000000',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Physical Space',
                    value: 'Lagos, Nigeria',
                    href: '#',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 border-2 border-[#0A0A0A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#404040] mb-1">{item.label}</p>
                      <p className="font-display font-bold text-[#0A0A0A] text-xl tracking-tight">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-white border-2 border-[#E5E5E5] p-10">
                <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-8 uppercase tracking-tight">Operating Hours</h3>
                <dl className="space-y-6">
                  {[
                    { day: 'Mon – Fri', hours: '08:00 – 18:00' },
                    { day: 'Saturday', hours: '08:00 – 18:00' },
                    { day: 'Sunday', hours: '10:00 – 16:00' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center pb-6 border-b-2 border-[#E5E5E5] last:border-0 last:pb-0">
                      <dt className="font-body text-[10px] font-bold uppercase tracking-widest text-[#404040]">{row.day}</dt>
                      <dd className="font-display font-bold text-[#0A0A0A] text-xl tracking-tight">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="bg-white border-2 border-[#E5E5E5] p-10 sm:p-12 sticky top-24">
                <h2 className="font-display font-bold text-[#0A0A0A] text-3xl mb-4 tracking-tighter uppercase">Submit Directive</h2>
                <p className="font-body text-[#404040] text-sm mb-10 leading-relaxed">Provide your parameters below. Our algorithm will route your query to the appropriate specialist.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
