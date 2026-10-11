export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb skeleton */}
      <div className="skeleton h-4 w-56 mb-4"></div>

      {/* Summary skeleton */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton w-14 h-14 rounded-xl"></div>
          <div className="space-y-2">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-3 w-56"></div>
            <div className="flex gap-2">
              <div className="skeleton h-5 w-16"></div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
        </div>
        <div className="skeleton h-24 w-36 rounded-xl hidden sm:block"></div>
      </div>

      {/* Market summary skeleton */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="skeleton h-5 w-40 mb-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2">
              <div className="skeleton h-3 w-20"></div>
              <div className="skeleton h-7 w-28"></div>
              <div className="skeleton h-3 w-32"></div>
            </div>
          ))}
        </div>
        <div className="skeleton h-5 w-48 mb-3"></div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-10 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}