import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language, Currency, Place, MapLayer, Itinerary, Favorite, Theme } from '../types'

interface AppState {
  // Language & Currency
  language: Language
  currency: Currency
  setLanguage: (lang: Language) => void
  setCurrency: (curr: Currency) => void

  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Places
  places: Place[]
  setPlaces: (places: Place[]) => void
  selectedPlace: Place | null
  setSelectedPlace: (place: Place | null) => void

  // Map
  mapLayers: MapLayer[]
  selectedMapLayer: MapLayer | null
  setSelectedMapLayer: (layer: MapLayer | null) => void
  mapZoom: number
  setMapZoom: (zoom: number) => void
  mapCenter: [number, number]
  setMapCenter: (center: [number, number]) => void

  // Favorites
  favorites: Favorite[]
  addFavorite: (placeId: number, collection?: string) => void
  removeFavorite: (placeId: number) => void
  isFavorite: (placeId: number) => boolean

  // Itineraries
  itineraries: Itinerary[]
  addItinerary: (itinerary: Itinerary) => void
  removeItinerary: (id: string) => void
  updateItinerary: (id: string, itinerary: Partial<Itinerary>) => void

  // User Location
  userLocation: { lat: number; lng: number } | null
  setUserLocation: (location: { lat: number; lng: number } | null) => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void

  // Filters
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  ratingFilter: number
  setRatingFilter: (rating: number) => void
  distanceFilter: number
  setDistanceFilter: (distance: number) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language & Currency
      language: 'es',
      currency: 'COP',
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (curr) => set({ currency: curr }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      // Places
      places: [],
      setPlaces: (places) => set({ places }),
      selectedPlace: null,
      setSelectedPlace: (place) => set({ selectedPlace: place }),

      // Map
      mapLayers: [
        {
          name: 'Calles',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19
        },
        {
          name: 'Satélite',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri',
          maxZoom: 19
        },
        {
          name: 'Terreno',
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenTopoMap',
          maxZoom: 17
        },
        {
          name: 'Ciclismo',
          url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
          attribution: '&copy; Thunderforest',
          maxZoom: 18
        }
      ],
      selectedMapLayer: null,
      setSelectedMapLayer: (layer) => set({ selectedMapLayer: layer }),
      mapZoom: 14,
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      mapCenter: [4.695, -75.635],
      setMapCenter: (center) => set({ mapCenter: center }),

      // Favorites
      favorites: [],
      addFavorite: (placeId, collection) => {
        const { favorites } = get()
        if (!favorites.some(f => f.placeId === placeId)) {
          set({
            favorites: [...favorites, { placeId, collection, dateAdded: new Date() }]
          })
        }
      },
      removeFavorite: (placeId) => {
        set({ favorites: get().favorites.filter(f => f.placeId !== placeId) })
      },
      isFavorite: (placeId) => {
        return get().favorites.some(f => f.placeId === placeId)
      },

      // Itineraries
      itineraries: [],
      addItinerary: (itinerary) => {
        set({ itineraries: [...get().itineraries, itinerary] })
      },
      removeItinerary: (id) => {
        set({ itineraries: get().itineraries.filter(i => i.id !== id) })
      },
      updateItinerary: (id, updates) => {
        set({
          itineraries: get().itineraries.map(i =>
            i.id === id ? { ...i, ...updates } : i
          )
        })
      },

      // User Location
      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      searchHistory: [],
      addToSearchHistory: (query) => {
        const { searchHistory } = get()
        if (!searchHistory.includes(query)) {
          set({ searchHistory: [query, ...searchHistory].slice(0, 10) })
        }
      },

      // Filters
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 1000],
      setPriceRange: (range) => set({ priceRange: range }),
      ratingFilter: 0,
      setRatingFilter: (rating) => set({ ratingFilter: rating }),
      distanceFilter: 50,
      setDistanceFilter: (distance) => set({ distanceFilter: distance })
    }),
    {
      name: 'filandia-storage',
      partialize: (state) => ({
        language: state.language,
        currency: state.currency,
        theme: state.theme,
        favorites: state.favorites,
        itineraries: state.itineraries,
        searchHistory: state.searchHistory,
        selectedMapLayer: state.selectedMapLayer
      })
    }
  )
)
