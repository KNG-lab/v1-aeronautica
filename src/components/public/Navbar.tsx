import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { ButtonLink } from '@/components/ui/PremiumButton'
import { cn } from '@/utils/formatters'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/programas', label: 'Programas' },
  { to: '/sedes', label: 'Sedes' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[90]"
    >
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="container-px flex h-[76px] items-center justify-between">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group relative px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors',
                      isActive ? 'text-white' : 'text-steel-300 hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={cn(
                          'absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-accent-500 transition-transform duration-300',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <ButtonLink to="/inscripcion" size="sm" showArrow className="text-[13px] font-semibold uppercase tracking-wide">
              Inscribirme
            </ButtonLink>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-steel-100 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex h-[76px] items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03]"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="container-px mt-6 flex flex-col gap-1"
            >
              {links.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    to={link.to}
                    className="block border-b border-white/5 py-4 font-display text-2xl font-medium tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6"
              >
                <ButtonLink to="/inscripcion" size="lg" fullWidth showArrow>
                  Inscribirme
                </ButtonLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
