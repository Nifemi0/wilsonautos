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
      <div className="pt-24 min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-[#0A0A0A] py-32 relative overflow-hidden">
          {/* Brutalist diagonal decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] skew-x-[-20deg] translate-x-1/4" />
          
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-l-2 border-white/20 pl-8 ml-4 sm:ml-8">
            <span className="text-[#E5E5E5] font-body font-bold text-[10px] tracking-widest uppercase block mb-6">Who We Are</span>
            <h1 className="font-display font-bold text-white text-5xl sm:text-7xl mb-8 tracking-tighter uppercase">Wilson Express Autos</h1>
            <p className="font-body text-[#E5E5E5] text-lg max-w-2xl leading-relaxed uppercase tracking-wide">
              Built on trust. Driven by excellence. The premier destination for curated automotive acquisitions.
            </p>
          </div>
        </div>

        {/* Story */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-6 border-l-2 border-[#0A0A0A] pl-3">Our Genesis</span>
                <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-6xl mb-10 tracking-tighter uppercase">Our Story</h2>
                <div className="font-body text-[#404040] text-base leading-relaxed space-y-6">
                  <p>
                    Wilson Express Autos was founded with a definitive mission: to introduce unprecedented transparency and standards to the Nigerian automotive market.
                    We observed an industry clouded by ambiguity, and we engineered a solution.
                  </p>
                  <p>
                    Originating in Lagos, our reputation has been meticulously constructed one vehicle at a time. Every asset we curate undergoes rigorous inspection,
                    every document is authenticated, and every client receives white-glove service. We do not merely sell cars; we provide automotive assurance.
                  </p>
                  <p>
                    Today, our operations span Lagos, Abuja, Port Harcourt, and beyond. With an expanding portfolio of premium Tokunbo and Nigerian-used vehicles,
                    Wilson Express Autos stands as the benchmark for quality.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: '500+', label: 'Vehicles Delivered', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { value: '100%', label: 'Authenticated', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { value: '5★', label: 'Client Satisfaction', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                  { value: '3+', label: 'Years Operation', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                ].map((stat) => (
                  <div key={stat.label} className="border-2 border-[#E5E5E5] hover:border-[#0A0A0A] p-8 text-center transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 mx-auto mb-6 text-[#0A0A0A]">
                      <path strokeLinecap="square" strokeLinejoin="miter" d={stat.icon} />
                    </svg>
                    <p className="font-display font-bold text-[#0A0A0A] text-4xl mb-2">{stat.value}</p>
                    <p className="font-body text-[#404040] text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 bg-[#0A0A0A] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-white font-body font-bold text-[10px] tracking-widest uppercase block mb-6">Our Protocol</span>
              <h2 className="font-display font-bold text-white text-4xl sm:text-6xl tracking-tighter uppercase">Standard of Excellence</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  title: 'Verified Integrity',
                  desc: 'Multi-point algorithmic and physical inspection. Absolute mechanical and structural fidelity.',
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  title: 'Absolute Transparency',
                  desc: 'Comprehensive provenance documentation. Accurate mileage. No concealed defects.',
                  icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
                },
                {
                  title: 'Market Optimization',
                  desc: 'Algorithmic pricing logic. Assured value. We enforce a strict price-match protocol.',
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                },
              ].map((item) => (
                <div key={item.title} className="border-2 border-[#404040] p-10 hover:border-white transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 mb-8 text-white">
                    <path strokeLinecap="square" strokeLinejoin="miter" d={item.icon} />
                  </svg>
                  <h3 className="font-display font-bold text-white text-2xl mb-4 tracking-tight uppercase">{item.title}</h3>
                  <p className="font-body text-[#E5E5E5] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-6 border-l-2 border-[#0A0A0A] pl-3">Headquarters</span>
                <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-6xl mb-12 tracking-tighter uppercase">Physical Space</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  {[
                    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Coordinates', value: 'Lagos, Nigeria' },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Voice Channel', value: '+234 800 000 0000' },
                    { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', label: 'W-App', value: '+234 800 000 0000' },
                    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Operating Hours', value: 'Mon–Sat: 08:00–18:00\nSun: 10:00–16:00' },
                  ].map((item) => (
                    <div key={item.label} className="border-2 border-[#E5E5E5] p-6">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 mb-4 text-[#0A0A0A]">
                        <path strokeLinecap="square" strokeLinejoin="miter" d={item.icon} />
                      </svg>
                      <p className="font-body text-[#0A0A0A] font-bold text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="font-body text-[#404040] text-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  ))}
                </div>
                <WhatsAppButton
                  phoneNumber="+2348000000000"
                  message="Hello! I'd like to visit your showroom. When would be a good time?"
                  label="Initialize Navigation Protocol"
                  size="lg"
                  id="about-whatsapp-btn"
                />
              </div>
              {/* Map placeholder */}
              <div className="border-2 border-[#0A0A0A] h-[600px] bg-[#F8F8F6] relative p-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.4630298755!2d3.1438720814941547!3d6.548055435593773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(120%)' }}
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
        <section className="py-32 bg-[#0A0A0A] border-t border-b border-[#404040]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-white text-5xl sm:text-7xl mb-6 uppercase tracking-tighter">Enter the Gallery</h2>
            <p className="font-body text-[#E5E5E5] text-sm uppercase tracking-widest font-bold mb-12 max-w-xl mx-auto">Access our curated inventory of exceptional vehicles.</p>
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#0A0A0A] hover:bg-transparent hover:text-white border-2 border-white font-body font-bold px-10 py-5 text-sm uppercase tracking-widest transition-colors duration-200"
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
