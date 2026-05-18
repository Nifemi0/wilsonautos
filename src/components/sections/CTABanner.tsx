import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function CTABanner() {
  return (
    <section className="py-20 bg-[#F59E0B] relative overflow-hidden">
      {/* Diagonal background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D97706]/30 skew-x-[-12deg] translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl lg:text-6xl mb-4">
          Ready to Drive?
        </h2>
        <p className="font-body text-[#1E2030]/70 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Your dream car is just a WhatsApp message away. Contact us now and let&apos;s make it happen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppButton
            phoneNumber="+2348000000000"
            message="Hello Wilson Express Autos! I am ready to buy a car. Please show me what you have available."
            label="Chat on WhatsApp Now"
            size="lg"
            id="cta-whatsapp-btn"
          />
          <a
            href="tel:+2348000000000"
            id="cta-call-btn"
            className="inline-flex items-center gap-2 bg-[#1E2030] hover:bg-[#2a2d45] text-white font-body font-bold px-8 py-4 text-lg rounded-2xl transition-all duration-200 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}
