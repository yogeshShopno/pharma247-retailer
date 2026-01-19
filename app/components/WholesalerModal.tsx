import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { MapPin, Phone, Mail, Building2, User, Navigation, MessageCircle, } from 'lucide-react'
import { api } from '../lib/api'
import error from 'next/error'


type WholesalerModalProps = {
  showWholesalerDetail: number | null
  onClose: () => void
}

export default function WholesalerModal({ showWholesalerDetail, onClose }: WholesalerModalProps) {

  const [wholesalerDetail, serWholesalerDetail] = useState<any>(null)
  useEffect(() => {
    if (showWholesalerDetail) {
      getWholesalerDetail(showWholesalerDetail)
    }
  }, [showWholesalerDetail])


  const getWholesalerDetail = async (id: number) => {
    const payload = {
      page: 1,
      id: showWholesalerDetail,

    }
    try {
      const response = await api('wholesaler-view-details', {
        method: 'POST',
        data: payload, // ✅ correct
      })

      serWholesalerDetail(response?.data[0])

    } catch (error) {
      console.error(error)

    } finally {

    }


  }
  return (
    <div className="fixed inset-0 py-4 bg-black/60 flex items-center justify-center">

      {/* Wholesaler Detail Modal */}
      {showWholesalerDetail && (
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
                    {wholesalerDetail?.firm_name}
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
                          {wholesalerDetail?.owner_name}
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
                          {wholesalerDetail?.mobile_number}

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
                          {wholesalerDetail?.email}

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
                          {wholesalerDetail?.address}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Stats */}
              <div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl py-4 px-6 border border-blue-200 mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {wholesalerDetail?.total_items}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Total Products</div>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-xl  transition-all duration-300">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-black hover:bg-white-50 border-2 border-slate-300 hover:border-black text-white px-4 py-2.5 rounded-xl  transition-all duration-300">
                    <MapPin className="w-4 h-4" />
                    <span>Get Direction</span>
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
