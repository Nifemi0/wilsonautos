import { Car } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import HighlightText from './HighlightText'
import { getCarSlug } from '@/lib/utils'

interface CarCardProps {
  car: Car
  searchTerm?: string
}

function formatPrice(price: number): string {
  return '₦' + price.toLocaleString('en-NG')
}

function formatMileage(mileage: number): string {
  return mileage.toLocaleString('en-NG') + ' km'
}

export default function CarCard({ car, searchTerm = '' }: CarCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Wilson Express Autos, I am interested in the ${car.year} ${car.make} ${car.model} (ID: ${car.id}). Please provide more information.`
  )
  const whatsappUrl = `https://wa.me/${car.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`

  return (
    <article className="bg-white rounded-2xl overflow-hidden car-card shadow-md hover:shadow-2xl group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model} - ${car.colour}`}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {car.featured && (
            <span className="bg-[#F59E0B] text-[#1E2030] text-xs font-bold px-2.5 py-1 rounded-full font-body uppercase tracking-wide">
              Featured
            </span>
          )}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full font-body uppercase tracking-wide ${
              car.status === 'available'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {car.status === 'available' ? 'Available' : 'Sold'}
          </span>
        </div>

        {/* Condition badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#1E2030]/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full font-body capitalize">
            {car.condition === 'tokunbo' ? '🇺🇸 Tokunbo' : '🇳🇬 Nigerian Used'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="font-display font-bold text-[#1E2030] text-lg leading-tight line-clamp-1">
              <HighlightText
                text={`${car.year} ${car.make} ${car.model}`}
                searchTerm={searchTerm}
              />
            </h2>
            <p className="text-gray-500 text-sm font-body mt-0.5 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <HighlightText text={car.location} searchTerm={searchTerm} />
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display font-bold text-[#F59E0B] text-xl leading-tight">
              {formatPrice(car.price)}
            </p>
          </div>
        </div>

        {/* Colour highlight if matching */}
        {searchTerm && car.colour.toLowerCase().includes(searchTerm.toLowerCase()) && (
          <div className="mb-2">
            <span className="text-xs font-body text-gray-500">
              Colour:{' '}
              <HighlightText text={car.colour} searchTerm={searchTerm} className="font-semibold" />
            </span>
          </div>
        )}

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b border-gray-100">
          <div className="text-center">
            <p className="text-[#1E2030] font-bold text-sm font-body">{formatMileage(car.mileage)}</p>
            <p className="text-gray-400 text-xs font-body">Mileage</p>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <p className="text-[#1E2030] font-bold text-sm font-body capitalize">{car.transmission}</p>
            <p className="text-gray-400 text-xs font-body">Gearbox</p>
          </div>
          <div className="text-center">
            <p className="text-[#1E2030] font-bold text-sm font-body capitalize">{car.fuelType}</p>
            <p className="text-gray-400 text-xs font-body">Fuel</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/inventory/${getCarSlug(car)}`}
            className="flex-1 bg-[#1E2030] hover:bg-[#2a2d45] text-white text-sm font-semibold py-2.5 px-4 rounded-xl text-center transition-colors duration-200 font-body"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`car-whatsapp-${car.id}`}
            className="flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#22C05E] text-white rounded-xl transition-colors duration-200 flex-shrink-0"
            aria-label="Enquire on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
