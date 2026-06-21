/**
 * Centralized asset map. These are premium aviation placeholders.
 * 🔁 REPLACE each URL with the final brand/photo asset when available.
 * The <ParallaxImage> / <SmartImage> components always render a dark
 * gradient underneath, so a missing image still looks intentional.
 */

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const ASSETS = {
  // Hero — LOCAL cinematic asset (the tripulante + turbina photo the client provided).
  // 🔁 GUARDA la imagen adjunta en:  public/images/v1-hero-cinematic.webp
  // Mientras no exista, el hero muestra un fallback oscuro premium (no se rompe).
  heroCinematic: '/images/v1-hero-cinematic.png',
  heroImage: U('1436491865332-7a61a109cc05'), // wing over clouds at dusk (other sections)
  heroVideo: '', // 🔁 drop an mp4 URL here to enable the video layer

  // Experience / training
  cabinTrainingImage: U('1540339832862-474599807836'), // crew at terminal
  simulatorImage: U('1517999349371-c43520457b23'), // cockpit instruments
  cultureImage: U('1556388158-158ea5ccacbd'), // terminal architecture
  instructorTrainingImage: U('1521727857535-28d2047619b6'), // briefing
  practiceImage: U('1474302770737-173ee21bab63'), // turbine engine

  // Campuses
  campusMainImage: U('1542296332-2e4473faf563'), // building dusk
  campusSecondaryImage: U('1559686043-aef1bbc98d09'), // regional airport tower

  // Courses
  courseTcpImage: U('1583395838144-09c4e1f5b5e9'),
  recurrentTcpImage: U('1540339832862-474599807836'),
  instructorImage: U('1524178232363-1fb2b075b655'), // classroom

  // CTA
  runwayCtaImage: U('1556388158-158ea5ccacbd'),

  // Portal
  studentPortalPreview: U('1517245386807-bb43f82c33c4'),
} as const

export type AssetKey = keyof typeof ASSETS
