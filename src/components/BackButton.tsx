import { Link } from 'react-router-dom'

interface BackButtonProps {
  /** Explicit parent route — never `navigate(-1)` (SPEC.md §8). */
  to: string
  label?: string
}

export default function BackButton({ to, label = 'Back' }: BackButtonProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-slate-300 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:text-slate-400"
    >
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  )
}
