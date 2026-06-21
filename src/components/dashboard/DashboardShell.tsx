import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ArrowUpRight, Bell } from 'lucide-react'
import Logo from '@/components/public/Logo'
import Icon from '@/components/ui/Icon'
import { initials } from '@/utils/formatters'
import { cn } from '@/utils/formatters'

export interface NavItem {
  id: string
  label: string
  icon: string
}

interface DashboardShellProps {
  role: string
  userName: string
  userMeta: string
  nav: NavItem[]
  active: string
  onChange: (id: string) => void
  children: ReactNode
  exitTo?: string
}

export default function DashboardShell({
  role, userName, userMeta, nav, active, onChange, children, exitTo = '/',
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeItem = nav.find((n) => n.id === active)

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo compact />
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-400">
          {role}
        </p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id)
                setMobileOpen(false)
              }}
              className={cn(
                'relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                isActive ? 'text-white' : 'text-steel-400 hover:text-steel-100',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${role}-nav`}
                  className="absolute inset-0 rounded-xl border border-accent-500/30 bg-accent-500/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon name={item.icon} className="h-[18px] w-[18px]" strokeWidth={1.7} />
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          to={exitTo}
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-steel-400 transition-colors hover:text-steel-100"
        >
          Salir del demo
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-dvh bg-ink-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-ink-800/40 lg:block">
        <div className="sticky top-0 h-dvh">{SidebarContent}</div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[120] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 h-full w-72 border-r border-white/10 bg-ink-800"
            >
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-ink-900/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-steel-300 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-lg font-semibold">{activeItem?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-steel-300">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-accent-500/15 text-sm font-semibold text-accent-300">
                {initials(userName)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight">{userName}</p>
                <p className="text-xs text-steel-500">{userMeta}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
