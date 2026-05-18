import Link from 'next/link'

const makes = [
  { name: 'Toyota', icon: '🚗', count: 5 },
  { name: 'Honda', icon: '🚙', count: 4 },
  { name: 'Mercedes-Benz', icon: '🏎️', count: 3 },
  { name: 'BMW', icon: '🚘', count: 3 },
  { name: 'Lexus', icon: '🛻', count: 3 },
  { name: 'Hyundai', icon: '🚐', count: 3 },
]

const bodyTypes = [
  {
    name: 'SUV',
    slug: 'suv',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="12" width="70" height="20" rx="4" fill="#F59E0B" opacity="0.2" />
        <rect x="15" y="5" width="45" height="18" rx="3" fill="#F59E0B" opacity="0.4" />
        <circle cx="18" cy="33" r="6" fill="#1E2030" />
        <circle cx="62" cy="33" r="6" fill="#1E2030" />
        <circle cx="18" cy="33" r="3" fill="#F59E0B" />
        <circle cx="62" cy="33" r="3" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: 'Sedan',
    slug: 'sedan',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="16" width="70" height="16" rx="3" fill="#F59E0B" opacity="0.2" />
        <rect x="20" y="8" width="38" height="16" rx="3" fill="#F59E0B" opacity="0.4" />
        <circle cx="20" cy="34" r="5" fill="#1E2030" />
        <circle cx="60" cy="34" r="5" fill="#1E2030" />
        <circle cx="20" cy="34" r="2.5" fill="#F59E0B" />
        <circle cx="60" cy="34" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: 'Pickup',
    slug: 'pickup',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="14" width="35" height="18" rx="3" fill="#F59E0B" opacity="0.2" />
        <rect x="10" y="7" width="25" height="15" rx="3" fill="#F59E0B" opacity="0.4" />
        <rect x="40" y="14" width="35" height="18" rx="3" fill="#F59E0B" opacity="0.15" />
        <circle cx="18" cy="34" r="5" fill="#1E2030" />
        <circle cx="62" cy="34" r="5" fill="#1E2030" />
        <circle cx="18" cy="34" r="2.5" fill="#F59E0B" />
        <circle cx="62" cy="34" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: 'Hatchback',
    slug: 'hatchback',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="16" width="70" height="16" rx="3" fill="#F59E0B" opacity="0.2" />
        <rect x="15" y="7" width="50" height="16" rx="8" fill="#F59E0B" opacity="0.4" />
        <circle cx="20" cy="34" r="5" fill="#1E2030" />
        <circle cx="60" cy="34" r="5" fill="#1E2030" />
        <circle cx="20" cy="34" r="2.5" fill="#F59E0B" />
        <circle cx="60" cy="34" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: 'Bus',
    slug: 'bus',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="8" width="70" height="24" rx="4" fill="#F59E0B" opacity="0.2" />
        <rect x="8" y="10" width="64" height="16" rx="2" fill="#F59E0B" opacity="0.3" />
        <circle cx="18" cy="34" r="5" fill="#1E2030" />
        <circle cx="62" cy="34" r="5" fill="#1E2030" />
        <circle cx="18" cy="34" r="2.5" fill="#F59E0B" />
        <circle cx="62" cy="34" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: 'Coupe',
    slug: 'coupe',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8">
        <rect x="5" y="18" width="70" height="14" rx="3" fill="#F59E0B" opacity="0.2" />
        <path d="M20 18 C25 8 45 8 60 18" fill="#F59E0B" opacity="0.4" />
        <circle cx="18" cy="34" r="5" fill="#1E2030" />
        <circle cx="62" cy="34" r="5" fill="#1E2030" />
        <circle cx="18" cy="34" r="2.5" fill="#F59E0B" />
        <circle cx="62" cy="34" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
]

export default function BrowseBy() {
  return (
    <>
      {/* Browse by Make */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">
              Browse by Brand
            </span>
            <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl">
              Popular Makes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {makes.map((make) => (
              <Link
                key={make.name}
                href={`/inventory?make=${make.name}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-transparent bg-[#F8F8F6] hover:border-[#F59E0B] hover:bg-[#F59E0B]/5 transition-all duration-200 hover:-translate-y-1"
              >
                <span className="text-3xl">{make.icon}</span>
                <div className="text-center">
                  <p className="font-display font-bold text-[#1E2030] text-sm group-hover:text-[#F59E0B] transition-colors leading-tight">
                    {make.name}
                  </p>
                  <p className="font-body text-gray-400 text-xs">{make.count} cars</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-20 bg-[#1E2030] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">
              Browse by Style
            </span>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
              Vehicle Types
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/inventory?bodyType=${type.slug}`}
                className="group flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-[#F59E0B]/20 border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {type.icon}
                </div>
                <p className="font-display font-bold text-white group-hover:text-[#F59E0B] text-sm text-center transition-colors">
                  {type.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
