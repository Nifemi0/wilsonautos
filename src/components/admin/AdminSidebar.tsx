'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: '/admin/cars',
    label: 'Manage Cars',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
      </svg>
    ),
  },
  {
    href: '/admin/enquiries',
    label: 'Manage Enquiries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: '/admin/cars/new',
    label: 'Add New Car',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile Header & Toggle */}
      <div className="md:hidden flex items-center justify-between bg-[#0A0A0A] p-4 text-white border-b-2 border-[#0A0A0A]">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-[#0A0A0A] rounded-none flex items-center justify-center border-2 border-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-sm tracking-tighter uppercase">Wilson Admin</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-white text-[#0A0A0A] rounded-full border-2 border-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <aside className={`${isOpen ? 'block' : 'hidden'} md:flex w-full md:w-64 bg-[#0A0A0A] md:min-h-screen flex-col flex-shrink-0 absolute md:static z-50 h-[calc(100vh-72px)] md:h-auto border-r-2 border-[#0A0A0A]`}>
        {/* Brand (Desktop Only) */}
        <div className="hidden md:block px-6 py-6 border-b-2 border-white/20">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-[#0A0A0A] rounded-none flex items-center justify-center border-2 border-[#0A0A0A] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight tracking-tighter uppercase">Wilson Autos</p>
              <p className="font-body text-[#E5E5E5] text-xs font-bold uppercase tracking-widest">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-150 font-body text-sm font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-white text-[#0A0A0A] border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]'
                    : 'text-[#E5E5E5] hover:bg-white hover:text-[#0A0A0A] border-2 border-transparent hover:border-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}

          {/* Divider */}
          <div className="border-t-2 border-white/20 my-6" />

          <Link
            href="/"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-none text-[#E5E5E5] hover:text-[#0A0A0A] hover:bg-white border-2 border-transparent hover:border-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all font-body text-sm font-bold uppercase tracking-wider"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 13v6a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Live Site
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="px-4 py-5 border-t-2 border-white/20">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-none text-[#E5E5E5] hover:text-white hover:bg-red-600 border-2 border-transparent hover:border-red-600 hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transition-all w-full font-body text-sm font-bold uppercase tracking-wider"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
