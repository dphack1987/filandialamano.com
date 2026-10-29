import { Place } from '../types'

class DataService {
  private placesCache: Place[] | null = null

  async getPlaces(): Promise<Place[]> {
    if (this.placesCache) return this.placesCache

    try {
      const response = await fetch('/data/places.json')
      if (!response.ok) throw new Error('Failed to fetch places')
      const data = await response.json()
      this.placesCache = data.places || []
      return this.placesCache ?? []
    } catch (error) {
      console.error('Error fetching places:', error)
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
    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

    return places.filter(place => {
      const normalizedName = place.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      const normalizedDesc = (place.description || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      const normalizedTags = (place.tags || []).map(tag => tag.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))

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
      (place.tags || []).some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    )
  }

  clearCache() {
    this.placesCache = null
  }
}

export default new DataService()
