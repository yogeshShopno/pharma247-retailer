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


    </div>
  )
}
