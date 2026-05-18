import { getAllCarsAdmin } from '@/lib/cars'
import { notFound } from 'next/navigation'
import CarForm from '@/components/admin/CarForm'
import { DbCarWithImages } from '@/lib/database.types'

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let car: DbCarWithImages | null = null

  try {
    const cars = await getAllCarsAdmin()
    car = cars.find(c => c.id === id) ?? null
  } catch {
    // Supabase not configured
  }

  if (!car) return notFound()

  const initialImages = car.car_images.map(img => ({
    url: img.image_url,
    publicId: img.id,
    isPrimary: img.is_primary,
  }))

  const initialData = {
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    condition: car.condition,
    location: car.location,
    whatsapp_number: car.whatsapp_number,
    status: car.status,
    featured: car.featured,
    mileage: car.mileage ?? undefined,
    transmission: car.transmission ?? undefined,
    fuel_type: car.fuel_type ?? undefined,
    body_type: car.body_type ?? undefined,
    colour: car.colour ?? '',
    description: car.description ?? '',
  }

  return (
    <CarForm
      mode="edit"
      carId={id}
      initialData={initialData}
      initialImages={initialImages}
    />
  )
}
