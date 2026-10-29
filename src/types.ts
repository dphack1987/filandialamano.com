export type Language = 'es' | 'en' | 'fr' | 'de' | 'pt' | 'it'
export type Currency = 'COP' | 'USD' | 'EUR'
export type Theme = 'light' | 'dark' | 'auto'

export const LanguageConst = {
  es: 'es' as const,
  en: 'en' as const,
  fr: 'fr' as const,
  de: 'de' as const,
  pt: 'pt' as const,
  it: 'it' as const
}

export interface Location {
  lat: number
  lng: number
  address?: string
  landmark?: string
}

export interface Contact {
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
}

export interface OperatingHours {
  notes?: string
  checkIn?: string
  checkOut?: string
}

export interface AccommodationDetails {
  categoryLabel?: string
  roomTypes?: string[]
  services?: string[]
  roomFeatures?: string[]
  nearby?: string[]
  policies?: string[]
  checkIn?: string
  checkOut?: string
  amenities?: string[]
  capacity?: string
  bookingNotes?: string
}

export interface ActionTarget {
  viewUrl?: string
  bookingUrl?: string
}

export interface Place {
  id: number
  name: string
  type: string
  description: string
  priceRange: string
  rating: string
  timeInfo?: string
  badge?: string
  color?: string
  icon?: string
  contact: Contact
  location: Location
  operatingHours?: OperatingHours
  tags: string[]
  verified: boolean
  active: boolean
  accommodationDetails?: AccommodationDetails
  photos?: string[]
  actionTarget?: ActionTarget
  isPautante?: boolean
  brandSlug?: string
}

export interface MapMarker {
  id: number
  label: string
  type: string
  placeId: number
  coord: [number, number]
  tone: string
  note: string
}

export interface Hotel {
  id: number
  name: string
  rating: string
  priceRange: string
  amenities: string[]
  contact: Contact
  location: Location
  photos?: string[]
}

export interface MapLayer {
  name: string
  url: string
  attribution: string
  maxZoom?: number
}

export interface Route {
  id: string
  name: string
  waypoints: Location[]
  distance: number
  duration: number
  type: 'walking' | 'driving' | 'cycling'
}

export interface Itinerary {
  id: string
  name: string
  places: Place[]
  date: Date
  duration: number
  notes?: string
}

export interface Favorite {
  placeId: number
  collection?: string
  dateAdded: Date
}

export interface Review {
  id: string
  placeId: number
  author: string
  rating: number
  comment: string
  photos?: string[]
  date: Date
  verified: boolean
  helpful: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  price: string
  category: 'food' | 'music' | 'culture' | 'community' | 'nature'
  organizer: string
  highlights: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  count: number
}
