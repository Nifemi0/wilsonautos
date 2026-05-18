import { getEnquiries } from '@/lib/enquiries'
import { getCars } from '@/lib/cars'
import EnquiriesClient from './EnquiriesClient'

interface PageProps {
  searchParams: Promise<{
    status?: string
    dateRange?: string
    carId?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage({ searchParams }: PageProps) {
  const params = await searchParams
  
  // Fetch filtered enquiries and all available cars for selection dropdown
  const [enquiries, cars] = await Promise.all([
    getEnquiries({
      status: params.status || 'all',
      dateRange: params.dateRange || 'all',
      carId: params.carId || 'all',
    }).catch(() => []),
    getCars().catch(() => []),
  ])

  return <EnquiriesClient initialEnquiries={enquiries} cars={cars} />
}
