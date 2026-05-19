'use client'

import { useState, useEffect, useMemo, useCallback, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Car, FilterState } from '@/types'
import { mockCars } from '@/data/mockCars'
import { useDebounce } from '@/hooks/useDebounce'
import CarCard from '@/components/ui/CarCard'
import { SkeletonGrid } from '@/components/ui/CarCardSkeleton'
import FilterSidebar from '@/components/layout/FilterSidebar'
import FilterChips from '@/components/ui/FilterChips'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CARS_PER_PAGE = 12

const DEFAULT_FILTERS: FilterState = {
  make: '', bodyType: [], condition: '',
  priceMin: '', priceMax: '', transmission: '',
  fuelType: '', yearMin: '', yearMax: '',
}

// ---------- helpers ----------
function paramsToFilters(sp: URLSearchParams): FilterState {
  const bt = sp.get('bodyType')
  return {
    make: sp.get('make') || '',
    bodyType: bt ? bt.split(',').filter(Boolean) : [],
    condition: sp.get('condition') || '',
    priceMin: sp.get('priceMin') || '',
    priceMax: sp.get('priceMax') || '',
    transmission: sp.get('transmission') || '',
    fuelType: sp.get('fuelType') || '',
    yearMin: sp.get('yearMin') || '',
    yearMax: sp.get('yearMax') || '',
  }
}

function filtersToParams(f: FilterState, q: string, sort: string): URLSearchParams {
  const p = new URLSearchParams()
  if (q.trim().length >= 2) p.set('q', q.trim())
  if (f.make) p.set('make', f.make)
  if (f.bodyType.length) p.set('bodyType', f.bodyType.join(','))
  if (f.condition) p.set('condition', f.condition)
  if (f.priceMin) p.set('priceMin', f.priceMin)
  if (f.priceMax) p.set('priceMax', f.priceMax)
  if (f.transmission) p.set('transmission', f.transmission)
  if (f.fuelType) p.set('fuelType', f.fuelType)
  if (f.yearMin) p.set('yearMin', f.yearMin)
  if (f.yearMax) p.set('yearMax', f.yearMax)
  if (sort !== 'newest') p.set('sort', sort)
  return p
}

function countActiveFilters(f: FilterState, q: string): number {
  let n = q.trim().length >= 2 ? 1 : 0
  if (f.make) n++
  if (f.bodyType.length) n += f.bodyType.length
  if (f.condition) n++
  if (f.priceMin) n++
  if (f.priceMax) n++
  if (f.transmission) n++
  if (f.fuelType) n++
  if (f.yearMin) n++
  if (f.yearMax) n++
  return n
}

function applySearch(cars: Car[], term: string): Car[] {
  if (term.trim().length < 2) return cars
  const t = term.trim().toLowerCase()
  return cars.filter(c =>
    c.make.toLowerCase().includes(t) ||
    c.model.toLowerCase().includes(t) ||
    String(c.year).includes(t) ||
    c.colour.toLowerCase().includes(t) ||
    c.location.toLowerCase().includes(t)
  )
}

function applyFilters(cars: Car[], f: FilterState): Car[] {
  return cars.filter(c => {
    if (f.make && c.make !== f.make) return false
    if (f.bodyType.length && !f.bodyType.includes(c.bodyType)) return false
    if (f.condition && c.condition !== f.condition) return false
    if (f.priceMin && c.price < Number(f.priceMin)) return false
    if (f.priceMax && c.price > Number(f.priceMax)) return false
    if (f.transmission && c.transmission !== f.transmission) return false
    if (f.fuelType && c.fuelType !== f.fuelType) return false
    if (f.yearMin && c.year < Number(f.yearMin)) return false
    if (f.yearMax && c.year > Number(f.yearMax)) return false
    return true
  })
}

function sortCars(cars: Car[], sort: string): Car[] {
  return [...cars].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'year-desc') return b.year - a.year
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

// ---------- main page ----------
export default function InventoryPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Init from URL
  const [filters, setFilters] = useState<FilterState>(() => paramsToFilters(sp))
  const [searchInput, setSearchInput] = useState(() => sp.get('q') || '')
  const [sort, setSort] = useState(() => sp.get('sort') || 'newest')
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Pending drawer state (applied only on "Apply" tap)
  const [drawerFilters, setDrawerFilters] = useState<FilterState>(filters)

  const debouncedSearch = useDebounce(searchInput, 300)

  // Sync URL whenever filters/search/sort change
  useEffect(() => {
    const params = filtersToParams(filters, debouncedSearch, sort)
    const qs = params.toString()
    startTransition(() => {
      router.replace(`/inventory${qs ? `?${qs}` : ''}`, { scroll: false })
    })
    setPage(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, debouncedSearch, sort])

  // Keep drawer in sync when opened
  useEffect(() => {
    if (drawerOpen) setDrawerFilters(filters)
  }, [drawerOpen, filters])

  // Memoised pipeline
  const results = useMemo(() => {
    const searched = applySearch(mockCars, debouncedSearch)
    const filtered = applyFilters(searched, filters)
    return sortCars(filtered, sort)
  }, [debouncedSearch, filters, sort])

  const totalPages = Math.ceil(results.length / CARS_PER_PAGE)
  const paginated = useMemo(
    () => results.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE),
    [results, page]
  )

  // Stable callbacks
  const handleFilterChange = useCallback((key: keyof FilterState, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleDrawerFilterChange = useCallback((key: keyof FilterState, value: string | string[]) => {
    setDrawerFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchInput('')
    setSort('newest')
    setPage(1)
    router.replace('/inventory', { scroll: false })
  }, [router])

  const handleApplyDrawer = useCallback(() => {
    setFilters(drawerFilters)
    setDrawerOpen(false)
  }, [drawerFilters])

  // Chip removal
  const handleRemoveFilter = useCallback((key: keyof FilterState, value?: string) => {
    if (key === 'bodyType' && value) {
      setFilters(prev => ({ ...prev, bodyType: prev.bodyType.filter(t => t !== value) }))
    } else {
      setFilters(prev => ({ ...prev, [key]: key === 'bodyType' ? [] : '' }))
    }
  }, [])

  const handleClearSearch = useCallback(() => setSearchInput(''), [])

  const activeCount = countActiveFilters(filters, debouncedSearch)
  const isFiltering = isPending

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-white">

        {/* Header */}
        <div className="bg-[#0A0A0A] py-16 relative overflow-hidden border-b border-[#404040]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display font-bold text-white text-5xl sm:text-7xl mb-6 tracking-tighter uppercase">Our Collection</h1>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke={searchInput.trim().length >= 2 ? '#FFFFFF' : '#404040'} strokeWidth="2" className="w-5 h-5 transition-colors">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input
                id="inventory-search"
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search by make, model, year, colour…"
                className="w-full bg-transparent border-2 border-[#404040] text-white placeholder-[#E5E5E5] pl-12 pr-12 py-4 font-body text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-all"
              />
              {searchInput && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white hover:bg-[#E5E5E5] flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 10 10" fill="none" stroke="#0A0A0A" strokeWidth="2" className="w-3 h-3">
                    <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
                  </svg>
                </button>
              )}
              {searchInput.trim().length === 1 && (
                <p className="text-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest mt-3 ml-1">Type at least 2 characters to search</p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-6">
            <button
              id="mobile-filter-toggle"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-3 bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white px-6 py-4 font-body font-bold text-xs uppercase tracking-widest transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
              </svg>
              Filters
              {activeCount > 0 && (
                <span className="bg-white text-[#0A0A0A] border-2 border-currentColor text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
              className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setDrawerOpen(false)}
            />
            <div className={`absolute left-0 top-0 bottom-0 w-[320px] bg-white border-r-2 border-[#0A0A0A] overflow-y-auto p-8 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#E5E5E5]">
                <h2 className="font-display font-bold text-[#0A0A0A] text-2xl uppercase tracking-tighter">Filters</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
                  aria-label="Close filters"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" className="w-4 h-4">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <FilterSidebar
                filters={drawerFilters}
                onChange={handleDrawerFilterChange}
                onReset={() => { setDrawerFilters(DEFAULT_FILTERS); setFilters(DEFAULT_FILTERS); setSearchInput(''); setDrawerOpen(false) }}
                onApply={handleApplyDrawer}
                isDrawer
              />
            </div>
          </div>

          <div className="flex gap-12">
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white border-2 border-[#E5E5E5] p-8 sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(229,229,229,1)]">
                <FilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">

              {/* Active chips */}
              <FilterChips
                filters={filters}
                searchQuery={debouncedSearch}
                onRemoveFilter={handleRemoveFilter}
                onClearSearch={handleClearSearch}
                onClearAll={handleReset}
              />

              {/* Sort + count bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-[#E5E5E5] flex-wrap gap-4">
                <p className="font-body text-[#0A0A0A] text-xs font-bold uppercase tracking-widest">
                  {isFiltering ? (
                    <span className="text-[#404040] animate-pulse">Scanning…</span>
                  ) : (
                    <>
                      Showing <span className="text-[#0A0A0A] underline underline-offset-4 decoration-2">{paginated.length}</span> of{' '}
                      <span className="text-[#0A0A0A] underline underline-offset-4 decoration-2">{results.length}</span> allocations
                    </>
                  )}
                </p>
                <div className="relative">
                  <select
                    id="sort-dropdown"
                    value={sort}
                    onChange={e => { setSort(e.target.value); setPage(1) }}
                    className="appearance-none bg-transparent border-2 border-[#E5E5E5] hover:border-[#0A0A0A] pl-4 pr-10 py-3 font-body text-xs font-bold uppercase tracking-widest text-[#0A0A0A] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Ascending</option>
                    <option value="price-desc">Price: Descending</option>
                    <option value="year-desc">Year: Newest</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#0A0A0A]">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grid or states */}
              {isFiltering ? (
                <SkeletonGrid count={6} />
              ) : paginated.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginated.map(car => (
                    <CarCard key={car.id} car={car} searchTerm={debouncedSearch} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white border-2 border-[#E5E5E5]">
                  <div className="w-16 h-16 border-2 border-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" className="w-8 h-8">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-4 tracking-tight uppercase">Null Result</h3>
                  <p className="font-body text-[#404040] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                    {debouncedSearch.trim().length >= 2
                      ? `No inventory matches "${debouncedSearch.trim()}". Revise your parameters.`
                      : 'The current filter configuration yields no allocations.'}
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex bg-transparent border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-body font-bold text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!isFiltering && totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t-2 border-[#E5E5E5]">
                  <button
                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === 1}
                    className="w-12 h-12 border-2 border-[#E5E5E5] bg-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200"
                    aria-label="Previous page"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-12 h-12 font-body font-bold text-xs transition-colors duration-200 ${p === page ? 'bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]' : 'border-2 border-[#E5E5E5] text-[#0A0A0A] bg-white hover:border-[#0A0A0A]'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === totalPages}
                    className="w-12 h-12 border-2 border-[#E5E5E5] bg-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200"
                    aria-label="Next page"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
