import { Link } from 'react-router-dom'

interface SelectionCardProps {
  to: string
  label: string
}

/** A large, tappable navigation choice (course / section / unit). */
export default function SelectionCard({ to, label }: SelectionCardProps) {
  return (
    <Link
      to={to}
      className="block rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 text-lg font-medium text-slate-100 transition-colors hover:border-slate-600 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-slate-700"
    >
      {label}
    </Link>
  )
}
