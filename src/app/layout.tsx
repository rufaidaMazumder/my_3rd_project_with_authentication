import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।",
};

// Shown for a split second while the Navbar waits for the current URL
function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="skeleton h-9 w-9 rounded-lg"></div>
          <div className="space-y-1">
            <div className="skeleton h-5 w-24"></div>
            <div className="skeleton h-3 w-32"></div>
          </div>
        </div>
        <div className="hidden lg:flex gap-2">
          <div className="skeleton h-8 w-16"></div>
          <div className="skeleton h-8 w-16"></div>
        </div>
      </div>
      <div className="border-t border-gray-100 h-12"></div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${hindSiliguri.className} antialiased`}>
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
        <main className="min-h-screen bg-green-50/60">{children}</main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}