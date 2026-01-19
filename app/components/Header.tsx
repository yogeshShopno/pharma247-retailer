import Link from "next/link";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo */}
          <Link href="https://pharma247.in/" className="flex items-center">
            <img
              src="/pharmalogo.webp"
              alt="Pharma247"
              className="h-10 sm:h-14 w-auto"
            />
          </Link>

          {/* CTA Button */}
          <button
            className="
              flex items-center gap-2
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              px-3 py-2 sm:px-6
              rounded-lg
              text-sm sm:text-base
              font-semibold
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-xl
              whitespace-nowrap
            "
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline ">
              Register to become wholesaler
            </span>
            <span className="sm:hidden text-xs m-0 p-0" >
              Register to become wholesaler
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
