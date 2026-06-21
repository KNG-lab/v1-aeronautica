import { Globe, Building2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/motion/Reveal'
import { paymentMethods } from '@/data/announcements'

export default function PaymentMethodsSection() {
  const rows = [
    { title: 'Pago en línea', icon: Globe, methods: paymentMethods.online, accent: true },
    { title: 'Pago presencial', icon: Building2, methods: paymentMethods.presencial, accent: false },
  ]
  return (
    <section className="container-px py-16">
      <SectionHeader
        title="Métodos de"
        accentWord="pago"
        description="Múltiples opciones para que asegures tu cupo de la forma más cómoda."
      />

      <FadeUp className="mt-10">
        <div className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40">
          {rows.map((row) => (
            <div
              key={row.title}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
            >
              <div className="flex w-44 shrink-0 items-center gap-2.5">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                    row.accent ? 'bg-accent-500/15 text-accent-300' : 'bg-white/[0.04] text-steel-300'
                  }`}
                >
                  <row.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-semibold">{row.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {row.methods.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-steel-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}
