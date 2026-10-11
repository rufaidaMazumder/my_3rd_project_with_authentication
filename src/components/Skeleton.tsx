export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-11 h-11 rounded-lg"></div>
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-3 w-16"></div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="skeleton h-3 w-16"></div>
          <div className="skeleton h-6 w-20"></div>
        </div>
        <div className="skeleton h-5 w-14"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}