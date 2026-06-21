import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ToastProvider } from '@/components/ui/Toast'
import PublicLayout from '@/layouts/PublicLayout'
import PageLoader from '@/components/ui/PageLoader'
import Home from '@/pages/Home'

// Landing stays eager for instant first paint; the rest is code-split.
const About = lazy(() => import('@/pages/About'))
const Programs = lazy(() => import('@/pages/Programs'))
const CourseDetail = lazy(() => import('@/pages/CourseDetail'))
const Campuses = lazy(() => import('@/pages/Campuses'))
const Enrollment = lazy(() => import('@/pages/Enrollment'))
const StudentPortalDemo = lazy(() => import('@/pages/StudentPortalDemo'))
const AdminPanelDemo = lazy(() => import('@/pages/AdminPanelDemo'))
const Contact = lazy(() => import('@/pages/Contact'))
const BlogDemo = lazy(() => import('@/pages/BlogDemo'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public website (shared chrome + page transitions in the layout) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/programas" element={<Programs />} />
              <Route path="/programas/:slug" element={<CourseDetail />} />
              <Route path="/sedes" element={<Campuses />} />
              <Route path="/inscripcion" element={<Enrollment />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/recursos" element={<BlogDemo />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Demo portals (own shells, no public chrome) */}
            <Route path="/portal" element={<StudentPortalDemo />} />
            <Route path="/admin" element={<AdminPanelDemo />} />
          </Routes>
        </Suspense>
      </ToastProvider>
    </MotionConfig>
  )
}
