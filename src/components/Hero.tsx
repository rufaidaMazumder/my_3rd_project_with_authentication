"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/utils";
import heroImage from "@/bazar-hero.png";

// Date is empty on the server and real in the browser
const subscribe = () => () => {};
const getClientDate = () => getBanglaDate();
const getServerDate = () => "";

export default function Hero() {
  const banglaDate = useSyncExternalStore(
    subscribe,
    getClientDate,
    getServerDate
  );

  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-white border border-gray-100 rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1">
          {/* Eyebrow */}
          <span className="inline-block min-h-6 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
            {banglaDate}
          </span>
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h2>
          {/* Subtitle */}
          <p className="text-gray-600 mb-6 max-w-lg text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* Primary CTA (anchor link, not a route change) */}
          <a
            href="#সব-পণ্য"
            className="btn btn-outline btn-success btn-sm sm:btn-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right: Banner image */}
        <div className="flex-1 flex justify-center">
          <Image
            src={heroImage}
            alt="বাজারের ঝুড়িতে তাজা ফলমূল ও সবজি"
            priority
            className="w-full max-w-xs md:max-w-sm h-auto"
          />
        </div>
      </div>
    </section>
  );
}