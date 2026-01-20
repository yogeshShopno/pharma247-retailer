export {}

type CalendlyPopupOptions = {
  url: string
}

interface CalendlyNamespace {
  initPopupWidget: (options: CalendlyPopupOptions) => void
}

declare global {
  const Calendly: CalendlyNamespace | undefined
}
