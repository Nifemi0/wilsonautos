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
      <section className="py-20 bg-white border-t border-[#404040]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-4 border-l-2 border-[#0A0A0A] pl-3 inline-block">
              Browse by Brand
            </span>
            <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-6xl tracking-tighter uppercase">
              Popular Marques
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {makes.map((make) => (
              <Link
                key={make.name}
                href={`/inventory?make=${make.name}`}
                className="group flex flex-col items-center gap-4 p-8 border-2 border-[#E5E5E5] bg-white hover:border-[#0A0A0A] transition-colors duration-300"
              >
                <span className="text-4xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">{make.icon}</span>
                <div className="text-center mt-2 border-t border-[#E5E5E5] group-hover:border-[#0A0A0A] pt-4 w-full transition-colors duration-300">
                  <p className="font-display font-bold text-[#0A0A0A] text-lg uppercase tracking-tight">
                    {make.name}
                  </p>
                  <p className="font-body text-[#404040] text-[10px] font-bold uppercase tracking-widest mt-1">{make.count} units</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-20 bg-[#FAFAFA] border-t border-[#E5E5E5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0A0A0A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-4 border-l-2 border-[#0A0A0A] pl-3 inline-block">
              Browse by Form
            </span>
            <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-6xl tracking-tighter uppercase">
              Silhouettes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {bodyTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/inventory?bodyType=${type.slug}`}
                className="group flex flex-col items-center gap-6 p-8 border-2 border-[#E5E5E5] bg-white hover:border-[#0A0A0A] transition-colors duration-300 hover:shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]"
              >
                <div className="text-[#0A0A0A] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Since type.icon is hardcoded with fill='#F59E0B', we will use grayscale filter to make it fit */}
                  <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
                    {type.icon}
                  </div>
                </div>
                <p className="font-display font-bold text-[#0A0A0A] text-sm uppercase tracking-widest text-center">
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
