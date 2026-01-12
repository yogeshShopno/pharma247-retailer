import { X } from 'lucide-react'

type WholesalerDetails = {
  ownerName: string
  mobile: string
  email: string
  fullAddress: string
  rating: number
  totalProducts: number
  establishedYear: number
  verified: boolean
  deliveryAvailable: boolean
}

type Wholesaler = {
  id: number
  wholesaler: string
  distance: number
  wholesalerDetails: WholesalerDetails
}

type WholesalerModalProps = {
  data: Wholesaler
  onClose: () => void
}

export default function WholesalerModal({ data, onClose }:WholesalerModalProps) {
    

  return (
    <div className="fixed inset-0 py-4 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl">
        <button onClick={onClose} className="float-right">
          <X />
        </button>
        <h2 className="text-xl font-bold">{data.wholesaler}</h2>
        <p>{data.wholesalerDetails.fullAddress}</p>
      </div>
    </div>
  )
}
