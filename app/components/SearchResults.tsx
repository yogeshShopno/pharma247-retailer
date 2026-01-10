import { Building2, Phone } from 'lucide-react'
import mockResults from './mockResults'

export default function SearchResults({ setSelectedWholesaler }) {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4">
      {mockResults.map((r) => (
        <div key={r.id} className="bg-white p-6 rounded-xl flex justify-between">
          <div>
            <h4 className="font-bold">{r.itemName}</h4>
            <p className="text-sm">{r.wholesaler}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedWholesaler(r)}
              className="border px-4 py-2 rounded-lg"
            >
              <Building2 size={16} />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Phone size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
