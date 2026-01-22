import { Package, TrendingUp, Clock } from 'lucide-react'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { api } from '../lib/api'

export default function QuickStats() {
  const [data, setData] = useState({
    total_users: 0,
    total_items: 0,
  })

  // ✅ Stable function reference
  const fetchItems = useCallback(async () => {
    try {
      const res = await api('home', { method: 'GET' })
      setData(res.data?.[0] ?? { total_users: 0, total_items: 0 })
    } catch (error) {
      console.log(error || 'Failed to fetch Home api')
    }
  }, [])

  // ✅ Run once (safe dependency)
  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // ✅ Memoized derived data
  const stats = useMemo(
    () => [
      { label: 'Active Wholesalers', value: data.total_users, icon: Package },
      { label: 'Product Listings', value: data.total_items, icon: TrendingUp },
      { label: 'Daily Updates', value: '24/7', icon: Clock },
    ],
    [data]
  )

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 px-4 py-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white backdrop-blur-sm rounded-xl p-4 border border-slate-200/60 flex items-center space-x-3 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
