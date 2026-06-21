import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, ClipboardList, CreditCard, CalendarDays, FolderOpen,
  Megaphone, BadgeCheck, User, GraduationCap, TrendingUp, Clock, MapPin,
  Download, FileText, QrCode, CheckCircle2,
} from 'lucide-react'
import DemoGate from '@/components/dashboard/DemoGate'
import DashboardShell, { type NavItem } from '@/components/dashboard/DashboardShell'
import MetricCard from '@/components/dashboard/MetricCard'
import CountUp from '@/components/dashboard/CountUp'
import StatusBadge, { statusTone } from '@/components/ui/StatusBadge'
import { StaggerContainer } from '@/components/motion/Reveal'
import { fadeUp, staggerContainer } from '@/utils/motion'
import { formatUsd, formatDate, initials } from '@/utils/formatters'
import { demoStudent } from '@/data/students'
import { grades, gradeAverage } from '@/data/grades'
import { studentPayments, studentFinance } from '@/data/payments'
import { announcements } from '@/data/announcements'

const nav: NavItem[] = [
  { id: 'resumen', label: 'Resumen', icon: 'LayoutDashboard' },
  { id: 'notas', label: 'Notas', icon: 'ClipboardList' },
  { id: 'pagos', label: 'Pagos', icon: 'CreditCard' },
  { id: 'calendario', label: 'Calendario', icon: 'CalendarDays' },
  { id: 'documentos', label: 'Documentos', icon: 'FolderOpen' },
  { id: 'comunicados', label: 'Comunicados', icon: 'Megaphone' },
  { id: 'credencial', label: 'Credencial', icon: 'BadgeCheck' },
  { id: 'perfil', label: 'Perfil', icon: 'User' },
]

export default function StudentPortalDemo() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('resumen')

  if (!entered) {
    return (
      <DemoGate
        role="Portal del Estudiante"
        title="Bienvenido de vuelta"
        description="Accede a tu progreso académico, pagos, calendario y credencial digital. Este es un entorno de demostración."
        icon={<GraduationCap className="h-7 w-7" />}
        ctaLabel="Entrar como estudiante demo"
        onEnter={() => setEntered(true)}
      />
    )
  }

  return (
    <DashboardShell
      role="Estudiante"
      userName={demoStudent.name}
      userMeta={demoStudent.id}
      nav={nav}
      active={active}
      onChange={setActive}
    >
      {active === 'resumen' && <Resumen />}
      {active === 'notas' && <Notas />}
      {active === 'pagos' && <Pagos />}
      {active === 'calendario' && <Calendario />}
      {active === 'documentos' && <Documentos />}
      {active === 'comunicados' && <Comunicados />}
      {active === 'credencial' && <Credencial />}
      {active === 'perfil' && <Perfil />}
    </DashboardShell>
  )
}

/* ─────────────────────────  RESUMEN  ───────────────────────── */
function Resumen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Hola, {demoStudent.name.split(' ')[0]} 👋</h2>
        <p className="mt-1 text-sm text-steel-400">
          {demoStudent.course} · {demoStudent.campus} · {demoStudent.modality}
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard icon={<TrendingUp className="h-5 w-5" />} label="Progreso del curso" value={<><CountUp to={demoStudent.progress} suffix="%" /></>} tone="accent" />
        <MetricCard icon={<GraduationCap className="h-5 w-5" />} label="Promedio general" value={<CountUp to={gradeAverage} decimals={1} />} />
        <MetricCard icon={<CreditCard className="h-5 w-5" />} label="Saldo pendiente" value={<CountUp to={studentFinance.balance} prefix="$" />} />
        <MetricCard icon={<Clock className="h-5 w-5" />} label="Cuotas restantes" value={<CountUp to={studentFinance.installmentsTotal - studentFinance.installmentsPaid} />} />
      </StaggerContainer>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Progress + next class */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-steel-300">Progreso del curso</h3>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${demoStudent.progress}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
            />
          </div>
          <p className="mt-2 text-xs text-steel-500">{demoStudent.progress}% completado · 3 de 6 módulos aprobados</p>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-accent-500/20 bg-accent-500/[0.05] p-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-300">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-accent-400">Próxima clase</p>
              <p className="mt-1 font-medium">{demoStudent.nextClass.subject}</p>
              <p className="mt-0.5 text-sm text-steel-400">
                {formatDate(demoStudent.nextClass.date)} · {demoStudent.nextClass.time} · {demoStudent.nextClass.room}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status panel */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
          <h3 className="text-sm font-semibold text-steel-300">Estado de tu inscripción</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <StatusRow label="Estado académico" tone="success" value={demoStudent.academicStatus} />
            <StatusRow label="Próxima cuota" tone="warning" value={`${formatUsd(studentFinance.nextAmount)} · ${formatDate(studentFinance.nextDue)}`} />
            <StatusRow label="Horario" value={demoStudent.modality} />
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

function StatusRow({ label, value, tone }: { label: string; value: string; tone?: 'success' | 'warning' }) {
  return (
    <li className="flex items-center justify-between gap-2 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-steel-400">{label}</span>
      {tone ? <StatusBadge tone={tone}>{value}</StatusBadge> : <span className="font-medium text-steel-100">{value}</span>}
    </li>
  )
}

/* ─────────────────────────  NOTAS  ───────────────────────── */
function Notas() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Notas y evaluaciones</h2>
          <p className="text-sm text-steel-400">Curso Inicial Tripulante de Cabina</p>
        </div>
        <div className="rounded-xl border border-accent-500/20 bg-accent-500/[0.05] px-5 py-3 text-center">
          <p className="text-xs uppercase tracking-wide text-accent-400">Promedio general</p>
          <p className="font-display text-2xl font-bold text-accent-300">{gradeAverage.toFixed(1)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-steel-500">
            <tr>
              <th className="px-5 py-3 font-medium">Materia</th>
              <th className="px-5 py-3 font-medium">Nota</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">Observaciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {grades.map((g) => {
              const badge = statusTone(g.status)
              return (
                <tr key={g.subject} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium text-steel-100">{g.subject}</td>
                  <td className="px-5 py-4">
                    {g.score != null ? (
                      <span className="font-display text-base font-semibold">{g.score}</span>
                    ) : (
                      <span className="text-steel-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
                  </td>
                  <td className="hidden px-5 py-4 text-steel-400 sm:table-cell">{g.note}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─────────────────────────  PAGOS  ───────────────────────── */
function Pagos() {
  return (
    <div className="space-y-6">
      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard icon={<CreditCard className="h-5 w-5" />} label="Total del curso" value={formatUsd(studentFinance.total)} />
        <MetricCard icon={<CheckCircle2 className="h-5 w-5" />} label="Pagado" value={formatUsd(studentFinance.paid)} tone="accent" />
        <MetricCard icon={<Clock className="h-5 w-5" />} label="Saldo pendiente" value={formatUsd(studentFinance.balance)} />
        <MetricCard icon={<CalendarDays className="h-5 w-5" />} label="Próximo vencimiento" value={formatDate(studentFinance.nextDue)} hint={formatUsd(studentFinance.nextAmount)} />
      </StaggerContainer>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-steel-300">Historial de pagos</h3>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-steel-500">
              <tr>
                <th className="px-5 py-3 font-medium">Concepto</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">Fecha</th>
                <th className="px-5 py-3 font-medium">Monto</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">Método</th>
                <th className="px-5 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {studentPayments.map((p) => {
                const badge = statusTone(p.status)
                return (
                  <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-medium text-steel-100">{p.concept}</td>
                    <td className="hidden px-5 py-4 text-steel-400 sm:table-cell">{formatDate(p.date)}</td>
                    <td className="px-5 py-4 font-medium">{formatUsd(p.amount)}</td>
                    <td className="hidden px-5 py-4 text-steel-400 md:table-cell">{p.method}</td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={badge.tone} dot>{badge.label}</StatusBadge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────  CALENDARIO  ───────────────────────── */
function Calendario() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const classDays = new Set([2, 3, 4, 5, 9, 10, 11, 12, 16, 17, 18, 19, 23, 24, 25, 26, 30])
  const today = 5
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Junio 2026</h3>
          <span className="text-xs text-steel-500">Clases · L a V</span>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-xs text-steel-500">
          {days.map((d, i) => <span key={i} className="py-1">{d}</span>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const hasClass = classDays.has(day)
            const isToday = day === today
            return (
              <div
                key={day}
                className={`grid aspect-square place-items-center rounded-lg text-sm transition-colors ${
                  isToday
                    ? 'bg-accent-500 font-semibold text-ink-900'
                    : hasClass
                      ? 'border border-accent-500/30 bg-accent-500/10 text-accent-200 hover:bg-accent-500/20'
                      : 'text-steel-400 hover:bg-white/5'
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
        <h3 className="font-semibold">Próximas clases</h3>
        <ul className="mt-4 space-y-3">
          {[
            { d: '05 Jun', s: 'Procedimientos de emergencia', t: '8:30 am' },
            { d: '06 Jun', s: 'Factores humanos', t: '8:30 am' },
            { d: '09 Jun', s: 'Servicio a bordo', t: '8:30 am' },
          ].map((c) => (
            <li key={c.d} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-500/10 text-center text-xs font-semibold text-accent-300">
                {c.d.split(' ')[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{c.s}</p>
                <p className="text-xs text-steel-500">{c.t}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─────────────────────────  DOCUMENTOS  ───────────────────────── */
function Documentos() {
  const docs = [
    { name: 'Manual de seguridad aérea', type: 'PDF', size: '4.2 MB' },
    { name: 'Material · Servicio a bordo', type: 'PDF', size: '2.8 MB' },
    { name: 'Guía de primeros auxilios', type: 'PDF', size: '3.1 MB' },
    { name: 'Reglamento institucional', type: 'PDF', size: '1.4 MB' },
    { name: 'Constancia de inscripción', type: 'PDF', size: '320 KB' },
  ]
  return (
    <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {docs.map((d) => (
        <motion.div
          key={d.name}
          variants={fadeUp}
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/50 p-4 transition-colors hover:border-accent-500/30"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{d.name}</p>
            <p className="text-xs text-steel-500">{d.type} · {d.size}</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-steel-400 transition-colors group-hover:border-accent-500/40 group-hover:text-accent-400">
            <Download className="h-4 w-4" />
          </button>
        </motion.div>
      ))}
    </StaggerContainer>
  )
}

/* ─────────────────────────  COMUNICADOS  ───────────────────────── */
function Comunicados() {
  return (
    <StaggerContainer className="space-y-3">
      {announcements.map((a) => (
        <motion.div
          key={a.id}
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-ink-800/50 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <StatusBadge tone="accent">{a.tag}</StatusBadge>
            <span className="text-xs text-steel-500">{formatDate(a.date)}</span>
          </div>
          <h3 className="mt-3 font-semibold">{a.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-steel-400">{a.body}</p>
        </motion.div>
      ))}
    </StaggerContainer>
  )
}

/* ─────────────────────────  CREDENCIAL  ───────────────────────── */
function Credencial() {
  return (
    <div className="flex justify-center py-6">
      <motion.div
        initial={{ opacity: 0, rotateX: -10, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotateY: 4, rotateX: 2 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-ink-700 to-ink-900 shadow-panel"
      >
        <div className="relative h-24 bg-gradient-to-r from-accent-600 to-accent-500">
          <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-30" />
          <div className="absolute bottom-0 left-6 translate-y-1/2">
            <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-ink-900 bg-ink-700 text-2xl font-bold text-accent-300">
              {initials(demoStudent.name)}
            </div>
          </div>
          <span className="absolute right-5 top-5 font-display text-lg font-bold text-ink-900">
            V<span className="text-white">1</span>
          </span>
        </div>
        <div className="px-6 pb-6 pt-12">
          <p className="text-lg font-semibold">{demoStudent.name}</p>
          <p className="text-xs text-accent-400">{demoStudent.course}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-steel-500">Código</dt>
              <dd className="mt-0.5 font-medium text-steel-100">{demoStudent.id}</dd>
            </div>
            <div>
              <dt className="text-steel-500">Sede</dt>
              <dd className="mt-0.5 font-medium text-steel-100">{demoStudent.campus}</dd>
            </div>
            <div>
              <dt className="text-steel-500">Estado</dt>
              <dd className="mt-0.5"><StatusBadge tone="success" dot>Activo</StatusBadge></dd>
            </div>
            <div>
              <dt className="text-steel-500">Vigencia</dt>
              <dd className="mt-0.5 font-medium text-steel-100">2026</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <div className="grid h-16 w-16 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-steel-500">
              <QrCode className="h-10 w-10" />
            </div>
            <p className="max-w-[55%] text-right text-[10px] leading-relaxed text-steel-500">
              Credencial digital institucional · V1 Aeronáutica
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────  PERFIL  ───────────────────────── */
function Perfil() {
  const rows = [
    { label: 'Nombre completo', value: demoStudent.name },
    { label: 'Correo electrónico', value: demoStudent.email },
    { label: 'Teléfono', value: demoStudent.phone },
    { label: 'Curso', value: demoStudent.course },
    { label: 'Sede', value: demoStudent.campus },
    { label: 'Horario', value: demoStudent.schedule },
  ]
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl space-y-3">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/50 p-6">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-500/15 text-xl font-bold text-accent-300">
          {initials(demoStudent.name)}
        </div>
        <div>
          <p className="text-lg font-semibold">{demoStudent.name}</p>
          <p className="text-sm text-steel-400">{demoStudent.id}</p>
        </div>
      </div>
      {rows.map((r) => (
        <motion.div
          key={r.label}
          variants={fadeUp}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-800/50 px-5 py-4 text-sm"
        >
          <span className="text-steel-400">{r.label}</span>
          <span className="text-right font-medium text-steel-100">{r.value}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
