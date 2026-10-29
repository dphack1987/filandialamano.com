import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Place } from '../../types'
import { useStore } from '../../store/useStore'
import { categoryColor } from '../../constants/categories'
import './AdvancedMap.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface AdvancedMapProps {
  places: Place[]
  onPlaceSelect?: (place: Place) => void
  userLocation?: { lat: number; lng: number } | null
}

function MapController({ userLocation, onPlaceSelect }: AdvancedMapProps) {
  const map = useMap()
  const { selectedMapLayer, setMapZoom, setMapCenter, mapZoom, selectedPlace } = useStore()

  useMapEvents({
    zoomend: () => {
      const z = map.getZoom()
      if (z !== useStore.getState().mapZoom) setMapZoom(z)
    },
    moveend: () => {
      const c = map.getCenter()
      const state = useStore.getState().mapCenter
      if (Math.abs(c.lat - state[0]) > 1e-6 || Math.abs(c.lng - state[1]) > 1e-6) {
        setMapCenter([c.lat, c.lng])
      }
    },
  })

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 16)
    }
  }, [userLocation, map])

  useEffect(() => {
    if (map.getZoom() !== mapZoom) {
      map.setZoom(mapZoom)
    }
  }, [mapZoom, map])

  useEffect(() => {
    if (!selectedPlace?.location?.lat) return
    map.flyTo([selectedPlace.location.lat, selectedPlace.location.lng], Math.max(map.getZoom(), 16), {
      duration: 0.8,
    })
    onPlaceSelect?.(selectedPlace)
  }, [selectedPlace, map])

  useEffect(() => {
    // keep selected layer reference fresh for consumers that need it
    void selectedMapLayer
  }, [selectedMapLayer])

  return null
}

function createDivIcon(color: string, letter: string, size = 30) {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${Math.round(size * 0.45)}px;
        font-weight: 700;
        font-family: system-ui, sans-serif;
      ">${letter}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export default function AdvancedMap({ places, onPlaceSelect, userLocation }: AdvancedMapProps) {
  const { mapCenter, mapZoom, selectedMapLayer, activeRoute, routeWaypoints } = useStore()
  const setSelectedPlace = useStore(s => s.setSelectedPlace)

  const activeLayer = selectedMapLayer || {
    name: 'Calles',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }

  return (
    <div className="advanced-map-container">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapController
          places={places}
          onPlaceSelect={onPlaceSelect}
          userLocation={userLocation}
        />

        <TileLayer
          key={activeLayer.name}
          url={activeLayer.url}
          attribution={activeLayer.attribution}
          maxZoom={activeLayer.maxZoom || 19}
        />

        {activeRoute?.geometry && activeRoute.geometry.length > 1 && (
          <Polyline
            positions={activeRoute.geometry}
            pathOptions={{
              color: '#10b981',
              weight: 5,
              opacity: 0.85,
              lineJoin: 'round',
              lineCap: 'round',
            }}
          />
        )}

        {routeWaypoints.map((wp, i) =>
          wp.location?.lat && wp.location?.lng ? (
            <Marker
              key={`wp-${wp.id}`}
              position={[wp.location.lat, wp.location.lng]}
              icon={createDivIcon('#0f172a', String(i + 1), 26)}
              zIndexOffset={500}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{i + 1}. {wp.name}</h3>
                  <p className="popup-type">Punto de ruta</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}

        {places.map((place) => {
          if (!place.location?.lat || !place.location?.lng) return null
          const color = categoryColor(place.type)
          const letter = place.name.charAt(0).toUpperCase()
          return (
            <Marker
              key={place.id}
              position={[place.location.lat, place.location.lng]}
              icon={createDivIcon(color, letter)}
              eventHandlers={{
                click: () => {
                  setSelectedPlace(place)
                  onPlaceSelect?.(place)
                }
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{place.name}</h3>
                  <p className="popup-type">{place.type}</p>
                  <p className="popup-description">
                    {place.description.length > 100
                      ? `${place.description.substring(0, 100)}...`
                      : place.description}
                  </p>
                  <div className="popup-rating">⭐ {place.rating}</div>
                  <div className="popup-price">{place.priceRange}</div>
                  <button
                    className="popup-detail-btn"
                    onClick={() => setSelectedPlace(place)}
                  >
                    Ver detalle
                  </button>
                  {place.contact?.whatsapp && (
                    <a
                      href={`https://wa.me/${place.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-whatsapp"
                    >
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              className: 'user-location-marker',
              html: `
                <div style="
                  background-color: #3b82f6;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.3);
                "></div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup><strong>📍 Tu ubicación</strong></Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
