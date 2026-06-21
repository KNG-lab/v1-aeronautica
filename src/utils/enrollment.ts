import type { Schedule } from '@/data/types'

export interface EnrollmentSelection {
  campusId: string
  courseId: string
  scheduleId: string
}

export const emptySelection: EnrollmentSelection = {
  campusId: '',
  courseId: '',
  scheduleId: '',
}

export interface CostBreakdown {
  preinscription: number
  inscription: number
  monthly: number
  total: number
  hasInstallments: boolean
}

export function costFromSchedule(s?: Schedule): CostBreakdown | null {
  if (!s) return null
  const hasInstallments = s.monthly != null && s.monthly > 0
  return {
    preinscription: s.preinscription ?? 0,
    inscription: s.inscription ?? 0,
    monthly: s.monthly ?? 0,
    total: s.total,
    hasInstallments,
  }
}

export const WHATSAPP_NUMBER = '584122000000'

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
