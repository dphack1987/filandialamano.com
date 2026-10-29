import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Coffee, Building2, Utensils, Star, Heart, Navigation, Menu, X, Globe, Moon, Sun, Zap, ShoppingBag, Mountain, Calendar, Car, Campfire, Hotel } from 'lucide-react'
import { useStore } from './store/useStore'
import AdvancedMap from './components/map/AdvancedMap'
import ThemeToggle from './components/ui/ThemeToggle'
import './styles.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'home' | 'map' | 'explore'>('home')

  const { theme, setTheme, places, searchQuery, setSearchQuery } = useStore()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200)
  }, [])

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

      {/* Modern Navigation */}
      <nav className="glass-card nav" style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            cursor: 'pointer'
          }}
          onClick={() => setActiveSection('home')}
        >
          <img
            src="/logo_filandialamano.jfif"
            alt="Filandia a la Mano"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'contain',
              background: 'white',
              padding: '6px',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid var(--primary-200)'
            }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
              Filandia
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              a la Mano
            </div>
          </div>
        </motion.div>

        <div className="nav-links" style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          {['Inicio', 'Mapa', 'Explorar'].map((item, index) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setActiveSection(item.toLowerCase() as any)
                setMobileMenuOpen(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.toLowerCase() ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                position: 'relative',
                padding: '8px 0'
              }}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--primary)',
                    borderRadius: 'var(--radius-full)'
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <ThemeToggle />
          <button
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setActiveSection('map')}
          >
            <Search size={18} />
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1 }}
          >
            {/* Hero Section */}
            <section className="hero" style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--background) 100%)',
              paddingTop: '120px'
            }}>
              <div className="container" style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 10
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
                  style={{ marginBottom: '32px' }}
                >
                  <div style={{
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    <motion.div
                      animate={{
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      style={{
                        position: 'absolute',
                        inset: -20,
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        borderRadius: '50%',
                        opacity: 0.2,
                        filter: 'blur(40px)',
                        zIndex: -1
                      }}
                    />
                    <img
                      src="/logo_filandialamano.jfif"
                      alt="Filandia a la Mano Logo"
                      style={{
                        width: 'clamp(250px, 40vw, 500px)',
                        height: 'auto',
                        maxWidth: '100%',
                        filter: 'drop-shadow(0 30px 60px rgba(16, 185, 129, 0.4))',
                        borderRadius: 'var(--radius-xl)'
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}>
                    <Zap size={16} />
                    <span>Nuevo mapa turístico interactivo</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Descubre el Corazón del Quindío
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 48px'
                  }}
                >
                  Descubre balcones de guadua, paisajes cafeteros infinitos y miradores panorámicos que te dejarán sin aliento.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <button
                    onClick={() => setActiveSection('map')}
                    style={{
                      padding: '16px 32px',
                      background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <MapPin size={20} />
                    Explorar Mapa
                  </button>
                  <button
                    style={{
                      padding: '16px 32px',
                      background: 'transparent',
                      color: 'var(--text)',
                      border: '2px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Ver Guías
                  </button>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '10%',
                  width: '120px',
                  height: '120px',
                  background: 'var(--primary-200)',
                  borderRadius: '50%',
                  opacity: 0.3,
                  filter: 'blur(40px)'
                }}
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  right: '10%',
                  width: '150px',
                  height: '150px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  opacity: 0.2,
                  filter: 'blur(40px)'
                }}
              />
            </section>

            {/* Categories Section with Featured Businesses */}
            <section style={{
              padding: '120px 0',
              background: 'var(--background)'
            }}>
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                  <h2>Categorías Destacadas</h2>
                  <p style={{ margin: '0 auto' }}>
                    Negocios verificados en cada categoría
                  </p>
                </motion.div>

                <div className="grid grid-3">
                  {[
                    { 
                      category: 'Alojamientos', 
                      name: 'Hotel Boutique Filandia', 
                      rating: '4.9',
                      price: '$$$$',
                      desc: 'Hotel boutique de lujo con vistas panorámicas al valle del Quindío',
                      badge: '🏆 Premium',
                      icon: Hotel
                    },
                    { 
                      category: 'Restaurantes', 
                      name: 'Restaurante Las Truchas', 
                      rating: '4.7',
                      price: '$$',
                      desc: 'El mejor restaurante de truchas en Filandia, preparadas a la plancha',
                      badge: '⭐ Popular',
                      icon: Utensils
                    },
                    { 
                      category: 'Cafeterías', 
                      name: 'Café Tradición', 
                      rating: '4.8',
                      price: '$',
                      desc: 'Cafetería artesanal con café 100% de origen del Quindío',
                      badge: '☕ Café de Origen',
                      icon: Coffee
                    },
                    { 
                      category: 'Coffee Tours', 
                      name: 'Finca El Divino Niño', 
                      rating: '4.9',
                      price: '$$',
                      desc: 'Experiencia auténtica de café con tour educativo y degustación',
                      badge: '☕ 100% Origen',
                      icon: Coffee
                    },
                    { 
                      category: 'Artesanías', 
                      name: 'Artesanías de Filandia', 
                      rating: '4.6',
                      price: '$',
                      desc: 'Tienda de artesanías tradicionales: hammacas, sombreros y textiles',
                      badge: '🎨 Hecho a Mano',
                      icon: ShoppingBag
                    },
                    { 
                      category: 'Experiencias', 
                      name: 'Senderismo Alto de la Cruz', 
                      rating: '4.8',
                      price: 'Gratis',
                      desc: 'Ruta de senderismo moderada con vistas 360° del Eje Cafetero',
                      badge: '🥾 Senderismo',
                      icon: Mountain
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        padding: '32px',
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--border)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all var(--transition)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      whileHover={{
                        transform: 'translateY(-8px)',
                        boxShadow: 'var(--shadow-xl)',
                        borderColor: 'var(--primary)'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '4px 12px',
                        background: 'var(--primary-100)',
                        color: 'var(--primary-700)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {item.badge}
                      </div>
                      
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        color: 'white'
                      }}>
                        <item.icon size={32} />
                      </div>
                      
                      <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>{item.name}</h3>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: 'var(--text-secondary)',
                        marginBottom: '16px',
                        lineHeight: 1.5
                      }}>
                        {item.desc}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--accent)',
                          fontWeight: 600
                        }}>
                          <Star size={16} fill="currentColor" />
                          <span>{item.rating}</span>
                        </div>
                        <div style={{
                          fontWeight: 600,
                          color: 'var(--text)'
                        }}>
                          {item.price}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, paddingTop: '100px' }}
          >
            <div className="container" style={{ marginBottom: '32px' }}>
              <h1>Mapa Interactivo</h1>
              <p>Explora todos los lugares de Filandia en tiempo real</p>
            </div>
            <div style={{ height: 'calc(100vh - 200px)', margin: '0 auto', maxWidth: '1400px', padding: '0 24px' }}>
              <AdvancedMap
                places={places}
                onPlaceSelect={(place) => console.log('Selected:', place)}
                userLocation={null}
              />
            </div>
          </motion.div>
        )}

        {activeSection === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, paddingTop: '100px' }}
          >
            <div className="container">
              <h1>Explorar</h1>
              <p>Próximamente: guías detalladas y rutas recomendadas</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
