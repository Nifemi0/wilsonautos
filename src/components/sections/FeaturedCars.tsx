import { getCars } from '@/lib/cars'
import Link from 'next/link'
import Image from 'next/image'
import { getCarSlug } from '@/lib/utils'

function formatPrice(price: number): string {
  return '₦' + price.toLocaleString('en-NG')
}

export default async function FeaturedCars() {
  const featured = await getCars({ featured: true, limit: 6 })

  return (
    <section className="py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#0A0A0A] font-body font-bold text-[10px] tracking-widest uppercase block mb-3 border-l-2 border-[#0A0A0A] pl-3">
              Curated Selection
            </span>
            <h2 className="font-display font-bold text-[#0A0A0A] text-4xl sm:text-5xl uppercase tracking-tighter">
              Featured Gallery
            </h2>
            <p className="font-body text-[#404040] mt-3 max-w-md">
              Our most exceptional vehicles — hand-selected for pristine condition and provenance.
            </p>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-[#0A0A0A] font-body font-bold text-xs uppercase tracking-widest border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white px-6 py-3 rounded-full transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Explore Collection
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Featured Grid — hero card + 5 smaller */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Big hero card — first featured car */}
            <Link
              href={`/inventory/${getCarSlug(featured[0])}`}
              className="lg:col-span-2 group relative border-2 border-[#E5E5E5] hover:border-[#0A0A0A] overflow-hidden bg-white transition-colors duration-300 min-h-[400px] flex flex-col justify-end"
            >
              <Image
                src={featured[0].images[0]}
                alt={`${featured[0].year} ${featured[0].make} ${featured[0].model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Minimal light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-500" />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                {featured[0].featured && (
                  <span className="bg-[#0A0A0A] text-white text-[10px] font-bold px-3 py-1 font-body uppercase tracking-widest border border-[#0A0A0A]">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-body text-white group-hover:text-[#404040] text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors">
                  {featured[0].condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}
                </p>
                <h3 className="font-display font-bold text-white group-hover:text-[#0A0A0A] text-3xl sm:text-4xl mb-3 transition-colors tracking-tight">
                  {featured[0].year} {featured[0].make} {featured[0].model}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-white/80 group-hover:text-[#404040] font-body text-xs uppercase tracking-widest font-bold transition-colors">
                    <span>{featured[0].mileage.toLocaleString()} km</span>
                    <span>·</span>
                    <span className="capitalize">{featured[0].transmission}</span>
                  </div>
                  <p className="font-display font-bold text-white group-hover:text-[#0A0A0A] text-2xl transition-colors">
                    {formatPrice(featured[0].price)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Right column — 2 stacked smaller cards */}
            <div className="flex flex-col gap-6">
              {featured.slice(1, 3).map((car) => (
                <Link
                  key={car.id}
                  href={`/inventory/${getCarSlug(car)}`}
                  className="group relative border-2 border-[#E5E5E5] hover:border-[#0A0A0A] overflow-hidden bg-white transition-colors duration-300 flex-1 min-h-[180px] flex flex-col justify-end p-5"
                >
                  <div className="absolute inset-0 bg-[#F3F4F6] z-0">
                    <Image
                      src={car.images[0]}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent z-10" />
                  
                  <div className="relative z-20">
                    <p className="font-body text-[#0A0A0A] text-[10px] uppercase tracking-widest font-bold mb-1">
                      {car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}
                    </p>
                    <h3 className="font-display font-bold text-[#0A0A0A] text-xl leading-tight mb-2 tracking-tight">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[#0A0A0A] text-lg">
                        {formatPrice(car.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Second row — 3 equal cards */}
        {featured.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {featured.slice(3, 6).map((car) => (
              <Link
                key={car.id}
                href={`/inventory/${getCarSlug(car)}`}
                className="group relative border-2 border-[#E5E5E5] hover:border-[#0A0A0A] overflow-hidden bg-white transition-colors duration-300 min-h-[260px] flex flex-col justify-end p-5"
              >
                <div className="absolute inset-0 bg-[#F3F4F6] z-0">
                  <Image
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent z-10" />
                
                <div className="relative z-20">
                  <p className="font-body text-[#0A0A0A] text-[10px] uppercase tracking-widest font-bold mb-1">
                    {car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}
                  </p>
                  <h3 className="font-display font-bold text-[#0A0A0A] text-xl leading-tight mb-2 tracking-tight">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-body text-[#404040] text-xs font-bold uppercase tracking-widest">
                      {car.mileage.toLocaleString()} km
                    </span>
                    <span className="font-display font-bold text-[#0A0A0A]">
                      {formatPrice(car.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/inventory"
            className="inline-flex items-center justify-center bg-[#0A0A0A] hover:bg-[#404040] text-white font-display font-bold px-10 py-5 text-sm uppercase tracking-widest rounded-full transition-colors duration-200 gap-3"
          >
            View Full Inventory
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
