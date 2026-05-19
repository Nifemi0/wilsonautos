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
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden bg-[#E5E5E5] mb-4 border-2 border-[#0A0A0A]">
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#0A0A0A] text-white text-[10px] font-bold px-4 py-2 font-body uppercase tracking-widest border-2 border-transparent">
            Photo {active + 1} of {images.length}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border-2 border-[#0A0A0A] flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border-2 border-[#0A0A0A] flex items-center justify-center transition-colors"
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
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-24 h-16 flex-shrink-0 border-2 transition-all ${
                i === active ? 'border-[#0A0A0A]' : 'border-[#E5E5E5] hover:border-[#0A0A0A]'
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {specs.map((spec) => (
        <div key={spec.label} className="border-2 border-[#E5E5E5] p-4 flex flex-col justify-center">
          <p className="font-display font-bold text-[#0A0A0A] text-sm md:text-base mb-1 tracking-tight">{spec.value}</p>
          <p className="font-body font-bold text-[10px] uppercase tracking-widest text-[#404040]">{spec.label}</p>
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
      <div className="pt-24 min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b-2 border-[#E5E5E5]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <nav className="flex items-center gap-3 text-[10px] font-body font-bold uppercase tracking-widest text-[#404040]">
              <Link href="/" className="hover:text-[#0A0A0A] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/inventory" className="hover:text-[#0A0A0A] transition-colors">Inventory</Link>
              <span>/</span>
              <span className="text-[#0A0A0A] underline underline-offset-4 decoration-2">{car.year} {car.make} {car.model}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2 space-y-8">
              <ImageGallery images={car.images} alt={`${car.year} ${car.make} ${car.model}`} />

              {/* Title & Price */}
              <div className="bg-white border-2 border-[#E5E5E5] p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                  <div>
                    <h1 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-5xl leading-tight uppercase tracking-tighter">
                      {car.year} {car.make} {car.model}
                    </h1>
                    <div className="flex items-center gap-4 mt-4">
                      <span className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border-2 ${
                        car.status === 'available' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-[#404040] text-[#404040]'
                      }`}>
                        <span className={`w-2 h-2 ${car.status === 'available' ? 'bg-[#0A0A0A]' : 'bg-[#404040]'}`} />
                        {car.status === 'available' ? 'Available' : 'Sold'}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#404040]">
                        {car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-5xl tracking-tighter">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                </div>

                {/* Specs */}
                <SpecsGrid car={car} />
              </div>

              {/* Description */}
              <div className="bg-white border-2 border-[#E5E5E5] p-8 sm:p-10">
                <h2 className="font-display font-bold text-[#0A0A0A] text-2xl mb-6 uppercase tracking-tighter">Description</h2>
                <p className="font-body text-[#404040] text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
              </div>

              {/* Enquiry Form */}
              <div className="bg-white border-2 border-[#E5E5E5] p-8 sm:p-10" id="enquiry-section">
                <h2 className="font-display font-bold text-[#0A0A0A] text-2xl mb-8 uppercase tracking-tighter">Initiate Dialogue</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-2 border-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" className="w-8 h-8">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="font-display font-bold text-[#0A0A0A] text-2xl mb-2 tracking-tight uppercase">Transmission Secure</p>
                    <p className="font-body text-[#404040] text-sm">Dialogue initiated. Please proceed to WhatsApp for continuation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="border-2 border-[#0A0A0A] p-4 text-[#0A0A0A] text-[10px] font-bold uppercase tracking-widest font-body">
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Identification *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Name"
                          className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors placeholder-[#E5E5E5]"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Contact Sequence *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 800 000 0000"
                          className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors placeholder-[#E5E5E5]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">Parameters</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={whatsappMsg}
                        className="w-full bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] px-4 py-4 font-body text-xs focus:outline-none transition-colors resize-none placeholder-[#E5E5E5]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-transparent border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white disabled:opacity-50 font-body font-bold py-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
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
            <div className="space-y-6">
              {/* Primary WhatsApp CTA */}
              <div className="bg-[#0A0A0A] border-2 border-[#0A0A0A] p-8 text-white">
                <p className="font-body text-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest mb-4">Acquisition Protocol</p>
                <p className="font-display font-bold text-white text-3xl mb-8 tracking-tight uppercase">Initiate Contact</p>
                <WhatsAppButton
                  phoneNumber={car.whatsappNumber}
                  message={whatsappMsg}
                  label="Connect via WhatsApp"
                  size="lg"
                  id="car-detail-whatsapp-btn"
                />
                <div className="mt-4">
                  <a
                    href={`tel:${car.whatsappNumber}`}
                    className="flex items-center justify-center gap-3 bg-transparent border-2 border-[#404040] hover:border-white text-white font-body font-bold py-4 text-xs uppercase tracking-widest transition-colors w-full"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                    Direct Voice Channel
                  </a>
                </div>
              </div>

              {/* Premium Add to Compare Spec Utility */}
              <div className="bg-white border-2 border-[#E5E5E5] p-8">
                <h3 className="font-display font-bold text-[#0A0A0A] text-xl mb-4 tracking-tight uppercase">Analyze Variance</h3>
                <p className="font-body text-[#404040] text-sm leading-relaxed mb-6">Select up to 3 models for comparative analysis.</p>
                <button
                  onClick={toggleCompare}
                  className={`w-full font-body font-bold text-[10px] uppercase tracking-widest py-4 border-2 flex items-center justify-center gap-3 transition-colors ${
                    compareList.some((c) => c.id === car.id)
                      ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white'
                      : 'bg-transparent border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white'
                  }`}
                >
                  {compareList.some((c) => c.id === car.id) ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Queued for Analysis
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      </svg>
                      Add to Queue
                    </>
                  )}
                </button>
              </div>

              {/* Share Box */}
              <div className="bg-white border-2 border-[#E5E5E5] p-8">
                <h3 className="font-display font-bold text-[#0A0A0A] text-xl mb-6 tracking-tight uppercase">Distribute</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this pristine *${car.year} ${car.make} ${car.model}* for sale at Wilson Express Autos!\nPrice: ${formatPrice(car.price)}\nLocation: ${car.location}\n\nView details: ${carUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 border-2 border-[#E5E5E5] hover:border-[#0A0A0A] text-[#0A0A0A] font-body text-[10px] font-bold uppercase tracking-widest py-4 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    W-App
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(carUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 border-2 border-[#E5E5E5] hover:border-[#0A0A0A] text-[#0A0A0A] font-body text-[10px] font-bold uppercase tracking-widest py-4 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    FB
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className={`flex flex-col items-center gap-2 border-2 font-body text-[10px] font-bold uppercase tracking-widest py-4 transition-colors ${
                      copied ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white' : 'border-[#E5E5E5] hover:border-[#0A0A0A] text-[#0A0A0A]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 animate-pulse">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed Cars Section */}
          {recentlyViewed.length > 0 && (
            <div className="mt-24 pt-16 border-t-2 border-[#E5E5E5]">
              <h2 className="font-display font-bold text-[#0A0A0A] text-3xl mb-12 uppercase tracking-tighter">Recent Logs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border-2 border-[#404040] text-white py-4 px-8 z-40 flex items-center gap-8 animate-fade-in max-w-[90%] sm:max-w-xl">
          <div className="flex items-center gap-3">
            <span className="bg-white text-[#0A0A0A] font-body font-bold text-[10px] w-6 h-6 flex items-center justify-center border-2 border-transparent">
              {compareList.length}
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Active Queue</span>
          </div>
          <div className="flex gap-2">
            {compareList.map((c) => (
              <div key={c.id} className="relative w-10 h-10 overflow-hidden border-2 border-[#404040]">
                <Image src={c.images[0]} fill alt={c.model} className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsComparing(true)}
              disabled={compareList.length < 2}
              className={`font-body font-bold text-[10px] uppercase tracking-widest px-4 py-2 border-2 transition-colors ${
                compareList.length < 2
                  ? 'bg-transparent border-[#404040] text-[#404040] cursor-not-allowed'
                  : 'bg-white border-white text-[#0A0A0A] hover:bg-transparent hover:text-white'
              }`}
            >
              Analyze
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('wilson_compare_cars')
                setCompareList([])
              }}
              className="text-[#404040] hover:text-white transition-colors"
              title="Clear Analysis"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Stunning Comparison Modal */}
      {isComparing && (
        <div className="fixed inset-0 bg-[#0A0A0A]/95 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#0A0A0A] w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 sm:p-12 relative shadow-[16px_16px_0px_0px_rgba(229,229,229,0.2)]">
            <button
              onClick={() => setIsComparing(false)}
              className="absolute right-8 top-8 w-10 h-10 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="font-display font-bold text-[#0A0A0A] text-4xl mb-12 tracking-tighter uppercase">Variance Matrix</h2>
            
            <div className="overflow-x-auto hide-scrollbar">
              <table className="w-full text-left font-body text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#E5E5E5]">
                    <th className="py-6 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040] w-1/4">Parameters</th>
                    {compareList.map((c) => (
                      <th key={c.id} className="py-6 px-6 w-1/4 border-l-2 border-[#E5E5E5]">
                        <div className="relative h-24 w-full border-2 border-[#0A0A0A] overflow-hidden mb-4">
                          <Image src={c.images[0]} fill alt={c.model} className="object-cover" />
                        </div>
                        <p className="font-display font-bold text-[#0A0A0A] text-lg uppercase tracking-tight">{c.year} {c.make}</p>
                        <p className="font-body text-[#404040] text-xs font-bold uppercase tracking-widest">{c.model}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[#E5E5E5]">
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Price</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-display font-bold text-[#0A0A0A] text-xl border-l-2 border-[#E5E5E5]">{formatPrice(c.price)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Condition</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Mileage</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.mileage.toLocaleString()} km</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Transmission</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.transmission}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Fuel Type</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.fuelType}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Colour</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.colour}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Body Type</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.bodyType}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-5 pr-6 font-bold text-[10px] uppercase tracking-widest text-[#404040]">Location</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-5 px-6 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-l-2 border-[#E5E5E5]">{c.location}</td>
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
