import { useInView } from '../hooks/useInView'

const traits = [
  { label: 'Based in',   value: 'Gujarat, India' },
  { label: 'Focus',      value: 'AI/ML & Backend' },
  { label: 'Education',  value: 'Gujarat Technological University' },
  { label: 'Status',     value: 'Open to opportunities' },
]

export default function About() {
  const [ref, inView] = useInView()

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <section id="about" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Label */}
        <div style={{ ...anim(0), marginBottom: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="section-label">About</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="about-grid">

          {/* Left — editorial photo */}
          <div style={anim(0.1)}>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3 / 4',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <img
                src="/images/me/jaydholu-ai-main.png"
                alt="Jay Dholu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Overlay caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 20px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Jay Dholu</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>ML Engineer & Developer</div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

            <div style={anim(0.2)}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                Driven by curiosity,<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>shaped by code.</em>
              </h2>
            </div>

            <div style={anim(0.3)}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
                I'm a developer who believes the best technology is the kind you don't notice —
                it just works, feels right, and solves a real problem. My background spans
                machine learning and full-stack development, letting me build systems from
                model training all the way to deployment.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
                I care deeply about clean code, thoughtful architecture, and user experiences
                that leave a lasting impression. Whether it's a predictive ML pipeline or a
                responsive web interface, my aim is always the same: precision with purpose.
              </p>
            </div>

            {/* Traits grid */}
            <div style={{ ...anim(0.4), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              {traits.map(({ label, value }, i) => (
                <div key={label} style={{
                  padding: '18px 20px',
                  background: 'var(--surface)',
                  borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ ...anim(0.5), display: 'flex', gap: 12 }}>
              <a href="mailto:jaydholu074@gmail.com"
                style={{
                  padding: '11px 22px', borderRadius: 8,
                  background: 'var(--text-primary)', color: 'var(--bg)',
                  fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
                  textDecoration: 'none', border: '1px solid var(--text-primary)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Email me
              </a>
              <a href="https://linkedin.com/in/jaydholu" target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '11px 22px', borderRadius: 8,
                  background: 'transparent', color: 'var(--text-primary)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
                  textDecoration: 'none', border: '1px solid var(--border)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
