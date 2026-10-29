import { Phone, Mail, MessageCircle, User, Megaphone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROJECT_CONTACT } from '../../constants/contact'
import './ContactSection.css'

interface ContactSectionProps {
  compact?: boolean
}

export default function ContactSection({ compact }: ContactSectionProps) {
  return (
    <section className={`contact-section ${compact ? 'compact' : ''}`} id="contacto">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-inner"
        >
          <div className="contact-copy">
            <span className="contact-eyebrow">
              <Megaphone size={14} />
              Publicidad y alianzas
            </span>
            <h2>¿Tu negocio es de Filandia?</h2>
            <p>
              Aparece en el mapa turístico, recibe reservas por WhatsApp y destaca tu marca
              frente a visitantes del Eje Cafetero.
            </p>
            <ul className="contact-perks">
              <li><MapPin size={14} /> Ficha en el mapa interactivo</li>
              <li><MessageCircle size={14} /> Botón directo de WhatsApp</li>
              <li><Megaphone size={14} /> Paquete pautante destacado</li>
            </ul>
          </div>

          <div className="contact-card">
            <div className="contact-person">
              <div className="contact-avatar">
                <User size={24} />
              </div>
              <div>
                <strong>{PROJECT_CONTACT.name}</strong>
                <span>{PROJECT_CONTACT.role}</span>
              </div>
            </div>

            <div className="contact-methods">
              <a
                className="contact-method whatsapp"
                href={PROJECT_CONTACT.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                <div>
                  <span>WhatsApp</span>
                  <strong>{PROJECT_CONTACT.phone}</strong>
                </div>
              </a>

              <a
                className="contact-method"
                href={`tel:${PROJECT_CONTACT.phone.replace(/\s/g, '')}`}
              >
                <Phone size={18} />
                <div>
                  <span>Llamar</span>
                  <strong>{PROJECT_CONTACT.phone}</strong>
                </div>
              </a>

              <a
                className="contact-method"
                href={`mailto:${PROJECT_CONTACT.email}?subject=filandialamano.com%20-%20Información`}
              >
                <Mail size={18} />
                <div>
                  <span>Correo</span>
                  <strong>{PROJECT_CONTACT.email}</strong>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
