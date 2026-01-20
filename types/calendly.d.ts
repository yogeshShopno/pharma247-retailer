export {}

type CalendlyPopupOptions = {
  url: string
}

interface CalendlyNamespace {
  initPopupWidget: (options: CalendlyPopupOptions) => void
}

declare global {
  interface Window {
    Calendly?: CalendlyNamespace
  }
}
