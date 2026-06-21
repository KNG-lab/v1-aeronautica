import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Clock, ArrowLeft, ArrowRight, Check, ShieldCheck,
  Upload, FileText, Banknote, Smartphone, PartyPopper, Landmark,
} from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import Stepper from '@/components/enrollment/Stepper'
import SelectCard from '@/components/enrollment/SelectCard'
import EnrollmentSummary from '@/components/enrollment/EnrollmentSummary'
import PremiumButton, { ButtonLink, ButtonAnchor } from '@/components/ui/PremiumButton'
import { Field, SelectField, Textarea } from '@/components/ui/Field'
import Icon from '@/components/ui/Icon'
import { useToast } from '@/components/ui/Toast'
import { campuses } from '@/data/campuses'
import { courses, courseById } from '@/data/courses'
import { schedulesFor, courseIdsAtCampus } from '@/data/schedules'
import { campusById } from '@/data/campuses'
import { scheduleById } from '@/data/schedules'
import { paymentInstructions } from '@/data/announcements'
import { costFromSchedule, whatsappLink } from '@/utils/enrollment'
import { formatUsd } from '@/utils/formatters'
import { EASE_OUT } from '@/utils/motion'
import type { CampusId, CourseId } from '@/data/types'

const STEP_LABELS = ['Sede', 'Curso', 'Horario', 'Tus datos', 'Resumen', 'Pago', 'Confirmación']

interface PersonalInfo {
  name: string
  idCard: string
  age: string
  birthdate: string
  phone: string
  email: string
  city: string
  state: string
  education: string
  experience: string
  source: string
  comments: string
}

const emptyInfo: PersonalInfo = {
  name: '', idCard: '', age: '', birthdate: '', phone: '', email: '',
  city: '', state: '', education: '', experience: '', source: '', comments: '',
}

interface PaymentInfo {
  method: 'transfer' | 'mobile' | ''
  bank: string
  reference: string
  date: string
  amount: string
  fileName: string
}

const emptyPayment: PaymentInfo = {
  method: '', bank: '', reference: '', date: '', amount: '', fileName: '',
}

const DRAFT_KEY = 'v1-enrollment-draft'

function loadDraft(): { sel?: any; info?: PersonalInfo; payment?: PaymentInfo } | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Keep only campus/course/schedule values that still map to real, consistent data. */
function sanitizeSel(campus?: string, course?: string, schedule?: string) {
  const campusId = campus && campusById(campus) ? campus : ''
  const courseId = course && courseById(course) ? course : ''
  const sched = scheduleById(schedule ?? '')
  const scheduleId =
    sched && sched.campusId === campusId && sched.courseId === courseId ? sched.id : ''
  return { campusId, courseId, scheduleId }
}

export default function Enrollment() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { notify } = useToast()

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  // A fresh deep-link wins; otherwise restore a saved draft. Either source is
  // sanitized so we never boot into a broken selection.
  const [sel, setSel] = useState(() => {
    if (params.get('campus') || params.get('course') || params.get('schedule')) {
      return sanitizeSel(params.get('campus') ?? '', params.get('course') ?? '', params.get('schedule') ?? '')
    }
    const d = loadDraft()
    return d?.sel ? sanitizeSel(d.sel.campusId, d.sel.courseId, d.sel.scheduleId) : { campusId: '', courseId: '', scheduleId: '' }
  })
  const [info, setInfo] = useState<PersonalInfo>(() => {
    const d = loadDraft()
    return d?.info ? { ...emptyInfo, ...d.info } : emptyInfo
  })
  const [payment, setPayment] = useState<PaymentInfo>(() => {
    const d = loadDraft()
    return d?.payment ? { ...emptyPayment, ...d.payment } : emptyPayment
  })
  const [errors, setErrors] = useState<string[]>([])
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [focusField, setFocusField] = useState<string | null>(null)

  // Move focus to the first invalid field after the error state has rendered.
  useEffect(() => {
    if (!focusField) return
    const el = document.getElementById(focusField)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el?.focus({ preventScroll: true })
    setFocusField(null)
  }, [focusField])

  // Persist an in-progress draft so a reload (or going to fetch a payment
  // receipt) never loses the user's work. Cleared once the request is confirmed.
  useEffect(() => {
    if (step === 6) return
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ sel, info, payment }))
    } catch {
      /* storage unavailable — non-critical */
    }
  }, [sel, info, payment, step])

  useEffect(() => {
    if (step === 6) {
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        /* ignore */
      }
    }
  }, [step])

  const selection = sel
  const schedule = scheduleById(sel.scheduleId)
  const cost = costFromSchedule(schedule)

  const availableCourses = useMemo(() => {
    if (!sel.campusId) return []
    return courseIdsAtCampus(sel.campusId as CampusId)
  }, [sel.campusId])

  const availableSchedules = useMemo(() => {
    if (!sel.campusId || !sel.courseId) return []
    return schedulesFor(sel.campusId as CampusId, sel.courseId as CourseId)
  }, [sel.campusId, sel.courseId])

  function go(next: number) {
    setDir(next > step ? 1 : -1)
    setErrors([])
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Per-field validators for the personal-data step (return '' when valid). */
  function validateField(name: keyof PersonalInfo, value: string): string {
    const v = value.trim()
    switch (name) {
      case 'name':
        return v ? '' : 'Ingresa tu nombre completo.'
      case 'idCard':
        if (!v) return 'Ingresa tu número de cédula.'
        return /^\d{6,9}$/.test(v) ? '' : 'Solo números, sin puntos ni letras.'
      case 'phone':
        if (!v) return 'Ingresa tu teléfono.'
        return v.replace(/\D/g, '').length >= 10 ? '' : 'Incluye el código de país (ej. +58 412 …).'
      case 'email':
        if (!v) return 'Ingresa tu correo electrónico.'
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Revisa el formato (ej. nombre@dominio.com).'
      case 'age':
        if (!v) return ''
        return Number(v) >= 16 && Number(v) <= 70 ? '' : 'La edad debe estar entre 16 y 70.'
      default:
        return ''
    }
  }

  const REQUIRED_FIELDS: (keyof PersonalInfo)[] = ['name', 'idCard', 'phone', 'email']

  function onFieldBlur(name: keyof PersonalInfo) {
    const msg = validateField(name, info[name])
    setFieldErrors((prev) => ({ ...prev, [name]: msg }))
  }

  function validateStep(): boolean {
    if (step === 0 && !sel.campusId) return fail(['Selecciona una sede para continuar.'])
    if (step === 1 && !sel.courseId) return fail(['Selecciona un curso para continuar.'])
    if (step === 2 && !sel.scheduleId) return fail(['Selecciona un horario para continuar.'])
    if (step === 3) {
      const next: Record<string, string> = {}
      for (const f of REQUIRED_FIELDS) {
        const msg = validateField(f, info[f])
        if (msg) next[f] = msg
      }
      setFieldErrors(next)
      const firstInvalid = REQUIRED_FIELDS.find((f) => next[f])
      if (firstInvalid) {
        // Anchor recovery on the offending field, not a generic list at the bottom.
        setFocusField(`f-${firstInvalid}`)
        return fail(['Revisa los campos marcados antes de continuar.'])
      }
    }
    if (step === 5) {
      const next: Record<string, string> = {}
      if (!payment.method) next.method = 'Selecciona un método de pago.'
      if (!payment.reference) next.reference = 'Ingresa la referencia del pago.'
      if (!payment.fileName) next.fileName = 'Adjunta tu comprobante de pago.'
      setFieldErrors(next)
      if (Object.keys(next).length) {
        if (next.reference) setFocusField('f-reference')
        return fail(['Revisa los campos marcados antes de continuar.'])
      }
    }
    return true
  }

  function fail(msgs: string[]) {
    setErrors(msgs)
    return false
  }

  function next() {
    if (!validateStep()) return
    if (step === 5) {
      notify('Comprobante recibido. Procesando solicitud…', 'info')
    }
    go(step + 1)
  }

  return (
    <MotionPage>
      <div className="container-px pb-24 pt-32">
        <div className="mb-10">
          <span className="eyebrow">
            <span className="h-px w-8 bg-accent-500" /> Inscripción
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tightest sm:text-4xl">
            Completa tu inscripción
          </h1>
          <p className="mt-2 text-sm text-steel-400">
            Un proceso guiado, claro y seguro. Tus datos solo se usan para gestionar tu cupo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_300px]">
          {/* Stepper */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Stepper
              steps={STEP_LABELS}
              current={step}
              onStepClick={step < 6 ? (i) => go(i) : undefined}
            />
          </div>

          {/* Step content — keyed by step so each enters with a directional
              slide on mount. (No AnimatePresence/exit: mode="wait" can stall if
              an exit animation never completes, freezing navigation.) */}
          <div className="min-h-[420px]">
            <div>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {step === 0 && (
                  <StepWrap title="Selecciona tu sede" subtitle="¿Dónde quieres formarte?">
                    <div className="grid gap-3">
                      {campuses.map((c) => (
                        <SelectCard
                          key={c.id}
                          title={c.name}
                          subtitle={`${c.tag} · ${c.state}`}
                          icon={<MapPin className="h-5 w-5" />}
                          selected={sel.campusId === c.id}
                          onClick={() =>
                            setSel({ campusId: c.id, courseId: '', scheduleId: '' })
                          }
                        />
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 1 && (
                  <StepWrap title="Selecciona tu curso" subtitle="Programas disponibles en tu sede">
                    <div className="grid gap-3">
                      {courses.map((c) => {
                        const enabled = availableCourses.includes(c.id) && c.status === 'available'
                        return (
                          <SelectCard
                            key={c.id}
                            title={c.shortName}
                            subtitle={enabled ? c.tagline : 'No disponible en esta sede'}
                            icon={<Icon name={c.icon} className="h-5 w-5" />}
                            selected={sel.courseId === c.id}
                            disabled={!enabled}
                            onClick={() => setSel({ ...sel, courseId: c.id, scheduleId: '' })}
                          />
                        )
                      })}
                    </div>
                  </StepWrap>
                )}

                {step === 2 && (
                  <StepWrap title="Selecciona tu horario" subtitle="Modalidad y costos">
                    {availableSchedules.length > 0 ? (
                      <div className="grid gap-3">
                        {availableSchedules.map((s) => {
                          const c = costFromSchedule(s)
                          return (
                            <SelectCard
                              key={s.id}
                              title={`${s.modality} · ${s.time}`}
                              subtitle={`${s.days} · ${s.duration}`}
                              meta={c ? formatUsd(c.total) : undefined}
                              icon={<Clock className="h-5 w-5" />}
                              selected={sel.scheduleId === s.id}
                              onClick={() => setSel({ ...sel, scheduleId: s.id })}
                            />
                          )
                        })}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-6">
                        <p className="text-sm text-amber-200">
                          Este curso aún no tiene horarios publicados. Escríbenos por WhatsApp y te
                          avisamos al abrir cupos, o vuelve atrás para elegir otro curso.
                        </p>
                        <ButtonAnchor
                          href={whatsappLink('Hola, quiero información sobre próximos horarios en V1 Aeronáutica.')}
                          size="sm"
                          variant="secondary"
                          className="mt-4"
                        >
                          Avísame por WhatsApp
                        </ButtonAnchor>
                      </div>
                    )}
                  </StepWrap>
                )}

                {step === 3 && (
                  <StepWrap title="Tus datos" subtitle="Información personal y de contacto">
                    <p className="-mt-3 mb-5 flex items-center gap-2 text-xs text-steel-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent-500/70" />
                      Solo usamos estos datos para gestionar tu cupo y contactarte. No los compartimos.
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Field id="f-name" label="Nombre completo" value={info.name} onChange={(v) => setInfo({ ...info, name: v })} onBlur={() => onFieldBlur('name')} error={fieldErrors.name} required autoComplete="name" />
                      </div>
                      <Field id="f-idCard" label="Cédula" value={info.idCard} onChange={(v) => setInfo({ ...info, idCard: v })} onBlur={() => onFieldBlur('idCard')} error={fieldErrors.idCard} helper="Solo números, sin puntos." inputMode="numeric" required />
                      <Field id="f-age" label="Edad" type="number" value={info.age} onChange={(v) => setInfo({ ...info, age: v })} onBlur={() => onFieldBlur('age')} error={fieldErrors.age} inputMode="numeric" />
                      <Field label="Fecha de nacimiento" type="date" value={info.birthdate} onChange={(v) => setInfo({ ...info, birthdate: v })} />
                      <Field id="f-phone" label="Teléfono / WhatsApp" type="tel" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} onBlur={() => onFieldBlur('phone')} error={fieldErrors.phone} helper="Incluye el código de país." inputMode="tel" required autoComplete="tel" />
                      <div className="sm:col-span-2">
                        <Field id="f-email" label="Correo electrónico" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} onBlur={() => onFieldBlur('email')} error={fieldErrors.email} inputMode="email" required autoComplete="email" />
                      </div>
                      <Field label="Ciudad" value={info.city} onChange={(v) => setInfo({ ...info, city: v })} />
                      <Field label="Estado" value={info.state} onChange={(v) => setInfo({ ...info, state: v })} />
                      <SelectField
                        label="Nivel educativo"
                        value={info.education}
                        onChange={(v) => setInfo({ ...info, education: v })}
                        options={[
                          { value: 'bachiller', label: 'Bachiller' },
                          { value: 'tsu', label: 'TSU' },
                          { value: 'universitario', label: 'Universitario' },
                          { value: 'otro', label: 'Otro' },
                        ]}
                      />
                      <SelectField
                        label="Experiencia aeronáutica"
                        value={info.experience}
                        onChange={(v) => setInfo({ ...info, experience: v })}
                        options={[
                          { value: 'ninguna', label: 'Ninguna' },
                          { value: 'basica', label: 'Básica' },
                          { value: 'intermedia', label: 'Intermedia' },
                          { value: 'avanzada', label: 'Avanzada' },
                        ]}
                      />
                      <div className="sm:col-span-2">
                        <SelectField
                          label="¿Cómo te enteraste de la escuela?"
                          value={info.source}
                          onChange={(v) => setInfo({ ...info, source: v })}
                          options={[
                            { value: 'instagram', label: 'Instagram' },
                            { value: 'tiktok', label: 'TikTok' },
                            { value: 'referido', label: 'Un conocido' },
                            { value: 'google', label: 'Google' },
                            { value: 'otro', label: 'Otro' },
                          ]}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Textarea label="Comentarios adicionales" value={info.comments} onChange={(v) => setInfo({ ...info, comments: v })} />
                      </div>
                    </div>
                  </StepWrap>
                )}

                {step === 4 && (
                  <StepWrap title="Revisa tu inscripción" subtitle="Confirma que todo esté correcto">
                    <div className="space-y-3">
                      <ReviewRow label="Sede" value={campusById(sel.campusId)?.name} onEdit={() => go(0)} />
                      <ReviewRow label="Curso" value={courseById(sel.courseId)?.name} onEdit={() => go(1)} />
                      <ReviewRow label="Horario" value={schedule ? `${schedule.modality} · ${schedule.time}` : '—'} onEdit={() => go(2)} />
                      <ReviewRow label="Duración" value={schedule?.duration} />
                      <ReviewRow label="Estudiante" value={info.name || '—'} onEdit={() => go(3)} />
                      <ReviewRow label="Contacto" value={info.phone || info.email || '—'} onEdit={() => go(3)} />
                      {cost && (
                        <div className="mt-4 rounded-2xl border border-accent-500/20 bg-accent-500/[0.04] p-5">
                          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                            {cost.preinscription > 0 && <Mini label="Preinscripción" value={formatUsd(cost.preinscription)} />}
                            {cost.inscription > 0 && <Mini label="Inscripción" value={formatUsd(cost.inscription)} />}
                            {cost.hasInstallments && <Mini label="Mensualidad" value={formatUsd(cost.monthly)} />}
                            <Mini label="Total" value={formatUsd(cost.total)} accent />
                          </div>
                        </div>
                      )}
                    </div>
                  </StepWrap>
                )}

                {step === 5 && (
                  <StepWrap title="Pago de preinscripción" subtitle="Carga tu comprobante (simulado)">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <SelectCard
                        title="Transferencia bancaria"
                        icon={<Banknote className="h-5 w-5" />}
                        selected={payment.method === 'transfer'}
                        onClick={() => setPayment({ ...payment, method: 'transfer' })}
                      />
                      <SelectCard
                        title="Pago móvil"
                        icon={<Smartphone className="h-5 w-5" />}
                        selected={payment.method === 'mobile'}
                        onClick={() => setPayment({ ...payment, method: 'mobile' })}
                      />
                    </div>
                    {fieldErrors.method && (
                      <p className="mt-2 text-xs text-rose-400" role="alert">{fieldErrors.method}</p>
                    )}

                    {payment.method && (
                      <motion.div
                        key={payment.method}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="mt-5 rounded-2xl border border-accent-500/20 bg-accent-500/[0.04] p-5"
                      >
                        <p className="flex items-center gap-2 text-sm font-semibold text-accent-200">
                          <Landmark className="h-4 w-4" />
                          Datos para {payment.method === 'transfer' ? 'tu transferencia' : 'tu pago móvil'}
                        </p>
                        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                          {paymentInstructions[payment.method].map((row) => (
                            <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
                              <dt className="text-steel-400">{row.label}</dt>
                              <dd className="text-right font-medium text-steel-100">{row.value}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 border-t border-white/10 pt-3 text-xs text-steel-400">
                          Realiza el pago de la preinscripción
                          {cost ? ` (${formatUsd(cost.preinscription || cost.total)})` : ''} y luego
                          registra abajo los datos de tu comprobante.
                        </p>
                      </motion.div>
                    )}

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Banco emisor" value={payment.bank} onChange={(v) => setPayment({ ...payment, bank: v })} />
                      <Field
                        id="f-reference"
                        label="Referencia"
                        value={payment.reference}
                        onChange={(v) => setPayment({ ...payment, reference: v })}
                        onBlur={() =>
                          setFieldErrors((p) => ({ ...p, reference: payment.reference.trim() ? '' : 'Ingresa la referencia del pago.' }))
                        }
                        error={fieldErrors.reference}
                        inputMode="numeric"
                        required
                      />
                      <Field label="Fecha de pago" type="date" value={payment.date} onChange={(v) => setPayment({ ...payment, date: v })} />
                      <Field label="Monto pagado (USD)" type="number" value={payment.amount} onChange={(v) => setPayment({ ...payment, amount: v })} inputMode="numeric" />
                    </div>

                    <FileMock
                      fileName={payment.fileName}
                      error={fieldErrors.fileName}
                      onPick={(name) => {
                        setPayment({ ...payment, fileName: name })
                        setFieldErrors((p) => ({ ...p, fileName: '' }))
                      }}
                    />
                  </StepWrap>
                )}

                {step === 6 && <Confirmation onPortal={() => navigate('/portal')} />}

                {/* Errors */}
                {errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.4 }}
                    role="alert"
                    className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                  >
                    {errors.map((e) => (
                      <p key={e}>{e}</p>
                    ))}
                  </motion.div>
                )}

                {/* Nav buttons */}
                {step < 6 && (
                  <div className="mt-8 flex items-center justify-between">
                    <PremiumButton
                      variant="ghost"
                      onClick={() => go(Math.max(0, step - 1))}
                      icon={<ArrowLeft className="h-4 w-4" />}
                      className={step === 0 ? 'pointer-events-none opacity-0' : ''}
                    >
                      Atrás
                    </PremiumButton>
                    <PremiumButton onClick={next} showArrow>
                      {step === 5 ? 'Enviar solicitud' : 'Continuar'}
                    </PremiumButton>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <EnrollmentSummary sel={selection} />
          </div>
        </div>
      </div>
    </MotionPage>
  )
}

function StepWrap({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-steel-400">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value, onEdit }: { label: string; value?: string; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-800/50 px-4 py-3 text-sm">
      <span className="text-steel-400">{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-right font-medium text-steel-100">{value ?? '—'}</span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="shrink-0 text-xs font-medium text-accent-400 transition-colors hover:text-accent-300"
          >
            Editar
          </button>
        )}
      </span>
    </div>
  )
}

function Mini({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-steel-500">{label}</p>
      <p className={`mt-1 font-medium ${accent ? 'font-display text-lg font-bold text-accent-300' : 'text-steel-100'}`}>
        {value}
      </p>
    </div>
  )
}

function FileMock({ fileName, onPick, error }: { fileName: string; onPick: (name: string) => void; error?: string }) {
  return (
    <div className="mt-5">
      <label
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors hover:bg-white/[0.03] ${
          error ? 'border-rose-500/50 bg-rose-500/[0.04]' : 'border-white/15 bg-white/[0.02] hover:border-accent-500/40'
        }`}
      >
      <input
        type="file"
        className="hidden"
        accept="image/*,application/pdf"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onPick(f.name)
        }}
      />
      {fileName ? (
        <>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <FileText className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-steel-100">{fileName}</p>
          <p className="text-xs text-accent-400">Cambiar archivo</p>
        </>
      ) : (
        <>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
            <Upload className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-steel-100">Adjunta tu comprobante</p>
          <p className="text-xs text-steel-500">JPG, PNG o PDF · El archivo no se sube a ningún servidor</p>
        </>
      )}
      </label>
      {error && <p className="mt-1.5 text-xs text-rose-400" role="alert">{error}</p>}
    </div>
  )
}

function Confirmation({ onPortal }: { onPortal: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="flex flex-col items-center rounded-3xl border border-white/10 bg-ink-800/50 px-6 py-14 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 16 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-accent-500/15 text-accent-400"
      >
        <PartyPopper className="h-9 w-9" />
      </motion.div>
      <h2 className="mt-6 text-2xl font-semibold">¡Solicitud recibida!</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-300">
        Tu solicitud de inscripción fue recibida. El equipo administrativo validará la
        información y te contactará para completar el proceso.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PremiumButton onClick={onPortal} showArrow icon={<Check className="h-4 w-4" />}>
          Ver portal demo
        </PremiumButton>
        <ButtonLink to="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
      </div>
    </motion.div>
  )
}
