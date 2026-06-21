import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import MotionPage from '@/components/motion/MotionPage'
import SubpageHero from '@/components/public/SubpageHero'
import PremiumButton, { ButtonAnchor } from '@/components/ui/PremiumButton'
import { FadeUp } from '@/components/motion/Reveal'
import { useToast } from '@/components/ui/Toast'
import { campuses } from '@/data/campuses'
import { ASSETS } from '@/data/assets'
import { whatsappLink } from '@/utils/enrollment'
import { Field, Textarea } from '@/components/ui/Field'

export default function Contact() {
  const { notify } = useToast()
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    // Simulated submission — no backend.
    window.setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', phone: '', message: '' })
      notify('Mensaje enviado. Te contactaremos pronto.', 'success')
    }, 1100)
  }

  return (
    <MotionPage>
      <SubpageHero
        eyebrow="Estamos para ayudarte"
        title="Hablemos de tu"
        accentWord="futuro"
        description="Resolvemos tus dudas sobre programas, horarios e inscripción. Escríbenos por el canal que prefieras."
        image={ASSETS.cultureImage}
        height="min-h-[48vh]"
      />

      <section className="container-px grid grid-cols-1 gap-10 py-20 lg:grid-cols-[1fr_1.1fr]">
        {/* Info */}
        <div className="space-y-6">
          <FadeUp>
            <h2 className="text-2xl font-semibold">Información de contacto</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center gap-3 text-steel-200">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                +58 412 200 0000
              </li>
              <li className="flex items-center gap-3 text-steel-200">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                info@v1aeronautica.com
              </li>
            </ul>
          </FadeUp>

          {campuses.map((c) => (
            <FadeUp key={c.id} delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-5">
                <p className="font-medium text-accent-400">{c.name}</p>
                <p className="mt-2 flex items-start gap-2 text-sm text-steel-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  {c.address}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-steel-300">
                  <Clock className="h-4 w-4 text-accent-500" />
                  {c.hours}
                </p>
              </div>
            </FadeUp>
          ))}

          <FadeUp>
            <ButtonAnchor
              href={whatsappLink('Hola, quiero más información sobre V1 Aeronáutica.')}
              variant="secondary"
              fullWidth
            >
              Escribir por WhatsApp
            </ButtonAnchor>
          </FadeUp>
        </div>

        {/* Form */}
        <FadeUp delay={0.1}>
          <form
            onSubmit={submit}
            className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold">Envíanos un mensaje</h2>
            <p className="mt-1.5 text-sm text-steel-400">
              Completa el formulario y te responderemos a la brevedad.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Nombre completo"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label="Teléfono / WhatsApp"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                required
              />
              <div className="sm:col-span-2">
                <Field
                  label="Correo electrónico"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Mensaje"
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <PremiumButton type="submit" disabled={sending} icon={<Send className="h-4 w-4" />}>
                {sending ? 'Enviando…' : 'Enviar mensaje'}
              </PremiumButton>
            </div>
          </form>
        </FadeUp>
      </section>
    </MotionPage>
  )
}
