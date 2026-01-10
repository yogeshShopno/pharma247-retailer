import { X } from 'lucide-react'

export default function WholesalerModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
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
