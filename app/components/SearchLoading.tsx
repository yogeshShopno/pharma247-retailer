import { Search } from 'lucide-react'
type SearchLoadingProps = {
  searchQuery: string
}

export default function SearchLoading({
  searchQuery,
}: SearchLoadingProps) {
  return (
    <div className="py-20 text-center">
      <Search className="mx-auto animate-spin" />
      <p className="mt-4">Searching for "{searchQuery}"</p>
    </div>
  )
}
