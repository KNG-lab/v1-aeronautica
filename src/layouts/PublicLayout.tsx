import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import FloatingCTA from '@/components/public/FloatingCTA'
import ScrollProgress from '@/components/motion/ScrollProgress'

export default function PublicLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change (back-behavior friendly).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900"
      >
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Navbar />
      <div id="contenido" className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
