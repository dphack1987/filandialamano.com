export type CategoryId =
  | 'alojamientos'
  | 'restaurantes'
  | 'cafeterias'
  | 'experiencias'
  | 'comercio'
  | 'sitios'
  | 'servicios'
  | 'eventos'

export interface CategoryMeta {
  id: CategoryId
  label: string
  color: string
  icon: string
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'alojamientos', label: 'Alojamientos', color: '#56755b', icon: 'Hotel' },
  { id: 'restaurantes', label: 'Restaurantes', color: '#e76c52', icon: 'Utensils' },
  { id: 'cafeterias', label: 'Cafeterías', color: '#8b5cf6', icon: 'Coffee' },
  { id: 'experiencias', label: 'Experiencias', color: '#f4a261', icon: 'Mountain' },
  { id: 'comercio', label: 'Comercio', color: '#2a9d8f', icon: 'ShoppingBag' },
  { id: 'sitios', label: 'Sitios Turísticos', color: '#264653', icon: 'MapPin' },
  { id: 'servicios', label: 'Servicios', color: '#3b82f6', icon: 'Car' },
  { id: 'eventos', label: 'Eventos', color: '#f59e0b', icon: 'Calendar' },
]

const TYPE_TO_CATEGORY: Record<string, CategoryId> = {
  'Alojamientos': 'alojamientos',
  'Restaurantes': 'restaurantes',
  'Cafeterías': 'cafeterias',
  'Coffee Tours': 'experiencias',
  'Experiencias': 'experiencias',
  'Camping': 'experiencias',
  'Artesanías': 'comercio',
  'Tiendas': 'comercio',
  'Comercio': 'comercio',
  'Turístico': 'sitios',
  'Cultural': 'sitios',
  'Turístico ': 'sitios',
  'Sitios Turísticos': 'sitios',
  'Servicios': 'servicios',
  'Eventos': 'eventos',
}

export function categoryIdFromType(type: string): CategoryId {
  return TYPE_TO_CATEGORY[type] ?? 'sitios'
}

export function categoryMeta(type: string): CategoryMeta {
  const id = categoryIdFromType(type)
  return CATEGORIES.find(c => c.id === id) ?? CATEGORIES[5]
}

export function categoryColor(type: string): string {
  return categoryMeta(type).color
}
