import { useState, useEffect } from 'react'
import { Award, Calendar, ExternalLink, Star, Search } from 'lucide-react'
import Footer from '../components/Footer'

export default function AllCertificates() {
  const [certs,   setCerts]   = useState([])
  const [query,   setQuery]   = useState('')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    fetch('/data/certificates.json').then(r => r.json()).then(setCerts).catch(() => {})
  }, [])

  const filtered = certs.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.issuer.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <>
      <main style={{ minHeight: '100vh', paddingTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

          <div style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ display: 'block', marginBottom: 12, fontSize: 18, border: 'none' }}>All Certificates</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)', margin: '0 0 16px' }}>
              Credentials & learning
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>
              {certs.length} certificates from NPTEL, Udemy, and more.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 400, marginBottom: 40 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search certificates..."
              style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--text-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="certs-page-grid">
            {filtered.map((cert, i) => (
              <div key={cert.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 12, border: '1px solid', overflow: 'hidden',
                  borderColor: hovered === i ? 'var(--border-strong)' : 'var(--border)',
                  background: 'var(--surface)', display: 'flex', flexDirection: 'column',
                  boxShadow: hovered === i ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transform: hovered === i ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.25s ease',
                  animation: `fadeUp 0.45s ease ${i * 0.04}s both`,
                }}
              >
                {/* Image */}
                <div style={{ overflow: 'hidden', height: 160, background: 'var(--surface-2)', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
                  <img src={cert.image} alt={cert.name}
                    onError={e => e.target.style.display = 'none'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transform: hovered === i ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Award size={12} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cert.issuer}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)' }}>{cert.date}</span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, flex: 1 }}>
                    {cert.name}
                  </h3>

                  {cert.score && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Star size={12} style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>Score: {cert.score}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {cert.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                  </div>

                  {cert.verifylink && (
                    <a href={cert.verifylink} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '8px 14px', borderRadius: 7, background: 'var(--text-primary)', color: 'var(--bg)', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'opacity 0.2s', alignSelf: 'flex-start', marginTop: 4 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <ExternalLink size={11} /> View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
              No certificates found for "{query}"
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) { .certs-page-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .certs-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
