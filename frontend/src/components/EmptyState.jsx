export default function EmptyState({ title = 'Nothing here yet', message = 'Please check back soon.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <h3 className="font-serif text-xl text-textMain mb-2">{title}</h3>
      <p className="text-textSecondary text-sm max-w-md">{message}</p>
    </div>
  )
}
