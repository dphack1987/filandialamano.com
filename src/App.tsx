import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Coffee, Utensils, Star, Heart, Menu, X, Zap, ShoppingBag, Mountain, Hotel } from 'lucide-react'
import { useStore } from './store/useStore'
import { useTheme } from './hooks/useTheme'
import { usePlaces } from './hooks/usePlaces'
import MapView from './components/map/MapView'
import ThemeToggle from './components/ui/ThemeToggle'
import PlaceCard from './components/places/PlaceCard'
import ContactSection from './components/contact/ContactSection'
import { categoryMeta } from './constants/categories'
import { PROJECT_CONTACT, SITE } from './constants/contact'
import './styles.css'
import './App.css'

type Section = 'home' | 'map' | 'explore' | 'contact'

const CATEGORY_ICONS: Record<string, typeof Hotel> = {
  alojamientos: Hotel,
  restaurantes: Utensils,
  cafeterias: Coffee,
  experiencias: Mountain,
  comercio: ShoppingBag,
  sitios: MapPin,
  servicios: MapPin,
  eventos: Star,
}

function App() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('home')

  useTheme()
  const places = usePlaces()
  const { setSelectedPlace } = useStore()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const featured = useMemo(() => {
    const active = places.filter(p => p.active !== false && p.location?.lat)
    return [...active]
      .sort((a, b) => {
        if (a.isPautante !== b.isPautante) return a.isPautante ? -1 : 1
        return Number(b.rating) - Number(a.rating)
      })
      .slice(0, 6)
  }, [places])

  const categorySummaries = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of places) {
      if (p.active === false) continue
      const meta = categoryMeta(p.type)
      map.set(meta.id, (map.get(meta.id) ?? 0) + 1)
    }
    return [...map.entries()]
      .map(([id, count]) => {
        const meta = categoryMeta(
          places.find(p => categoryMeta(p.type).id === id)?.type ?? id
        )
        return { id, count, label: meta.label, color: meta.color, icon: CATEGORY_ICONS[id] ?? MapPin }
      })
      .sort((a, b) => b.count - a.count)
  }, [places])

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="loading-spinner"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-semibold"
        >
          Filandia a la Mano
        </motion.p>
      </div>
    )
  }

  return (
    <div className="app">
      <Helmet>
        <title>Filandia a la Mano - Descubre el Corazón del Quindío</title>
        <meta name="description" content="Descubre Filandia, Quindío: balcones de guadua, paisajes cafeteros, miradores panorámicos y experiencias auténticas del Eje Cafetero." />
      </Helmet>

      <nav className="glass-card app-nav">
        <motion.div
          className="app-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setActiveSection('home')}
        >
          <img
            src="/logo_filandialamano.jfif"
            alt="Filandia a la Mano"
            className="app-logo-img"
          />
          <div>
            <div className="app-logo-title">Filandia</div>
            <div className="app-logo-sub">a la Mano</div>
          </div>
        </motion.div>

        <div className={`app-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {(['home', 'map', 'explore', 'contact'] as Section[]).map((key, index) => {
            const labels: Record<Section, string> = {
              home: 'Inicio',
              map: 'Mapa',
              explore: 'Explorar',
              contact: 'Contacto',
            }
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`app-nav-btn ${activeSection === key ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(key)
                  setMobileMenuOpen(false)
                }}
              >
                {labels[key]}
              </motion.button>
            )
          })}
        </div>

        <div className="app-nav-actions">
          <ThemeToggle />
          <button
            className="app-nav-search"
            onClick={() => setActiveSection('map')}
            aria-label="Buscar en el mapa"
          >
            <Search size={18} />
          </button>
          <button
            className="app-nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-main"
          >
            <section className="hero">
              <div className="container hero-inner">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
                  className="hero-logo-wrap"
                >
                  <div className="hero-logo-glow" />
                  <img
                    src="/logo_filandialamano.jfif"
                    alt="Filandia a la Mano Logo"
                    className="hero-logo"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="hero-badge">
                    <Zap size={16} />
                    <span>{places.length} lugares para explorar</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="hero-title"
                >
                  Descubre el Corazón del Quindío
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="hero-subtitle"
                >
                  Balcones de guadua, paisajes cafeteros y miradores panorámicos de Filandia en un solo mapa.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="hero-cta"
                >
                  <button className="btn-primary" onClick={() => setActiveSection('map')}>
                    <MapPin size={20} />
                    Explorar Mapa
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setActiveSection('map')
                      useStore.getState().setShowFavoritesOnly(true)
                    }}
                  >
                    <Heart size={18} />
                    Mis Favoritos
                  </button>
                </motion.div>
              </div>
            </section>

            {categorySummaries.length > 0 && (
              <section className="section">
                <div className="container">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                  >
                    <h2>Categorías</h2>
                    <p>Explora Filandia por tipo de experiencia</p>
                  </motion.div>

                  <div className="grid grid-4">
                    {categorySummaries.map((cat, index) => {
                      const Icon = cat.icon
                      return (
                        <motion.button
                          key={cat.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="category-card"
                          onClick={() => {
                            useStore.getState().setSelectedCategory(cat.id)
                            useStore.getState().setShowFavoritesOnly(false)
                            setActiveSection('map')
                          }}
                        >
                          <div className="category-icon" style={{ background: cat.color }}>
                            <Icon size={22} />
                          </div>
                          <div className="category-info">
                            <span className="category-name">{cat.label}</span>
                            <span className="category-count">{cat.count} lugares</span>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </section>
            )}

            {featured.length > 0 && (
              <section className="section section-alt">
                <div className="container">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                  >
                    <h2>Destacados</h2>
                    <p>Los mejor valorados y recomendados de Filandia</p>
                  </motion.div>

                  <div className="grid grid-3">
                    {featured.map((place, index) => (
                      <motion.div
                        key={place.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <PlaceCard
                          place={place}
                          onClick={() => {
                            setSelectedPlace(place)
                            setActiveSection('map')
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <ContactSection />
          </motion.main>
        )}

        {activeSection === 'map' && (
          <motion.main
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-main app-main-map"
          >
            <MapView places={places} />
          </motion.main>
        )}

        {activeSection === 'explore' && (
          <motion.main
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-main"
          >
            <div className="container explore-page">
              <h1>Explorar</h1>
              <p>
                Guías de itinerarios, rutas de senderismo y experiencias curadas estarán disponibles pronto.
                Mientras tanto, usa el mapa interactivo para planificar tu visita.
              </p>
              <button className="btn-primary" onClick={() => setActiveSection('map')}>
                <MapPin size={18} />
                Ir al Mapa
              </button>
            </div>
          </motion.main>
        )}
        {activeSection === 'contact' && (
          <motion.main
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-main"
          >
            <div className="container explore-page contact-page">
              <h1>Contacto</h1>
              <p>
                Publicidad, alianzas o inclusión de tu negocio en el mapa de Filandia.
              </p>
            </div>
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="app-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logo_filandialamano.jfif" alt="Filandia a la Mano" />
            <div>
              <strong>Filandia a la Mano</strong>
              <span>Mapa turístico del Quindío</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="#mapa" onClick={() => setActiveSection('map')}>Mapa</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a
              className="footer-wa"
              href={PROJECT_CONTACT.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Filandia a la Mano · {PROJECT_CONTACT.email} · {PROJECT_CONTACT.phone}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
