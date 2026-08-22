export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-textSecondary">
      <div className="w-10 h-10 rounded-full border-2 border-beige border-t-gold animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
