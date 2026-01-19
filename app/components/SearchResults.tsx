import { Building2, Phone } from 'lucide-react'
import type { SearchResult } from '@/app/page'

type SearchResultsProps = {
  searchResults: SearchResult[]
  showWholesalerDetail: number | null
  setShowWholesalerDetail: (value: number | null) => void
}

export default function SearchResults({
  searchResults,
  showWholesalerDetail,
  setShowWholesalerDetail,
}: SearchResultsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
      {searchResults.length === 0 ? (
        <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
          No result found...
        </h1>
      ) : (
        <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
          Search results...
        </h1>
      )}

      {searchResults.map((result, index) => (
        <div
          key={result.id}
          className="bg-white rounded-2xl shadow-lg shadow-slate-500/10 border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 animate-slideUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="p-4 sm:p-6">
            {/* Header */}
            <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              {result.name}
            </h4>

            {/* Wholesaler Info */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
                    Wholesaler
                  </div>
                  <div className="font-semibold text-slate-800 break-words">
                    {result.owner_name}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
                    Location
                  </div>
                  <div className="font-semibold text-slate-800 break-words">
                    {result.address}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
                    Distance
                  </div>
                  {result?.distance ? (
                    <div className="font-semibold text-blue-600">
                      {result.distance} KM away
                    </div>
                  ) : (
                    <div className="text-slate-400">-</div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => setShowWholesalerDetail(result.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Building2 className="w-4 h-4" />
                <span>View Details</span>
              </button>

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl"
              >
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
