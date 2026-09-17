import { useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseById, getCourseSection } from '../utils/courseData'
import PageContainer from '../components/PageContainer'
import BackButton from '../components/BackButton'
import SelectionCard from '../components/SelectionCard'
import NotFoundPage from './NotFoundPage'

// SPEC.md §6.3 — unit choice within a course section, mapped from section.units.
export default function UnitListPage() {
  const { courseId, contentType } = useParams()
  const course = courseId ? getCourseById(courses, courseId) : undefined
  const section = course && contentType ? getCourseSection(course, contentType) : undefined

  if (!course || !section) {
    return <NotFoundPage />
  }

  return (
    <PageContainer>
      <BackButton to={`/course/${course.id}`} label={`Back to ${course.courseTitle}`} />
      <h1 className="mt-2 text-2xl font-semibold">{section.title}</h1>
      <ul className="mt-6 flex flex-col gap-3">
        {section.units.map((unit) => (
          <li key={unit.id}>
            <SelectionCard
              to={`/course/${course.id}/${section.type}/${unit.id}`}
              label={unit.unitTitle}
            />
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
