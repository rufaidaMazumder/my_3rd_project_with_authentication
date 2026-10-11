import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPrice,
  toBengaliNumber,
  getUnitBn,
  type Product,
} from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  // There is no slug endpoint, so fetch all products and match the slug
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const products: Product[] = Array.isArray(data) ? data : data?.data || [];
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets || [];

  // Min, Max, Average from the market data
  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
          markets.length
      )
    : product.today;

  const pct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));
  const badgeText =
    product.change.dir === "up"
      ? `▲ ${pct}%`
      : product.change.dir === "down"
      ? `▼ ${pct}%`
      : `— ${toBengaliNumber("0.0")}%`;
  const badgeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </nav>

      {/* Top summary */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              বাজারভিত্তিক সর্বশেষ দাম ও বিস্তারিত তথ্য
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                {getUnitBn(product.unit)}
              </span>
            </div>
          </div>
        </div>

        {/* Today's price box */}
        <div className="bg-green-50/60 border border-green-100 rounded-xl px-5 py-3 text-center sm:min-w-36">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>
          <p className="text-xs text-gray-500">
            টাকা / {getUnitBn(product.unit).replace("প্রতি ", "")}
          </p>
          <p className={`text-xs font-semibold mt-1 ${badgeColor}`}>
            {badgeText}
          </p>
        </div>
      </div>

      {/* Market summary */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <h2 className="text-base font-bold text-gray-800 mb-3">
          মার্কেট সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-600">
              {formatPrice(minPrice)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              সব বাজারের মধ্যে সর্বনিম্ন
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-xl font-bold text-red-600">
              {formatPrice(maxPrice)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              সব বাজারের মধ্যে সর্বোচ্চ
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold text-gray-800">
              {formatPrice(avgPrice)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              সব বাজারের গড় দাম
            </p>
          </div>
        </div>

        {/* Market-wise prices */}
        <h3 className="text-sm font-bold text-gray-800 mt-6 mb-3">
          বাজারভিত্তিক আজকের দাম
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  বাজার
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  বিভাগ
                </th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                  সর্বনিম্ন
                </th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                  সর্বোচ্চ
                </th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr
                  key={`${m.market}-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-green-50/40"}
                >
                  <td className="border border-gray-300 px-3 py-2">
                    {m.market}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {m.division}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right whitespace-nowrap">
                    {formatPrice(m.min)} টাকা
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right whitespace-nowrap">
                    {formatPrice(m.max)} টাকা
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right whitespace-nowrap font-semibold">
                    {formatPrice(Math.round((m.min + m.max) / 2))} টাকা
                  </td>
                </tr>
              ))}
              {markets.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 px-3 py-6 text-center text-gray-500"
                  >
                    বাজারভিত্তিক তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}