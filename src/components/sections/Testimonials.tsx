const testimonials = [
  {
    id: 1,
    name: 'Emeka Okafor',
    location: 'Lagos, Nigeria',
    avatar: 'EO',
    rating: 5,
    text: 'I bought my 2019 Toyota Camry from Wilson Express Autos and the experience was seamless. The car was exactly as described, papers were clean, and the price was fair. I will definitely come back!',
    car: '2019 Toyota Camry',
  },
  {
    id: 2,
    name: 'Fatima Aliyu',
    location: 'Abuja, Nigeria',
    avatar: 'FA',
    rating: 5,
    text: 'Wilson Express helped me find my dream Lexus RX 350. They were professional, patient, and transparent throughout the whole process. I felt no pressure at all. Highly recommend!',
    car: '2021 Lexus RX 350',
  },
  {
    id: 3,
    name: 'Chidi Nwachukwu',
    location: 'Port Harcourt, Nigeria',
    avatar: 'CN',
    rating: 5,
    text: 'Best car dealership in Nigeria! I messaged them on WhatsApp and within 24 hours I was driving my Honda CR-V home. The vehicle inspection report gave me confidence. 5 stars!',
    car: '2019 Honda CR-V',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < rating ? '#F59E0B' : 'none'}
          stroke="#F59E0B"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">
            Happy Customers
          </span>
          <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F8F6] rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-transparent hover:border-[#F59E0B]/30"
            >
              {/* Quote mark */}
              <div className="text-[#F59E0B] font-display text-6xl leading-none mb-2 select-none opacity-40">&ldquo;</div>

              <StarRating rating={t.rating} />

              <p className="font-body text-gray-600 text-sm leading-relaxed mt-4 mb-6">
                {t.text}
              </p>

              {/* Car tag */}
              <div className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 text-[#D97706] rounded-full px-3 py-1 text-xs font-semibold font-body mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
                  <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                </svg>
                {t.car}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E2030] flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-[#F59E0B] text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-display font-bold text-[#1E2030] text-sm">{t.name}</p>
                  <p className="font-body text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
