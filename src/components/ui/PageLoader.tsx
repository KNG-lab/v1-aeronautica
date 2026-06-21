/** Lightweight branded fallback shown while a lazy route chunk loads. */
export default function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Cargando">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-12 w-12 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-500/20" />
          <span className="font-display text-xl font-bold tracking-tightest">
            V<span className="text-accent-500">1</span>
          </span>
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-steel-500">Cargando</span>
      </div>
    </div>
  )
}
