import { useState } from 'react'
import { Mail, Linkedin, Github, Send, CheckCircle, XCircle } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const socials = [
  { href: 'mailto:jaydholu074@gmail.com',       icon: Mail,     label: 'jaydholu074@gmail.com' },
  { href: 'https://linkedin.com/in/jaydholu',   icon: Linkedin, label: 'linkedin.com/in/jaydholu' },
  { href: 'https://github.com/jaydholu',        icon: Github,   label: 'github.com/jaydholu' },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [status,  setStatus]  = useState(null) // 'sending' | 'success' | 'error'

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          from_name: 'Portfolio Contact Form',
          subject: 'New Contact Form Submission from Portfolio',
          ...form,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else throw new Error()
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: 'var(--surface-2)',
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Label */}
        <div style={{ ...anim(0), marginBottom: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="section-label">Contact</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }} className="contact-grid">

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={anim(0.1)}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                margin: '0 0 16px',
              }}>
                Let's build<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>something great.</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
                Have a project in mind, a question, or just want to say hello?
                Drop a message and I'll get back to you.
              </p>
            </div>

            <div style={{ ...anim(0.2), display: 'flex', flexDirection: 'column', gap: 14 }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a key={href} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px', borderRadius: 10,
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    textDecoration: 'none', color: 'var(--text-primary)',
                    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400 }}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={anim(0.2)}>
            <form onSubmit={handleSubmit}
              style={{
                display: 'flex', flexDirection: 'column', gap: 16,
                padding: 28, borderRadius: 16,
                border: '1px solid var(--border)', background: 'var(--surface)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Alicia Johansson" required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="aliciajohansson@gmail.com" required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry / Collaboration" required style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 24px', borderRadius: 8,
                  background: 'var(--text-primary)', color: 'var(--bg)',
                  fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)',
                  border: '1px solid var(--text-primary)',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.65 : 1,
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = status === 'sending' ? '0.65' : '1' }}
              >
                <Send size={14} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
                  <CheckCircle size={15} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)' }}>Message sent! I'll get back to you soon.</span>
                </div>
              )}
              {status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
                  <XCircle size={15} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)' }}>Failed to send. Please email me directly.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
