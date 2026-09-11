import type { CourseSection, CourseStage, Unit } from '../types/course'

// Pure, React-free lookups over the course dataset (SPEC.md §11). Each returns
// `undefined` when the requested data cannot be found rather than throwing.
//
// These helpers take fully-resolved arguments and know nothing about routing:
// pages are responsible for handling missing route params before calling in.

/** Find a course stage by its `id`. */
export function getCourseById(
  courses: CourseStage[],
  courseId: string,
): CourseStage | undefined {
  return courses.find((course) => course.id === courseId)
}

/** Find a section within a course by its `type` (e.g. `words` or `units`). */
export function getCourseSection(
  course: CourseStage,
  contentType: string,
): CourseSection | undefined {
  return course.courseContent.find((section) => section.type === contentType)
}

/** Find a unit within a section by its `id`. */
export function getUnit(
  section: CourseSection,
  unitId: string,
): Unit | undefined {
  return section.units.find((unit) => unit.id === unitId)
}
