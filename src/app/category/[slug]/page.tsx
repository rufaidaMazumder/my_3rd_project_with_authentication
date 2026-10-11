"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { toBengaliNumber, type Product, type Category } from "@/lib/utils";

const API = "https://api.api-store.workers.dev/api/bazardor";

function toList(data: unknown): Product[] {
  if (Array.isArray(data)) return data as Product[];
  const obj = data as { data?: unknown } | null;
  return Array.isArray(obj?.data) ? (obj!.data as Product[]) : [];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API}/products?category=${slug}`);
        if (!res.ok) throw new Error("Products fetch failed");
        const list = toList(await res.json());

        if (list.length === 0) {
          if (!cancelled) {
            setProducts([]);
            setError(true);
          }
          return;
        }

    
        let cat: Category | null = null;
        try {
          const catRes = await fetch(`${API}/categories/${slug}`);
          if (catRes.ok) {
            const catData = await catRes.json();
            cat = (catData?.data ?? catData) as Category;
          }
        } catch {
          cat = null;
        }
        if (!cat || !cat.nameBn) {
          cat = {
            id: slug,
            slug,
            nameBn: list[0].categoryNameBn,
            icon: list[0].categoryIcon,
          };
        }

        if (!cancelled) {
          setProducts(list);
          setCategory(cat);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);


  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0; 
  });

  
  if (loading) {
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

  
  if (error || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-3xl">
            {category?.icon}
          </span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {category?.nameBn}
            </h1>
            <p className="text-xs text-gray-500">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

    
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 mb-4 flex justify-end">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <p className="text-xs text-gray-500 mb-3">
        মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}