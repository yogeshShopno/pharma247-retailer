import { Package, TrendingUp, Clock } from 'lucide-react'

const stats = [
  { label: 'Active Wholesalers', value: '5,247', icon: Package },
  { label: 'Product Listings', value: '50M+', icon: TrendingUp },
  { label: 'Daily Updates', value: '24/7', icon: Clock },
]

export default function QuickStats() {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 px-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-4 rounded-xl flex gap-3">
          <s.icon />
          <div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
