import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceRisers({ products }: { products: Product[] }) {
  // দাম বেড়েছে এমন প্রোডাক্ট, সবচেয়ে বেশি বাড়া আগে, প্রথম ৬টা
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 pt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-red-500 text-base">▲</span> আজ দাম বেড়েছে
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}