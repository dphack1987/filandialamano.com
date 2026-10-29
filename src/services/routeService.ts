export interface OsrmRoute {
  distanceKm: number
  durationMin: number
  geometry: [number, number][]
}

export async function fetchOsrmRoute(
  coordinates: [number, number][]
): Promise<OsrmRoute | null> {
  if (coordinates.length < 2) return null

  const coords = coordinates
    .map(([lat, lng]) => `${lng.toFixed(6)},${lat.toFixed(6)}`)
    .join(';')

  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`OSRM error ${res.status}`)

  const data = await res.json()
  if (!data.routes?.length) return null

  const route = data.routes[0]
  const coordsGeo = route.geometry?.coordinates as [number, number][] | undefined
  if (!coordsGeo) return null

  return {
    distanceKm: (route.distance ?? 0) / 1000,
    durationMin: (route.duration ?? 0) / 60,
    geometry: coordsGeo.map(([lng, lat]) => [lat, lng] as [number, number]),
  }
}
