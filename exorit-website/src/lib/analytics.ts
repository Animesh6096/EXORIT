/** Fires an analytics event if an analytics provider is present. No-op otherwise. */
export const trackEvent = (name: string, props?: Record<string, string>) => {
  const w = window as unknown as {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    gtag?: (command: string, event: string, params?: Record<string, string>) => void
  }
  try {
    w.plausible?.(name, props ? { props } : undefined)
    w.gtag?.('event', name, props)
  } catch {
    // Analytics must never break a conversion path.
  }
}
