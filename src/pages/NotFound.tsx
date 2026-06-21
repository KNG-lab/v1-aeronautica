import MotionPage from '@/components/motion/MotionPage'
import { ButtonLink } from '@/components/ui/PremiumButton'

export default function NotFound() {
  return (
    <MotionPage>
      <section className="container-px flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-display text-7xl font-bold text-accent-emphasis">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Esta ruta no está en nuestro plan de vuelo</h1>
        <p className="mt-3 max-w-md text-steel-400">
          La página que buscas no existe o fue movida. Regresa al inicio para continuar.
        </p>
        <div className="mt-8">
          <ButtonLink to="/" showArrow>
            Volver al inicio
          </ButtonLink>
        </div>
      </section>
    </MotionPage>
  )
}
