import type { Campus } from './types'
import { ASSETS } from './assets'

export const campuses: Campus[] = [
  {
    id: 'la-guaira',
    name: 'La Guaira',
    tag: 'Sede Principal',
    address: 'C.C. Atlantic Center, Piso 2, Local 01. Av. Principal de La Atlántida, Catia La Mar.',
    city: 'Catia La Mar',
    state: 'Estado La Guaira',
    hours: 'Lunes a sábado · 08:00 am – 06:00 pm',
    image: ASSETS.campusMainImage,
    mapHint: 'Frente al litoral central, a minutos del Aeropuerto Internacional de Maiquetía.',
    courseIds: ['tcp-initial', 'tcp-recurrent', 'instructor-induction'],
  },
]

export const campusById = (id: string) => campuses.find((c) => c.id === id)
