import { MetadataRoute } from 'next'
import { getCars } from '@/lib/cars'
import { getCarSlug } from '@/lib/utils'

export const revalidate = 3600 // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wilsonexpressautos.com'

  let carUrls: MetadataRoute.Sitemap = []
  try {
    const cars = await getCars()
    carUrls = cars.map((car) => ({
      url: `${baseUrl}/inventory/${getCarSlug(car)}`,
      lastModified: new Date(car.createdAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to generate sitemap routes for cars:', error)
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...carUrls,
  ]
}
