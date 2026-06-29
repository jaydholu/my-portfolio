import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const GithubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>

function ProjectRow({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [imgErr,  setImgErr]  = useState(false)
  const isEven = index % 2 === 0 // even = image left, odd = image right

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
        padding: '48px 0',
        borderBottom: '1px solid var(--border)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
      className="project-row"
    >
      {/* Image */}
      <div
        style={{ order: isEven ? 0 : 1 }}
        className="project-row-img"
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            aspectRatio: '16/10',
            background: 'var(--surface-2)',
            boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {!imgErr ? (
            <img
              src={project.image}
              alt={project.name}
              onError={() => setImgErr(true)}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                display: 'block',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
              No preview
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          order: isEven ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingLeft:  isEven ? 0 : 0,
          paddingRight: isEven ? 0 : 0,
        }}
        className="project-row-content"
      >
        {/* Index label */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Project {String(index + 1).padStart(2, '0')}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {project.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          margin: 0,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <a
            href={project.githubrepo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 20px', borderRadius: 8,
              background: 'var(--text-primary)', color: 'var(--bg)',
              fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <GithubIcon size={14} /> GitHub
          </a>
          {project.demolink && (
            <a
              href={project.demolink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 8,
                background: 'transparent', color: 'var(--text-primary)',
                fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
                textDecoration: 'none', border: '1px solid var(--border)',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [ref, inView] = useInView()

  useEffect(() => {
    fetch('/data/projects.json').then(r => r.json()).then(setProjects).catch(() => {})
  }, [])

  const preview = projects.slice(0, 3)

  return (
    <section id="projects" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 16, flexWrap: 'wrap', gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, width: '100%' }}>
              <span className="section-label" style={{ flexShrink: 0 }}>Projects</span>
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
              Selected work
            </h2>
          </div>
          <Link to="/projects"
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
            All projects <ArrowRight size={13} />
          </Link>
        </div>

        {/* Zigzag rows */}
        <div>
          {preview.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .project-row-img { order: 0 !important; }
          .project-row-content { order: 1 !important; }
        }
      `}</style>
    </section>
  )
}
