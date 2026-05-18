export default function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="h-52 bg-gray-200" />
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-3.5 bg-gray-100 rounded-lg w-1/2" />
          </div>
          <div className="h-6 bg-gray-200 rounded-lg w-24 ml-4" />
        </div>
        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 mb-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-100 rounded w-10" />
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
          <div className="w-11 h-10 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  )
}
