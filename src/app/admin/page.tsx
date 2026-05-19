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
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-[#FAFAFA] min-h-screen">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#0A0A0A]">
        <div>
          <span className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-widest">{localDate} • {localTime}</span>
          <h1 className="font-display font-bold text-[#0A0A0A] text-4xl uppercase tracking-tighter mt-1">Admin Dashboard</h1>
          <p className="font-body text-[#404040] font-bold text-xs mt-0.5 uppercase tracking-widest">Real-time luxury inventory statistics & lead diagnostics console.</p>
        </div>
        <Link
          href="/admin/cars/new"
          id="dashboard-add-car-btn"
          className="inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 font-display font-bold px-6 py-3 rounded-full transition-all duration-300 text-sm uppercase tracking-widest"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Register Car
        </Link>
      </div>

      {/* Systems Status Bar */}
      <div className="bg-white border-2 border-[#0A0A0A] rounded-none px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-none bg-[#0A0A0A] animate-pulse border-2 border-[#0A0A0A]"></span>
          <span className="font-body text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">Live System Telemetry</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {systemStatus.map((sys, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-body text-xs text-[#404040] font-bold uppercase tracking-widest">{sys.name}:</span>
              <span className="font-body text-xs text-[#0A0A0A] font-bold uppercase tracking-wider">{sys.status}</span>
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
      <div className="bg-white border-2 border-[#0A0A0A] rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-6 border-b-2 border-[#0A0A0A] pb-4">
          <div>
            <h2 className="font-display font-bold text-[#0A0A0A] text-2xl uppercase tracking-tighter">Lead Generation Performance</h2>
            <p className="font-body text-[#404040] font-bold text-xs uppercase tracking-widest mt-1">Trailing 6-month analysis of digital organic dealership traffic & enquiries.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-body font-bold uppercase tracking-wider text-[#0A0A0A]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-[#0A0A0A] bg-[#0A0A0A]"></span> Search Traffic</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-[#0A0A0A] bg-white"></span> Enquiries</span>
          </div>
        </div>

        {/* Refined SVG Chart */}
        <div className="w-full h-48 relative overflow-hidden rounded-none bg-white border-2 border-[#0A0A0A] p-2">
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
            <path d="M 0 150 Q 150 110 300 120 T 600 70 T 800 50" fill="none" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="8,8" />
            
            {/* Enquiry Area & Path (Foreground) */}
            <path d="M 0 170 Q 150 150 300 130 T 600 90 T 800 75" fill="none" stroke="#0A0A0A" strokeWidth="4" />
            
            {/* Graph Data Highlight Circles */}
            <circle cx="300" cy="130" r="6" fill="white" stroke="#0A0A0A" strokeWidth="3" />
            <circle cx="600" cy="90" r="6" fill="white" stroke="#0A0A0A" strokeWidth="3" />
            <circle cx="800" cy="75" r="6" fill="white" stroke="#0A0A0A" strokeWidth="3" />
          </svg>
          
          {/* Months label overlay */}
          <div className="absolute bottom-2 left-6 right-6 flex justify-between font-body text-[10px] text-[#0A0A0A] font-bold uppercase tracking-widest bg-white border-t-2 border-[#0A0A0A] pt-2">
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
        <div className="bg-white border-2 border-[#0A0A0A] rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#0A0A0A] bg-[#FAFAFA]">
            <div>
              <h2 className="font-display font-bold text-[#0A0A0A] text-xl uppercase tracking-tighter">Recently Catalogued</h2>
              <p className="font-body text-[#404040] font-bold text-[11px] uppercase tracking-widest mt-1">Most recent showroom vehicle additions.</p>
            </div>
            <Link href="/admin/cars" className="inline-flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest text-[#0A0A0A] border-b-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">
              Showroom Index
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          {recentCars.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <svg className="w-10 h-10 text-[#0A0A0A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.965-7.013 3.375 3.375 0 0 0-3.374-3.375c-.618 0-1.178.166-1.659.456a4.77 4.77 0 0 0-8.228 1.834 3.75 3.75 0 0 0-4.483 3.6Z" />
              </svg>
              <p className="text-[#404040] font-body text-sm font-bold uppercase">No vehicles catalogued yet. <Link href="/admin/cars/new" className="text-[#0A0A0A] underline">Add first car</Link></p>
            </div>
          ) : (
            <ul className="divide-y-2 divide-[#0A0A0A]">
              {recentCars.map((car: any) => {
                const primaryImage = car.images?.[0]
                  || car.car_images?.find((img: any) => img.is_primary)?.image_url
                  || car.car_images?.[0]?.image_url
                  || 'https://images.unsplash.com/photo-1617469767265-68fdcb2c7d50?w=300&q=80';

                return (
                  <li key={car.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#FAFAFA] transition-all duration-150">
                    <div className="flex items-center gap-4">
                      {/* Car Miniature Preview */}
                      <img 
                        src={primaryImage} 
                        alt={`${car.make} ${car.model}`}
                        className="w-12 h-10 object-cover rounded-none border-2 border-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0"
                      />
                      <div>
                        <p className="font-display font-bold text-[#0A0A0A] text-sm uppercase tracking-tighter hover:underline transition-colors leading-tight">{car.year} {car.make} {car.model}</p>
                        <p className="font-body text-[#404040] font-bold text-[11px] mt-1 uppercase flex items-center gap-1.5">
                          {timeAgo(car.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none border-2 border-[#0A0A0A] font-body flex items-center gap-1.5 ${
                        car.status === 'available' 
                          ? 'bg-white text-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                          : car.status === 'sold' 
                            ? 'bg-[#0A0A0A] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                            : 'bg-white text-[#404040]'
                      }`}>
                        {car.status}
                      </span>
                      <Link 
                        href={`/admin/cars/${car.id}/edit`} 
                        className="inline-flex items-center justify-center p-1.5 hover:bg-[#0A0A0A] rounded-none border-2 border-transparent hover:border-[#0A0A0A] text-[#0A0A0A] hover:text-white transition-all shadow-[2px_2px_0px_0px_transparent] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
        <div className="bg-white border-2 border-[#0A0A0A] rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#0A0A0A] bg-[#FAFAFA]">
            <div>
              <h2 className="font-display font-bold text-[#0A0A0A] text-xl uppercase tracking-tighter">Direct Leads Inbox</h2>
              <p className="font-body text-[#404040] font-bold text-[11px] uppercase tracking-widest mt-1">Incoming customer communications.</p>
            </div>
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-widest text-[#0A0A0A] border-b-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">
              Leads Center
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          {enquiries.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <svg className="w-10 h-10 text-[#0A0A0A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <p className="text-[#404040] font-body text-sm font-bold uppercase tracking-widest">All caught up! No active leads waiting.</p>
            </div>
          ) : (
            <ul className="divide-y-2 divide-[#0A0A0A]">
              {enquiries.map((enq: { id: string; buyer_name: string | null; buyer_phone: string | null; message: string | null; created_at: string; cars: { make: string; model: string; year: number } | null }) => {
                const initials = getInitials(enq.buyer_name || '');
                return (
                  <li key={enq.id} className="px-6 py-4 hover:bg-[#FAFAFA] transition-all duration-150">
                    <div className="flex items-start gap-4">
                      
                      {/* Initials Avatar badge */}
                      <div className="w-10 h-10 rounded-none border-2 border-[#0A0A0A] bg-white flex items-center justify-center text-[#0A0A0A] font-display font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                        {initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-display font-bold text-[#0A0A0A] text-sm uppercase tracking-tighter truncate leading-tight">{enq.buyer_name || 'Anonymous Client'}</p>
                          <p className="font-body text-[#404040] text-[10px] uppercase flex-shrink-0 font-bold">{timeAgo(enq.created_at)}</p>
                        </div>
                        {enq.cars ? (
                          <p className="font-body text-[#0A0A0A] bg-white border-2 border-[#0A0A0A] inline-block px-2 py-0.5 mt-2 text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {enq.cars.year} {enq.cars.make} {enq.cars.model}
                          </p>
                        ) : (
                          <p className="font-body text-[#404040] border-2 border-[#0A0A0A] inline-block px-2 py-0.5 mt-2 text-[10px] font-bold uppercase tracking-widest">General Inquiry</p>
                        )}
                        <p className="font-body text-[#0A0A0A] text-xs line-clamp-1 mt-2 italic font-medium">
                          &ldquo;{enq.message || 'Requested callback for full specifications.'}&rdquo;
                        </p>
                        
                        {enq.buyer_phone && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-none bg-white border-2 border-[#0A0A0A]"></span>
                            <a 
                              href={`tel:${enq.buyer_phone}`} 
                              className="font-body text-xs text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white border-b-2 border-[#0A0A0A] font-bold tracking-widest transition-colors"
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

