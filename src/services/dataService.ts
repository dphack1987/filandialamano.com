import { Place, MapMarker, Hotel, Event } from '../types'

class DataService {
  private placesCache: Place[] | null = null
  private markersCache: MapMarker[] | null = null
  private hotelsCache: Hotel[] | null = null
  private eventsCache: Event[] | null = null

  async getPlaces(): Promise<Place[]> {
    if (this.placesCache) return this.placesCache

    try {
      const response = await fetch('/data/places.json')
      if (!response.ok) throw new Error('Failed to fetch places')
      const data = await response.json()
      this.placesCache = data.places || []
      return this.placesCache
    } catch (error) {
      console.error('Error fetching places:', error)
      return []
    }
  }

  async getMapMarkers(): Promise<MapMarker[]> {
    if (this.markersCache) return this.markersCache

    try {
      const response = await fetch('/data/mapMarkers.json')
      if (!response.ok) throw new Error('Failed to fetch markers')
      const data = await response.json()
      this.markersCache = data.markers || []
      return this.markersCache
    } catch (error) {
      console.error('Error fetching markers:', error)
      return []
    }
  }

  async getHotels(): Promise<Hotel[]> {
    if (this.hotelsCache) return this.hotelsCache

    try {
      const response = await fetch('/data/hotels.json')
      if (!response.ok) throw new Error('Failed to fetch hotels')
      const data = await response.json()
      this.hotelsCache = data.hotels || []
      return this.hotelsCache
    } catch (error) {
      console.error('Error fetching hotels:', error)
      return []
    }
  }

  async getEvents(): Promise<Event[]> {
    if (this.eventsCache) return this.eventsCache

    try {
      const response = await fetch('/data/events.json')
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      this.eventsCache = data.events || []
      return this.eventsCache
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  async getMapConfig() {
    try {
      const response = await fetch('/data/map-config.json')
      if (!response.ok) throw new Error('Failed to fetch map config')
      return await response.json()
    } catch (error) {
      console.error('Error fetching map config:', error)
      return null
    }
  }

  async getPlaceById(id: number): Promise<Place | null> {
    const places = await this.getPlaces()
    return places.find(p => p.id === id) || null
  }

  async searchPlaces(query: string): Promise<Place[]> {
    const places = await this.getPlaces()
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    return places.filter(place => {
      const normalizedName = place.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const normalizedDesc = place.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const normalizedTags = place.tags.map(tag => tag.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedDesc.includes(normalizedQuery) ||
        normalizedTags.some(tag => tag.includes(normalizedQuery))
      )
    })
  }

  async getPlacesByCategory(category: string): Promise<Place[]> {
    const places = await this.getPlaces()
    return places.filter(place =>
      place.type.toLowerCase().includes(category.toLowerCase()) ||
      place.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    )
  }

  async getPlacesNearby(lat: number, lng: number, radiusKm: number = 5): Promise<Place[]> {
    const places = await this.getPlaces()
    return places.filter(place => {
      if (!place.location?.lat || !place.location?.lng) return false

      const distance = this.calculateDistance(lat, lng, place.location.lat, place.location.lng)
      return distance <= radiusKm
    }).map(place => ({
      ...place,
      distance: this.calculateDistance(lat, lng, place.location.lat, place.location.lng)
    })) as (Place & { distance: number })[]
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  clearCache() {
    this.placesCache = null
    this.markersCache = null
    this.hotelsCache = null
    this.eventsCache = null
  }
}

export default new DataService()
