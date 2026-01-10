'use client'

import { useState } from 'react'



import HeroSearch from './components/HeroSearch'
import QuickStats from './components/QuickStats'
import SearchResults from './components/SearchResults'
import SearchLoading from './components/SearchLoading'
import WholesalerModal from './components/WholesalerModal'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedWholesaler, setSelectedWholesaler] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">


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
