import { useEffect, useState } from 'react'

interface CountUpProps {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

/** Animated number that counts up once on mount. */
export default function CountUp({ to, duration = 1.1, prefix = '', suffix = '', decimals = 0 }: CountUpProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(to * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
