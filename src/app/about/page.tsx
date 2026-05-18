import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Wilson Express Autos — your trusted used car dealership in Nigeria. Quality cars, honest prices, genuine service.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-[#F8F8F6]">
        {/* Hero */}
        <div className="bg-[#1E2030] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">Who We Are</span>
            <h1 className="font-display font-bold text-white text-5xl sm:text-6xl mb-6">About Wilson Express Autos</h1>
            <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
              Built on trust, driven by passion. We are Nigeria&apos;s premier destination for quality used vehicles.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">Our Journey</span>
                <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl mb-6 gold-underline">Our Story</h2>
                <div className="font-body text-gray-600 text-base leading-relaxed space-y-4">
                  <p>
                    Wilson Express Autos was founded with a simple but powerful mission: to make quality car ownership accessible to every Nigerian.
                    We saw a market filled with uncertainty, inflated prices, and hidden defects — and we set out to change that.
                  </p>
                  <p>
                    Starting from Lagos, we built our reputation one car at a time. Every vehicle we sell is personally inspected, every paper is verified,
                    and every customer is treated with the respect they deserve. We don&apos;t just sell cars — we sell peace of mind.
                  </p>
                  <p>
                    Today, we serve customers across Lagos, Abuja, Port Harcourt, and beyond. With hundreds of satisfied customers and a growing inventory
                    of both tokunbo and Nigerian-used vehicles, Wilson Express Autos has become a name you can trust.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: 'Cars Sold', icon: '🚗' },
                  { value: '100%', label: 'Papers Verified', icon: '📋' },
                  { value: '5★', label: 'Customer Rating', icon: '⭐' },
                  { value: '3+', label: 'Years Experience', icon: '🏆' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:-translate-y-1 transition-transform duration-200">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <p className="font-display font-bold text-[#1E2030] text-3xl">{stat.value}</p>
                    <p className="font-body text-gray-400 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">Our Promise</span>
              <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl">Quality, Trust, Best Price</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Quality Assured',
                  desc: 'Every car undergoes a comprehensive multi-point inspection. We only list cars we would be proud to drive ourselves.',
                  icon: '✅',
                },
                {
                  title: 'Full Transparency',
                  desc: 'Clean papers, accurate history, honest mileage. No tricks, no hidden problems. What you see is what you get.',
                  icon: '🔍',
                },
                {
                  title: 'Best Price Guarantee',
                  desc: 'We benchmark our prices against the market every week. If you find a better price elsewhere, tell us — we will match it.',
                  icon: '💰',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#F8F8F6] rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                  <div className="text-5xl mb-5">{item.icon}</div>
                  <h3 className="font-display font-bold text-[#1E2030] text-xl mb-3">{item.title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">Find Us</span>
                <h2 className="font-display font-bold text-[#1E2030] text-4xl mb-6">Visit Our Showroom</h2>
                <div className="space-y-5 mb-8">
                  {[
                    { icon: '📍', label: 'Address', value: 'Lagos, Nigeria' },
                    { icon: '📞', label: 'Phone', value: '+234 800 000 0000' },
                    { icon: '💬', label: 'WhatsApp', value: '+234 800 000 0000' },
                    { icon: '⏰', label: 'Business Hours', value: 'Mon–Sat: 8am–6pm | Sun: 10am–4pm' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-display font-bold text-[#1E2030] text-sm">{item.label}</p>
                        <p className="font-body text-gray-500 text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <WhatsAppButton
                  phoneNumber="+2348000000000"
                  message="Hello! I'd like to visit your showroom. When would be a good time?"
                  label="Get Directions via WhatsApp"
                  id="about-whatsapp-btn"
                />
              </div>
              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.4630298755!2d3.1438720814941547!3d6.548055435593773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wilson Express Autos Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1E2030]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-white text-4xl mb-4">Ready to Find Your Car?</h2>
            <p className="font-body text-white/60 text-lg mb-8">Browse our inventory and find your perfect match today.</p>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2030] font-display font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 text-base"
            >
              Browse Inventory
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
