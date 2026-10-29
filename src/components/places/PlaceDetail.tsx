import { X, MapPin, Clock, Star, Phone, Mail, Heart, ExternalLink, Navigation, Plus, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Place } from '../../types'
import { useStore } from '../../store/useStore'
import { categoryMeta } from '../../constants/categories'
import PlaceImage from './PlaceImage'
import './PlaceDetail.css'

interface PlaceDetailProps {
  place: Place
  onClose: () => void
}

export default function PlaceDetail({ place, onClose }: PlaceDetailProps) {
  const { isFavorite, addFavorite, removeFavorite, routeWaypoints, addRouteWaypoint } = useStore()
  const fav = isFavorite(place.id)
  const meta = categoryMeta(place.type)
  const inRoute = routeWaypoints.some(w => w.id === place.id)

  const waHref = place.contact?.whatsappDirect
    || (place.contact?.whatsapp
      ? `https://wa.me/${place.contact.whatsapp}?text=${encodeURIComponent(`Hola, quisiera información sobre ${place.name}`)}`
      : null)

  return (
    <motion.div
      className="place-detail"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className="place-detail-cover">
        <PlaceImage
          photos={place.photos}
          name={place.name}
          type={place.type}
          className="place-detail-photo"
        />
      </div>

      <div className="place-detail-header">
        <span className="place-detail-badge" style={{ background: meta.color }}>
          {meta.label}
        </span>
        <div className="place-detail-header-actions">
          <button
            className={`place-fav-btn ${fav ? 'active' : ''}`}
            onClick={() => fav ? removeFavorite(place.id) : addFavorite(place.id)}
            title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
          </button>
          <button className="place-close-btn" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="place-detail-body">
        <h2 className="place-detail-title">{place.name}</h2>

        <div className="place-detail-meta">
          <span className="place-rating"><Star size={14} fill="currentColor" /> {place.rating}</span>
          <span className="place-price">{place.priceRange}</span>
          {place.verified && <span className="place-verified">✓ Verificado</span>}
          {place.isPautante && <span className="place-sponsored">Destacado</span>}
        </div>

        {place.badge && <div className="place-chip">{place.badge}</div>}

        <p className="place-description">{place.description}</p>

        {place.location?.address && (
          <div className="place-info-row">
            <MapPin size={16} />
            <div>
              <strong>{place.location.address}</strong>
              {place.location.landmark && <div className="place-sub">{place.location.landmark}</div>}
            </div>
          </div>
        )}

        {(place.timeInfo || place.operatingHours?.notes) && (
          <div className="place-info-row">
            <Clock size={16} />
            <div>
              <strong>{place.timeInfo || 'Horario'}</strong>
              {place.operatingHours?.notes && (
                <div className="place-sub">{place.operatingHours.notes}</div>
              )}
            </div>
          </div>
        )}

        {place.contact?.phone && (
          <div className="place-info-row">
            <Phone size={16} />
            <a href={`tel:${place.contact.phone}`}>{place.contact.phone}</a>
          </div>
        )}

        {place.contact?.email && (
          <div className="place-info-row">
            <Mail size={16} />
            <a href={`mailto:${place.contact.email}`}>{place.contact.email}</a>
          </div>
        )}

        {place.tags?.length > 0 && (
          <div className="place-tags">
            {place.tags.map(tag => (
              <span key={tag} className="place-tag">#{tag}</span>
            ))}
          </div>
        )}

        {place.accommodationDetails?.services && place.accommodationDetails.services.length > 0 && (
          <div className="place-section">
            <h4>Servicios</h4>
            <ul className="place-list">
              {place.accommodationDetails.services.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        )}

        {place.accommodationDetails?.roomTypes && place.accommodationDetails.roomTypes.length > 0 && (
          <div className="place-section">
            <h4>Tipos de habitación</h4>
            <ul className="place-list">
              {place.accommodationDetails.roomTypes.map(r => <li key={r}>{r}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="place-detail-actions">
        <button
          className={`place-action ${inRoute ? 'in-route' : 'secondary'}`}
          onClick={() => addRouteWaypoint(place)}
          disabled={inRoute}
          title={inRoute ? 'Ya está en la ruta' : 'Agregar a la ruta'}
        >
          {inRoute ? <Check size={16} /> : <Plus size={16} />}
          {inRoute ? 'En ruta' : 'Ruta'}
        </button>
        <button
          className="place-action secondary"
          onClick={() => {
            if (place.location?.lat && place.location?.lng) {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`,
                '_blank',
                'noopener'
              )
            }
          }}
        >
          <Navigation size={16} />
          Llegar
        </button>
        {waHref ? (
          <a className="place-action whatsapp" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        ) : null}
        {place.actionTarget?.viewUrl && (
          <a className="place-action primary" href={place.actionTarget.viewUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} />
            Ver
          </a>
        )}
      </div>
    </motion.div>
  )
}
