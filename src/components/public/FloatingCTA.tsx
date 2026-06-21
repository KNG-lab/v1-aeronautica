import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/utils/enrollment'

/** Floating WhatsApp action, bottom-left so it never collides with toasts. */
export default function FloatingCTA() {
  return (
    <motion.a
      href={whatsappLink('Hola, quiero información sobre los programas de V1 Aeronáutica.')}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 320, damping: 24 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 left-5 z-[80] flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 backdrop-blur-xl"
      aria-label="Hablar por WhatsApp"
    >
      <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-emerald-500/20 blur-md" />
      <MessageCircle className="h-5 w-5 text-emerald-300" />
      <span className="hidden text-sm font-medium text-emerald-100 sm:inline">
        WhatsApp
      </span>
    </motion.a>
  )
}
