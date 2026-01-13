import { Building2, Phone } from 'lucide-react'
import mockResults from './mockResults'

export type WholesalerDetails = {
  ownerName: string
  mobile: string
  email: string
  fullAddress: string
  rating: number
  totalProducts: number
  establishedYear: number
  verified: boolean
  deliveryAvailable: boolean
}

export type SearchResult = {
  id: number
  itemName: string
  brandName: string
  saltName: string
  quantity: number
  price: number
  wholesaler: string
  area: string
  city: string
  distance: number
  lastUpdate: string
  wholesalerDetails: WholesalerDetails
}

export type SearchResultsProps = {
  setSelectedWholesaler: (result: SearchResult) => void
}

export default function SearchResults({ setSelectedWholesaler }: SearchResultsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
      <h1 className='text-2xl font-bold text-slate-800'>Search results... </h1>
      {mockResults.map((result, index) => (
        <div
          key={result.id}
          className="bg-white rounded-2xl shadow-lg shadow-slate-500/10 border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 animate-slideUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-bold text-slate-800">{result.itemName}</h4>
                </div>
              </div>
            </div>

            {/* Wholesaler Info */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">
                    Wholesaler
                  </div>
                  <div className="font-bold text-slate-800">{result.wholesaler}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">
                    Location
                  </div>
                  <div className="font-bold text-slate-800">{result.area}, {result.city}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">
                    Distance
                  </div>
                  <div className="font-bold text-blue-600">{result.distance} KM away</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setSelectedWholesaler(result)}
                className="flex items-center space-x-2 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-5 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Building2 className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}
