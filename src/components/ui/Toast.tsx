import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react'

type ToastTone = 'success' | 'info' | 'warning' | 'error'
interface Toast {
  id: number
  message: string
  tone: ToastTone
}

interface ToastCtx {
  notify: (message: string, tone?: ToastTone) => void
}

const Ctx = createContext<ToastCtx | null>(null)

const icons: Record<ToastTone, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  info: <Info className="h-5 w-5 text-sky-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400" />,
  error: <XCircle className="h-5 w-5 text-rose-400" />,
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const notify = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = ++counter.current
    setToasts((t) => [...t, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3800)
  }, [])

  return (
    <Ctx.Provider value={{ notify }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[200] flex w-[min(92vw,360px)] flex-col gap-2"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="glass-strong pointer-events-auto flex items-start gap-3 rounded-xl px-4 py-3 shadow-panel"
            >
              {icons[t.tone]}
              <p className="text-sm text-steel-100">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
