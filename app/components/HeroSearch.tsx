import { Search, MapPin } from 'lucide-react'
import type { GeoLocation, SearchResult } from '@/app/page'
import { useState, useEffect, useRef } from 'react'
import { api } from '../lib/api'
import { Autocomplete, TextField, MenuItem } from '@mui/material'
import type {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,

} from '@mui/material'

export type HeroSearchProps = {
  distance: string
  setDistance: (value: string) => void
  location: GeoLocation | null
  isSearching: boolean
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

type PlacePrediction = {
  description: string
  place_id: string
}


type ItemOption = {
  id: number
  item_name: string
}
type ListAutocompleteProps = {
  setSelectedItemId: (id: number | null) => void
}
const DISTANCE_OPTIONS = [
  { value: '10', label: '10 KM' },
  { value: '25', label: '25 KM' },
  { value: '50', label: '50 KM' },
  { value: '100', label: '100 KM' },
  { value: '500', label: '500 KM' },
]

export default function HeroSearch({
  distance,
  setDistance,
  location,
  isSearching,
  setLocation,
  setIsSearching,
  setShowResults,
  setSearchResults,
}: HeroSearchProps) {
  const [locationInput, setLocationInput] = useState('')
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [autocompleteService, setAutocompleteService] = useState<any>(null)
  const [placesService, setPlacesService] = useState<any>(null)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const [searchInput, setSearchInput] = useState('')
  const [options, setOptions] = useState<ItemOption[]>([])

  // simple in-memory cache
  const cacheRef = useRef<Map<string, ItemOption[]>>(new Map())

  useEffect(() => {
    if (searchInput.trim().length < 2) {
      setOptions([])
      return
    }

    // cache hit → no API call
    if (cacheRef.current.has(searchInput)) {
      setOptions(cacheRef.current.get(searchInput)!)
      return
    }

    const fetchItems = async () => {
      try {
        const res = await api('item-list', {
          method: 'POST',
          data: {
            page: 1,
            search: searchInput,
          },
        })

        const data: ItemOption[] = res.data ?? []
        cacheRef.current.set(searchInput, data)

        setOptions(data)
      } catch {
        setOptions([])
      }
    }

    fetchItems()
  }, [searchInput])

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(interval)
        setAutocompleteService(
          new window.google.maps.places.AutocompleteService()
        )
        setPlacesService(
          new window.google.maps.places.PlacesService(
            document.createElement('div')
          )
        )
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleLocationInputChange = (event: any, value: string) => {
    setLocationInput(value)

    if (!value || !autocompleteService) {
      setPredictions([])
      return
    }

    autocompleteService.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: 'in' },
        types: ['geocode'],
      },
      (predictions: PlacePrediction[] | null, status: string) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setPredictions(predictions)
        } else {
          setPredictions([])
        }
      }
    )
  }

  const handleLocationSelect = (
    event: React.SyntheticEvent,
    value: string | PlacePrediction | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<PlacePrediction>
  ) => {
    if (!value || typeof value === 'string' || !placesService) return

    placesService.getDetails(
      { placeId: value.place_id },
      (place: any, status: string) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          setLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          })
          setLocationInput(value.description)
        }
      }
    )
  }

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if (!selectedItemId) return
    setIsSearching(true)
    setShowResults(false)

    const payload = {
      page: 1,
      item_name: selectedItemId,
      latitude: location?.lat,
      longitude: location?.lng,
      distance: distance,
    }
    try {
      const response = await api('search-item', {
        method: 'POST',
        data: payload,
      })

      setSearchResults(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSearching(false)
      setShowResults(true)
    }
  }

  return (
    <section className="max-w-5xl mx-auto pt-6 sm:pt-12 px-4">
      <form
        onSubmit={handleSearch}
        className="space-y-5 sm:space-y-6 animate-slideUp"
      >
        {/* Location + Distance */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-3x">
            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-2 sm:px-0">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <Autocomplete
                fullWidth
                freeSolo
                options={predictions}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.description
                }
                inputValue={locationInput}
                onInputChange={handleLocationInputChange}
                onChange={handleLocationSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Enter city, area, or pincode"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: '#334155',
                        padding: '10px 0',
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.place_id}>
                    <div className="flex items-center gap-2 py-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {option.description}
                      </span>
                    </div>
                  </li>
                )}
              />
            </div>

            {/* Distance */}
            <div className="sm:border-l border-slate-200 sm:pl-3">
              <Autocomplete
                value={DISTANCE_OPTIONS.find((o) => o.value === distance)}
                onChange={(e, v) => v && setDistance(v.value)}
                options={DISTANCE_OPTIONS}
                getOptionLabel={(option) => option.label}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    sx={{
                      minWidth: { xs: '100%', sm: 110 },
                      '& .MuiInputBase-input': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        padding: '10px 8px',
                        color: '#475569',
                        cursor: 'pointer',
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-2 py-1 sm:px-3 sm:py-2">
            <div className="flex-1 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />


              <Autocomplete<ItemOption, false, false, true>
                fullWidth
                freeSolo
                options={options}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.item_name
                }
                inputValue={searchInput}
                onInputChange={(_, value) => setSearchInput(value)}
                onChange={(_, value) => {
                  if (typeof value === 'string' || !value) {
                    setSelectedItemId(null)
                    return
                  }

                  setSearchInput(value.item_name)
                  setSelectedItemId(value.id)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search items"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    className="
                w-full
                py-3
                text-base sm:text-lg
                outline-none
                text-slate-700
                placeholder:text-slate-400
              "
                  />
                )}
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="
              w-full sm:w-auto
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              px-4 py-2 sm:py-2.5
              rounded-xl
              font-semibold
              shadow-md hover:shadow-lg
              transition-all duration-300
              disabled:opacity-50
              flex items-center justify-center gap-2
            "
            >
              {isSearching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* <ListAutocomplete setSelectedItemId={setSelectedItemId} /> */}

      </form>
    </section>
  )

}