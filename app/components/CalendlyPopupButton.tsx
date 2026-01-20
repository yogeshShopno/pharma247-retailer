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
    if (Calendly) {
      Calendly.initPopupWidget({
        url: 'https://calendly.com/pharma247official',
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true

    script.onload = () => {
      Calendly?.initPopupWidget({
        url: 'https://calendly.com/pharma247official',
      })
    }

    document.body.appendChild(script)
  }

  return (
    <button
      type="button"
      onClick={openCalendly}
      className="px-6 py-3 rounded bg-black text-white"
    >
      Schedule Demo
    </button>
  )
}
