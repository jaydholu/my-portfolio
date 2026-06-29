import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, Calendar, ExternalLink, Star, ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

function CertCard({ cert, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, box-shadow 0.25s, border-color 0.25s`,
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderColor: hovered ? 'var(--border-strong)' : 'var(--border)',
      }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', height: 160, background: 'var(--surface-2)', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
        <img
          src={cert.image}
          alt={cert.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Award size={12} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {cert.issuer}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)' }}>{cert.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.3,
          flex: 1,
        }}>
          {cert.name}
        </h3>

        {/* Score */}
        {cert.score && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Star size={12} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
              Score: {cert.score}
            </span>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {cert.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Link */}
        {cert.verifylink && (
          <a href={cert.verifylink} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '8px 14px', borderRadius: 7,
              background: 'var(--text-primary)', color: 'var(--bg)',
              fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)',
              textDecoration: 'none', border: '1px solid var(--text-primary)',
              transition: 'opacity 0.2s', alignSelf: 'flex-start', marginTop: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <ExternalLink size={11} /> View Certificate
          </a>
        )}
      </div>
    </div>
  )
}

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [ref, inView] = useInView()

  useEffect(() => {
    fetch('/data/certificates.json').then(r => r.json()).then(setCerts).catch(() => {})
  }, [])

  const preview = certs.slice(0, 3)

  return (
    <section id="certificates" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 56, flexWrap: 'wrap', gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, width: '100%' }}>
              <span className="section-label">Certificates</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              margin: 0,
            }}>
              Credentials & learning
            </h2>
          </div>
          <Link to="/certificates"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)', textDecoration: 'none',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '9px 16px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            All {certs.length} certificates <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="certs-grid">
          {preview.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .certs-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .certs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
