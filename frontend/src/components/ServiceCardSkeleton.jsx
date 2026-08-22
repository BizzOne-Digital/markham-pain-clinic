export default function ServiceCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-56 bg-beige/60" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-2/3 rounded bg-beige/60" />
        <div className="h-3 w-full rounded bg-beige/50" />
        <div className="h-3 w-4/5 rounded bg-beige/50" />
        <div className="h-3 w-1/3 rounded bg-beige/60 mt-4" />
      </div>
    </div>
  )
}
