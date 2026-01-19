import { Search, MapPin, CloudCog } from 'lucide-react'
import type { GeoLocation, SearchResult } from '@/app/page'
import { useEffect, useRef } from 'react'
import { api } from '../lib/api'

export type HeroSearchProps = {
    distance: string
    setDistance: (value: string) => void
    searchQuery: string
    location: GeoLocation | null
    isSearching: boolean
    setSearchQuery: (value: string) => void
    setLocation: (value: GeoLocation | null) => void
    setIsSearching: (value: boolean) => void
    setShowResults: (value: boolean) => void
    setSearchResults: (value: SearchResult[]) => void
}

declare global {
    interface Window {
        google: any
    }
}

export default function HeroSearch({
    distance,
    setDistance,
    searchQuery,
    location,
    isSearching,
    setSearchQuery,
    setLocation,
    setIsSearching,
    setShowResults,
    setSearchResults

}: HeroSearchProps) {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const autocompleteRef = useRef<any>(null)
    const debounceTimer = useRef<any>(null)

    const handleSearch = async (e: any) => {
        e.preventDefault()
        if (!searchQuery) return
        setIsSearching(true)
        setShowResults(false)

        const payload = {
            page: 1,
            item_name: searchQuery,
            latitude: location?.lat,
            longitude: location?.lng,
            distance: distance, // replace with selected value if you store it in state
        }
        try {
            const response = await api('search-item', {
                method: 'POST',
                data: payload, // ✅ correct
            })

            setSearchResults(response.data.data)

        } catch {
            console.error(e)

        } finally {
            setIsSearching(false)
            setShowResults(true)
        }
    }

    useEffect(() => {
        if (!inputRef.current) return

        const interval = setInterval(() => {
            if (
                window.google &&
                window.google.maps &&
                window.google.maps.places
            ) {
                clearInterval(interval)

                autocompleteRef.current =
                    new window.google.maps.places.Autocomplete(inputRef.current!, {
                        types: ['geocode'],
                        componentRestrictions: { country: 'in' },
                    })

                autocompleteRef.current.addListener(
                    'place_changed',
                    handlePlaceChanged
                )
            }
        }, 100)

        return () => clearInterval(interval)
    }, [])


    // 👉 Debounced handler
    const handlePlaceChanged = () => {
        if (!autocompleteRef.current) return

        const place = autocompleteRef.current.getPlace()
        if (!place?.geometry?.location) return

        setLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        })
    }


    return (
        <section className="max-w-4xl mx-auto pt-8 sm:pt-12 pb-10 sm:pb-12 px-4">
            <form onSubmit={handleSearch} className="space-y-4 animate-slideUp">

                {/* Location Filter */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-500/10 border border-slate-200/60 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center p-2">
                        <div className="flex-1 flex items-center gap-3 px-3 sm:px-4">
                            <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Enter your location (pincode or area)"
                                ref={inputRef}
                                className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400 text-sm sm:text-base"
                            />
                        </div>

                        <div className="border-t sm:border-t-0 sm:border-l border-slate-200 px-3 sm:px-2">
                            <select
                                className="w-full sm:w-auto px-2 sm:px-4 py-3 text-sm text-slate-500 font-medium bg-transparent outline-none cursor-pointer"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            >
                                <option value="10">10KM</option>
                                <option value="25">25KM</option>
                                <option value="50">50KM</option>
                                <option value="100">100KM</option>
                                <option value="500">500KM</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Search Input */}
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-slate-200/60 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center p-2">
                        <div className="flex-1 flex items-center gap-3 px-3 sm:px-4">
                            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by medicine name (e.g, Dolo 650)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3 sm:py-4 text-base sm:text-lg outline-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="mt-2 sm:mt-0 sm:ml-2 px-2">
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="
              w-full sm:w-auto
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              px-6 sm:px-8 py-3 sm:py-4
              rounded-xl
              font-semibold
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-xl hover:shadow-blue-500/40
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
                            >
                                {isSearching ? (
                                    <>
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Searching...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Search</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </section>

    )
}
