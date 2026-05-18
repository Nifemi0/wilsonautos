'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toggleEnquiryStatusAction } from '@/app/actions/enquiries'
import { timeAgo } from '@/lib/utils'

interface EnquiriesClientProps {
  initialEnquiries: any[]
  cars: any[]
}

export default function EnquiriesClient({ initialEnquiries, cars }: EnquiriesClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [localEnquiries, setLocalEnquiries] = useState(initialEnquiries)

  // Get current filters from URL params
  const activeStatus = searchParams.get('status') || 'all'
  const activeDateRange = searchParams.get('dateRange') || 'all'
  const activeCarId = searchParams.get('carId') || 'all'

  // Update setLocalEnquiries if initialEnquiries changes
  if (JSON.stringify(initialEnquiries) !== JSON.stringify(localEnquiries) && !isPending) {
    setLocalEnquiries(initialEnquiries)
  }

  // Update filters in URL
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin/enquiries?${params.toString()}`)
  }

  // Double click or single click to mark as responded with optimistic transitions
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // Optimistic UI update
    const nextStatus = currentStatus === 'pending' ? 'responded' : 'pending'
    setLocalEnquiries((prev) =>
      prev.map((enq) => (enq.id === id ? { ...enq, status: nextStatus } : enq))
    )

    startTransition(async () => {
      const res = await toggleEnquiryStatusAction(id, currentStatus)
      if (!res.success) {
        // Revert on error
        setLocalEnquiries(initialEnquiries)
        alert('Failed to update status. Please try again.')
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-[#FBFBFA]/50 min-h-screen">
      {/* Header */}
      <div className="pb-6 border-b border-gray-100">
        <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-widest">Leads Dashboard</span>
        <h1 className="font-display font-extrabold text-[#1E2030] text-3.5xl tracking-tight mt-1">Manage Enquiries</h1>
        <p className="font-body text-gray-400 text-xs mt-0.5">Audit customer lead submissions and reply directly via secure WhatsApp routing.</p>
      </div>

      {/* Filters Panel */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
        <h3 className="font-display font-bold text-[#1E2030] text-sm mb-4">Filter Leads</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status filter */}
          <div>
            <label className="block font-body text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Status</label>
            <select
              value={activeStatus}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-[#1E2030] bg-[#FBFBFA]/50 focus:outline-none focus:border-[#F59E0B] transition-colors"
            >
              <option value="all">All Enquiries</option>
              <option value="pending">Pending Review</option>
              <option value="responded">Responded</option>
            </select>
          </div>

          {/* Date range filter */}
          <div>
            <label className="block font-body text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Date Submitted</label>
            <select
              value={activeDateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-[#1E2030] bg-[#FBFBFA]/50 focus:outline-none focus:border-[#F59E0B] transition-colors"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Car filter */}
          <div>
            <label className="block font-body text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">By Vehicle</label>
            <select
              value={activeCarId}
              onChange={(e) => handleFilterChange('carId', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-[#1E2030] bg-[#FBFBFA]/50 focus:outline-none focus:border-[#F59E0B] transition-colors"
            >
              <option value="all">All Vehicles</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.year} {car.make} {car.model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {localEnquiries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-gray-400">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="font-display font-bold text-[#1E2030] text-lg mb-1">No Enquiries Found</h3>
            <p className="font-body text-gray-400 text-sm">Try broadening your filter criteria or checking back later.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {localEnquiries.map((enq) => {
              const whatsappUrl = `https://wa.me/${(enq.buyer_phone || '').replace('+', '')}?text=${encodeURIComponent(
                `Hello ${enq.buyer_name || 'there'}! This is Wilson Express Autos replying to your enquiry about the ${enq.cars ? `${enq.cars.year} ${enq.cars.make} ${enq.cars.model}` : 'vehicle'}.`
              )}`

              const initials = enq.buyer_name ? enq.buyer_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'AN'

              return (
                <div key={enq.id} className="p-6 hover:bg-[#FBFBFA]/70 transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    {/* Buyer Specs */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Initials Avatar badge */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1E2030] to-[#2a2d45] flex items-center justify-center text-white font-display font-extrabold text-xs shadow-sm flex-shrink-0">
                        {initials}
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h4 className="font-display font-bold text-[#1E2030] text-base leading-tight">
                            {enq.buyer_name || 'Anonymous Client'}
                          </h4>
                          <span className="font-body text-xs text-gray-400 font-medium">
                            {timeAgo(enq.created_at)}
                          </span>
                        </div>
                        
                        {enq.cars && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#F59E0B] text-xs font-extrabold font-body uppercase tracking-wider">
                              🚘 {enq.cars.year} {enq.cars.make} {enq.cars.model}
                            </span>
                          </div>
                        )}

                        <div className="pt-1.5 max-w-2xl">
                          <p className="font-body text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-[#FBFBFA] p-4 rounded-2xl border border-gray-100/70 shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)] italic">
                            &ldquo;{enq.message || 'Requested callback for full specifications.'}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 flex-shrink-0 pt-2 md:pt-0">
                      {/* Interactive toggle status button */}
                      <button
                        onClick={() => handleToggleStatus(enq.id, enq.status)}
                        disabled={isPending}
                        className={`font-body text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all duration-200 border ${
                          enq.status === 'responded'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
                            : 'bg-amber-50 text-amber-600 border-amber-100/60 hover:bg-amber-100/30'
                        }`}
                      >
                        {enq.status === 'responded' ? '✓ Responded' : '● Mark Responded'}
                      </button>

                      {enq.buyer_phone && (
                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#22C05E] hover:shadow-[0_4px_12px_rgba(37,211,102,0.2)] text-white font-body text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Reply
                          </a>
                          <a
                            href={`tel:${enq.buyer_phone}`}
                            className="bg-gray-100 hover:bg-gray-200 text-[#1E2030] font-body text-xs font-bold p-2.5 rounded-xl transition-all duration-200"
                            title="Call Lead"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
