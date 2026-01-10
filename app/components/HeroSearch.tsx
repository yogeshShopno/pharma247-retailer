import { Search, MapPin } from 'lucide-react'

export default function HeroSearch({
  searchQuery,
  location,
  isSearching,
  setSearchQuery,
  setLocation,
  setIsSearching,
  setShowResults,
  setSelectedWholesaler,
}) {
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery) return
    setIsSearching(true)
    setShowResults(false)
    setSelectedWholesaler(null)
    setTimeout(() => {
      setIsSearching(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <section className="pt-16 pb-12 px-4">
      <form onSubmit={handleSearch} className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white rounded-xl p-4 flex gap-3 items-center">
          <Search />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine"
            className="flex-1 outline-none"
          />
          <button disabled={isSearching} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Search
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 flex gap-3 items-center">
          <MapPin />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 outline-none"
          />
        </div>
      </form>
    </section>
  )
}
