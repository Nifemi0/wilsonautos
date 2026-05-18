import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'Browse our full inventory of quality used cars in Nigeria. Filter by make, body type, price, and more.',
}

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<div className="min-h-screen bg-[#F8F8F6] pt-20 flex items-center justify-center"><div className="text-[#1E2030] font-body">Loading...</div></div>}>{children}</Suspense>
}
