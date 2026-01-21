import { Package, TrendingUp, Clock } from 'lucide-react'


export default function QuickStats({totalWholesalers}: {totalWholesalers?: number}) {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 px-4 py-4">
            {[
              { label: 'Active Wholesalers', value: totalWholesalers?.toLocaleString() || '5,247', icon: Package },
              { label: 'Product Listings', value: '50M+', icon: TrendingUp },
              { label: 'Daily Updates', value: '24/7', icon: Clock }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-sm rounded-xl p-4 border border-slate-200/60 flex items-center space-x-3 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
    </div>
  )
}
