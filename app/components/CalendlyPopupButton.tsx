'use client'

import { useEffect } from 'react'

export default function CalendlyPopupButton() {
  useEffect(() => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.setAttribute('data-calendly', 'true')
      document.head.appendChild(link)
    }
  }, [])

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/pharma247official',
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true

    script.onload = () => {
      window.Calendly?.initPopupWidget({
        url: 'https://calendly.com/pharma247official',
      })
    }
    document.body.appendChild(script)
  }

  return (
    <button
      type="button"
      onClick={openCalendly}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl"
    >
      Schedule Demo
    </button>
  )
}
