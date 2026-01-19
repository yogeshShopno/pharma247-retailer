import { Search } from 'lucide-react'

type SearchLoadingProps = {
  searchQuery: string
}

export default function SearchLoading({ searchQuery }: SearchLoadingProps) {
  return (
    <div className="py-12 sm:py-20 text-center px-4">
      <Search className="mx-auto w-6 h-6 sm:w-8 sm:h-8 animate-spin text-slate-500" />

      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 break-words">
        Searching for <span className="font-medium">"{searchQuery}"</span>
      </p>
    </div>
  )
}
