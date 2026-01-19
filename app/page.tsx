'use client'
import { useEffect, useState } from 'react'
import HeroSearch from './components/HeroSearch'
import QuickStats from './components/QuickStats'
import SearchResults from './components/SearchResults'
import SearchLoading from './components/SearchLoading'
import WholesalerModal from './components/WholesalerModal'
import Lottie from 'lottie-react'
import animationData from '@/public/notfound.json'

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
  wholesaler: string
  address: string
  city: string
  distance: number
}

export default function HomePage() {
  const [distance, setDistance] = useState('10')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showWholesalerDetail, setShowWholesalerDetail] = useState<number | null>(null)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-60 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 animate-fadeIn">
          {/* Pill icon or medical symbol */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg animate-bounce-slow">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-2 sm:mb-3">
            Find Medicines
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Near You, Instantly
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Search thousands of pharmacies and wholesalers in your area. Get real-time availability and pricing.
          </p>
        </div>

        {/* Search Component */}
        <HeroSearch
          distance={distance}
          setDistance={setDistance}
          searchQuery={searchQuery}
          location={location}
          isSearching={isSearching}
          setSearchQuery={setSearchQuery}
          setLocation={setLocation}
          setIsSearching={setIsSearching}
          setShowResults={setShowResults}
          setSearchResults={setSearchResults}
        />

        {/* Conditional Content */}
        {isSearching ? (
          <SearchLoading searchQuery={searchQuery} />
        ) : showResults && searchResults?.length === 0 ? (
          <div className="flex flex-col justify-center items-center px-4 py-8 sm:py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 max-w-2xl w-full animate-slideUp">
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto"
              />
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center mt-4 sm:mt-6">
                No Results Found
              </h2>
              <p className="text-slate-600 text-center mt-2 sm:mt-4 text-sm sm:text-base">
                We couldn't find any matches for "{searchQuery}". Try adjusting your search or increasing the distance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
                <button 
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Try New Search
                </button>
                
              </div>
            </div>
            <div className="mt-8 sm:mt-12 w-full">
              <QuickStats />
            </div>
          </div>
        ) : showResults ? (
          <div className="animate-slideUp">
            <QuickStats />
            <SearchResults
              searchResults={searchResults}
              showWholesalerDetail={showWholesalerDetail}
              setShowWholesalerDetail={setShowWholesalerDetail}
            />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <QuickStats />
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg animate-slideUp z-50">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="ml-3 flex-shrink-0 text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
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
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
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
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}