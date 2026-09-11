import { courses } from '../data/courses'
import { getCourseById, getCourseSection, getUnit } from './courseData'

describe('getCourseById', () => {
  test('finds Mynediad by id', () => {
    const course = getCourseById(courses, 'mynediad')
    expect(course?.courseTitle).toBe('Mynediad')
  })

  test('finds Sylfaen by id', () => {
    const course = getCourseById(courses, 'sylfaen')
    expect(course?.courseTitle).toBe('Sylfaen')
  })

  test('returns undefined for an unknown course id', () => {
    expect(getCourseById(courses, 'not-a-course')).toBeUndefined()
  })
})

describe('getCourseSection', () => {
  const mynediad = getCourseById(courses, 'mynediad')!

  test('finds the Geiriau (words) section within a course', () => {
    const section = getCourseSection(mynediad, 'words')
    expect(section?.type).toBe('words')
    expect(section?.title).toBe('Geiriau')
  })

  test('finds the Unedau section within a course', () => {
    const section = getCourseSection(mynediad, 'units')
    expect(section?.type).toBe('units')
    expect(section?.title).toBe('Unedau')
  })

  test('returns undefined for an unknown section', () => {
    expect(getCourseSection(mynediad, 'not-a-section')).toBeUndefined()
  })
})

describe('getUnit', () => {
  const words = getCourseSection(getCourseById(courses, 'mynediad')!, 'words')!

  test('finds a unit within a section', () => {
    const unit = getUnit(words, 'uned-1')
    expect(unit?.id).toBe('uned-1')
    expect(unit?.slides.length).toBeGreaterThan(0)
  })

  test('returns undefined for an unknown unit', () => {
    expect(getUnit(words, 'not-a-unit')).toBeUndefined()
  })
})
