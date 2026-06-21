import { useState } from 'react'
import { cn } from '@/utils/formatters'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Show a subtle dark overlay on top of the image. */
  overlay?: boolean
  priority?: boolean
}

/**
 * Image with a premium dark-gradient fallback always rendered underneath.
 * If the network image fails or is empty, the gradient remains — so the UI
 * never shows a broken-image icon.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  overlay = false,
  priority = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-ink-700', className)}>
      {/* Always-present premium gradient base */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#1b2330_0%,#0a0d12_55%,#06080b_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(115deg,transparent_40%,rgba(255,106,26,0.12)_100%)]"
      />

      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent"
        />
      )}
    </div>
  )
}
