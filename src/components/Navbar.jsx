import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'

const links = [
  { label: 'About',         href: '/#about',         type: 'scroll' },
  { label: 'Skills',        href: '/skills',         type: 'page' },
  { label: 'Projects',      href: '/projects',       type: 'page' },
  { label: 'Certificates',  href: '/certificates',   type: 'page' },
  { label: 'Contact',       href: '/#contact',       type: 'scroll' },
]

export default function Navbar({ isDark, toggle }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeHash,  setActiveHash]  = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close menu on route change */
  useEffect(() => { setMenuOpen(false) }, [location])

  /* track active section */
  useEffect(() => {
    const sections = ['about','skills','projects','certificates','contact']
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveHash('#' + e.target.id) })
    }, { threshold: 0.35 })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  const handleNavClick = (e, l) => {
    if (l.type === 'page') {
      // Let React Router handle it via the Link component
      setMenuOpen(false)
      return
    }
    // scroll type
    e.preventDefault()
    const id = l.href.replace('/#', '')
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll after a short delay
      window.location.href = l.href
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const isActive = (l) => {
    if (l.type === 'page') return location.pathname === l.href
    const hash = l.href.replace('/', '')
    return activeHash === hash
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled
            ? isDark ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? `1px solid var(--border)` : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Brand */}
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.01em' }}>
            Jay Dholu
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => handleNavClick(e, l)}
                className="underline-anim"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: isActive(l) ? 600 : 400,
                  color: isActive(l) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '0.01em',
                }}
              >
                {l.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--surface-2)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div style={{ display: 'none', alignItems: 'center', gap: 12 }} className="nav-mobile">
            <button onClick={toggle} aria-label="Toggle theme"
              style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
              style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
        background: 'var(--bg)', zIndex: 99,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.77, 0, 0.175, 1)',
      }}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            onClick={e => handleNavClick(e, l)}
            style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '-0.03em' }}>
            {l.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
