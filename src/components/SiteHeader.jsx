import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const navItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Services', target: 'services' },
  { label: 'Impact', target: 'media' },
  { label: 'Process', target: 'process' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
]

export function SiteHeader({
  activeSection,
  onNavigate,
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const closeTimerRef = useRef(null)
  const isHero = activeSection === 'hero'
  const isDarkSection =
    activeSection === 'services' ||
    activeSection === 'media' ||
    activeSection === 'process' ||
    activeSection === 'projects' ||
    activeSection === 'transition'

  useEffect(() => {
    document.documentElement.classList.toggle('site-menu-open', isMounted)

    return () => {
      document.documentElement.classList.remove('site-menu-open')
    }
  }, [isMounted])

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  const openMenu = () => {
    window.clearTimeout(closeTimerRef.current)
    setIsMounted(true)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsOpen(true)
      })
    })
  }

  const closeMenu = () => {
    setIsOpen(false)
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false)
    }, 620)
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const handleNavigate = (target) => {
    onNavigate(target)
    closeMenu()
  }

  const handleOpenCookiePolicy = () => {
    closeMenu()
    window.setTimeout(() => {
      onOpenCookiePolicy?.()
    }, 140)
  }

  const handleOpenPrivacyPolicy = () => {
    closeMenu()
    window.setTimeout(() => {
      onOpenPrivacyPolicy?.()
    }, 140)
  }

  const menuPanel =
    isMounted && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={`site-menu-overlay ${isOpen ? 'site-menu-overlay-open' : ''}`}
            aria-hidden={!isOpen}
          >
            <div className="site-menu-panel">
              <button
                type="button"
                onClick={closeMenu}
                className="site-menu-close-fab"
                aria-label="Close navigation menu"
              >
                <span className="site-menu-close-label">Close</span>
                <span className="site-menu-close-icon" aria-hidden="true">
                  {'\u00D7'}
                </span>
              </button>

              <nav className="site-menu-nav" aria-label="Section navigation">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigate(item.target)}
                    className="site-menu-link"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="site-menu-legal">
                <span>Terms & Conditions</span>
                <button
                  type="button"
                  className="site-menu-legal-link"
                  onClick={handleOpenPrivacyPolicy}
                >
                  Privacy Policy
                </button>
                <button type="button" className="site-menu-legal-link" onClick={handleOpenCookiePolicy}>
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  const menu = (
    <div className="site-header-menu-wrap">
      <button
        type="button"
        onClick={toggleMenu}
        className="site-header-menu-button"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>
      {menuPanel}
    </div>
  )

  return (
    <header
      className={`site-header ${isHero ? 'site-header-hero' : 'site-header-compact'} ${
        isDarkSection ? 'site-header-on-dark' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => handleNavigate('hero')}
        className="site-header-logo"
      >
        blueprint
      </button>

      {isHero ? (
        <>
          <nav className="site-header-nav" aria-label="Primary navigation">
            {navItems.slice(1, -1).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className="site-header-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="site-header-contact"
          >
            Contact
            <span aria-hidden="true">{'\u2192'}</span>
          </button>
          {menu}
        </>
      ) : (
        menu
      )}
    </header>
  )
}
