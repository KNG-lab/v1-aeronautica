import type { PaymentRecord } from './types'

/** Student-facing payment ledger (mock). */
export const studentPayments: PaymentRecord[] = [
  { id: 'p1', concept: 'Preinscripción', date: '2026-01-12', amount: 30, method: 'Pago móvil', status: 'approved' },
  { id: 'p2', concept: 'Inscripción', date: '2026-01-15', amount: 150, method: 'Transferencia', status: 'approved' },
  { id: 'p3', concept: 'Mensualidad · Febrero', date: '2026-02-05', amount: 165, method: 'Pago móvil', status: 'approved' },
  { id: 'p4', concept: 'Mensualidad · Marzo', date: '2026-03-06', amount: 165, method: 'Transferencia', status: 'in-validation' },
  { id: 'p5', concept: 'Mensualidad · Abril', date: '2026-04-01', amount: 165, method: '—', status: 'pending' },
]

export const studentFinance = {
  total: 840,
  paid: 345,
  get balance() {
    return this.total - this.paid
  },
  installmentsTotal: 4,
  installmentsPaid: 1,
  nextDue: '2026-04-05',
  nextAmount: 165,
}

/** Admin-facing payments awaiting review (mock). */
export const reviewPayments = [
  { id: 'rp1', student: 'María Fernanda Rojas', course: 'Curso Inicial TCP', amount: 165, method: 'Pago móvil', ref: '004821', date: '2026-03-06', status: 'in-validation' as const },
  { id: 'rp2', student: 'Carlos Mendoza', course: 'Curso Recurrente TCP', amount: 500, method: 'Transferencia', ref: '118402', date: '2026-03-05', status: 'in-validation' as const },
  { id: 'rp3', student: 'Andrea Salas', course: 'Curso Inicial TCP', amount: 30, method: 'Pago móvil', ref: '770213', date: '2026-03-05', status: 'in-validation' as const },
  { id: 'rp4', student: 'José Gregorio Pérez', course: 'Curso Recurrente TCP', amount: 500, method: 'Zelle', ref: 'ZL-9921', date: '2026-03-04', status: 'incomplete' as const },
]
