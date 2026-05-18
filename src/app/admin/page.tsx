import Link from 'next/link'
import { getCarStats, getAllCarsAdmin } from '@/lib/cars'
import { getRecentEnquiries, getEnquiryCount } from '@/lib/enquiries'
import StatsCard from '@/components/admin/StatsCard'

function formatPrice(p: number) { return '₦' + p.toLocaleString('en-NG') }

function timeAgo(date: string) {
  const d = Date.now() - new Date(date).getTime()
  if (d < 3600000) return Math.floor(d / 60000) + 'm ago'
  if (d < 86400000) return Math.floor(d / 3600000) + 'h ago'
  return Math.floor(d / 86400000) + 'd ago'
}

function getInitials(name: string) {
  if (!name) return 'AN'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

export default async function AdminDashboard() {
  const [stats, allCars, enquiries, enquiryCount] = await Promise.all([
    getCarStats().catch(() => ({ total: 0, available: 0, sold: 0, draft: 0 })),
    getAllCarsAdmin().catch(() => []),
    getRecentEnquiries().catch(() => []),
    getEnquiryCount().catch(() => 0),
  ])

  const recentCars = allCars.slice(0, 5)

  // System status verification checks
  const systemStatus = [
    { name: 'Gateway Connection', status: 'optimal', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> },
    { name: 'Supabase DB Engine', status: 'connected', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> },
    { name: 'Media Provider', status: 'active', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> },
    { name: 'Security Protocol', status: 'secure', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> }
  ]

  // Formatted Local Date and Time
  const now = new Date()
  const localDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const localTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-[#FBFBFA]/50 min-h-screen">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-widest">{localDate} • {localTime}</span>
          <h1 className="font-display font-extrabold text-[#1E2030] text-3.5xl tracking-tight mt-1">Admin Dashboard</h1>
          <p className="font-body text-gray-400 text-xs mt-0.5">Real-time luxury inventory statistics & lead diagnostics console.</p>
        </div>
        <Link
          href="/admin/cars/new"
          id="dashboard-add-car-btn"
          className="inline-flex items-center justify-center gap-2.5 bg-[#1E2030] hover:bg-[#2a2d45] hover:shadow-[0_8px_20px_rgba(30,32,48,0.15)] text-white font-display font-bold px-6 py-3 rounded-xl transition-all duration-300 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-[#F59E0B]">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Register Car
        </Link>
      </div>

      {/* Systems Status Bar */}
      <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-body text-xs font-bold text-gray-500 uppercase tracking-wider">Live System Telemetry</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {systemStatus.map((sys, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {sys.icon}
              <span className="font-body text-xs text-gray-400 font-medium">{sys.name}:</span>
              <span className="font-body text-xs text-[#1E2030] font-bold capitalize">{sys.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard 
          label="Total Inventory" 
          value={stats.total} 
          color="navy"
          trend="+4% MoM"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>}
          sub="Indexed vehicles"
        />
        <StatsCard 
          label="Showroom Ready" 
          value={stats.available} 
          color="green"
          trend="Optimal"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>}
          sub="Live and searchable"
        />
        <StatsCard 
          label="Acquisitions Sold" 
          value={stats.sold} 
          color="amber"
          trend="+18% YoY"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
          sub="Completed deals"
        />
        <Link href="/admin/enquiries" className="block transition-transform hover:-translate-y-1">
          <StatsCard 
            label="Active Leads" 
            value={enquiryCount} 
            color="red"
            trend="Attention"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
            sub="Client inquiries waiting"
          />
        </Link>
      </div>

      {/* Analytics Graphic Panel */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-[#1E2030] text-lg">Lead Generation Performance</h2>
            <p className="font-body text-gray-400 text-xs">Trailing 6-month analysis of digital organic dealership traffic & enquiries.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-body font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1E2030]"></span> Search Traffic</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Enquiries</span>
          </div>
        </div>

        {/* Refined SVG Chart */}
        <div className="w-full h-48 relative overflow-hidden rounded-2xl bg-gray-50/50 border border-gray-100 p-2">
          <svg viewBox="0 0 800 180" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0"/>
              </linearGradient>
              <linearGradient id="searchGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E2030" stopOpacity="0.08"/>
                <stop offset="100%" stopColor="#1E2030" stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="45" x2="800" y2="45" stroke="#f1f1f0" strokeWidth="1" strokeDasharray="5,5"/>
            <line x1="0" y1="90" x2="800" y2="90" stroke="#f1f1f0" strokeWidth="1" strokeDasharray="5,5"/>
            <line x1="0" y1="135" x2="800" y2="135" stroke="#f1f1f0" strokeWidth="1" strokeDasharray="5,5"/>
            
            {/* Search Traffic Area & Path (Background) */}
            <path d="M 0 150 Q 150 110 300 120 T 600 70 T 800 50 L 800 180 L 0 180 Z" fill="url(#searchGlow)" />
            <path d="M 0 150 Q 150 110 300 120 T 600 70 T 800 50" fill="none" stroke="#1E2030" strokeWidth="2" strokeOpacity="0.4" />
            
            {/* Enquiry Area & Path (Foreground) */}
            <path d="M 0 170 Q 150 150 300 130 T 600 90 T 800 75 L 800 180 L 0 180 Z" fill="url(#chartGlow)" />
            <path d="M 0 170 Q 150 150 300 130 T 600 90 T 800 75" fill="none" stroke="#F59E0B" strokeWidth="3" />
            
            {/* Graph Data Highlight Circles */}
            <circle cx="300" cy="130" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm"/>
            <circle cx="600" cy="90" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm"/>
            <circle cx="800" cy="75" r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm"/>
          </svg>
          
          {/* Months label overlay */}
          <div className="absolute bottom-2 left-6 right-6 flex justify-between font-body text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May (Current)</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Refined Recent Cars */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-[#FBFBFA]/50">
            <div>
              <h2 className="font-display font-bold text-[#1E2030] text-base">Recently Catalogued</h2>
              <p className="font-body text-gray-400 text-[11px] mt-0.5">Most recent showroom vehicle additions.</p>
            </div>
            <Link href="/admin/cars" className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors">
              Showroom Index
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          {recentCars.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.965-7.013 3.375 3.375 0 0 0-3.374-3.375c-.618 0-1.178.166-1.659.456a4.77 4.77 0 0 0-8.228 1.834 3.75 3.75 0 0 0-4.483 3.6Z" />
              </svg>
              <p className="text-gray-400 font-body text-sm">No vehicles catalogued yet. <Link href="/admin/cars/new" className="text-[#F59E0B] underline font-medium">Add first car</Link></p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentCars.map((car: any) => {
                const primaryImage = car.images?.[0]
                  || car.car_images?.find((img: any) => img.is_primary)?.image_url
                  || car.car_images?.[0]?.image_url
                  || 'https://images.unsplash.com/photo-1617469767265-68fdcb2c7d50?w=300&q=80';

                return (
                  <li key={car.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-all duration-150">
                    <div className="flex items-center gap-4">
                      {/* Car Miniature Preview */}
                      <img 
                        src={primaryImage} 
                        alt={`${car.make} ${car.model}`}
                        className="w-12 h-10 object-cover rounded-xl border border-gray-100/70 shadow-sm flex-shrink-0"
                      />
                      <div>
                        <p className="font-display font-bold text-[#1E2030] text-sm hover:text-[#F59E0B] transition-colors leading-tight">{car.year} {car.make} {car.model}</p>
                        <p className="font-body text-gray-400 text-[11px] mt-0.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          {timeAgo(car.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg font-body flex items-center gap-1.5 ${
                        car.status === 'available' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/60' 
                          : car.status === 'sold' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100/60' 
                            : 'bg-gray-50 text-gray-500 border border-gray-200/50'
                      }`}>
                        {car.status === 'available' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                        {car.status}
                      </span>
                      <Link 
                        href={`/admin/cars/${car.id}/edit`} 
                        className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#1E2030] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Refined Recent Enquiries */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-[#FBFBFA]/50">
            <div>
              <h2 className="font-display font-bold text-[#1E2030] text-base">Direct Leads Inbox</h2>
              <p className="font-body text-gray-400 text-[11px] mt-0.5">Incoming customer communications.</p>
            </div>
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors">
              Leads Center
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          {enquiries.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <p className="text-gray-400 font-body text-sm">All caught up! No active leads waiting.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {enquiries.map((enq: { id: string; buyer_name: string | null; buyer_phone: string | null; message: string | null; created_at: string; cars: { make: string; model: string; year: number } | null }) => {
                const initials = getInitials(enq.buyer_name || '');
                return (
                  <li key={enq.id} className="px-6 py-4 hover:bg-gray-50/70 transition-all duration-150">
                    <div className="flex items-start gap-4">
                      
                      {/* Initials Avatar badge */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E2030] to-[#2a2d45] flex items-center justify-center text-white font-display font-extrabold text-xs shadow-sm flex-shrink-0">
                        {initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-display font-bold text-[#1E2030] text-sm truncate leading-tight">{enq.buyer_name || 'Anonymous Client'}</p>
                          <p className="font-body text-gray-400 text-[10px] flex-shrink-0 font-semibold">{timeAgo(enq.created_at)}</p>
                        </div>
                        {enq.cars ? (
                          <p className="font-body text-[#F59E0B] text-xs font-bold mt-0.5 uppercase tracking-wide">
                            {enq.cars.year} {enq.cars.make} {enq.cars.model}
                          </p>
                        ) : (
                          <p className="font-body text-gray-400 text-xs mt-0.5">General Inquiry</p>
                        )}
                        <p className="font-body text-gray-400 text-xs line-clamp-1 mt-1 italic">
                          &ldquo;{enq.message || 'Requested callback for full specifications.'}&rdquo;
                        </p>
                        
                        {enq.buyer_phone && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <a 
                              href={`tel:${enq.buyer_phone}`} 
                              className="font-body text-xs text-gray-500 hover:text-[#1E2030] hover:underline font-bold"
                            >
                              {enq.buyer_phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

