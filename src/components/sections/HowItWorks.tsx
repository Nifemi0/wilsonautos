const steps = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Browse & Search',
    description: 'Explore our verified inventory of tokunbo and Nigerian-used vehicles. Filter by make, price, and location.',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
    title: 'Chat on WhatsApp',
    description: 'Message us instantly. Our team responds within minutes to answer your questions and schedule a viewing.',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Inspect & Verify',
    description: 'Come see the car in person. We provide full inspection reports, clean papers, and verified history.',
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
      </svg>
    ),
    title: 'Drive Away Happy',
    description: 'Pay and drive. We handle all the paperwork and even offer after-sale support so you\'re never stuck.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-[#404040]">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-white font-body font-bold text-[10px] tracking-widest uppercase block mb-4 border-l-2 border-white pl-3 inline-block">
            Simple Process
          </span>
          <h2 className="font-display font-bold text-white text-4xl sm:text-6xl mb-6 tracking-tighter uppercase">
            Acquisition
          </h2>
          <p className="font-body text-[#E5E5E5] text-sm max-w-xl mx-auto uppercase tracking-widest font-bold">
            From curation to delivery — we orchestrate a seamless acquisition experience.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group p-6 border-2 border-[#404040] hover:border-white transition-colors duration-300">
              <div className="relative z-10">
                {/* Step number */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#404040]">
                  <div className="w-12 h-12 bg-white flex items-center justify-center text-[#0A0A0A] transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="font-display font-bold text-[#404040] group-hover:text-white transition-colors text-5xl leading-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-body text-[#E5E5E5] text-xs leading-relaxed font-bold tracking-widest">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <a
            href="https://wa.me/2348000000000?text=Hello%20Wilson%20Express%20Autos!%20I%20want%20to%20start%20the%20car%20buying%20process."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-[#0A0A0A] hover:bg-[#E5E5E5] font-display font-bold px-10 py-5 text-sm uppercase tracking-widest rounded-full transition-colors duration-200 shadow-[8px_8px_0px_0px_rgba(64,64,64,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Commence Acquisition
          </a>
        </div>
      </div>
    </section>
  )
}
