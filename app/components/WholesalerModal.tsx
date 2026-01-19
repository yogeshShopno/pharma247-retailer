import { useEffect, useState } from 'react'
import {
  X,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  MessageCircle,
} from 'lucide-react'
import { api } from '../lib/api'

type WholesalerModalProps = {
  showWholesalerDetail: number | null
  onClose: () => void
}

export default function WholesalerModal({
  showWholesalerDetail,
  onClose,
}: WholesalerModalProps) {
  const [wholesalerDetail, setWholesalerDetail] = useState<any>(null)

  useEffect(() => {
    if (showWholesalerDetail) {
      getWholesalerDetail(showWholesalerDetail)
    }
  }, [showWholesalerDetail])

  const getWholesalerDetail = async (id: number) => {
    try {
      const response = await api('wholesaler-view-details', {
        method: 'POST',
        data: { id },
      })
      setWholesalerDetail(response?.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  if (!showWholesalerDetail) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-4xl rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-white" />
            <h2 className="text-base sm:text-lg font-semibold text-white">
              {wholesalerDetail?.firm_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Owner */}
              <InfoCard
                icon={<User className="w-5 h-5 text-blue-600" />}
                label="Owner Name"
                value={wholesalerDetail?.owner_name}
              />

              {/* Mobile */}
              <InfoCard
                icon={<Phone className="w-4 h-4 text-green-600" />}
                label="Mobile"
                value={wholesalerDetail?.mobile_number}
                bg="bg-green-100"
              />

              {/* Email */}
              <InfoCard
                icon={<Mail className="w-5 h-5 text-purple-600" />}
                label="Email"
                value={wholesalerDetail?.email}
                bg="bg-purple-100"
              />

              {/* Address */}
              <div className="bg-slate-50 rounded-xl p-4 flex gap-3 sm:col-span-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500">
                    Address
                  </div>
                  <div className="font-medium text-slate-800 break-words">
                    {wholesalerDetail?.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">
              {wholesalerDetail?.total_items}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Total Products
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <ActionButton
              label="Call Now"
              icon={<Phone className="w-4 h-4" />}
              className="from-green-600 to-emerald-600 shadow-green-500/30"
              onClick={() =>
                (window.location.href = `tel:+91${wholesalerDetail?.mobile_number}`)
              }
            />

            <ActionButton
              label="WhatsApp"
              icon={<MessageCircle className="w-4 h-4" />}
              className="from-blue-600 to-indigo-600 shadow-blue-500/30"
              onClick={() =>
                window.open(
                  `https://wa.me/${wholesalerDetail?.mobile_number}`,
                  '_blank'
                )
              }
            />

            <ActionButton
              label="Email"
              icon={<Mail className="w-4 h-4" />}
              variant="outline"
              onClick={() =>
                (window.location.href = `mailto:${wholesalerDetail?.email}`)
              }
            />

            <ActionButton
              label="Directions"
              icon={<MapPin className="w-4 h-4" />}
              variant="dark"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    wholesalerDetail?.address
                  )}`,
                  '_blank'
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Small UI helpers (no logic) ---------- */

function InfoCard({
  icon,
  label,
  value,
  bg = 'bg-blue-100',
}: any) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase text-slate-500">
          {label}
        </div>
        <div className="font-medium text-slate-800 break-words">{value}</div>
      </div>
    </div>
  )
}

function ActionButton({
  label,
  icon,
  onClick,
  className,
  variant,
}: any) {
  if (variant === 'outline') {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-4 py-3 rounded-xl transition"
      >
        {icon}
        {label}
      </button>
    )
  }

  if (variant === 'dark') {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-xl hover:opacity-90 transition"
      >
        {icon}
        {label}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 bg-gradient-to-r ${className} text-white px-4 py-3 rounded-xl shadow-lg transition`}
    >
      {icon}
      {label}
    </button>
  )
}
