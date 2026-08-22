export default function ErrorState({ message = 'Something went wrong. Showing sample content instead.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center px-6">
      <p className="text-textSecondary text-xs bg-beige/60 inline-block px-4 py-2 rounded-full">{message}</p>
    </div>
  )
}
