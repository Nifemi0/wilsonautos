import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function CTABanner() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-b border-[#404040]">
      {/* Brutalist geometric decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] skew-x-[-20deg] translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white opacity-[0.02] skew-x-[20deg] -translate-x-1/4" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-6 uppercase tracking-tighter">
          Ready to Acquire?
        </h2>
        <p className="font-body text-[#E5E5E5] text-sm uppercase tracking-widest font-bold mb-12 max-w-xl mx-auto">
          Your exceptional vehicle awaits. Initiate contact to secure your allocation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <WhatsAppButton
            phoneNumber="+2348000000000"
            message="Hello Wilson Express Autos! I am ready to buy a car. Please show me what you have available."
            label="Commence Dialogue"
            size="lg"
            id="cta-whatsapp-btn"
          />
          <a
            href="tel:+2348000000000"
            id="cta-call-btn"
            className="inline-flex items-center gap-3 bg-transparent border-2 border-white hover:bg-white text-white hover:text-[#0A0A0A] font-body font-bold px-10 py-5 text-sm uppercase tracking-widest rounded-full transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Direct Line
          </a>
        </div>
      </div>
    </section>
  )
}
