import ProductCard from "./ProductCard";
import { toBengaliNumber, type Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section
      id="সব-পণ্য"
      className="max-w-6xl mx-auto px-4 pt-8 pb-12 scroll-mt-32"
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>
        <p className="text-gray-500 text-xs mt-1">
          মোট {toBengaliNumber(products.length)}টি পণ্যের দাম দেখানো হচ্ছে
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}