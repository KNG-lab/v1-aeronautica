import type { Instructor } from './types'
import { ASSETS } from './assets'

export const instructors: Instructor[] = [
  { id: 'i1', name: 'Cap. Rafael Lozada', role: 'Director Académico', campusId: 'la-guaira', subjects: ['Cultura aeronáutica', 'Factores humanos'], image: ASSETS.instructorImage },
  { id: 'i2', name: 'Lic. Marianela Díaz', role: 'Instructora TCP', campusId: 'la-guaira', subjects: ['Servicio a bordo', 'Seguridad aérea'], image: ASSETS.cabinTrainingImage },
  { id: 'i3', name: 'TSU. Eduardo Pacheco', role: 'Instructor TCP', campusId: 'la-guaira', subjects: ['Procedimientos de emergencia', 'Factores humanos'], image: ASSETS.instructorTrainingImage },
  { id: 'i4', name: 'Dra. Carolina Mejías', role: 'Primeros auxilios', campusId: 'la-guaira', subjects: ['Primeros auxilios', 'Emergencias'], image: ASSETS.simulatorImage },
]
