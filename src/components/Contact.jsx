import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Mail, Send, CheckCircle, XCircle } from 'lucide-react';

const GithubIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>

const socials = [
  { href: 'mailto:jaydholu074@gmail.com',       icon: Mail,         label: 'jaydholu074@gmail.com' },
  { href: 'https://linkedin.com/in/jaydholu',   icon: LinkedinIcon, label: 'linkedin.com/in/jaydholu' },
  { href: 'https://github.com/jaydholu',        icon: GithubIcon,   label: 'github.com/jaydholu' },
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
