import { useState } from 'react'
import { Navigation, MapPin, X, Plus, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Place, Location } from '../../types'

interface RoutingPanelProps {
  places: Place[]
  onRouteCalculated?: (route: Location[]) => void
}

export default function RoutingPanel({ places, onRouteCalculated }: RoutingPanelProps) {
  const [waypoints, setWaypoints] = useState<Location[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const addWaypoint = (place: Place) => {
    if (place.location?.lat && place.location?.lng) {
      setWaypoints([...waypoints, place.location])
      setSelectedPlace(null)
    }
  }

  const removeWaypoint = (index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index))
  }

  const clearWaypoints = () => {
    setWaypoints([])
  }

  const calculateRoute = async () => {
    if (waypoints.length < 2) return

    setIsCalculating(true)

    // Simulación de cálculo de ruta
    // En producción, usar un servicio de routing real como OSRM o Google Directions API
    await new Promise(resolve => setTimeout(resolve, 1000))

    onRouteCalculated?.(waypoints)
    setIsCalculating(false)
  }

  return (
    <div className="routing-panel">
      <div className="routing-header">
        <h3>
          <Navigation size={20} />
          Planificar Ruta
        </h3>
        {waypoints.length > 0 && (
          <button
            className="clear-route-button"
            onClick={clearWaypoints}
            title="Limpiar ruta"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Place Search */}
      <div className="routing-search">
        <input
          type="text"
          placeholder="Buscar lugar para agregar..."
          value={selectedPlace?.name || ''}
          onChange={(e) => {
            // Implementar búsqueda de lugares
          }}
          className="route-search-input"
        />
        <button
          className="add-waypoint-button"
          onClick={() => selectedPlace && addWaypoint(selectedPlace)}
          disabled={!selectedPlace}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Waypoints List */}
      <div className="waypoints-list">
        <AnimatePresence>
          {waypoints.length === 0 ? (
            <div className="empty-waypoints">
              <MapPin size={32} className="empty-icon" />
              <p>Agrega puntos a tu ruta</p>
              <p className="empty-hint">Busca y selecciona lugares para crear tu ruta</p>
            </div>
          ) : (
            waypoints.map((waypoint, index) => (
              <motion.div
                key={index}
                className="waypoint-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="waypoint-number">{index + 1}</div>
                <div className="waypoint-info">
                  <span className="waypoint-coords">
                    {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
                  </span>
                  {waypoint.address && (
                    <span className="waypoint-address">{waypoint.address}</span>
                  )}
                </div>
                <button
                  className="remove-waypoint-button"
                  onClick={() => removeWaypoint(index)}
                  title="Eliminar punto"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Calculate Button */}
      {waypoints.length >= 2 && (
        <motion.button
          className="calculate-route-button"
          onClick={calculateRoute}
          disabled={isCalculating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCalculating ? (
            <>
              <ArrowRight size={18} className="animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <ArrowRight size={18} />
              Calcular Ruta
            </>
          )}
        </motion.button>
      )}

      {/* Route Stats */}
      {waypoints.length >= 2 && (
        <div className="route-stats">
          <div className="stat-item">
            <span className="stat-label">Puntos</span>
            <span className="stat-value">{waypoints.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Distancia estimada</span>
            <span className="stat-value">~{waypoints.length * 2} km</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tiempo estimado</span>
            <span className="stat-value">~{waypoints.length * 15} min</span>
          </div>
        </div>
      )}
    </div>
  )
}
