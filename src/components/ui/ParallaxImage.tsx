import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SmartImage from './SmartImage'
import { cn } from '@/utils/formatters'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  overlay?: boolean
  /** Vertical travel in px across the scroll range. */
  range?: number
  rounded?: boolean
}

/** Image that drifts vertically as it scrolls through the viewport. */
export default function ParallaxImage({
  src,
  alt,
  className,
  overlay,
  range = 60,
  rounded = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', rounded && 'rounded-2xl', className)}
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%]">
        <SmartImage src={src} alt={alt} className="h-full w-full" overlay={overlay} />
      </motion.div>
    </div>
  )
}
