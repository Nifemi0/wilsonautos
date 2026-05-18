const features = [
  {
    id: 'verified',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Verified Cars',
    description: 'Every vehicle goes through a thorough inspection and verification process before listing.',
  },
  {
    id: 'price',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Best Prices',
    description: 'We offer the most competitive prices in the market. No hidden fees, no surprises.',
  },
  {
    id: 'whatsapp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    title: 'WhatsApp Support',
    description: 'Reach us instantly on WhatsApp. Chat with our team anytime during business hours.',
  },
  {
    id: 'payment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: 'Flexible Payment',
    description: 'We work with you on financing options to make your dream car a reality.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">
              Why We&apos;re Different
            </span>
            <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl mb-6 gold-underline">
              Why Choose Wilson Express?
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
              We&apos;re not just selling cars — we&apos;re helping Nigerians drive their dreams.
              With years of experience and hundreds of satisfied customers, we&apos;ve built a
              reputation for trust, quality, and unbeatable value.
            </p>
            <div className="flex flex-col gap-4">
              {['Clean Papers, No Stress', 'Free Vehicle History Check', 'After-sale Support'].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1E2030" strokeWidth="3" className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="font-body text-[#1E2030] font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={feature.id}
                className={`p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 ${
                  i % 2 === 0 ? 'bg-[#1E2030] text-white' : 'bg-white border border-gray-100 shadow-sm text-[#1E2030]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  i % 2 === 0 ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`font-display font-bold text-base mb-2 ${i % 2 === 0 ? 'text-white' : 'text-[#1E2030]'}`}>
                  {feature.title}
                </h3>
                <p className={`font-body text-sm leading-relaxed ${i % 2 === 0 ? 'text-white/60' : 'text-gray-500'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
