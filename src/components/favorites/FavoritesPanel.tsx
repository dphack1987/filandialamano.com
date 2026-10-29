import { useStore } from '../../store/useStore'
import { Heart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Place } from '../../types'

interface FavoritesPanelProps {
  places: Place[]
  onPlaceSelect?: (place: Place) => void
}

export default function FavoritesPanel({ places, onPlaceSelect }: FavoritesPanelProps) {
  const { favorites, removeFavorite, isFavorite } = useStore()

  const favoritePlaces = places.filter(place => isFavorite(place.id))

  if (favoritePlaces.length === 0) {
    return (
      <div className="favorites-panel empty">
        <Heart size={32} className="empty-icon" />
        <p>No tienes favoritos aún</p>
        <p className="empty-hint">Haz clic en el corazón de cualquier lugar para guardarlo</p>
      </div>
    )
  }

  return (
    <div className="favorites-panel">
      <div className="favorites-header">
        <h3>
          <Heart size={20} className="heart-icon" />
          Mis Favoritos
        </h3>
        <span className="favorites-count">{favoritePlaces.length}</span>
      </div>

      <div className="favorites-list">
        <AnimatePresence>
          {favoritePlaces.map((place) => (
            <motion.div
              key={place.id}
              className="favorite-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onPlaceSelect?.(place)}
            >
              <div className="favorite-image">
                {place.photos && place.photos.length > 0 ? (
                  <img src={place.photos[0]} alt={place.name} />
                ) : (
                  <div className="placeholder-image">
                    <Heart size={24} />
                  </div>
                )}
              </div>

              <div className="favorite-info">
                <h4>{place.name}</h4>
                <p className="favorite-type">{place.type}</p>
                <p className="favorite-rating">⭐ {place.rating}</p>
              </div>

              <button
                className="remove-favorite-button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFavorite(place.id)
                }}
                title="Eliminar de favoritos"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
