import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/formatters'

export interface DropdownOption {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

interface PremiumDropdownProps {
  label: string
  placeholder: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  disabled?: boolean
  /** Borderless trigger for use inside a unified bar (hero selector). */
  bare?: boolean
}

/**
 * Custom animated dropdown implementing the ARIA listbox pattern:
 * full keyboard support (Arrow/Home/End/Enter/Escape), aria-activedescendant,
 * role="option" + aria-selected/aria-disabled, and focus management.
 */
export default function PremiumDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  icon,
  disabled = false,
  bare = false,
}: PremiumDropdownProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1) // highlighted option index
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const typeahead = useRef({ buffer: '', timer: 0 })
  const baseId = useId()
  const listId = `${baseId}-list`
  const optId = (i: number) => `${baseId}-opt-${i}`

  const selectedIndex = options.findIndex((o) => o.value === value)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined

  const firstEnabled = () => options.findIndex((o) => !o.disabled)
  const lastEnabled = () => {
    for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i
    return -1
  }
  const nextEnabled = (from: number, dir: 1 | -1) => {
    let i = from
    for (let step = 0; step < options.length; step++) {
      i += dir
      if (i < 0) i = options.length - 1
      if (i >= options.length) i = 0
      if (!options[i].disabled) return i
    }
    return from
  }

  // Outside click + close on Escape (global, only while open)
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  // On open: move focus to the list and highlight the selected (or first) option
  useEffect(() => {
    if (open) {
      setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled())
      // focus after the list mounts
      requestAnimationFrame(() => listRef.current?.focus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the highlighted option scrolled into view
  useEffect(() => {
    if (!open || active < 0) return
    const el = document.getElementById(optId(active))
    el?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open])

  function close(returnFocus = true) {
    setOpen(false)
    if (returnFocus) requestAnimationFrame(() => buttonRef.current?.focus())
  }

  function commit(i: number) {
    const opt = options[i]
    if (!opt || opt.disabled) return
    onChange(opt.value)
    close()
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled) return
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpen(true)
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((a) => nextEnabled(a < 0 ? -1 : a, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((a) => nextEnabled(a < 0 ? options.length : a, -1))
        break
      case 'Home':
        e.preventDefault()
        setActive(firstEnabled())
        break
      case 'End':
        e.preventDefault()
        setActive(lastEnabled())
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (active >= 0) commit(active)
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
      case 'Tab':
        close(false)
        break
      default:
        // Typeahead: jump to the first enabled option matching the typed prefix.
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const t = typeahead.current
          window.clearTimeout(t.timer)
          t.buffer += e.key.toLowerCase()
          t.timer = window.setTimeout(() => (t.buffer = ''), 600)
          const match = options.findIndex(
            (o) => !o.disabled && o.label.toLowerCase().startsWith(t.buffer),
          )
          if (match >= 0) setActive(match)
        }
    }
  }

  return (
    <div ref={ref} className="relative w-full">
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200',
          bare
            ? 'rounded-xl'
            : 'rounded-xl border border-white/10 bg-white/[0.03]',
          disabled
            ? 'cursor-not-allowed opacity-40'
            : bare
              ? 'hover:bg-white/[0.04]'
              : 'hover:border-white/20 hover:bg-white/[0.05]',
          open && (bare ? 'bg-white/[0.04]' : 'border-accent-500/50 bg-white/[0.05]'),
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${selected ? selected.label : placeholder}`}
      >
        {icon && <span className="text-accent-400">{icon}</span>}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-400">
            {label}
          </span>
          <span className={cn('truncate text-sm', selected ? 'text-steel-100' : 'text-steel-400')}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-steel-400 transition-transform duration-300',
            open && 'rotate-180 text-accent-400',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            tabIndex={-1}
            aria-activedescendant={active >= 0 ? optId(active) : undefined}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-white/10 bg-ink-700/95 p-1.5 shadow-panel outline-none backdrop-blur-2xl"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value
              const isActive = i === active
              return (
                <li
                  key={opt.value}
                  id={optId(i)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled || undefined}
                  onMouseEnter={() => !opt.disabled && setActive(i)}
                  onClick={() => commit(i)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    opt.disabled && 'cursor-not-allowed text-steel-500',
                    isActive && !opt.disabled && 'bg-white/[0.06]',
                    isSelected && 'text-accent-200',
                  )}
                >
                  <span className="flex flex-col">
                    <span className={cn(!isSelected && !opt.disabled && 'text-steel-200')}>
                      {opt.label}
                    </span>
                    {opt.hint && !opt.disabled && (
                      <span className="text-xs text-steel-400">{opt.hint}</span>
                    )}
                  </span>
                  {opt.disabled ? (
                    <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      {opt.hint ?? 'No disponible'}
                    </span>
                  ) : (
                    isSelected && <Check className="h-4 w-4 shrink-0 text-accent-400" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
