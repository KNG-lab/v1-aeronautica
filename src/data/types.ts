/** Domain types shared across the V1 Aeronáutica frontend. */

export type CampusId = 'la-guaira'

export type CourseId =
  | 'tcp-initial'
  | 'tcp-recurrent'
  | 'instructor-induction'

export type CourseStatus = 'available' | 'coming-soon' | 'to-define'

export type Modality =
  | 'Matutino'
  | 'Vespertino'
  | 'Nocturno'
  | 'Sabatino'
  | 'Mixto'

export interface Campus {
  id: CampusId
  name: string
  tag: string
  address: string
  city: string
  state: string
  hours: string
  image: string
  mapHint: string
  courseIds: CourseId[]
}

export interface Course {
  id: CourseId
  slug: string
  name: string
  shortName: string
  status: CourseStatus
  icon: string
  tagline: string
  shortDescription: string
  description: string
  forWhom: string[]
  learn: string[]
  includes: string[]
  image: string
  faq: { q: string; a: string }[]
}

export interface Schedule {
  id: string
  courseId: CourseId
  campusId: CampusId
  modality: Modality
  days: string
  time: string
  duration: string
  total: number
  preinscription?: number
  inscription?: number
  monthly?: number
  note?: string
}

export type PaymentStatus =
  | 'pending'
  | 'in-validation'
  | 'approved'
  | 'incomplete'

export type EnrollmentStatus =
  | 'new'
  | 'in-validation'
  | 'approved'
  | 'incomplete'

export interface Instructor {
  id: string
  name: string
  role: string
  campusId: CampusId
  subjects: string[]
  image: string
}

export interface Grade {
  subject: string
  score: number | null
  status: 'aprobado' | 'cursando' | 'pendiente'
  note: string
}

export interface PaymentRecord {
  id: string
  concept: string
  date: string
  amount: number
  method: string
  status: PaymentStatus
}

export interface Announcement {
  id: string
  title: string
  body: string
  date: string
  tag: string
}

export interface EnrollmentRow {
  id: string
  name: string
  courseId: CourseId
  campusId: CampusId
  modality: Modality
  status: EnrollmentStatus
  payment: PaymentStatus
  date: string
}
