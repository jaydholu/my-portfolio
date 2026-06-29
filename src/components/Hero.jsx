import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const GithubIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedinIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const TwitterIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

const words = ['intelligent', 'scalable', 'purposeful']

function TypedWord() {
  const [idx, setIdx]   = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)
  const [wait, setWait] = useState(false)

  useEffect(() => {
    const target = words[idx]
    if (wait) {
      const t = setTimeout(() => setWait(false), 1200)
      return () => clearTimeout(t)
    }
    if (!del && text === target) {
      const t = setTimeout(() => setDel(true), 2000)
      return () => clearTimeout(t)
    }
    if (del && text === '') {
      setDel(false)
      setIdx(i => (i + 1) % words.length)
      setWait(true)
      return
    }
    const speed = del ? 40 : 80
    const t = setTimeout(() => {
      setText(del ? text.slice(0, -1) : target.slice(0, text.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [text, del, idx, wait])

  return (
    <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
      {text}
      <span style={{ animation: 'blink 1s steps(1) infinite', fontStyle: 'normal', fontWeight: 300 }}>|</span>
    </span>
  )
}

/* Animated abstract element */
function AbstractElement() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const isDark = () => document.documentElement.classList.contains('dark')

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const dark  = isDark()
      const color = dark ? '245,245,245' : '30,30,30'

      t += 0.008

      /* Outer slow-rotating ring */
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(t * 0.4)
      ctx.beginPath()
      ctx.arc(0, 0, Math.min(w, h) * 0.38, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${color},${dark ? 0.08 : 0.18})`
      ctx.lineWidth = 1
      ctx.setLineDash([4, 14])
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      /* Inner counter-rotating ring */
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(-t * 0.6)
      ctx.beginPath()
      ctx.arc(0, 0, Math.min(w, h) * 0.26, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${color},${dark ? 0.12 : 0.25})`
      ctx.lineWidth = 1
      ctx.setLineDash([2, 8])
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      /* Floating orbs */
      const orbs = [
        { r: 0.30, ang: t * 1.0,  size: 5,  opacity: 0.5 },
        { r: 0.30, ang: t * 1.0  + Math.PI, size: 5, opacity: 0.5 },
        { r: 0.38, ang: t * 0.4,  size: 3,  opacity: 0.3 },
        { r: 0.38, ang: t * 0.4  + Math.PI * 0.66, size: 3, opacity: 0.3 },
        { r: 0.38, ang: t * 0.4  + Math.PI * 1.33, size: 3, opacity: 0.3 },
        { r: 0.26, ang: -t * 0.6, size: 4,  opacity: 0.4 },
        { r: 0.26, ang: -t * 0.6 + Math.PI, size: 4, opacity: 0.4 },
      ]
      orbs.forEach(o => {
        const cx = w / 2 + Math.cos(o.ang) * Math.min(w, h) * o.r
        const cy = h / 2 + Math.sin(o.ang) * Math.min(w, h) * o.r
        ctx.beginPath()
        ctx.arc(cx, cy, o.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${dark ? o.opacity : Math.min(o.opacity * 2.5, 0.9)})`
        ctx.fill()
      })

      /* Center core with pulse */
      const pulse = 0.85 + Math.sin(t * 2) * 0.15
      const coreR = Math.min(w, h) * 0.10 * pulse
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, coreR)
      grad.addColorStop(0, `rgba(${color},${dark ? 0.18 : 0.35})`)
      grad.addColorStop(1, `rgba(${color},0)`)
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, coreR, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      /* Center dot */
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color},${dark ? 0.6 : 0.85})`
      ctx.fill()

      /* Connecting lines from center to orbs on outer ring */
      orbs.slice(0, 2).forEach(o => {
        const cx = w / 2 + Math.cos(o.ang) * Math.min(w, h) * o.r
        const cy = h / 2 + Math.sin(o.ang) * Math.min(w, h) * o.r
        ctx.beginPath()
        ctx.moveTo(w / 2, h / 2)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = `rgba(${color},${dark ? 0.06 : 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const anim = (delay = 0) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 64,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', minHeight: 'calc(100vh - 64px)' }} className="hero-grid">

          {/* Left — text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 40 }}>

            {/* Eyebrow */}
            <div style={{ ...anim(0.1), display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-primary)', animation: 'pulse-ring 2.5s ease infinite' }} />
              <span className="section-label">Available for opportunities</span>
            </div>

            {/* Headline */}
            <div style={anim(0.2)}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                I build<br />
                <TypedWord /><br />
                systems.
              </h1>
            </div>

            {/* Sub */}
            <div style={anim(0.35)}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: 440,
                margin: 0,
              }}>
                Machine Learning Engineer & Full Stack Developer.
                Designing predictive models and seamless web experiences
                with Python, FastAPI, Flask, and React.
              </p>
            </div>

            {/* CTA row */}
            <div style={{ ...anim(0.45), display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="/#projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  background: 'var(--text-primary)', color: 'var(--bg)',
                  borderRadius: 8, fontSize: 14, fontWeight: 600,
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                  transition: 'opacity 0.2s, transform 0.2s',
                  border: '1px solid var(--text-primary)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                View Projects
              </a>
              <a href="/#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  background: 'transparent', color: 'var(--text-primary)',
                  borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Get in touch
              </a>
            </div>

            {/* Social + scroll */}
            <div style={{ ...anim(0.55), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { href: 'https://github.com/jaydholu',          icon: GithubIcon,   label: 'GitHub' },
                  { href: 'https://linkedin.com/in/jaydholu',     icon: LinkedinIcon, label: 'LinkedIn' },
                  { href: 'https://x.com/jay_dholu',              icon: TwitterIcon,  label: 'Twitter' },
                ].map(({ href, icon: Icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '1px solid var(--border)',
                      background: 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* Scroll hint */}
              <a href="/#about"
                style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-body)' }}
              >
                <ArrowDown size={14} style={{ animation: 'floatC 2s ease infinite' }} />
                Scroll
              </a>
            </div>

            {/* Stats row */}
            <div style={{ ...anim(0.65), display: 'flex', gap: 32, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              {[
                { n: '5+',  l: 'Live Projects' },
                { n: '20+', l: 'Skills' },
                { n: '8+',  l: 'Certificates' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — abstract animation */}
          <div style={{ ...anim(0.3), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="hero-right">
            <div style={{
              width: '100%',
              maxWidth: 480,
              aspectRatio: '1',
              position: 'relative',
            }}>
              {/* Outer glow */}
              <div style={{
                position: 'absolute', inset: '10%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--surface-2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <AbstractElement />

              {/* Floating badges */}
              <div style={{
                position: 'absolute', top: '12%', right: '0%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 14px',
                boxShadow: 'var(--shadow-md)',
                animation: 'float 6s ease infinite',
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Specialty</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Machine Learning</div>
              </div>

              <div style={{
                position: 'absolute', bottom: '14%', left: '-4%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 14px',
                boxShadow: 'var(--shadow-md)',
                animation: 'floatB 7s ease infinite',
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Backend</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>FastAPI · Flask</div>
              </div>

              <div style={{
                position: 'absolute', bottom: '34%', right: '-2%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 14px',
                boxShadow: 'var(--shadow-md)',
                animation: 'floatC 5s ease infinite',
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Frontend</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>React.js</div>
              </div>

              <div style={{
                position: 'absolute', top: '42%', left: '-6%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 14px',
                boxShadow: 'var(--shadow-md)',
                animation: 'float 8s ease infinite',
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Database</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>MySQL · PostgreSQL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 40px; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
