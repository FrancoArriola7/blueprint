import { useEffect, useRef, useState } from 'react'
import { HeroSection } from './sections/HeroSection'
import { ServicesSection } from './sections/ServicesSection'
import { MediaSection } from './sections/MediaSection'
import { ProcessSection } from './sections/ProcessSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ContactSection } from './sections/ContactSection'
import { CookiePolicyPage } from './sections/CookiePolicyPage'
import { PrivacyPolicyPage } from './sections/PrivacyPolicyPage'
import { useViewportScroll } from './hooks/useViewportScroll'
import { SiteHeader } from './components/SiteHeader'
import { CustomCursor } from './components/CustomCursor'

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'services', label: 'Services' },
  { id: 'media', label: 'Experience' },
  { id: 'process', label: 'Process' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const refs = useRef({})
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [pathname, setPathname] = useState(() => window.location.pathname)

  const isCookiePolicyPage = pathname === '/cookie-policy'
  const isPrivacyPolicyPage = pathname === '/privacy-policy'
  const isLegalPage = isCookiePolicyPage || isPrivacyPolicyPage

  const registerSection = (id, node) => {
    refs.current[id] = node
  }

  const scrollToSection = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navigateToPath = (nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
    setPathname(nextPath)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useViewportScroll(
    containerRef,
    isLegalPage ? [] : sections.map((section) => section.id),
    refs,
  )

  useEffect(() => {
    if (isLegalPage) return undefined

    const container = containerRef.current
    if (!container) return undefined

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2
      let closestId = 'hero'
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const node = refs.current[section.id]
        if (!node) return

        const rect = node.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = section.id
        }
      })

      setActiveSection(closestId)
    }

    updateActiveSection()
    container.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      container.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [isLegalPage])

  return (
    <div className="app-shell relative min-h-screen bg-[var(--color-bg)] text-slate-900">
      <CustomCursor />
      {isCookiePolicyPage ? (
        <CookiePolicyPage
          pathname={pathname}
          onBackHome={() => navigateToPath('/')}
          onOpenCookiePolicy={() => navigateToPath('/cookie-policy')}
          onOpenPrivacyPolicy={() => navigateToPath('/privacy-policy')}
        />
      ) : isPrivacyPolicyPage ? (
        <PrivacyPolicyPage
          pathname={pathname}
          onBackHome={() => navigateToPath('/')}
          onOpenCookiePolicy={() => navigateToPath('/cookie-policy')}
          onOpenPrivacyPolicy={() => navigateToPath('/privacy-policy')}
        />
      ) : (
        <div className="app-stage">
          <SiteHeader
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onOpenCookiePolicy={() => navigateToPath('/cookie-policy')}
            onOpenPrivacyPolicy={() => navigateToPath('/privacy-policy')}
          />
          <main ref={containerRef} className="snap-container">
            <HeroSection
              ref={(node) => registerSection('hero', node)}
              onPrimaryClick={() => scrollToSection('contact')}
              onSecondaryClick={() => scrollToSection('services')}
            />
            <ServicesSection
              ref={(node) => registerSection('services', node)}
              onKnowMore={() => scrollToSection('media')}
            />
            <MediaSection ref={(node) => registerSection('media', node)} />
            <ProcessSection ref={(node) => registerSection('process', node)} />
            <ProjectsSection ref={(node) => registerSection('projects', node)} />
            <ContactSection ref={(node) => registerSection('contact', node)} />
          </main>
        </div>
      )}
    </div>
  )
}

export default App
