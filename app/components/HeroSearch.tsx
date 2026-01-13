import { Search, MapPin } from 'lucide-react'
import type { GeoLocation } from '@/app/page'
import { useEffect, useRef } from 'react'

export type HeroSearchProps = {
    searchQuery: string
    location: GeoLocation | null
    isSearching: boolean
    setSearchQuery: (value: string) => void
    setLocation: (value: GeoLocation | null) => void
    setIsSearching: (value: boolean) => void
    setShowResults: (value: boolean) => void
    setSelectedWholesaler: (value: null) => void
}

declare global {
  interface Window {
    google: any
  }
}



export default function HeroSearch({
    searchQuery,
    location,
    isSearching,
    setSearchQuery,
    setLocation,
    setIsSearching,
    setShowResults,
    setSelectedWholesaler,
    
}: HeroSearchProps 
) {
    const handleSearch = (e: any) => {
        e.preventDefault()
        if (!searchQuery) return
        setIsSearching(true)
        setShowResults(false)
        setSelectedWholesaler(null)
        setTimeout(() => {
            setIsSearching(false)
            setShowResults(true)
        }, 500)
    }
  const inputRef = useRef<HTMLInputElement | null>(null)
  const autocompleteRef = useRef<any>(null)
  const debounceTimer = useRef<any>(null)

    useEffect(() => {
      if (!window.google || !inputRef.current) return
  
      autocompleteRef.current =
        new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
        })
  
      autocompleteRef.current.addListener('place_changed', handlePlaceChanged)
  
      const input = inputRef.current
  
      // 👉 Auto-trigger on Enter
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          window.google.maps.event.trigger(input, 'focus')
          window.google.maps.event.trigger(input, 'keydown', { keyCode: 13 })
        }
      }
  
      input.addEventListener('keydown', handleKeyDown)
  
      return () => {
        input.removeEventListener('keydown', handleKeyDown)
      }
    }, [])
  
    // 👉 Debounced handler
    const handlePlaceChanged = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
  
      debounceTimer.current = setTimeout(() => {
        const place = autocompleteRef.current.getPlace()
        if (!place?.geometry) return
  
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const address = place.formatted_address || ''
  
        console.log('Latitude:', lat)
        console.log('Longitude:', lng)
setLocation({ lat, lng })
        console.log('location:', location)
  
      }, 400) // debounce delay
    }

    return (
        <section className="max-w-4xl mx-auto  pt-12 pb-12 px-4">

            <form onSubmit={handleSearch} className="space-y-4 animate-slideUp">

                {/* Location Filter */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-500/10 border border-slate-200/60 overflow-hidden">
                    <div className="flex items-center p-2">
                        <div className="flex-1 flex items-center space-x-3 px-4">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Enter your location (pincode or area)"
                                   ref={inputRef}
                                className="flex-1 py-3 outline-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="border-l border-slate-200 px-2">
                            <select
                                className="px-4 py-3 text-sm text-slate-500 font-medium bg-transparent outline-none cursor-pointer"
                                defaultValue="70"
                            >
                                <option value="10">5KM - 10KM</option>
                                <option value="25">10KM - 25KM</option>
                                <option value="50">25KM - 50KM </option>
                                <option value="100">50KM - 100KM</option>
                                <option value="500">100KM - 500KM</option>

                            </select>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-slate-200/60 overflow-hidden">
                    <div className="flex items-center p-2">
                        <div className="flex-1 flex items-center space-x-3 px-4">

                            <Search className="w-6 h-6 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by medicine name (e.g, Dolo 650)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 py-4 text-lg outline-none text-slate-700 placeholder:text-slate-400"/>

                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {isSearching ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    <span>Search</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </section >
    )
}
