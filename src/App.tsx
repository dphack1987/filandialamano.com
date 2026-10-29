import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import './styles.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #56755b',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Cargando mapa de Filandia...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Helmet>
        <title>Filandia a la Mano - Mapa Digital Turístico</title>
        <meta name="description" content="Mapa turístico interactivo de Filandia, Quindío." />
      </Helmet>

      <header style={{
        padding: '20px',
        background: '#56755b',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Filandia a la Mano
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ background: 'white', color: '#56755b', padding: '8px 16px', borderRadius: '4px' }}>
            ES
          </span>
          <span style={{ background: 'white', color: '#56755b', padding: '8px 16px', borderRadius: '4px' }}>
            COP
          </span>
        </div>
      </header>

      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Mapa Digital Turístico de Filandia</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Sistema interactivo para descubrir lugares, restaurantes y alojamientos en Filandia, Quindío.
        </p>
        
        <div style={{
          background: '#f5f5f5',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Estado del Sistema</h3>
          <ul style={{ textAlign: 'left', lineHeight: '2' }}>
            <li>✅ React 18.3.1 cargado</li>
            <li>✅ Leaflet mapas activos</li>
            <li>✅ Framer Motion animaciones</li>
            <li>✅ Zustand state management</li>
            <li>⏳ Cargando datos de lugares...</li>
          </ul>
        </div>

        <p style={{ marginTop: '40px', color: '#999', fontSize: '0.9rem' }}>
          Versión: 1.0.0 | Modo: Simplificado para diagnóstico
        </p>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
