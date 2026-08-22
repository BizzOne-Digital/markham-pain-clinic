import { Link } from 'react-router-dom'

export default function Button({ to, href, onClick, variant = 'primary', children, className = '', type = 'button' }) {
  const base = variant === 'primary' ? 'btn-primary' : variant === 'outline-light' ? 'btn-outline-light' : 'btn-secondary'
  const classes = `${base} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
