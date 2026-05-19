'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E5E5] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="font-display font-bold text-2xl tracking-tighter text-[#0A0A0A]">
              WILSON<span className="text-[#404040]">AUTOS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs font-bold uppercase tracking-widest transition-colors duration-200 relative group ${
                  pathname === link.href ? 'text-[#0A0A0A]' : 'text-[#404040] hover:text-[#0A0A0A]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#0A0A0A] transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+2348000000000" className="text-[#0A0A0A] font-body text-xs font-bold tracking-widest hover:text-[#404040] transition-colors">
              +234 800 000 0000
            </a>
            <Link
              href="/inventory"
              className="bg-[#0A0A0A] hover:bg-[#404040] text-white font-body text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
            >
              Inventory
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/inventory"
              className="bg-[#0A0A0A] hover:bg-[#404040] text-white font-body text-[10px] font-bold uppercase tracking-widest px-4 py-2"
            >
              Cars
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#0A0A0A] p-2"
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E5E5E5] transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 border-t' : 'max-h-0 border-t-0'
        }`}
      >
        <div className="px-4 py-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block font-body text-xs font-bold uppercase tracking-widest ${
                pathname === link.href ? 'text-[#0A0A0A]' : 'text-[#404040]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+2348000000000"
            className="block font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] pt-4 border-t border-[#E5E5E5]"
          >
            Call Us: +234 800 000 0000
          </a>
        </div>
      </div>
    </nav>
  )
}
