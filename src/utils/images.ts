export function buildPlaceholderSvg(label: string, color: string): string {
  const letter = (label || 'F').trim().charAt(0).toUpperCase()
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#g)"/>
  <circle cx="400" cy="230" r="78" fill="rgba(255,255,255,0.18)"/>
  <text x="400" y="268" text-anchor="middle" font-family="system-ui,sans-serif" font-size="92" font-weight="700" fill="rgba(255,255,255,0.95)">${letter}</text>
  <text x="400" y="430" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="rgba(255,255,255,0.9)">Filandia a la Mano</text>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function photoSrc(
  photos: string[] | undefined,
  name: string,
  color: string,
  fallback?: string
): string {
  if (photos && photos.length > 0 && photos[0]) {
    return photos[0]
  }
  if (fallback) return fallback
  return buildPlaceholderSvg(name, color)
}
