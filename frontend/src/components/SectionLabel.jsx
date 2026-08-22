export default function SectionLabel({ children, light = false }) {
  return <span className={`section-label ${light ? 'text-gold' : ''}`}>{children}</span>
}
