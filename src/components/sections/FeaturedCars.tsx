import { getCars } from '@/lib/cars'
import CarCard from '@/components/ui/CarCard'
import Link from 'next/link'

export default async function FeaturedCars() {
  const featured = await getCars({ featured: true, limit: 6 })

  return (
    <section className="py-20 bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#F59E0B] font-body font-semibold text-sm tracking-widest uppercase block mb-3">
              Handpicked for You
            </span>
            <h2 className="font-display font-bold text-[#1E2030] text-4xl sm:text-5xl gold-underline">
              Featured Inventory
            </h2>
          </div>
          <Link
            href="/inventory"
            className="text-[#1E2030] font-body font-semibold text-sm border-b-2 border-[#F59E0B] pb-0.5 hover:text-[#F59E0B] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            View All Cars →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/inventory"
            id="featured-view-all-btn"
            className="inline-flex items-center gap-2 bg-[#1E2030] hover:bg-[#2a2d45] text-white font-display font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 text-base"
          >
            Browse All Cars
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
