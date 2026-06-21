import { Link } from 'react-router-dom'
import { Instagram, Music2, Youtube, Linkedin, Facebook, Phone, Mail, Globe, Clock } from 'lucide-react'
import Logo from './Logo'
import { campuses } from '@/data/campuses'
import { courses } from '@/data/courses'

// 🔁 Replace with the institution's real social handles.
const social = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/v1aeronautica' },
  { icon: Music2, label: 'TikTok', href: 'https://tiktok.com/@v1aeronautica' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@v1aeronautica' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/v1aeronautica' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/v1aeronautica' },
]

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/programas', label: 'Programas' },
  { to: '/sedes', label: 'Sede' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <div className="container-px py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-400">
              Formación aeronáutica premium para la nueva generación de profesionales
              de la aviación en Venezuela.
            </p>
            <div className="mt-5 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-steel-300 transition-colors hover:border-accent-500/40 hover:text-accent-400"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-400">
              Enlaces
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-steel-300 transition-colors hover:text-accent-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-400">
              Programas
            </h4>
            <ul className="mt-4 space-y-2.5">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/programas/${c.slug}`}
                    className="text-sm text-steel-300 transition-colors hover:text-accent-400"
                  >
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-400">
              Ubicación
            </h4>
            <ul className="mt-4 space-y-4">
              {campuses.map((c) => (
                <li key={c.id} className="text-sm">
                  <p className="font-medium text-accent-400">{c.name}</p>
                  <p className="mt-1 leading-relaxed text-steel-400">{c.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-400">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-steel-300">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent-500" /> +58 412 200 0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-500" /> info@v1aeronautica.com
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-accent-500" /> www.v1aeronautica.com
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                <span>Lunes a sábado · 08:00 am – 06:00 pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-steel-500 sm:flex-row">
          <p>© 2026 V1 Aeronáutica. Todos los derechos reservados.</p>
          <p>Diseñado con altura.</p>
        </div>
      </div>
    </footer>
  )
}
