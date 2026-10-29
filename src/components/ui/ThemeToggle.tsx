import { useStore } from '../../store/useStore'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, setTheme } = useStore()

  const themes = [
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'dark', icon: Moon, label: 'Oscuro' },
    { value: 'auto', icon: Monitor, label: 'Auto' }
  ]

  return (
    <div className="theme-toggle">
      {themes.map((t) => {
        const Icon = t.icon
        return (
          <motion.button
            key={t.value}
            className={`theme-button ${theme === t.value ? 'active' : ''}`}
            onClick={() => setTheme(t.value as any)}
            title={t.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={18} />
          </motion.button>
        )
      })}
    </div>
  )
}
