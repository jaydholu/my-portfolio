import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Footer from '../components/Footer'

const CATEGORY_ORDER = ['AI / ML / DL', 'Backend & Web API', 'Frontend', 'Database', 'Programming Languages', 'Tools']

export default function AllSkills() {
  const [skills,  setSkills]  = useState([])
  const [query,   setQuery]   = useState('')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    fetch('/data/skills.json').then(r => r.json()).then(setSkills).catch(() => {})
  }, [])

  // Group by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const filtered = skills.filter(s => {
      const matchCat = s.category === cat
      const matchQ = !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQ
    })
    if (filtered.length > 0) acc[cat] = filtered
    return acc
  }, {})

  const totalShown = Object.values(grouped).flat().length

  return (
    <>
      <main style={{ minHeight: '100vh', paddingTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ display: 'block', marginBottom: 12, fontSize: 18, border: 'none' }}>All Skills</span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              margin: '0 0 16px',
            }}>
              What I work with
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>
              {skills.length} skills across AI/ML, Backend, Frontend, Database & more.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 400, marginBottom: 64 }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search skills..."
              style={{
                width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 11, paddingBottom: 11,
                borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)',
                color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-body)',
                outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--text-primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Categorized sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
            {Object.entries(grouped).map(([category, items], catIdx) => (
              <div key={category}>

                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                  <span className="section-label">
                    {category}
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>
                    {items.length} skill{items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="skills-page-grid">
                  {items.map((skill, i) => {
                    const key = `${category}-${i}`
                    return (
                      <div key={skill.name}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          padding: '24px 26px 22px',
                          borderRadius: 14,
                          border: '1px solid',
                          borderColor: hovered === key ? 'var(--border-strong)' : 'var(--border)',
                          background: 'var(--surface)',
                          display: 'flex', flexDirection: 'column', gap: 14,
                          boxShadow: hovered === key ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                          transform: hovered === key ? 'translateY(-4px)' : 'translateY(0)',
                          transition: 'all 0.25s ease',
                          animation: `fadeUp 0.4s ease ${(catIdx * 0.1) + (i * 0.04)}s both`,
                          minHeight: 160,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 18,
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            margin: 0, lineHeight: 1.2,
                          }}>
                            {skill.name}
                          </h3>
                          <span style={{
                            flexShrink: 0,
                            fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-body)',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '4px 10px', borderRadius: 5,
                            background: 'var(--surface-2)', color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            marginTop: 2,
                          }}>
                            {skill.level}
                          </span>
                        </div>
                        <div style={{ height: 1, background: 'var(--border)' }} />
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 13, lineHeight: 1.7,
                          color: 'var(--text-secondary)',
                          margin: 0, flex: 1,
                        }}>
                          {skill.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {totalShown === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
              No skills found for "{query}"
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 1024px) { .skills-page-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px)  { .skills-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
