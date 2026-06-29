import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllSkills from './pages/AllSkills'
import AllProjects from './pages/AllProjects'
import AllCertificates from './pages/AllCertificates'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + 'px'; dot.current.style.top  = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    const enter = () => {
      if (ring.current) { ring.current.style.width = '48px'; ring.current.style.height = '48px'; ring.current.style.opacity = '0.2' }
    }
    const leave = () => {
      if (ring.current) { ring.current.style.width = '32px'; ring.current.style.height = '32px'; ring.current.style.opacity = '0.4' }
    }
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[role=button]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

function AppContent() {
  const { theme, toggle, isDark } = useTheme()

  return (
    <>
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />
      <CustomCursor />
      <Navbar isDark={isDark} toggle={toggle} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<AllSkills />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/certificates" element={<AllCertificates />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
