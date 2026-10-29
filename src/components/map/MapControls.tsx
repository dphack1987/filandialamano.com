import { MapLayer } from '../../types'
import { useStore } from '../../store/useStore'
import { Layers, Plus, Minus, Locate, Maximize2, RotateCw } from 'lucide-react'

interface MapControlsProps {
  onLocateUser?: () => void
  onFitBounds?: () => void
  onResetView?: () => void
}

export default function MapControls({ onLocateUser, onFitBounds, onResetView }: MapControlsProps) {
  const { mapLayers, selectedMapLayer, setSelectedMapLayer, mapZoom, setMapZoom } = useStore()

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 19))
  }

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 1))
  }

  return (
    <div className="map-controls">
      {/* Layer Selector */}
      <div className="map-control-group">
        <div className="map-control-label">
          <Layers size={16} />
          <span>Capas</span>
        </div>
        <div className="map-layer-buttons">
          {mapLayers.map((layer) => (
            <button
              key={layer.name}
              className={`map-layer-button ${selectedMapLayer?.name === layer.name ? 'active' : ''}`}
              onClick={() => setSelectedMapLayer(layer)}
              title={layer.name}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="map-control-group vertical">
        <button
          className="map-control-button"
          onClick={handleZoomIn}
          title="Acercar"
          aria-label="Acercar"
        >
          <Plus size={18} />
        </button>
        <div className="map-zoom-display">{mapZoom}</div>
        <button
          className="map-control-button"
          onClick={handleZoomOut}
          title="Alejar"
          aria-label="Alejar"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* Location Controls */}
      <div className="map-control-group vertical">
        {onLocateUser && (
          <button
            className="map-control-button"
            onClick={onLocateUser}
            title="Mi ubicación"
            aria-label="Mi ubicación"
          >
            <Locate size={18} />
          </button>
        )}
        {onFitBounds && (
          <button
            className="map-control-button"
            onClick={onFitBounds}
            title="Ajustar vista"
            aria-label="Ajustar vista"
          >
            <Maximize2 size={18} />
          </button>
        )}
        {onResetView && (
          <button
            className="map-control-button"
            onClick={onResetView}
            title="Resetear vista"
            aria-label="Resetear vista"
          >
            <RotateCw size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
