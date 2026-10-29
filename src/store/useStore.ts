import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language, Currency, Place, MapLayer, Favorite, Theme } from '../types'
import { OsrmRoute } from '../services/routeService'

interface AppState {
  language: Language
  currency: Currency
  setLanguage: (lang: Language) => void
  setCurrency: (curr: Currency) => void

  theme: Theme
  setTheme: (theme: Theme) => void

  places: Place[]
  setPlaces: (places: Place[]) => void
  selectedPlace: Place | null
  setSelectedPlace: (place: Place | null) => void

  mapLayers: MapLayer[]
  selectedMapLayer: MapLayer | null
  setSelectedMapLayer: (layer: MapLayer | null) => void
  mapZoom: number
  setMapZoom: (zoom: number) => void
  mapCenter: [number, number]
  setMapCenter: (center: [number, number]) => void

  favorites: Favorite[]
  addFavorite: (placeId: number, collection?: string) => void
  removeFavorite: (placeId: number) => void
  isFavorite: (placeId: number) => boolean

  userLocation: { lat: number; lng: number } | null
  setUserLocation: (location: { lat: number; lng: number } | null) => void

  searchQuery: string
  setSearchQuery: (query: string) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void

  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  showFavoritesOnly: boolean
  setShowFavoritesOnly: (show: boolean) => void

  routeWaypoints: Place[]
  addRouteWaypoint: (place: Place) => void
  removeRouteWaypoint: (placeId: number) => void
  clearRoute: () => void
  activeRoute: OsrmRoute | null
  setActiveRoute: (route: OsrmRoute | null) => void
  isCalculatingRoute: boolean
  setCalculatingRoute: (v: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'es',
      currency: 'COP',
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (curr) => set({ currency: curr }),

      theme: 'light',
      setTheme: (theme) => set({ theme }),

      places: [],
      setPlaces: (places) => set({ places }),
      selectedPlace: null,
      setSelectedPlace: (place) => set({ selectedPlace: place }),

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
      ],
      selectedMapLayer: null,
      setSelectedMapLayer: (layer) => set({ selectedMapLayer: layer }),
      mapZoom: 15,
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      mapCenter: [4.695, -75.635],
      setMapCenter: (center) => set({ mapCenter: center }),

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

      userLocation: null,
      setUserLocation: (location) => set({ userLocation: location }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      searchHistory: [],
      addToSearchHistory: (query) => {
        const { searchHistory } = get()
        if (query.trim() && !searchHistory.includes(query)) {
          set({ searchHistory: [query, ...searchHistory].slice(0, 10) })
        }
      },

      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      showFavoritesOnly: false,
      setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),

      routeWaypoints: [],
      addRouteWaypoint: (place) => {
        const { routeWaypoints } = get()
        if (!routeWaypoints.some(w => w.id === place.id) && place.location?.lat) {
          set({ routeWaypoints: [...routeWaypoints, place], activeRoute: null })
        }
      },
      removeRouteWaypoint: (placeId) => {
        set({
          routeWaypoints: get().routeWaypoints.filter(w => w.id !== placeId),
          activeRoute: null,
        })
      },
      clearRoute: () => set({ routeWaypoints: [], activeRoute: null }),
      activeRoute: null,
      setActiveRoute: (route) => set({ activeRoute: route }),
      isCalculatingRoute: false,
      setCalculatingRoute: (v) => set({ isCalculatingRoute: v }),
    }),
    {
      name: 'filandia-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        currency: state.currency,
        favorites: state.favorites,
        searchHistory: state.searchHistory,
      }),
    }
  )
)
