import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export interface AccordionItem {
  q: string
  a: string
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  return (
    <div className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40">
      {items.map((item, i) => {
        const isOpen = open === i
        const headerId = `${baseId}-h-${i}`
        const panelId = `${baseId}-p-${i}`
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                id={headerId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-sans text-base font-medium tracking-normal transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-400/60"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 text-accent-400"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-steel-400">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
