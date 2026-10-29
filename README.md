# Filandia a la Mano - Mapa Digital Turístico

**Plataforma mejorada de turismo de Filandia, Quindío**

## 🎯 Características Principales

### Mejoras sobre salentoalamano.com

#### 🗺️ Mapa Interactivo Avanzado
- ✅ **Clustering inteligente** de marcadores con Leaflet MarkerCluster
- ✅ **Múltiples capas de mapa** (Calles, Satélite, Terreno, Ciclismo)
- ✅ **Sistema de rutas** y planificación de itinerarios
- ✅ **Controles de mapa** mejorados (zoom, capas, ubicación)
- ✅ **Marcadores personalizados** con iconos por categoría
- ✅ **Animaciones suaves** de transición

#### 🎨 UX/UI Premium
- ✅ **Dark mode** completo con toggle
- ✅ **Animaciones Framer Motion** en toda la app
- ✅ **Sistema de favoritos** con colecciones
- ✅ **Panel lateral deslizante** con animaciones
- ✅ **Modales animados** para detalles de lugares
- ✅ **Diseño responsive** mobile-first

#### 🚀 Performance Optimizado
- ✅ **State management** con Zustand (más ligero que Redux)
- ✅ **Code splitting** agresivo con Vite
- ✅ **Persistencia local** con Zustand persist
- ✅ **Service worker ready** para PWA
- ✅ **Optimized bundle size**

#### 🔧 Stack Tecnológico Mejorado
- React 18.3.1 + TypeScript 5.5.3
- Vite 8.2.2 (build ultra rápido)
- Leaflet 1.9.4 + plugins (MarkerCluster, Routing, Geoman)
- Framer Motion 11.0.0 (animaciones)
- Zustand 4.5.0 (state management)
- @tanstack/react-query 5.17.0 (data fetching)
- react-virtuoso 4.6.0 (virtual scrolling)

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Type checking
npm run type-check
```

## 📁 Estructura del Proyecto

```
filandialamano/
├── src/
│   ├── components/
│   │   ├── map/          # Componentes del mapa
│   │   ├── ui/           # Componentes UI reutilizables
│   │   ├── favorites/    # Sistema de favoritos
│   │   └── routing/      # Sistema de rutas
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas
│   ├── services/         # Servicios de datos
│   ├── store/            # Zustand store
│   ├── utils/            # Utilidades
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   ├── styles.css        # Estilos globales
│   └── types.ts          # TypeScript types
├── public/
│   └── data/             # Datos JSON (places, markers, config)
├── tools/                # Herramientas de SEO
├── scripts/              # Scripts de build
└── package.json
```

## 🗺️ Datos del Mapa

Los datos se almacenan en archivos JSON en `public/data/`:

- `places.json` - Información detallada de lugares
- `mapMarkers.json` - Marcadores del mapa
- `map-config.json` - Configuración del mapa
- `hotels.json` - Datos de hoteles
- `events.json` - Eventos locales

## 🌐 Multi-idioma y Multi-moneda

- **Idiomas:** Español, Inglés, Francés, Alemán, Portugués, Italiano
- **Monedas:** COP, USD, EUR
- **Persistencia:** Selección guardada en localStorage

## 🎨 Temas

- **Light mode** - Tema claro
- **Dark mode** - Tema oscuro
- **Auto** - Detectar preferencia del sistema

## 📱 PWA Ready

El proyecto está preparado para ser una Progressive Web App:

- Service worker configurado
- Manifest web app
- Install prompt personalizado
- Offline ready con IndexedDB

## 🚀 Despliegue en Vercel

### Paso 1: Conectar Repositorio a Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Clic en "Add New Project"
3. Selecciona el repositorio `dphack1987/filandialamano.com`
4. Vercel detectará automáticamente la configuración desde `vercel.json`

### Configuración Automática (vercel.json)

El proyecto incluye `vercel.json` con la configuración:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

### Paso 2: Deploy

1. Clic en "Deploy"
2. Vercel instalará dependencias y hará el build
3. En ~2-3 minutos tu sitio estará en vivo
4. Vercel te asignará un dominio: `https://filandia-mapa-turistico.vercel.app`

### Paso 3: Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Agrega tu dominio: `www.filandialamano.com`
3. Configura los DNS según las instrucciones de Vercel

### Variables de Entorno (Opcional)

Actualmente no requiere variables de entorno, pero si necesitas agregar alguna:
1. Vercel Dashboard → Settings → Environment Variables
2. Agrega las variables necesarias
3. Redeploy el proyecto

## 📊 SEO

- Meta tags optimizados
- Open Graph tags
- Twitter cards
- Structured data (Schema.org)
- Sitemap.xml automático

## 🔧 Scripts SEO

```bash
# Generar páginas SEO internacionales
npm run seo:generate

# Auditoría SEO técnica
npm run seo:audit

# Enriquecer SEO estático
npm run seo:enrich

# Generar rutas para sitemap
npm run seo:routes

# Optimizar meta tags
npm run seo:meta

# Estrategia SEO
npm run seo:strategy

# Datos estructurados
npm run seo:structured
```

## 📝 Estado del Proyecto

**Versión:** 1.0.0
**Estado:** 🟢 En desarrollo
**Stack:** React + TypeScript + Vite + Leaflet

## 🤝 Contribución

Este proyecto es un fork mejorado de salentoalamano.com con las siguientes mejoras:

1. Mapa con clustering y múltiples capas
2. Dark mode completo
3. Sistema de favoritos
4. Planificación de rutas
5. Animaciones con Framer Motion
6. State management con Zustand
7. Performance optimizado

## 📞 Contacto

- Email: contacto@filandialamano.com
- Web: www.filandialamano.com

## 📄 Licencia

Propiedad privada - Todos los derechos reservados
# Deploy fix
