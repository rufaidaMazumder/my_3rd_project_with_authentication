import Link from "next/link";
import {
  formatPrice,
  toBengaliNumber,
  getUnitBn,
  type Product,
} from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const pct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer group block"
    >
      {/* Top: Emoji + Name + Unit */}
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl group-hover:scale-110 transition-transform">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-400">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      {/* Bottom: Price row + change badge */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-800">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            product.change.dir === "up"
              ? "bg-red-50 text-red-600"
              : product.change.dir === "down"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {product.change.dir === "up"
            ? `▲ ${pct}%`
            : product.change.dir === "down"
            ? `▼ ${pct}%`
            : `— ${toBengaliNumber("0.0")}%`}
        </span>
      </div>
    </Link>
  );
}