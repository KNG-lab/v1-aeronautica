import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, ClipboardList, Users, CreditCard, BookOpen, Building2,
  GraduationCap, UserCog, Megaphone, BarChart3, ShieldCheck, AlertTriangle,
  TrendingUp, Check, X, RotateCcw, DollarSign, Clock,
} from 'lucide-react'
import DemoGate from '@/components/dashboard/DemoGate'
import DashboardShell, { type NavItem } from '@/components/dashboard/DashboardShell'
import MetricCard from '@/components/dashboard/MetricCard'
import CountUp from '@/components/dashboard/CountUp'
import StatusBadge, { statusTone } from '@/components/ui/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import AnimatedTabs from '@/components/ui/AnimatedTabs'
import { useToast } from '@/components/ui/Toast'
import { StaggerContainer } from '@/components/motion/Reveal'
import { fadeUp } from '@/utils/motion'
import { formatUsd, formatDate } from '@/utils/formatters'
import { enrollments, adminKpis } from '@/data/students'
import { reviewPayments } from '@/data/payments'
import { courses, courseById } from '@/data/courses'
import { campuses, campusById } from '@/data/campuses'
import { instructors } from '@/data/instructors'
import { grades } from '@/data/grades'
import type { PaymentStatus } from '@/data/types'

const nav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'inscripciones', label: 'Inscripciones', icon: 'ClipboardList' },
  { id: 'estudiantes', label: 'Estudiantes', icon: 'Users' },
  { id: 'pagos', label: 'Pagos', icon: 'CreditCard' },
  { id: 'cursos', label: 'Cursos', icon: 'BookOpen' },
  { id: 'sedes', label: 'Sedes', icon: 'Building2' },
  { id: 'notas', label: 'Notas', icon: 'GraduationCap' },
  { id: 'instructores', label: 'Instructores', icon: 'UserCog' },
  { id: 'comunicados', label: 'Comunicados', icon: 'Megaphone' },
  { id: 'reportes', label: 'Reportes', icon: 'BarChart3' },
]

export default function AdminPanelDemo() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('dashboard')

  if (!entered) {
    return (
      <DemoGate
        role="Panel Administrativo"
        title="Gestión institucional"
        description="Administra inscripciones, pagos, estudiantes y reportes de V1 Aeronáutica. Entorno de demostración con datos simulados."
        icon={<ShieldCheck className="h-7 w-7" />}
        ctaLabel="Entrar como administrador demo"
        onEnter={() => setEntered(true)}
      />
    )
  }

  return (
    <DashboardShell
      role="Administración"
      userName="Equipo Académico"
      userMeta="Administrador"
      nav={nav}
      active={active}
      onChange={setActive}
    >
      {active === 'dashboard' && <Dashboard onGo={setActive} />}
      {active === 'inscripciones' && <Inscripciones />}
      {active === 'estudiantes' && <Estudiantes />}
      {active === 'pagos' && <PagosReview />}
      {active === 'cursos' && <Cursos />}
      {active === 'sedes' && <Sedes />}
      {active === 'notas' && <Notas />}
      {active === 'instructores' && <Instructores />}
      {active === 'comunicados' && <ComunicadosAdmin />}
      {active === 'reportes' && <Reportes />}
    </DashboardShell>
  )
}

/* ─────────────────────────  DASHBOARD  ───────────────────────── */
function Dashboard({ onGo }: { onGo: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard icon={<ClipboardList className="h-5 w-5" />} label="Nuevas solicitudes" value={<CountUp to={adminKpis.newRequests} />} tone="accent" />
        <MetricCard icon={<CreditCard className="h-5 w-5" />} label="Pagos en validación" value={<CountUp to={adminKpis.paymentsInValidation} />} />
        <MetricCard icon={<Users className="h-5 w-5" />} label="Estudiantes activos" value={<CountUp to={adminKpis.activeStudents} />} />
        <MetricCard icon={<BookOpen className="h-5 w-5" />} label="Cursos activos" value={<CountUp to={adminKpis.activeCourses} />} />
        <MetricCard icon={<Building2 className="h-5 w-5" />} label="Sedes activas" value={<CountUp to={adminKpis.activeCampuses} />} />
        <MetricCard icon={<DollarSign className="h-5 w-5" />} label="Ingresos del mes" value={<CountUp to={adminKpis.monthlyRevenue} prefix="$" />} />
      </StaggerContainer>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent enrollments */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Solicitudes recientes</h3>
            <button onClick={() => onGo('inscripciones')} className="text-xs font-medium text-accent-400 hover:underline">
              Ver todas
            </button>
          </div>
          <ul className="mt-4 divide-y divide-white/5">
            {enrollments.slice(0, 4).map((e) => {
              const badge = statusTone(e.status)
              return (
                <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium">{e.name}</p>
                    <p className="text-xs text-steel-500">{courseById(e.courseId)?.shortName} · {campusById(e.campusId)?.name}</p>
                  </div>
                  <StatusBadge tone={badge.tone} dot>{badge.label}</StatusBadge>
                </li>
              )
            })}
          </ul>
        </motion.div>

        {/* Alerts */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">Alertas</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-white/5 bg-ink-900/40 p-3">
              <p className="font-medium text-steel-100">{adminKpis.paymentsInValidation} pagos esperan validación</p>
              <p className="mt-0.5 text-xs text-steel-500">Revisa la sección de Pagos</p>
            </li>
            <li className="rounded-xl border border-white/5 bg-ink-900/40 p-3">
              <p className="font-medium text-steel-100">2 inscripciones incompletas</p>
              <p className="mt-0.5 text-xs text-steel-500">Falta comprobante o datos</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────  INSCRIPCIONES  ───────────────────────── */
function Inscripciones() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? enrollments : enrollments.filter((e) => e.status === filter)
  return (
    <div className="space-y-5">
      <AnimatedTabs
        active={filter}
        onChange={setFilter}
        layoutId="enroll-filter"
        tabs={[
          { id: 'all', label: 'Todas' },
          { id: 'new', label: 'Nuevas' },
          { id: 'in-validation', label: 'En validación' },
          { id: 'approved', label: 'Aprobadas' },
          { id: 'incomplete', label: 'Incompletas' },
        ]}
      />

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-steel-500">
            <tr>
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Nombre</th>
              <th className="px-5 py-3 font-medium">Curso</th>
              <th className="px-5 py-3 font-medium">Sede</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium">Pago</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((e) => {
              const s = statusTone(e.status)
              const p = statusTone(e.payment)
              return (
                <tr key={e.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-mono text-xs text-steel-400">{e.id}</td>
                  <td className="px-5 py-4 font-medium text-steel-100">{e.name}</td>
                  <td className="px-5 py-4 text-steel-300">{courseById(e.courseId)?.shortName}</td>
                  <td className="px-5 py-4 text-steel-300">{campusById(e.campusId)?.name}</td>
                  <td className="px-5 py-4"><StatusBadge tone={s.tone} dot>{s.label}</StatusBadge></td>
                  <td className="px-5 py-4"><StatusBadge tone={p.tone}>{p.label}</StatusBadge></td>
                  <td className="px-5 py-4 text-steel-400">{formatDate(e.date)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8"><EmptyState title="Sin resultados" description="No hay inscripciones con este estado." /></div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────  ESTUDIANTES  ───────────────────────── */
function Estudiantes() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-steel-500">
          <tr>
            <th className="px-5 py-3 font-medium">Estudiante</th>
            <th className="px-5 py-3 font-medium">Curso</th>
            <th className="px-5 py-3 font-medium">Sede</th>
            <th className="px-5 py-3 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {enrollments.filter((e) => e.status === 'approved' || e.status === 'in-validation').map((e) => {
            const s = statusTone(e.status === 'approved' ? 'available' : e.status)
            return (
              <tr key={e.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-medium text-steel-100">{e.name}</td>
                <td className="px-5 py-4 text-steel-300">{courseById(e.courseId)?.shortName}</td>
                <td className="px-5 py-4 text-steel-300">{campusById(e.campusId)?.name}</td>
                <td className="px-5 py-4"><StatusBadge tone={s.tone} dot>{e.status === 'approved' ? 'Activo' : 'En validación'}</StatusBadge></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────  PAGOS (review)  ───────────────────────── */
function PagosReview() {
  const { notify } = useToast()
  const [statuses, setStatuses] = useState<Record<string, PaymentStatus>>(
    Object.fromEntries(reviewPayments.map((p) => [p.id, p.status])),
  )

  function act(id: string, status: PaymentStatus, label: string) {
    setStatuses((s) => ({ ...s, [id]: status }))
    notify(label, status === 'approved' ? 'success' : status === 'incomplete' ? 'warning' : 'error')
  }

  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {reviewPayments.map((p) => {
        const status = statuses[p.id]
        const badge = statusTone(status)
        return (
          <motion.div key={p.id} variants={fadeUp} className="rounded-2xl border border-white/10 bg-ink-800/50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{p.student}</p>
                <p className="text-xs text-steel-500">{p.course}</p>
              </div>
              <StatusBadge tone={badge.tone} dot>{badge.label}</StatusBadge>
            </div>

            {/* Mock comprobante */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-ink-900/40 p-4 text-xs">
              <Detail label="Monto" value={formatUsd(p.amount)} />
              <Detail label="Método" value={p.method} />
              <Detail label="Referencia" value={p.ref} />
              <Detail label="Fecha" value={formatDate(p.date)} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <ActionBtn icon={<Check className="h-4 w-4" />} label="Aprobar" tone="success" onClick={() => act(p.id, 'approved', `Pago de ${p.student} aprobado`)} />
              <ActionBtn icon={<X className="h-4 w-4" />} label="Rechazar" tone="danger" onClick={() => act(p.id, 'pending', `Pago de ${p.student} rechazado`)} />
              <ActionBtn icon={<RotateCcw className="h-4 w-4" />} label="Solicitar corrección" tone="warning" onClick={() => act(p.id, 'incomplete', `Corrección solicitada a ${p.student}`)} />
            </div>
          </motion.div>
        )
      })}
    </StaggerContainer>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-steel-500">{label}</p>
      <p className="mt-0.5 font-medium text-steel-100">{value}</p>
    </div>
  )
}

function ActionBtn({ icon, label, tone, onClick }: { icon: React.ReactNode; label: string; tone: 'success' | 'danger' | 'warning'; onClick: () => void }) {
  const tones = {
    success: 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10',
    danger: 'border-rose-500/30 text-rose-300 hover:bg-rose-500/10',
    warning: 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10',
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${tones[tone]}`}
    >
      {icon}
      {label}
    </button>
  )
}

/* ─────────────────────────  CURSOS  ───────────────────────── */
function Cursos() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {courses.map((c) => {
        const badge = statusTone(c.status)
        return (
          <motion.div key={c.id} variants={fadeUp} className="rounded-2xl border border-white/10 bg-ink-800/50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-1 text-xs text-steel-500">{c.tagline}</p>
              </div>
              <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-steel-400">
              <span>{c.faq.length} FAQ</span>
              <span>·</span>
              <span>{c.learn.length} módulos</span>
            </div>
          </motion.div>
        )
      })}
    </StaggerContainer>
  )
}

/* ─────────────────────────  SEDES  ───────────────────────── */
function Sedes() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {campuses.map((c) => (
        <motion.div key={c.id} variants={fadeUp} className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">{c.name}</h3>
            <StatusBadge tone="accent">{c.tag}</StatusBadge>
          </div>
          <p className="mt-3 text-sm text-steel-400">{c.address}</p>
          <p className="mt-1 text-sm text-steel-400">{c.hours}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {c.courseIds.map((id) => (
              <span key={id} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-steel-300">
                {courseById(id)?.shortName}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </StaggerContainer>
  )
}

/* ─────────────────────────  NOTAS (admin)  ───────────────────────── */
function Notas() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[520px] text-sm">
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
                <td className="px-5 py-4">{g.score ?? '—'}</td>
                <td className="px-5 py-4"><StatusBadge tone={badge.tone}>{badge.label}</StatusBadge></td>
                <td className="hidden px-5 py-4 text-steel-400 sm:table-cell">{g.note}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────  INSTRUCTORES  ───────────────────────── */
function Instructores() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {instructors.map((i) => (
        <motion.div key={i.id} variants={fadeUp} className="rounded-2xl border border-white/10 bg-ink-800/50 p-5">
          <p className="font-semibold">{i.name}</p>
          <p className="text-xs text-accent-400">{i.role}</p>
          <p className="mt-3 text-xs text-steel-500">Sede {campusById(i.campusId)?.name}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {i.subjects.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-steel-300">{s}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </StaggerContainer>
  )
}

/* ─────────────────────────  COMUNICADOS (admin)  ───────────────────────── */
function ComunicadosAdmin() {
  return (
    <EmptyState
      icon={<Megaphone className="h-6 w-6" />}
      title="Editor de comunicados"
      description="Aquí podrás redactar y publicar comunicados a estudiantes por sede o curso. Módulo de demostración."
    />
  )
}

/* ─────────────────────────  REPORTES  ───────────────────────── */
function Reportes() {
  const revenueByCourse = [
    { label: 'Curso Inicial TCP', value: 18200 },
    { label: 'Recurrente TCP', value: 4940 },
    { label: 'Inducción Docente', value: 1040 },
  ]
  const max = Math.max(...revenueByCourse.map((r) => r.value))
  const byModality = [
    { label: 'Matutino', value: 45 },
    { label: 'Vespertino', value: 35 },
    { label: 'Sabatino', value: 20 },
  ]
  const donutColors = ['#FF6A1A', '#FF9F66', '#4E5A69']
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent-400" />
          <h3 className="font-semibold">Ingresos por curso</h3>
        </div>
        <div className="mt-5 space-y-4">
          {revenueByCourse.map((r) => (
            <div key={r.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel-300">{r.label}</span>
                <span className="font-medium">{formatUsd(r.value)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(r.value / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent-400" />
          <h3 className="font-semibold">Distribución por modalidad</h3>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8">
          <DonutChart segments={byModality} colors={donutColors} />
          <ul className="space-y-3 text-sm">
            {byModality.map((m, i) => (
              <li key={m.label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: donutColors[i] }} />
                <span className="text-steel-300">{m.label}</span>
                <span className="font-medium text-steel-100">{m.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

function DonutChart({
  segments,
  colors = ['#FF6A1A', '#FF9F66', '#4E5A69'],
}: {
  segments: { label: string; value: number }[]
  colors?: string[]
}) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  const r = 52
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
      {segments.map((s, i) => {
        const len = (s.value / total) * c
        const dash = `${len} ${c - len}`
        const el = (
          <motion.circle
            key={s.label}
            cx="70" cy="70" r={r} fill="none"
            stroke={colors[i % colors.length]}
            strokeWidth="16"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          />
        )
        offset += len
        return el
      })}
    </svg>
  )
}
