'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

// Untyped client for client-side admin mutations
function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { DbCarWithImages } from '@/lib/database.types'

type Status = 'all' | 'available' | 'sold' | 'draft'

function formatPrice(p: number) { return '₦' + p.toLocaleString('en-NG') }
function formatDate(d: string) { return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) }

export default function ManageCarsClient({ initialCars }: { initialCars: DbCarWithImages[] }) {
  const router = useRouter()
  const [cars, setCars] = useState(initialCars)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<Status>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchStatus = status === 'all' || c.status === status
      const q = search.toLowerCase()
      const matchSearch = !q || c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
      return matchStatus && matchSearch
    })
  }, [cars, search, status])

  const handleMarkSold = useCallback(async (id: string) => {
    setActionLoading(id)
    const supabase = getSupabase()
    await (supabase.from('cars') as any).update({ status: 'sold' }).eq('id', id)
    setCars(prev => prev.map(c => c.id === id ? { ...c, status: 'sold' } : c))
    setActionLoading(null)
  }, [])

  const handleDelete = useCallback(async () => {
    if (!deleteId) return
    const supabase = getSupabase()
    await supabase.from('cars').delete().eq('id', deleteId)
    setCars(prev => prev.filter(c => c.id !== deleteId))
    setDeleteId(null)
    router.refresh()
  }, [deleteId, router])

  const STATUS_TABS: { value: Status; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'draft', label: 'Draft' },
  ]

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="font-display font-bold text-gray-900 text-3xl tracking-tight">Manage Cars</h1>
          <p className="font-body text-gray-500 text-sm mt-1">{cars.length} vehicles in showroom index</p>
        </div>
        <Link
          href="/admin/cars/new"
          id="manage-add-car-btn"
          className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white hover:bg-gray-800 shadow-sm hover:shadow-md font-display font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Car
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            id="manage-search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all"
          />
        </div>

        {/* Status tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 flex-wrap gap-1">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-all ${status === tab.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${status === tab.value ? 'text-gray-400' : 'text-gray-400'}`}>
                ({tab.value === 'all' ? cars.length : cars.filter(c => c.status === tab.value).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display font-semibold text-gray-900 text-lg mb-1">No Cars Found</p>
            <p className="font-body text-gray-500 text-sm mt-1">
              {search ? 'Try a different search term.' : 'Add your first car to get started.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500">
                  {['Car Spec', 'Year', 'Price Tag', 'Status Check', 'Added On', 'Operations Control'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-body text-xs font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(car => {
                  const primaryImage = car.car_images?.find((img: any) => img.is_primary)?.image_url
                    || car.car_images?.[0]?.image_url
                    || 'https://images.unsplash.com/photo-1617469767265-68fdcb2c7d50?w=300&q=80';

                  return (
                    <tr key={car.id} className="hover:bg-gray-50/70 transition-all duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={primaryImage} 
                            alt={`${car.make} ${car.model}`}
                            className="w-14 h-10 object-cover rounded-lg border border-gray-200 shadow-sm flex-shrink-0"
                          />
                          <div>
                            <p className="font-display font-semibold text-gray-900 text-sm leading-tight hover:text-blue-600 cursor-pointer transition-colors">{car.make} {car.model}</p>
                            <p className="font-body text-gray-500 text-xs mt-1 capitalize">{car.body_type} · {car.condition}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-gray-700">{car.year}</td>
                      <td className="px-5 py-4 font-display font-semibold text-gray-900 text-sm">{formatPrice(car.price)}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md font-body inline-flex items-center gap-1.5 ${
                          car.status === 'available' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                            : car.status === 'sold' 
                              ? 'bg-gray-100 text-gray-700 border border-gray-200' 
                              : 'bg-gray-50 text-gray-500'
                        }`}>
                          {car.status === 'available' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                          {car.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-body text-xs text-gray-500">{formatDate(car.created_at)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/cars/${car.id}/edit`}
                            className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-900 transition-colors"
                            title="Edit Listing"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </Link>
                          {car.status === 'available' && (
                            <button
                              onClick={() => handleMarkSold(car.id)}
                              disabled={actionLoading === car.id}
                              className="px-2.5 py-1 text-xs font-medium font-body text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === car.id ? '...' : 'Mark Sold'}
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteId(car.id)}
                            className="inline-flex items-center justify-center p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                            title="Delete Listing"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Car"
        description="This will permanently delete this car and all its images. This cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
