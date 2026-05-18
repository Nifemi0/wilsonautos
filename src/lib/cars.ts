import { createClient, createPublicClient } from '@/lib/supabase/server'
import { DbCarInsert, DbCarWithImages } from '@/lib/database.types'
import { Car } from '@/types'
import { mockCars } from '@/data/mockCars'

const SUPABASE_CONFIGURED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')

// ── Map DB row → frontend Car type ──────────────────────────────────────────
function mapDbCar(row: DbCarWithImages): Car {
  const primary = row.car_images.find(i => i.is_primary) ?? row.car_images[0]
  const images = [
    ...(primary ? [primary.image_url] : []),
    ...row.car_images.filter(i => !i.is_primary).map(i => i.image_url),
  ]
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    price: row.price,
    condition: row.condition as Car['condition'],
    location: row.location,
    mileage: row.mileage ?? 0,
    transmission: (row.transmission ?? 'automatic') as Car['transmission'],
    fuelType: (row.fuel_type ?? 'petrol') as Car['fuelType'],
    bodyType: (row.body_type ?? 'sedan') as Car['bodyType'],
    colour: row.colour ?? '',
    description: row.description ?? '',
    images: images.length ? images : ['/placeholder-car.jpg'],
    whatsappNumber: row.whatsapp_number,
    status: row.status as Car['status'],
    featured: row.featured,
    createdAt: row.created_at,
  }
}

// ── Public: fetch available cars ─────────────────────────────────────────────
export async function getCars(opts?: { featured?: boolean; limit?: number }): Promise<Car[]> {
  if (!SUPABASE_CONFIGURED) {
    let cars = mockCars.filter(c => c.status === 'available')
    if (opts?.featured) cars = cars.filter(c => c.featured)
    if (opts?.limit) cars = cars.slice(0, opts.limit)
    return cars
  }

  const supabase = createPublicClient()
  let query = supabase
    .from('cars')
    .select('*, car_images(*)')
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  if (opts?.featured) query = query.eq('featured', true)
  if (opts?.limit) query = query.limit(opts.limit)

  const { data, error } = await query
  if (error) { console.error('[getCars]', error); return [] }
  return (data as DbCarWithImages[]).map(mapDbCar)
}

// ── Public: fetch single car ─────────────────────────────────────────────────
export async function getCarById(id: string): Promise<Car | null> {
  if (!SUPABASE_CONFIGURED) {
    return mockCars.find(c => c.id === id) ?? null
  }

  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('cars')
    .select('*, car_images(*)')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return mapDbCar(data as DbCarWithImages)
}

// ── Admin: fetch ALL cars (including draft/sold) ─────────────────────────────
export async function getAllCarsAdmin() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cars')
    .select('*, car_images(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as DbCarWithImages[]
}

// ── Admin: stats ─────────────────────────────────────────────────────────────
export async function getCarStats() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('cars').select('status')
  if (error || !data) return { total: 0, available: 0, sold: 0, draft: 0 }
  const rows = data as any[]
  const total = rows.length
  const available = rows.filter(r => r.status === 'available').length
  const sold = rows.filter(r => r.status === 'sold').length
  const draft = rows.filter(r => r.status === 'draft').length
  return { total, available, sold, draft }
}

// ── Admin: create car ─────────────────────────────────────────────────────────
export async function createCar(carData: DbCarInsert, imageUrls: { url: string; isPrimary: boolean }[]) {
  const supabase = await createClient()

  const { data: car, error: carError } = await (supabase.from('cars') as any)
    .insert(carData)
    .select()
    .single()

  if (carError) throw carError

  if (imageUrls.length) {
    const { error: imgError } = await (supabase.from('car_images') as any).insert(
      imageUrls.map(img => ({
        car_id: car.id,
        image_url: img.url,
        is_primary: img.isPrimary,
      }))
    )
    if (imgError) throw imgError
  }

  return car
}

// ── Admin: update car ─────────────────────────────────────────────────────────
export async function updateCar(id: string, updates: Partial<DbCarInsert>) {
  const supabase = await createClient()
  const { error } = await (supabase.from('cars') as any).update(updates).eq('id', id)
  if (error) throw error
}

// ── Admin: delete car (images cascade via FK) ────────────────────────────────
export async function deleteCar(id: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('cars') as any).delete().eq('id', id)
  if (error) throw error
}

// ── Admin: add image to existing car ─────────────────────────────────────────
export async function addCarImage(carId: string, imageUrl: string, isPrimary = false) {
  const supabase = await createClient()
  const { error } = await (supabase.from('car_images') as any).insert({ car_id: carId, image_url: imageUrl, is_primary: isPrimary })
  if (error) throw error
}

// ── Admin: remove image ───────────────────────────────────────────────────────
export async function deleteCarImage(imageId: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('car_images') as any).delete().eq('id', imageId)
  if (error) throw error
}
