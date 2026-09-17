import { Link } from 'react-router-dom'
import PageContainer from '../components/PageContainer'

// SPEC.md §9 — graceful fallback for unresolvable route params / unknown paths.
export default function NotFoundPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold">Content not found</h1>
      <Link
        to="/"
        className="mt-4 inline-block rounded-md text-red-400 underline underline-offset-2 hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        Back to courses
      </Link>
    </PageContainer>
  )
}
