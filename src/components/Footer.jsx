import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const socials = [
  { href: 'https://github.com/jaydholu',       icon: Github,     label: 'GitHub' },
  { href: 'https://linkedin.com/in/jaydholu',  icon: Linkedin,   label: 'LinkedIn' },
  { href: 'https://x.com/jay_dholu',           icon: Twitter,    label: 'Twitter' },
  { href: 'https://instagram.com/_jaydholu_',  icon: Instagram,  label: 'Instagram' },
]

const navLinks = [
  { label: 'About',        href: '/#about' },
  { label: 'Skills',       href: '/#skills' },
  { label: 'Projects',     href: '/#projects' },
  { label: 'Certificates', href: '/#certificates' },
  { label: 'Contact',      href: '/#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '-0.04em', display: 'block', marginBottom: 10 }}>
              Jay Dholu
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>
              ML Engineer & Full Stack Developer. Building intelligent systems with Python and React.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Pages</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map(l => (
                  <a key={l.href} href={l.href}
                    className="underline-anim"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Connect</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {socials.map(({ href, icon: Icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Icon size={13} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
            © {year} Jay Dholu. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
            Built with React + Tailwind
          </span>
        </div>
      </div>
    </footer>
  )
}
