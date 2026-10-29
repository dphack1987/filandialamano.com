import { useStore } from '../../store/useStore'
import { Layers, Plus, Minus, Locate, Crosshair } from 'lucide-react'
import './MapControls.css'

interface MapControlsProps {
  onLocateUser?: () => void
}

export default function MapControls({ onLocateUser }: MapControlsProps) {
  const { mapLayers, selectedMapLayer, setSelectedMapLayer, mapZoom, setMapZoom } = useStore()

  return (
    <div className="map-controls">
      <div className="map-control-group">
        <div className="map-control-label">
          <Layers size={16} />
          <span>Capas</span>
        </div>
        <div className="map-layer-buttons">
          {mapLayers.map((layer) => (
            <button
              key={layer.name}
              className={`map-layer-button ${selectedMapLayer?.name === layer.name || (!selectedMapLayer && layer.name === 'Calles') ? 'active' : ''}`}
              onClick={() => setSelectedMapLayer(layer)}
              title={layer.name}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      <div className="map-control-group vertical">
        <button
          className="map-control-button"
          onClick={() => setMapZoom(Math.min(mapZoom + 1, 19))}
          title="Acercar"
          aria-label="Acercar"
        >
          <Plus size={18} />
        </button>
        <div className="map-zoom-display">{mapZoom}</div>
        <button
          className="map-control-button"
          onClick={() => setMapZoom(Math.max(mapZoom - 1, 1))}
          title="Alejar"
          aria-label="Alejar"
        >
          <Minus size={18} />
        </button>
      </div>

      <div className="map-control-group vertical">
        <button
          className="map-control-button"
          onClick={() => {
            if (onLocateUser) onLocateUser()
            else if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                pos => useStore.getState().setUserLocation({
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                }),
                () => {}
              )
            }
          }}
          title="Mi ubicación"
          aria-label="Mi ubicación"
        >
          <Locate size={18} />
        </button>
        <button
          className="map-control-button"
          onClick={() => {
            useStore.getState().setMapCenter([4.695, -75.635])
            setMapZoom(15)
            useStore.getState().setSelectedPlace(null)
          }}
          title="Centrar en Filandia"
          aria-label="Centrar en Filandia"
        >
          <Crosshair size={18} />
        </button>
      </div>
    </div>
  )
}
