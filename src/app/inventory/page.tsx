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
      <div className="pt-20 min-h-screen bg-[#F8F8F6]">

        {/* Header */}
        <div className="bg-[#1E2030] py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#F59E0B 1px,transparent 1px),linear-gradient(90deg,#F59E0B 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Our Inventory</h1>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke={searchInput.trim().length >= 2 ? '#F59E0B' : '#9CA3AF'} strokeWidth="2" className="w-5 h-5 transition-colors">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input
                id="inventory-search"
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search by make, model, year, colour…"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-12 pr-12 py-3.5 font-body text-sm focus:outline-none focus:border-[#F59E0B] focus:bg-white/15 transition-all"
              />
              {searchInput && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/20 hover:bg-[#F59E0B] flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3">
                    <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
                  </svg>
                </button>
              )}
              {searchInput.trim().length === 1 && (
                <p className="text-white/40 text-xs font-body mt-2 ml-1">Type at least 2 characters to search</p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-5">
            <button
              id="mobile-filter-toggle"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#1E2030] text-white px-5 py-3 rounded-xl font-body font-semibold text-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
              </svg>
              Filters
              {activeCount > 0 && (
                <span className="bg-[#F59E0B] text-[#1E2030] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setDrawerOpen(false)}
            />
            <div className={`absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-6 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-[#1E2030] text-xl">Filters</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                  aria-label="Close filters"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E2030" strokeWidth="2" className="w-4 h-4">
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

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
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
              <div className="flex items-center justify-between mb-5 bg-white rounded-2xl px-5 py-3 shadow-sm flex-wrap gap-3">
                <p className="font-body text-gray-500 text-sm">
                  {isFiltering ? (
                    <span className="text-[#F59E0B] font-medium animate-pulse">Searching…</span>
                  ) : (
                    <>
                      Showing <span className="font-semibold text-[#1E2030]">{paginated.length}</span> of{' '}
                      <span className="font-semibold text-[#1E2030]">{results.length}</span> cars
                    </>
                  )}
                </p>
                <select
                  id="sort-dropdown"
                  value={sort}
                  onChange={e => { setSort(e.target.value); setPage(1) }}
                  className="border border-gray-200 rounded-xl px-3 py-2 font-body text-sm text-[#1E2030] focus:outline-none focus:border-[#F59E0B]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="year-desc">Year: Newest First</option>
                </select>
              </div>

              {/* Grid or states */}
              {isFiltering ? (
                <SkeletonGrid count={6} />
              ) : paginated.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map(car => (
                    <CarCard key={car.id} car={car} searchTerm={debouncedSearch} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="w-8 h-8">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-[#1E2030] text-xl mb-2">No Cars Found</h3>
                  <p className="font-body text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                    {debouncedSearch.trim().length >= 2
                      ? `No results for "${debouncedSearch.trim()}". Try a different search or clear some filters.`
                      : 'Try adjusting or clearing your filters to see more results.'}
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2030] font-body font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!isFiltering && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                    aria-label="Previous page"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-10 h-10 rounded-xl text-sm font-body font-semibold transition-all ${p === page ? 'bg-[#1E2030] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#F59E0B] hover:text-[#F59E0B]'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all"
                    aria-label="Next page"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>
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
