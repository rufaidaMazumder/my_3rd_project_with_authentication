import { ProductGridSkeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full space-y-4">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-10 w-full max-w-lg"></div>
            <div className="skeleton h-4 w-full max-w-md"></div>
            <div className="skeleton h-10 w-36"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="skeleton w-44 h-44 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Products skeleton */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="skeleton h-6 w-40 mb-4"></div>
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}