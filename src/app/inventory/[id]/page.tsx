import { getCarById, getCars } from '@/lib/cars'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { parseIdFromSlug, getCarSlug } from '@/lib/utils'
import CarDetailClient from './CarDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export const revalidate = 60 // ISR revalidation interval

// Generate static params for available inventory
export async function generateStaticParams() {
  try {
    const cars = await getCars()
    return cars.map((car) => ({
      id: getCarSlug(car),
    }))
  } catch (error) {
    console.error('Failed to generate static params for cars:', error)
    return []
  }
}

// Dynamic SEO and OpenGraph generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params
  const id = parseIdFromSlug(slug)
  const car = await getCarById(id)
  if (!car) return { title: 'Car Not Found — Wilson Express Autos' }

  const title = `${car.year} ${car.make} ${car.model} (${car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'})`
  const description = `Buy this clean ${car.year} ${car.make} ${car.model} in ${car.location}. Condition: ${car.condition === 'tokunbo' ? 'Tokunbo' : 'Nigerian Used'}. Mileage: ${car.mileage.toLocaleString()}km. Price: ₦${car.price.toLocaleString()}. Contact Wilson Express Autos to drive your dream.`
  const imageUrl = car.images[0] || '/placeholder-car.jpg'
  const seoUrl = `https://wilsonexpressautos.com/inventory/${getCarSlug(car)}`

  return {
    title,
    description,
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      title,
      description,
      url: seoUrl,
      siteName: 'Wilson Express Autos',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${car.year} ${car.make} ${car.model}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id: slug } = await params
  const id = parseIdFromSlug(slug)
  const car = await getCarById(id)
  if (!car) notFound()

  // Google JSON-LD schema markup for car listings
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': `${car.year} ${car.make} ${car.model}`,
    'description': car.description,
    'image': car.images,
    'brand': {
      '@type': 'Brand',
      'name': car.make,
    },
    'model': car.model,
    'vehicleModelDate': car.year,
    'mileageFromOdometer': {
      '@type': 'QuantitativeValue',
      'value': car.mileage,
      'unitCode': 'KMT',
    },
    'vehicleTransmission': car.transmission,
    'fuelType': car.fuelType,
    'color': car.colour,
    'offers': {
      '@type': 'Offer',
      'price': car.price,
      'priceCurrency': 'NGN',
      'availability': car.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'itemCondition': car.condition === 'tokunbo' ? 'https://schema.org/UsedCondition' : 'https://schema.org/UsedCondition',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <CarDetailClient car={car} />
    </>
  )
}
