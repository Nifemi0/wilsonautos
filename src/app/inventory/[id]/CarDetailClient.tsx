'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CarCard from '@/components/ui/CarCard'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { createClient } from '@/lib/supabase/client'
import { formatPrice, getCarSlug } from '@/lib/utils'

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Main image */}
      <div className="relative h-[300px] sm:h-[420px] rounded-2xl overflow-hidden bg-gray-100 mb-3">
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#F59E0B] text-[#1E2030] text-xs font-bold px-3 py-1.5 rounded-full font-body uppercase tracking-wide">
            Photo {active + 1} of {images.length}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                i === active ? 'border-[#F59E0B]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SpecsGrid({ car }: { car: Car }) {
  const specs = [
    { label: 'Year', value: car.year },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
    { label: 'Condition', value: car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used' },
    { label: 'Transmission', value: car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1) },
    { label: 'Fuel Type', value: car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) },
    { label: 'Colour', value: car.colour },
    { label: 'Body Type', value: car.bodyType.charAt(0).toUpperCase() + car.bodyType.slice(1) },
    { label: 'Location', value: car.location },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-[#F8F8F6] rounded-xl p-3 text-center">
          <p className="font-display font-bold text-[#1E2030] text-sm mb-0.5">{spec.value}</p>
          <p className="font-body text-gray-400 text-xs">{spec.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function CarDetailClient({ car }: { car: Car }) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  // Toast notifications for link copy
  const [copied, setCopied] = useState(false)

  // Recently Viewed & Comparison states
  const [recentlyViewed, setRecentlyViewed] = useState<Car[]>([])
  const [compareList, setCompareList] = useState<Car[]>([])
  const [isComparing, setIsComparing] = useState(false)

  const carUrl = typeof window !== 'undefined' ? `${window.location.origin}/inventory/${getCarSlug(car)}` : ''
  const whatsappMsg = `Hello Wilson Express Autos! I am interested in the *${car.year} ${car.make} ${car.model}* listed at *${formatPrice(car.price)}*. Please provide more information.\nListing URL: ${carUrl}`

  // Track recently viewed in localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wilson_recent_cars')
      let list: Car[] = stored ? JSON.parse(stored) : []
      
      // Filter out current car if already present, and limit to 4
      list = list.filter((c) => c.id !== car.id)
      list.unshift(car)
      list = list.slice(0, 4)
      
      localStorage.setItem('wilson_recent_cars', JSON.stringify(list))
      setRecentlyViewed(list.filter((c) => c.id !== car.id)) // recently viewed doesn't include active car
    } catch (e) {
      console.error('Error tracking recently viewed:', e)
    }

    // Load comparison list
    try {
      const storedCompare = localStorage.getItem('wilson_compare_cars')
      if (storedCompare) setCompareList(JSON.parse(storedCompare))
    } catch (e) {
      console.error(e)
    }
  }, [car])

  // Form submission: save to Supabase lead tracking, then fire WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const supabase = createClient()
      const { error } = await (supabase.from('enquiries') as any).insert({
        car_id: car.id,
        buyer_name: formData.name,
        buyer_phone: formData.phone,
        message: formData.message || whatsappMsg,
        status: 'pending'
      })

      if (error) throw error

      // Trigger redirect to WhatsApp with custom pre-filled message
      const msg = `Name: ${formData.name}\nPhone: ${formData.phone}\n\n${formData.message || whatsappMsg}`
      window.open(`https://wa.me/${car.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`, '_blank')
      
      setSubmitted(true)
    } catch (err: any) {
      console.error('Enquiry insertion error:', err)
      setErrorMsg('Failed to send enquiry. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Copy listing URL helper
  const handleCopyLink = () => {
    navigator.clipboard?.writeText(carUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Add/Remove from specs comparison list
  const toggleCompare = () => {
    let newList = [...compareList]
    const exists = newList.some((c) => c.id === car.id)

    if (exists) {
      newList = newList.filter((c) => c.id !== car.id)
    } else {
      if (newList.length >= 3) {
        alert('You can compare a maximum of 3 cars at a time!')
        return
      }
      newList.push(car)
    }

    localStorage.setItem('wilson_compare_cars', JSON.stringify(newList))
    setCompareList(newList)
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#F8F8F6]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm font-body text-gray-400">
              <Link href="/" className="hover:text-[#F59E0B] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/inventory" className="hover:text-[#F59E0B] transition-colors">Inventory</Link>
              <span>/</span>
              <span className="text-[#1E2030] font-medium">{car.year} {car.make} {car.model}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2 space-y-8">
              <ImageGallery images={car.images} alt={`${car.year} ${car.make} ${car.model}`} />

              {/* Title & Price */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="font-display font-bold text-[#1E2030] text-2xl sm:text-3xl leading-tight">
                      {car.year} {car.make} {car.model}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full font-body ${
                        car.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {car.status === 'available' ? 'Available' : 'Sold'}
                      </span>
                      <span className="text-xs text-gray-400 font-body">
                        {car.condition === 'tokunbo' ? '🇺🇸 Tokunbo' : '🇳🇬 Nigerian Used'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-[#F59E0B] text-3xl sm:text-4xl">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                </div>

                {/* Specs */}
                <SpecsGrid car={car} />
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-bold text-[#1E2030] text-xl mb-4">Description</h2>
                <p className="font-body text-gray-600 leading-relaxed whitespace-pre-line">{car.description}</p>
              </div>

              {/* Enquiry Form */}
              <div className="bg-white rounded-2xl p-6 shadow-sm" id="enquiry-section">
                <h2 className="font-display font-bold text-[#1E2030] text-xl mb-6">Send an Enquiry</h2>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" className="w-7 h-7">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="font-display font-bold text-[#1E2030] text-lg mb-1">Enquiry Sent Successfully!</p>
                    <p className="font-body text-gray-500 text-sm">We&apos;ve logged your enquiry and redirected you to complete the chat on WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-body">
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 800 000 0000"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={whatsappMsg}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1E2030] hover:bg-[#2a2d45] disabled:bg-gray-400 text-white font-display font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting Enquiry...
                        </>
                      ) : (
                        'Send Enquiry via WhatsApp'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Contact Sidebar */}
            <div className="space-y-4">
              {/* Primary WhatsApp CTA */}
              <div className="bg-[#1E2030] rounded-2xl p-6 text-white shadow-sm">
                <p className="font-body text-white/60 text-xs uppercase tracking-wide mb-2">Interested in this car?</p>
                <p className="font-display font-bold text-white text-xl mb-6">Get in Touch Now</p>
                <WhatsAppButton
                  phoneNumber={car.whatsappNumber}
                  message={whatsappMsg}
                  label="Chat on WhatsApp"
                  size="lg"
                  id="car-detail-whatsapp-btn"
                />
                <div className="mt-3">
                  <a
                    href={`tel:${car.whatsappNumber}`}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-body font-semibold py-3 px-6 rounded-2xl transition-colors w-full text-base"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                    Call Us
                  </a>
                </div>
              </div>

              {/* Premium Add to Compare Spec Utility */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-[#1E2030] text-base mb-2">Specs Comparison</h3>
                <p className="font-body text-gray-400 text-xs mb-4">Select up to 3 cars to view specs side-by-side.</p>
                <button
                  onClick={toggleCompare}
                  className={`w-full font-body font-semibold text-sm py-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    compareList.some((c) => c.id === car.id)
                      ? 'bg-[#1E2030] border-[#1E2030] text-white'
                      : 'border-gray-200 text-[#1E2030] hover:bg-gray-50'
                  }`}
                >
                  {compareList.some((c) => c.id === car.id) ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-[#F59E0B]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added to Compare
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      </svg>
                      Add to Compare
                    </>
                  )}
                </button>
              </div>

              {/* Share Box */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-[#1E2030] text-base mb-4">Share This Car</h3>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this pristine *${car.year} ${car.make} ${car.model}* for sale at Wilson Express Autos!\nPrice: ${formatPrice(car.price)}\nLocation: ${car.location}\n\nView details: ${carUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 bg-[#25D366]/5 hover:bg-[#25D366]/10 text-[#25D366] font-body text-xs font-semibold py-3 rounded-xl transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(carUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 text-[#1877F2] font-body text-xs font-semibold py-3 rounded-xl transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className={`flex flex-col items-center gap-1.5 font-body text-xs font-semibold py-3 rounded-xl transition-colors ${
                      copied ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 hover:bg-gray-100 text-[#1E2030]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-emerald-600 animate-bounce">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        </svg>
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed Cars Section */}
          {recentlyViewed.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-16">
              <h2 className="font-display font-bold text-[#1E2030] text-2xl mb-8">Recently Viewed Cars</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recentlyViewed.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1E2030] text-white py-3 px-6 rounded-2xl shadow-xl z-40 flex items-center gap-6 border border-white/10 animate-fade-in max-w-sm sm:max-w-md">
          <div className="flex items-center gap-2">
            <span className="bg-[#F59E0B] text-[#1E2030] font-display font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {compareList.length}
            </span>
            <span className="font-body text-xs font-medium text-white/90 hidden sm:inline">Compare Vehicles</span>
          </div>
          <div className="flex gap-1.5">
            {compareList.map((c) => (
              <div key={c.id} className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                <Image src={c.images[0]} fill alt={c.model} className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparing(true)}
              disabled={compareList.length < 2}
              className={`font-display font-bold text-xs px-3 py-1.5 rounded-lg transition-colors ${
                compareList.length < 2
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-[#F59E0B] text-[#1E2030] hover:bg-[#d97706]'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('wilson_compare_cars')
                setCompareList([])
              }}
              className="text-white/40 hover:text-white transition-colors"
              title="Clear Comparison"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Stunning Comparison Modal */}
      {isComparing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsComparing(false)}
              className="absolute right-6 top-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-[#1E2030] flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="font-display font-bold text-[#1E2030] text-2xl mb-6">Compare Specifications</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 pr-4 font-semibold text-gray-400 w-1/4">Specs</th>
                    {compareList.map((c) => (
                      <th key={c.id} className="py-4 px-4 w-1/4">
                        <div className="relative h-20 w-32 rounded-xl overflow-hidden mb-2">
                          <Image src={c.images[0]} fill alt={c.model} className="object-cover" />
                        </div>
                        <p className="font-display font-bold text-[#1E2030] text-sm">{c.year} {c.make}</p>
                        <p className="font-body text-[#F59E0B] text-xs font-semibold">{c.model}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Price</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-display font-bold text-[#F59E0B] text-base">{formatPrice(c.price)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Condition</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 capitalize font-semibold">{c.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Mileage</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 font-semibold">{c.mileage.toLocaleString()} km</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Transmission</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 capitalize">{c.transmission}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Fuel Type</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 capitalize">{c.fuelType}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Colour</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4">{c.colour}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Body Type</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4 capitalize">{c.bodyType}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-400">Location</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-3 px-4">{c.location}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
