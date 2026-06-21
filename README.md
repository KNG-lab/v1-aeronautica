# V1 Aeronáutica — Plataforma web (MVP frontend)

Prototipo navegable premium para una escuela de aviación venezolana. **Solo frontend**: sin backend, sin base de datos, sin pagos reales. Todo funciona con datos mock, estado local y rutas frontend.

## Stack

- **React 18 + Vite + TypeScript**
- **Tailwind CSS** (tema oscuro cinematográfico, acento naranja aeronáutico)
- **Framer Motion** (sistema de animación estructural)
- **React Router v6**
- **Lucide React** (iconografía)

## Cómo correr

```bash
npm install
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción (dist/)
npm run preview  # sirve el build
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal (hero, selector rápido, programas, experiencia, sedes, proceso, portal preview, pagos, CTA) |
| `/nosotros` | Institución, valores, estadísticas, instructores |
| `/programas` | Listado de programas + expansión futura |
| `/programas/:slug` | Detalle de curso (horarios, costos, FAQ, CTA sticky) |
| `/sedes` | Sedes La Guaira y Valera + cursos por sede |
| `/inscripcion` | Checkout multi-step (7 pasos, pago simulado) |
| `/contacto` | Formulario de contacto simulado |
| `/recursos` | Blog / recursos demo |
| `/portal` | Portal del estudiante demo (botón "Entrar como estudiante demo") |
| `/admin` | Panel administrativo demo (botón "Entrar como administrador demo") |

## Dónde reemplazar contenido real

- **Imágenes y logo** → `src/data/assets.ts`. Cada constante apunta a un placeholder premium de aviación; reemplaza la URL por el asset final. El componente `SmartImage` siempre dibuja un degradado oscuro debajo, así que nunca se ve roto.
- **Número de WhatsApp** → `WHATSAPP_NUMBER` en `src/utils/enrollment.ts`.
- **Cursos, horarios y costos** → `src/data/courses.ts`, `src/data/schedules.ts`, `src/data/campuses.ts`.
- **Datos de portales demo** → `src/data/students.ts`, `grades.ts`, `payments.ts`, `instructors.ts`, `announcements.ts`.
- **Datos de contacto / redes** → `src/components/public/Footer.tsx`.

## Preparado para backend

La arquitectura separa datos (`src/data`), lógica (`src/utils`) y UI (`src/components`, `src/pages`). Para conectar un backend real, reemplaza los imports de `src/data/*` por llamadas a API y los handlers simulados de formularios/pagos por requests reales.
