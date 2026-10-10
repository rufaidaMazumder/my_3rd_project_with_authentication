export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left side */}
        <p className="text-sm text-gray-600 text-center md:text-left">
          <span className="font-semibold text-gray-800">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right side */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}