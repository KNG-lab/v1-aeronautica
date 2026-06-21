import type { EnrollmentRow } from './types'

export const demoStudent = {
  id: 'V1-2026-0142',
  name: 'Valentina Herrera',
  email: 'valentina.herrera@email.com',
  phone: '+58 412 555 0142',
  course: 'Curso Inicial Tripulante de Cabina',
  campus: 'La Guaira',
  modality: 'Matutino',
  schedule: '8:30 am – 12:00 pm · Lunes a viernes',
  academicStatus: 'Activo',
  progress: 62,
  nextClass: {
    subject: 'Procedimientos de emergencia',
    date: '2026-06-05',
    time: '8:30 am',
    room: 'Aula 02 · Mock-up de cabina',
  },
}

/** Enrollment pipeline for the admin demo. */
export const enrollments: EnrollmentRow[] = [
  { id: 'E-2041', name: 'María Fernanda Rojas', courseId: 'tcp-initial', campusId: 'la-guaira', modality: 'Matutino', status: 'in-validation', payment: 'in-validation', date: '2026-03-06' },
  { id: 'E-2040', name: 'Carlos Mendoza', courseId: 'tcp-recurrent', campusId: 'la-guaira', modality: 'Mixto', status: 'new', payment: 'pending', date: '2026-03-06' },
  { id: 'E-2039', name: 'Andrea Salas', courseId: 'tcp-initial', campusId: 'la-guaira', modality: 'Vespertino', status: 'approved', payment: 'approved', date: '2026-03-05' },
  { id: 'E-2038', name: 'José Gregorio Pérez', courseId: 'tcp-recurrent', campusId: 'la-guaira', modality: 'Mixto', status: 'incomplete', payment: 'incomplete', date: '2026-03-04' },
  { id: 'E-2037', name: 'Daniela Quintero', courseId: 'tcp-initial', campusId: 'la-guaira', modality: 'Sabatino', status: 'approved', payment: 'approved', date: '2026-03-03' },
  { id: 'E-2036', name: 'Luis Castillo', courseId: 'tcp-initial', campusId: 'la-guaira', modality: 'Vespertino', status: 'in-validation', payment: 'in-validation', date: '2026-03-02' },
  { id: 'E-2035', name: 'Gabriela Ortega', courseId: 'tcp-initial', campusId: 'la-guaira', modality: 'Matutino', status: 'new', payment: 'pending', date: '2026-03-01' },
]

export const adminKpis = {
  newRequests: 12,
  paymentsInValidation: 8,
  activeStudents: 162,
  activeCourses: 3,
  activeCampuses: 1,
  monthlyRevenue: 24180,
}
