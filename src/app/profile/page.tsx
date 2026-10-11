"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  
  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="skeleton h-7 w-40 mb-2"></div>
        <div className="skeleton h-4 w-64 mb-6"></div>
        <div className="skeleton h-28 w-full rounded-2xl mb-4"></div>
        <div className="skeleton h-56 w-full rounded-2xl"></div>
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-500 mb-4">আপনি সাইন ইন করেননি</p>
        <Link href="/signin" className="btn btn-success text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500 mb-6">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            
            <img
              src={user.image}
              alt={user.name || "প্রোফাইল"}
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl font-semibold text-green-700">
              {user.name?.charAt(0) || "U"}
            </span>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 break-all">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="btn btn-outline btn-error btn-sm"
        >
          ↩ সাইন আউট
        </button>
      </div>

      
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h3 className="text-base font-bold text-gray-800 mb-4">তথ্য</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="input input-bordered w-full bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="text"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-50"
            />
          </div>

          
          <Link
            href="/profile/update"
            className="btn btn-outline btn-success w-full"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}