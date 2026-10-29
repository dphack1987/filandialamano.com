import { Star, Heart } from 'lucide-react'
import { Place } from '../../types'
import { useStore } from '../../store/useStore'
import { categoryMeta } from '../../constants/categories'
import PlaceImage from './PlaceImage'
import './PlaceCard.css'

interface PlaceCardProps {
  place: Place
  active?: boolean
  onClick?: () => void
}

export default function PlaceCard({ place, active, onClick }: PlaceCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useStore()
  const fav = isFavorite(place.id)
  const meta = categoryMeta(place.type)

  return (
    <div
      className={`place-card ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="place-card-thumb">
        <PlaceImage
          photos={place.photos}
          name={place.name}
          type={place.type}
          alt=""
        />
      </div>
      <div className="place-card-body">
        <div className="place-card-top">
          <span className="place-card-type">{meta.label}</span>
          <button
            className={`place-card-fav ${fav ? 'active' : ''}`}
            onClick={e => {
              e.stopPropagation()
              fav ? removeFavorite(place.id) : addFavorite(place.id)
            }}
            aria-label={fav ? 'Quitar favorito' : 'Agregar favorito'}
          >
            <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h4 className="place-card-name">
          {place.name}
          {place.isPautante && <span className="place-card-sponsored">★</span>}
        </h4>
        <div className="place-card-meta">
          <span className="place-card-rating"><Star size={12} fill="currentColor" /> {place.rating}</span>
          <span className="place-card-price">{place.priceRange}</span>
        </div>
      </div>
    </div>
  )
}
