import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Place } from '../../types'
import { useStore } from '../../store/useStore'

// Fix for default marker icons
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

function MapController({ onPlaceSelect, userLocation }: AdvancedMapProps) {
  const map = useMap()
  const { selectedMapLayer, setMapZoom, setMapCenter } = useStore()

  useEffect(() => {
    if (selectedMapLayer) {
      // Remove existing tile layers
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer)
        }
      })

      // Add selected tile layer
      L.tileLayer(selectedMapLayer.url, {
        attribution: selectedMapLayer.attribution,
        maxZoom: selectedMapLayer.maxZoom || 19
      }).addTo(map)
    }
  }, [selectedMapLayer])

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 16)
    }
  }, [userLocation])

  useEffect(() => {
    map.on('zoomend', () => {
      setMapZoom(map.getZoom())
    })
    map.on('moveend', () => {
      const center = map.getCenter()
      setMapCenter([center.lat, center.lng])
    })
  }, [map, setMapZoom, setMapCenter])

  return null
}

export default function AdvancedMap({ places, onPlaceSelect, userLocation }: AdvancedMapProps) {
  const { mapCenter, mapZoom, selectedMapLayer } = useStore()

  const activeLayer = selectedMapLayer || {
    name: 'Calles',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }

  const getColorByType = (type: string): string => {
    const colors: Record<string, string> = {
      'Alojamientos': '#56755b',
      'Restaurantes': '#e76c52',
      'Experiencias': '#f4a261',
      'Comercio': '#2a9d8f',
      'Servicios': '#264653',
      'Camping': '#e9c46a'
    }
    return colors[type] || '#56755b'
  }

  const createCustomIcon = (place: Place) => {
    const color = getColorByType(place.type)
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: bold;
        ">
          ${place.icon ? place.icon[0] : '📍'}
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
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
          url={activeLayer.url}
          attribution={activeLayer.attribution}
          maxZoom={activeLayer.maxZoom || 19}
        />

        {places.map((place) => (
          place.location?.lat && place.location?.lng && (
            <Marker
              key={place.id}
              position={[place.location.lat, place.location.lng]}
              icon={createCustomIcon(place)}
              eventHandlers={{
                click: () => {
                  if (onPlaceSelect) onPlaceSelect(place)
                }
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{place.name}</h3>
                  <p className="popup-type">{place.type}</p>
                  <p className="popup-description">{place.description.substring(0, 100)}...</p>
                  <div className="popup-rating">⭐ {place.rating} estrellas</div>
                  <div className="popup-price">{place.priceRange}</div>
                  {place.contact.whatsapp && (
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
        ))}

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
                  animation: pulse 2s infinite;
                "></div>
                <style>
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                  }
                </style>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              <strong>📍 Tu ubicación</strong>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
