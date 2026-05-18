import { getAllCarsAdmin } from '@/lib/cars'
import ManageCarsClient from './ManageCarsClient'

export default async function ManageCarsPage() {
  const cars = await getAllCarsAdmin().catch(() => [])
  return <ManageCarsClient initialCars={cars} />
}
