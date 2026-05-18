import { createClient } from '@/lib/supabase/server'

export interface EnquiryInsert {
  car_id?: string
  buyer_name?: string
  buyer_phone?: string
  message?: string
  status?: string
}

// Public: submit an enquiry
export async function createEnquiry(data: EnquiryInsert) {
  const supabase = await createClient()
  const { error } = await (supabase.from('enquiries') as any).insert({
    ...data,
    status: data.status || 'pending'
  })
  if (error) throw error
}

// Admin: get all enquiries with car info and filter options
export async function getEnquiries(filters?: {
  carId?: string
  status?: string
  dateRange?: string // 'today' | 'week' | 'month' | 'all'
}) {
  const supabase = await createClient()
  let query = supabase
    .from('enquiries')
    .select('*, cars(id, make, model, year)')

  if (filters?.carId && filters.carId !== 'all') {
    query = query.eq('car_id', filters.carId)
  }

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.dateRange && filters.dateRange !== 'all') {
    const now = new Date()
    if (filters.dateRange === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      query = query.gte('created_at', today)
    } else if (filters.dateRange === 'week') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      query = query.gte('created_at', oneWeekAgo)
    } else if (filters.dateRange === 'month') {
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      query = query.gte('created_at', oneMonthAgo)
    }
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error
  return data
}

// Admin: recent 5 enquiries for dashboard
export async function getRecentEnquiries() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('enquiries')
    .select('*, cars(make, model, year)')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) return []
  return data
}

export async function getEnquiryCount() {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })

  if (error) return 0
  return count ?? 0
}

// Admin: update enquiry status (e.g. mark as responded)
export async function updateEnquiryStatus(id: string, status: 'pending' | 'responded') {
  const supabase = await createClient()
  const { error } = await (supabase.from('enquiries') as any)
    .update({ status })
    .eq('id', id)

  if (error) throw error
}
