import { X } from 'lucide-react'
import { Search, MapPin, Phone, Clock, Package, AlertCircle, TrendingUp, Mail, Building2, User, Shield, Star, CheckCircle, Navigation, MessageCircle, Globe } from 'lucide-react'

import type { SearchResult} from '@/app/page'


type WholesalerModalProps = {
  data: SearchResult
  onClose: () => void
}

export default function WholesalerModal({ data , onClose }: WholesalerModalProps) {


  return (
    <div className="fixed inset-0 py-4 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl">
        <button onClick={onClose} className="float-right">
          <X />
        </button>
        <h2 className="text-xl font-bold">{data.owner_name}</h2>
        <p>{data.address}</p>
      </div>
      {/* Wholesaler Detail Modal */}
      {data && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-8 relative">
              <button
                onClick={() => onClose()}
                className="absolute top-4 right-5 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-5 h-5  rounded-2xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex">
                  <h2 className="text-lg font-semibold text-white ">
                    {data.owner_name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-3">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Contact Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 m-4 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Owner Name</div>
                        <div className="font-semibold text-slate-800">
                          {data.owner_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Mobile</div>
                        <div className="font-semibold text-slate-800">
                          {data.owner_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Email</div>
                        <div className="font-semibold text-slate-800">
                          {data.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Distance</div>
                        <div className="font-semibold text-slate-800">
                          {data.distance} KM away
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Address</span>
                </h3>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed">
                    {data.address}
                  </p>
                  <button className="bg-gradient-to-br from-slate-50 to-blue-50 mt-4 flex items-center space-x-2 text-white hover:text-white font-semibold transition-colors">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>

              {/* Business Stats */}
              <div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl py-4 px-6 border border-blue-200 mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {/* {data.totalProducts.toLocaleString()} */}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Total Products</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
