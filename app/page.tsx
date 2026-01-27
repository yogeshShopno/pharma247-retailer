'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import HeroSearch from './components/HeroSearch'
import SearchLoading from './components/SearchLoading'
import WholesalerModal from './components/WholesalerModal'
import Lottie from 'lottie-react'
import animationData from '@/public/notfound.json'

// ✅ Lazy-loaded components (REAL Suspense usage)
const QuickStats = lazy(() => import('./components/QuickStats'))
const SearchResults = lazy(() => import('./components/SearchResults'))

export type GeoLocation = {
  lat: number
  lng: number
}



export type SearchResult = {
  id: number
  name: string
  owner_name: string
  email: string
  mobile_number: string
  quantity: number
  price: number
  business_type: string
  address: string
  city: string
  distance: number
}

export default function HomePage() {
  const [distance, setDistance] = useState('10')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showWholesalerDetail, setShowWholesalerDetail] =
    useState<number | null>(null)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  // 📍 Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => {
        setError('Location permission denied')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 animate-fadeIn">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-2 sm:mb-3">
            Find Medicines
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Near You, Instantly
            </span>
          </h2>
        </div>

        {/* Search */}
        <HeroSearch
          distance={distance}
          setDistance={setDistance}
          location={location}
          isSearching={isSearching}
          setLocation={setLocation}
          setIsSearching={setIsSearching}
          setShowResults={setShowResults}
          setSearchResults={setSearchResults}
        />

        {/* Conditional Content */}
        {isSearching ? (
          <SearchLoading />
        ) : showResults && searchResults.length === 0 ? (
          <div className="flex flex-col justify-center items-center px-4 py-8 sm:py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl w-full animate-slideUp">
              <Lottie
                animationData={animationData}
                loop
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto"
              />

              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                No Results Found
              </h2>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-3 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Try New Search
                </button>
              </div>

              <p className="text-slate-600 text-center my-4 text-sm sm:text-base">
                We couldn't find any matches. Try adjusting your search or increasing the distance.
              </p>
            </div>

            <div className="mt-6 w-full">
              <Suspense fallback={null}>
                <QuickStats />
              </Suspense>
            </div>
          </div>
        ) : showResults ? (
          <div className="animate-slideUp">
            <Suspense fallback={null}>
              <QuickStats />
            </Suspense>

            <Suspense fallback={<SearchLoading />}>
              <SearchResults
                searchResults={searchResults}
                setShowWholesalerDetail={setShowWholesalerDetail}
              />
            </Suspense>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <Suspense fallback={null}>
              <QuickStats />
            </Suspense>
          </div>
        )}
      </div>

      {/* Modal */}
      {showWholesalerDetail && (
        <WholesalerModal
          showWholesalerDetail={showWholesalerDetail}
          onClose={() => setShowWholesalerDetail(null)}
        />
      )}

      {/* Animations */}
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
