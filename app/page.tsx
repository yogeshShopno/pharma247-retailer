'use client'

import { useState } from 'react'
import { SearchResult } from './components/SearchResults'
import HeroSearch from './components/HeroSearch'
import QuickStats from './components/QuickStats'
import SearchResults from './components/SearchResults'
import SearchLoading from './components/SearchLoading'
import WholesalerModal from './components/WholesalerModal'

export type GeoLocation = {
  lat: number
  lng: number
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedWholesaler, setSelectedWholesaler] = useState<SearchResult | null>(null)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center pt-12  animate-fadeIn">
        <h2 className="text-5xl font-bold text-slate-800 mb-4 leading-tight">
          Find Medicines<br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Near You, Instantly
          </span>
        </h2>

      </div>
      <HeroSearch
        searchQuery={searchQuery}
        location={location}
        isSearching={isSearching}
        setSearchQuery={setSearchQuery}
        setLocation={setLocation}
        setIsSearching={setIsSearching}
        setShowResults={setShowResults}
        setSelectedWholesaler={setSelectedWholesaler}
      />

      <QuickStats />

      {isSearching && <SearchLoading searchQuery={searchQuery} />}

      {showResults && (
        <SearchResults
          setSelectedWholesaler={setSelectedWholesaler}
        />
      )}

      {selectedWholesaler && (
        <WholesalerModal
          data={selectedWholesaler}
          
          onClose={() => setSelectedWholesaler(null)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-progress {
          animation: progress 2s ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
