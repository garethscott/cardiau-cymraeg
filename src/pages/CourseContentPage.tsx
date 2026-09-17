import { useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseById } from '../utils/courseData'
import PageContainer from '../components/PageContainer'
import BackButton from '../components/BackButton'
import SelectionCard from '../components/SelectionCard'
import NotFoundPage from './NotFoundPage'

// SPEC.md §6.2 — course section choice, entirely mapped from courseContent.
export default function CourseContentPage() {
  const { courseId } = useParams()
  const course = courseId ? getCourseById(courses, courseId) : undefined

  if (!course) {
    return <NotFoundPage />
  }

  return (
    <PageContainer>
      <BackButton to="/" label="Back to courses" />
      <h1 className="mt-2 text-2xl font-semibold">{course.courseTitle}</h1>
      <ul className="mt-6 flex flex-col gap-3">
        {course.courseContent.map((section) => (
          <li key={section.id}>
            {/* Navigate by the internal `type`, never the display `title`. */}
            <SelectionCard
              to={`/course/${course.id}/${section.type}`}
              label={section.title}
            />
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
