import Link from "next/link";
import {User} from 'lucide-react'
export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className=" rounded-xl flex items-center justify-center  ">

                <img src='/pharmalogo.webp' className='h-14'></img>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="bg-gradient-to-r  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700  text-white  md:flex items-center space-x-2 px-4 py-2 px-6 py-2 rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl">
                <User className="w-4 h-4" />
                <span>  Register to become wholesaler</span>
              </button>

            </div>
          </div>


        </div>
      </header>
  );
}
