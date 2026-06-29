import { Link } from 'react-router-dom';

const GithubIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedinIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const TwitterIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const InstagramIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>

const socials = [
  { href: 'https://github.com/jaydholu',            icon: GithubIcon,    label: 'GitHub' },
  { href: 'https://linkedin.com/in/jaydholu',       icon: LinkedinIcon,  label: 'LinkedIn' },
  { href: 'https://x.com/jay_dholu',                icon: TwitterIcon,   label: 'Twitter' },
  { href: 'https://instagram.com/_jaydholu_',     icon: InstagramIcon, label: 'Instagram' },
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
