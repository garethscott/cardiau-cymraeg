import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseById, getCourseSection, getUnit } from '../utils/courseData'
import type { CourseSection, CourseStage, Unit } from '../types/course'
import PageContainer from '../components/PageContainer'
import BackButton from '../components/BackButton'
import Flashcard from '../components/Flashcard'
import FlashcardNavigation from '../components/FlashcardNavigation'
import NotFoundPage from './NotFoundPage'

// SPEC.md §6.4 / §7 — resolves the route, then hands off to a keyed child that
// owns the actual card-by-card state.
export default function FlashcardPage() {
  const { courseId, contentType, unitId } = useParams()
  const course = courseId ? getCourseById(courses, courseId) : undefined
  const section = course && contentType ? getCourseSection(course, contentType) : undefined
  const unit = section && unitId ? getUnit(section, unitId) : undefined

  if (!course || !section || !unit || unit.slides.length === 0) {
    return <NotFoundPage />
  }

  return (
    // Keyed on the resolved unit's identity: if the URL is edited straight from
    // one unit to another, this remounts with fresh state instead of reusing
    // currentCardIndex against a unit it was never valid for.
    <FlashcardUnit
      key={`${course.id}-${section.type}-${unit.id}`}
      course={course}
      section={section}
      unit={unit}
    />
  )
}

interface FlashcardUnitProps {
  course: CourseStage
  section: CourseSection
  unit: Unit
}

function FlashcardUnit({ course, section, unit }: FlashcardUnitProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const currentCard = unit.slides[currentCardIndex]

  return (
    <PageContainer>
      <BackButton
        to={`/course/${course.id}/${section.type}`}
        label={`Back to ${section.title}`}
      />
      <h1 className="mt-2 text-2xl font-semibold">{unit.unitTitle}</h1>
      <div className="mt-6">
        <Flashcard
          card={currentCard}
          isRevealed={isRevealed}
          onToggleReveal={() => setIsRevealed((revealed) => !revealed)}
        />
      </div>
      <FlashcardNavigation
        currentIndex={currentCardIndex}
        total={unit.slides.length}
        onPrevious={() => {
          setCurrentCardIndex((index) => index - 1)
          setIsRevealed(false)
        }}
        onNext={() => {
          setCurrentCardIndex((index) => index + 1)
          setIsRevealed(false)
        }}
      />
    </PageContainer>
  )
}
