import { useState, useEffect } from 'react'
import { Search, Github, ExternalLink } from 'lucide-react'
import Footer from '../components/Footer'

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [imgErr,  setImgErr]  = useState(false)
  const isEven = index % 2 === 0

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'center',
        padding: '56px 0',
        borderBottom: '1px solid var(--border)',
        animation: `fadeUp 0.5s ease ${index * 0.08}s both`,
      }}
      className="project-row"
    >
      {/* Image */}
      <div style={{ order: isEven ? 0 : 1 }} className="project-row-img">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 14, overflow: 'hidden',
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
              src={project.image} alt={project.name}
              onError={() => setImgErr(true)}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top', display: 'block',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>No preview</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ order: isEven ? 1 : 0, display: 'flex', flexDirection: 'column', gap: 20 }} className="project-row-content">
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Project {String(index + 1).padStart(2, '0')}
        </span>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 34px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-primary)', margin: 0 }}>
          {project.name}
        </h3>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {project.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <a href={project.githubrepo} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, background: 'var(--text-primary)', color: 'var(--bg)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <Github size={14} /> GitHub
          </a>
          {project.demolink && (
            <a href={project.demolink} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, background: 'transparent', color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.2s, transform 0.2s' }}
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

export default function AllProjects() {
  const [projects, setProjects] = useState([])
  const [query,    setQuery]    = useState('')

  useEffect(() => {
    fetch('/data/projects.json').then(r => r.json()).then(setProjects).catch(() => {})
  }, [])

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <>
      <main style={{ minHeight: '100vh', paddingTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

          <div style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ display: 'block', marginBottom: 12, fontSize: 18, border: 'none' }}>All Projects</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)', margin: '0 0 16px' }}>
              Selected work
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>
              {projects.length} projects in Machine Learning, Full Stack & API development.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 400, marginBottom: 16 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, tag, or description..."
              style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--text-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Zigzag rows */}
          <div>
            {filtered.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
              No projects found for "{query}"
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .project-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .project-row-img { order: 0 !important; }
          .project-row-content { order: 1 !important; }
        }
      `}</style>
    </>
  )
}
