import type { Announcement } from './types'

export const announcements: Announcement[] = [
  { id: 'a1', title: 'Simulacro de evacuación', body: 'El viernes realizaremos práctica de evacuación en el mock-up de cabina. Asistencia obligatoria con uniforme.', date: '2026-06-06', tag: 'Académico' },
  { id: 'a2', title: 'Nuevo módulo de Factores Humanos', body: 'Se habilita el material del módulo de Factores Humanos en tu portal de documentos.', date: '2026-06-02', tag: 'Material' },
  { id: 'a3', title: 'Recordatorio de pago', body: 'La mensualidad de abril vence el 5. Puedes cargar tu comprobante desde la sección Pagos.', date: '2026-05-30', tag: 'Administrativo' },
  { id: 'a4', title: 'Charla: Carrera en aerolíneas', body: 'Invitado especial de operaciones de cabina compartirá su experiencia. Cupos limitados.', date: '2026-05-28', tag: 'Evento' },
]

export const paymentMethods = {
  online: ['Transferencia bancaria', 'Pago móvil', 'Bolívares a tasa BCV vigente'],
  presencial: ['Transferencia bancaria', 'Pago móvil', 'Punto de venta', 'Zelle', 'Efectivo'],
}

// 🔁 Replace with the institution's real banking data before launch.
export const paymentInstructions = {
  transfer: [
    { label: 'Banco', value: 'Banco de Venezuela' },
    { label: 'Titular', value: 'V1 Aeronáutica, C.A.' },
    { label: 'RIF', value: 'J-50012345-6' },
    { label: 'Cuenta corriente', value: '0102 0000 00 0000000000' },
  ],
  mobile: [
    { label: 'Banco', value: 'Banco de Venezuela (0102)' },
    { label: 'RIF', value: 'J-50012345-6' },
    { label: 'Teléfono', value: '0412 200 0000' },
  ],
}

export const benefits = [
  { icon: 'Award', title: 'Formación de excelencia', desc: 'Estándares aeronáuticos de alto nivel en cada programa.' },
  { icon: 'UserCheck', title: 'Instructores expertos', desc: 'Profesionales activos de la industria aérea.' },
  { icon: 'Dumbbell', title: 'Entrenamiento práctico', desc: 'Prácticas en cabina y entornos operativos reales.' },
  { icon: 'MapPin', title: 'Sede estratégica', desc: 'En La Guaira, a minutos del aeropuerto internacional de Maiquetía.' },
  { icon: 'Cpu', title: 'Simuladores y tecnología', desc: 'Recursos de primer nivel para tu formación.' },
  { icon: 'HeartHandshake', title: 'Enfoque humano', desc: 'Acompañamiento académico y personal en todo el proceso.' },
]

export const enrollmentSteps = [
  { n: '01', title: 'Elige tu sede', desc: 'Formación presencial en nuestra sede de La Guaira.' },
  { n: '02', title: 'Selecciona tu curso', desc: 'Programas de tripulación de cabina y docencia.' },
  { n: '03', title: 'Selecciona tu horario', desc: 'Matutino, vespertino, nocturno o sabatino.' },
  { n: '04', title: 'Completa tus datos', desc: 'Información personal y de contacto.' },
  { n: '05', title: 'Adjunta tu comprobante', desc: 'Carga el pago de preinscripción.' },
  { n: '06', title: 'Espera validación', desc: 'Nuestro equipo confirma tu cupo.' },
]
