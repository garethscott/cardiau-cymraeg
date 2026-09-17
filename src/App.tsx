import { Route, Routes } from 'react-router-dom'
import CourseStagePage from './pages/CourseStagePage'
import CourseContentPage from './pages/CourseContentPage'
import UnitListPage from './pages/UnitListPage'
import FlashcardPage from './pages/FlashcardPage'
import NotFoundPage from './pages/NotFoundPage'

// Route table (SPEC.md §3). Any unknown path falls through to the catch-all.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CourseStagePage />} />
      <Route path="/course/:courseId" element={<CourseContentPage />} />
      <Route path="/course/:courseId/:contentType" element={<UnitListPage />} />
      <Route path="/course/:courseId/:contentType/:unitId" element={<FlashcardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
