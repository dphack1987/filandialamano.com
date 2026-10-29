import { useMemo } from 'react'
import { Search, X, Heart, MapPin } from 'lucide-react'
import { Place } from '../../types'
import { useStore } from '../../store/useStore'
import { CATEGORIES, categoryMeta } from '../../constants/categories'
import AdvancedMap from './AdvancedMap'
import MapControls from './MapControls'
import PlaceDetail from '../places/PlaceDetail'
import PlaceCard from '../places/PlaceCard'
import RoutePanel from '../routing/RoutePanel'
import { AnimatePresence } from 'framer-motion'
import './MapView.css'

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export default function MapView({ places }: { places: Place[] }) {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedPlace, setSelectedPlace,
    showFavoritesOnly, setShowFavoritesOnly,
    favorites,
    addToSearchHistory,
    userLocation, setUserLocation,
  } = useStore()

  const filtered = useMemo(() => {
    let list = places.filter(p => p.active !== false && p.location?.lat && p.location?.lng)

    if (showFavoritesOnly) {
      const ids = new Set(favorites.map(f => f.placeId))
      list = list.filter(p => ids.has(p.id))
    }

    if (selectedCategory) {
      list = list.filter(p => categoryMeta(p.type).id === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = normalize(searchQuery.trim())
      list = list.filter(p =>
        normalize(p.name).includes(q) ||
        normalize(p.description || '').includes(q) ||
        (p.tags || []).some(t => normalize(t).includes(q))
      )
    }

    return list.sort((a, b) => {
      if (a.isPautante !== b.isPautante) return a.isPautante ? -1 : 1
      return Number(b.rating) - Number(a.rating)
    })
  }, [places, searchQuery, selectedCategory, showFavoritesOnly, favorites])

  return (
    <div className="map-view">
      <aside className="map-sidebar">
        <div className="map-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Buscar lugares, cafés, hoteles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addToSearchHistory(searchQuery.trim())
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="map-filters">
          <button
            className={`filter-chip ${!selectedCategory && !showFavoritesOnly ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(null)
              setShowFavoritesOnly(false)
            }}
          >
            Todos
          </button>
          <button
            className={`filter-chip ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Heart size={12} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            Favoritos
          </button>
          {CATEGORIES.map(cat => {
            const count = places.filter(p =>
              p.active !== false &&
              categoryMeta(p.type).id === cat.id &&
              p.location?.lat
            ).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                style={selectedCategory === cat.id ? { background: cat.color, borderColor: cat.color } : undefined}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                {cat.label}
                <span className="filter-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="map-results">
          <div className="map-results-header">
            <span>{filtered.length} lugar{filtered.length === 1 ? '' : 'es'}</span>
          </div>
          {filtered.length === 0 ? (
            <div className="map-empty">
              <MapPin size={28} />
              <p>Sin resultados</p>
              <p className="map-empty-hint">Prueba otra búsqueda o categoría</p>
            </div>
          ) : (
            filtered.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                active={selectedPlace?.id === place.id}
                onClick={() => setSelectedPlace(place)}
              />
            ))
          )}
        </div>
      </aside>

      <div className="map-canvas">
        <AdvancedMap
          places={filtered}
          onPlaceSelect={p => setSelectedPlace(p)}
          userLocation={userLocation}
        />
        <MapControls
          onLocateUser={() => {
            if (!navigator.geolocation) return
            navigator.geolocation.getCurrentPosition(
              pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
              () => {}
            )
          }}
        />
        <RoutePanel />
        <AnimatePresence>
          {selectedPlace && (
            <PlaceDetail
              key={selectedPlace.id}
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
