import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const LEVEL_COLOR = {
  Intermediate: { bg: 'var(--surface-2)', text: 'var(--text-secondary)' },
  Beginner:     { bg: 'var(--surface-2)', text: 'var(--text-muted)' },
  Advanced:     { bg: 'var(--surface-2)', text: 'var(--text-primary)' },
}

function SkillCard({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const lc = LEVEL_COLOR[skill.level] || LEVEL_COLOR.Beginner

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 28px 24px",
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s, box-shadow 0.25s ease, border-color 0.25s ease`,
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderColor: hovered ? 'var(--border-strong)' : 'var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {skill.name}
        </h3>
        <span style={{
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: 4,
          background: lc.bg,
          color: lc.text,
          border: '1px solid var(--border)',
        }}>
          {skill.level}
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        lineHeight: 1.65,
        color: 'var(--text-secondary)',
        margin: 0,
        flex: 1,
      }}>
        {skill.description}
      </p>
    </div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [ref, inView] = useInView()

  useEffect(() => {
    fetch('/data/skills.json').then(r => r.json()).then(setSkills).catch(() => {})
  }, [])

  const preview = skills.slice(0, 8)

  return (
    <section id="skills" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 56, flexWrap: 'wrap', gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <span className="section-label">Skills</span>
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
              What I work with
            </h2>
          </div>
          <Link to="/skills"
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
            View all {skills.length} <ArrowRight size={13} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {preview.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
