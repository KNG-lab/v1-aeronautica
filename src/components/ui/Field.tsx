import { useId } from 'react'
import { cn } from '@/utils/formatters'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  helper?: string
  autoComplete?: string
  /** Stable id, used so a parent can focus this field (e.g. focus-first-invalid). */
  id?: string
  onBlur?: () => void
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
}

const baseInput =
  'w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-steel-100 placeholder:text-steel-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-400/40'

export function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  error,
  helper,
  autoComplete,
  id,
  onBlur,
  inputMode,
}: FieldProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errorId = `${fieldId}-error`
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-medium text-steel-300">
        {label} {required && <span className="text-accent-400">*</span>}
      </label>
      <input
        id={fieldId}
        type={type}
        inputMode={inputMode}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          baseInput,
          error
            ? 'border-rose-500/50 focus:ring-rose-400/40'
            : 'border-white/10 focus:border-accent-500/50',
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-rose-400" role="alert">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-steel-500">{helper}</p>
      ) : null}
    </div>
  )
}

export function Textarea({
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  rows?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-steel-300">
        {label} {required && <span className="text-accent-400">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(baseInput, 'resize-none border-white/10 focus:border-accent-500/50')}
      />
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}

export function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-steel-300">
        {label} {required && <span className="text-accent-400">*</span>}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={cn(baseInput, 'border-white/10 focus:border-accent-500/50')}
      >
        <option value="" disabled>
          Selecciona…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-700">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
