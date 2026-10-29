import { Navigation, Plus, Trash2, X, Route } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'
import { fetchOsrmRoute } from '../../services/routeService'
import './RoutePanel.css'

interface RoutePanelProps {
  onClose?: () => void
}

export default function RoutePanel({ onClose }: RoutePanelProps) {
  const {
    routeWaypoints,
    removeRouteWaypoint,
    clearRoute,
    activeRoute,
    setActiveRoute,
    isCalculatingRoute,
    setCalculatingRoute,
    setSelectedPlace,
  } = useStore()

  const calculate = async () => {
    if (routeWaypoints.length < 2) return
    setCalculatingRoute(true)
    try {
      const coords = routeWaypoints.map(w => [w.location.lat, w.location.lng] as [number, number])
      const route = await fetchOsrmRoute(coords)
      setActiveRoute(route)
      if (route?.geometry?.length) {
        const lats = route.geometry.map(c => c[0])
        const lngs = route.geometry.map(c => c[1])
        const midLat = (Math.min(...lats) + Math.max(...lats)) / 2
        const midLng = (Math.min(...lngs) + Math.max(...lngs)) / 2
        useStore.getState().setMapCenter([midLat, midLng])
      }
    } catch {
      setActiveRoute(null)
    } finally {
      setCalculatingRoute(false)
    }
  }

  return (
    <motion.div
      className="route-panel"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <div className="route-panel-header">
        <h3>
          <Route size={18} />
          Mi ruta
        </h3>
        <div className="route-panel-actions">
          {routeWaypoints.length > 0 && (
            <button className="route-clear" onClick={clearRoute} title="Limpiar ruta">
              <Trash2 size={14} />
            </button>
          )}
          {onClose && (
            <button className="route-close" onClick={onClose} aria-label="Cerrar panel de ruta">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {routeWaypoints.length === 0 ? (
        <p className="route-empty">
          Abre un lugar y toca <Plus size={12} /> “Agregar a la ruta” para planificar tu recorrido.
        </p>
      ) : (
        <>
          <ol className="route-list">
            <AnimatePresence>
              {routeWaypoints.map((wp, i) => (
                <motion.li
                  key={wp.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="route-item"
                >
                  <span className="route-index">{i + 1}</span>
                  <button
                    className="route-item-name"
                    onClick={() => setSelectedPlace(wp)}
                    title={wp.name}
                  >
                    {wp.name}
                  </button>
                  <button
                    className="route-item-remove"
                    onClick={() => removeRouteWaypoint(wp.id)}
                    aria-label={`Quitar ${wp.name}`}
                  >
                    <X size={14} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>

          <button
            className="route-calculate"
            onClick={calculate}
            disabled={isCalculatingRoute || routeWaypoints.length < 2}
          >
            <Navigation size={16} />
            {isCalculatingRoute ? 'Calculando...' : 'Calcular ruta (OSRM)'}
          </button>

          {activeRoute && (
            <div className="route-stats">
              <div>
                <span>Distancia</span>
                <strong>{activeRoute.distanceKm.toFixed(1)} km</strong>
              </div>
              <div>
                <span>Tiempo</span>
                <strong>{Math.round(activeRoute.durationMin)} min</strong>
              </div>
              <div>
                <span>Paradas</span>
                <strong>{routeWaypoints.length}</strong>
              </div>
            </div>
          )}

          {!activeRoute && routeWaypoints.length >= 2 && (
            <p className="route-hint">La ruta se dibujará en el mapa al calcular.</p>
          )}
        </>
      )}
    </motion.div>
  )
}
