import { ProductGridSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="skeleton w-12 h-12 rounded-xl"></div>
          <div className="space-y-2">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-3 w-48"></div>
          </div>
        </div>
      </div>
      <div className="skeleton h-12 w-full mb-4 rounded-xl"></div>
      <ProductGridSkeleton count={6} />
    </div>
  );
}