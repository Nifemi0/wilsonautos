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
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" className="w-8 h-8">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-display font-bold text-[#1E2030] text-xl mb-2">Message Sent!</h3>
        <p className="font-body text-gray-500 text-sm">We&apos;ve opened WhatsApp for you. We&apos;ll respond within minutes.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            id="contact-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Phone Number *</label>
          <input
            type="tel"
            required
            id="contact-phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+234 800 000 0000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Car You&apos;re Interested In</label>
        <input
          type="text"
          id="contact-car"
          value={form.car}
          onChange={(e) => setForm({ ...form, car: e.target.value })}
          placeholder="e.g. Toyota Camry 2019, or Any Available"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Message *</label>
        <textarea
          rows={5}
          required
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what you're looking for..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        id="contact-submit-btn"
        className="w-full bg-[#1E2030] hover:bg-[#2a2d45] text-white font-display font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.01] text-base"
      >
        Send Message via WhatsApp
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#F8F8F6]">
        {/* Header */}
        <div className="bg-[#1E2030] py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">Get In Touch</span>
            <h1 className="font-display font-bold text-white text-5xl sm:text-6xl mb-4">Contact Us</h1>
            <p className="font-body text-white/60 text-lg max-w-xl">
              We are always ready to help. Reach out via WhatsApp, phone, or the form below.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp - Primary CTA */}
              <div className="bg-[#1E2030] rounded-2xl p-8 text-white">
                <h2 className="font-display font-bold text-white text-2xl mb-2">Fastest Response</h2>
                <p className="font-body text-white/60 text-sm mb-6">WhatsApp is the quickest way to reach us. We typically respond within minutes.</p>
                <WhatsAppButton
                  phoneNumber="+2348000000000"
                  message="Hello Wilson Express Autos! I'd like to inquire about your cars."
                  label="Chat on WhatsApp"
                  size="lg"
                  id="contact-whatsapp-btn"
                />
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-display font-bold text-[#1E2030] text-xl">Contact Details</h3>
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="w-5 h-5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+234 800 000 0000',
                    href: 'tel:+2348000000000',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="w-5 h-5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Location',
                    value: 'Lagos, Nigeria',
                    href: '#',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F59E0B]/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body text-xs text-gray-400">{item.label}</p>
                      <p className="font-body font-semibold text-[#1E2030] text-sm group-hover:text-[#F59E0B] transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-[#1E2030] text-xl mb-4">Business Hours</h3>
                <dl className="space-y-3">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Sunday', hours: '10:00 AM – 4:00 PM' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <dt className="font-body text-gray-500 text-sm">{row.day}</dt>
                      <dd className="font-body font-semibold text-[#1E2030] text-sm">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display font-bold text-[#1E2030] text-2xl mb-2">Send Us a Message</h2>
                <p className="font-body text-gray-500 text-sm mb-6">Fill out the form and we&apos;ll respond via WhatsApp immediately.</p>
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
