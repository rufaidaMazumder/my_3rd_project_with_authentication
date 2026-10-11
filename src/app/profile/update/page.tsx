"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const nameValue = name ?? session?.user?.name ?? "";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameValue.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);

    
    const { error } = await authClient.updateUser({
      name: nameValue.trim(),
    });

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
      setLoading(false);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="skeleton h-7 w-48 mb-6"></div>
        <div className="skeleton h-56 w-full rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-gray-500 mb-6">
        আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
      </p>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              placeholder="আপনার নাম"
              className="input input-bordered w-full bg-white"
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success text-white w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "তথ্য আপডেট করুন"
            )}
          </button>
        </form>

        <Link href="/profile" className="btn btn-ghost w-full mt-2">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </div>
  );
}