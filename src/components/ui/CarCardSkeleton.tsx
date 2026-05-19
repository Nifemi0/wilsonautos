export default function CarCardSkeleton() {
  return (
    <div className="bg-white border-2 border-[#E5E5E5] overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-[220px] bg-[#E5E5E5]" />
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-3 flex-1">
            <div className="h-6 bg-[#E5E5E5] w-3/4" />
            <div className="h-4 bg-[#F8F8F6] w-1/2" />
          </div>
          <div className="h-8 bg-[#E5E5E5] w-24 ml-4" />
        </div>
        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 py-4 border-t-2 border-b-2 border-[#E5E5E5] mb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-5 bg-[#E5E5E5] w-16" />
              <div className="h-4 bg-[#F8F8F6] w-10" />
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-[#E5E5E5] border-2 border-[#E5E5E5]" />
          <div className="w-12 h-12 bg-[#F8F8F6] border-2 border-[#E5E5E5]" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  )
}
