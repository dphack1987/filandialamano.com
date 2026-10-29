import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Map, Heart, Navigation, Filter, Moon, Sun, Maximize2, Locate, Layers } from 'lucide-react'
import { Place } from './types'
import { useStore } from './store/useStore'
import dataService from './services/dataService'
import AdvancedMap from './components/map/AdvancedMap'
import MapControls from './components/map/MapControls'
import ThemeToggle from './components/ui/ThemeToggle'
import FavoritesPanel from './components/favorites/FavoritesPanel'
import RoutingPanel from './components/routing/RoutingPanel'
import './styles.css'
import './App.css'
import './components/map/AdvancedMap.css'
import './components/map/MapControls.css'
import './components/ui/ThemeToggle.css'
import './components/favorites/FavoritesPanel.css'
import './components/routing/RoutingPanel.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showRouting, setShowRouting] = useState(false)
  const [activePanel, setActivePanel] = useState<'favorites' | 'routing' | null>(null)

  const {
    places,
    setPlaces,
    selectedPlace,
    setSelectedPlace,
    userLocation,
    setUserLocation,
    searchQuery,
    setSearchQuery,
    addToSearchHistory,
    searchHistory,
    theme,
    setTheme,
    language,
    setLanguage,
    currency,
    setCurrency,
    isFavorite,
    addFavorite,
    removeFavorite
  } = useStore()

  // Load data
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [loadedPlaces] = await Promise.all([
        dataService.getPlaces()
      ])
      setPlaces(loadedPlaces)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }, [setPlaces])

  // Get user location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [setUserLocation])

  // Search places
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      addToSearchHistory(query)
      const results = await dataService.searchPlaces(query)
      setPlaces(results)
    } else {
      loadData()
    }
  }, [setSearchQuery, addToSearchHistory, setPlaces, loadData])

  // Handle place selection
  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedPlace(place)
  }, [setSelectedPlace])

  // Toggle favorite
  const toggleFavorite = useCallback((place: Place) => {
    if (isFavorite(place.id)) {
      removeFavorite(place.id)
    } else {
      addFavorite(place.id)
    }
  }, [isFavorite, removeFavorite, addFavorite])

  // Load data on mount
  useEffect(() => {
    loadData()
    getUserLocation()
  }, [loadData, getUserLocation])

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
    } else {
      // Auto - use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    }
  }, [theme])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando mapa de Filandia...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Helmet>
        <title>Filandia a la Mano - Mapa Digital Turístico</title>
        <meta name="description" content="Mapa turístico interactivo de Filandia, Quindío. Alojamientos, gastronomía, experiencias y comercio local verificados." />
      </Helmet>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">
              Filandia
              <span className="app-subtitle">a la Mano</span>
            </h1>
          </div>

          <div className="header-center">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar lugares..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="search-clear"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="header-right">
            <ThemeToggle />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="language-select"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="pt">PT</option>
              <option value="it">IT</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="currency-select"
            >
              <option value="COP">COP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <button
              className="icon-button"
              onClick={() => setActivePanel(activePanel === 'favorites' ? null : 'favorites')}
              title="Favoritos"
            >
              <Heart size={20} />
            </button>

            <button
              className="icon-button"
              onClick={() => setActivePanel(activePanel === 'routing' ? null : 'routing')}
              title="Planificar ruta"
            >
              <Navigation size={20} />
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Map */}
        <div className="map-container">
          <AdvancedMap
            places={places}
            onPlaceSelect={handlePlaceSelect}
            userLocation={userLocation}
          />
          <MapControls
            onLocateUser={getUserLocation}
            onFitBounds={() => {/* TODO: Implement */}}
            onResetView={() => {/* TODO: Implement */}}
          />
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              className="side-panel"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                className="panel-close"
                onClick={() => setActivePanel(null)}
              >
                <X size={20} />
              </button>

              {activePanel === 'favorites' && (
                <FavoritesPanel
                  places={places}
                  onPlaceSelect={handlePlaceSelect}
                />
              )}

              {activePanel === 'routing' && (
                <RoutingPanel
                  places={places}
                  onRouteCalculated={(route) => console.log('Route:', route)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Place Detail Modal */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedPlace(null)}
                >
                  <X size={24} />
                </button>

                {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                  <div className="modal-image">
                    <img src={selectedPlace.photos[0]} alt={selectedPlace.name} />
                  </div>
                )}

                <div className="modal-body">
                  <div className="modal-header">
                    <h2>{selectedPlace.name}</h2>
                    <span className="modal-badge">{selectedPlace.type}</span>
                  </div>

                  <p className="modal-description">{selectedPlace.description}</p>

                  <div className="modal-details">
                    <div className="detail-item">
                      <span className="detail-label">Rating</span>
                      <span className="detail-value">⭐ {selectedPlace.rating}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Precio</span>
                      <span className="detail-value">{selectedPlace.priceRange}</span>
                    </div>
                    {selectedPlace.contact.phone && (
                      <div className="detail-item">
                        <span className="detail-label">Teléfono</span>
                        <span className="detail-value">{selectedPlace.contact.phone}</span>
                      </div>
                    )}
                    {selectedPlace.location.address && (
                      <div className="detail-item">
                        <span className="detail-label">Dirección</span>
                        <span className="detail-value">{selectedPlace.location.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <button
                      className="action-button primary"
                      onClick={() => toggleFavorite(selectedPlace)}
                    >
                      {isFavorite(selectedPlace.id) ? (
                        <>
                          <Heart size={18} fill="currentColor" />
                          En favoritos
                        </>
                      ) : (
                        <>
                          <Heart size={18} />
                          Agregar a favoritos
                        </>
                      )}
                    </button>

                    {selectedPlace.contact.whatsapp && (
                      <a
                        href={`https://wa.me/${selectedPlace.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button whatsapp"
                      >
                        💬 WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
