import { useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from '@/components/dashboard/CountUp'
import { impactStats } from '@/data/marketing'
import { fadeUp, staggerContainer } from '@/utils/motion'

export default function ImpactStats() {
  const [inView, setInView] = useState(false)

  return (
    <section className="container-px py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => setInView(true)}
        className="grid grid-cols-2 gap-y-12 rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent px-6 py-12 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.07]"
      >
        {impactStats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="px-2 text-center lg:px-8">
            <p className="font-display text-5xl font-bold tracking-tight text-steel-50 sm:text-6xl">
              <span className="text-accent-500">
                {inView ? (
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                ) : (
                  `${s.prefix ?? ''}0${s.suffix ?? ''}`
                )}
              </span>
            </p>
            <p className="mx-auto mt-3 max-w-[16ch] text-sm leading-relaxed text-steel-400">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
