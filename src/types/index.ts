export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  condition: 'tokunbo' | 'nigerian-used'
  location: string
  mileage: number
  transmission: 'automatic' | 'manual'
  fuelType: 'petrol' | 'diesel'
  bodyType: 'sedan' | 'suv' | 'pickup' | 'bus' | 'hatchback' | 'coupe'
  colour: string
  description: string
  images: string[]
  whatsappNumber: string
  status: 'available' | 'sold'
  featured: boolean
  createdAt: string
}

export interface FilterState {
  make: string
  bodyType: string[]
  condition: string
  priceMin: string
  priceMax: string
  transmission: string
  fuelType: string
  yearMin: string
  yearMax: string
}
