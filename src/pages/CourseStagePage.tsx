import { courses } from '../data/courses'
import PageContainer from '../components/PageContainer'
import SelectionCard from '../components/SelectionCard'

// Root view (SPEC.md §6.1) — no Back button, entirely mapped from `courses`.
export default function CourseStagePage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold">Choose a course</h1>
      <ul className="mt-6 flex flex-col gap-3">
        {courses.map((course) => (
          <li key={course.id}>
            <SelectionCard to={`/course/${course.id}`} label={course.courseTitle} />
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
