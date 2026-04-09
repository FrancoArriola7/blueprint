import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Lucia Mar Studio',
    subtitle: 'Destination Wedding Portfolio',
    description:
      'A polished showcase for a wedding photographer built around immersive galleries, editorial pacing, and premium inquiry moments.',
    accent: '#c7a47d',
    imageUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    href: 'https://example.com/lucia-mar-studio',
    titleClassName: 'projects-carousel-title-lucia',
  },
  {
    title: 'Atlas Portrait House',
    subtitle: 'Editorial Photographer Website',
    description:
      'A moody portrait portfolio with curated case studies, press-ready storytelling, and a cinematic rhythm across every section.',
    accent: '#8ba7b8',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    href: 'https://example.com/atlas-portrait-house',
    titleClassName: 'projects-carousel-title-atlas',
  },
  {
    title: 'Solstice Travel Notes',
    subtitle: 'Adventure Photo Journal',
    description:
      'A travel photography concept with large-format landscapes, layered collections, and a quieter interface that lets the imagery lead.',
    accent: '#7ea08c',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    href: 'https://example.com/solstice-travel-notes',
    titleClassName: 'projects-carousel-title-solstice',
  },
  {
    title: 'Nocturne Frames',
    subtitle: 'Fashion Campaign Archive',
    description:
      'A sleek portfolio direction for fashion and studio work, balancing art-direction, campaign presentation, and selective project narratives.',
    accent: '#d4a466',
    imageUrl:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    href: 'https://example.com/nocturne-frames',
    titleClassName: 'projects-carousel-title-nocturne',
  },
]

const SLIDE_DURATION = 6000
const TRANSITION_DURATION = 800

export const ProjectsSection = forwardRef(function ProjectsSection(_, ref) {
  const sectionRef = useRef(null)
  const autoAdvanceRef = useRef(null)
  const hasActivatedRef = useRef(false)
  const progressValueRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const progressRef = useRef(null)
  const transitionRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const setSectionRef = useCallback(
    (node) => {
      sectionRef.current = node

      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return

      window.clearInterval(progressRef.current)
      window.clearTimeout(autoAdvanceRef.current)
      setIsTransitioning(true)
      progressValueRef.current = 0
      setProgress(0)
      window.clearTimeout(transitionRef.current)

      transitionRef.current = window.setTimeout(() => {
        setCurrentIndex(index)
        window.setTimeout(() => {
          setIsTransitioning(false)
        }, 60)
      }, TRANSITION_DURATION / 2)
    },
    [currentIndex, isTransitioning],
  )

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % projects.length
    goToSlide(nextIndex)
  }, [currentIndex, goToSlide])

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    goToSlide(prevIndex)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    window.clearInterval(progressRef.current)
    window.clearTimeout(autoAdvanceRef.current)

    if (isPaused || !isSectionVisible) return undefined

    progressRef.current = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 100 / (SLIDE_DURATION / 50), 100)
        progressValueRef.current = next
        return next
      })
    }, 50)

    autoAdvanceRef.current = window.setTimeout(
      goNext,
      Math.max(0, SLIDE_DURATION * (1 - progressValueRef.current / 100)),
    )

    return () => {
      window.clearInterval(progressRef.current)
      window.clearTimeout(autoAdvanceRef.current)
    }
  }, [currentIndex, goNext, isPaused, isSectionVisible])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)

        if (entry.isIntersecting && !hasActivatedRef.current) {
          hasActivatedRef.current = true
          progressValueRef.current = 0
          setCurrentIndex(0)
          setProgress(0)
        }
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      window.clearInterval(progressRef.current)
      window.clearTimeout(autoAdvanceRef.current)
      window.clearTimeout(transitionRef.current)
    }
  }, [])

  const handleTouchStart = (event) => {
    touchStartX.current = event.targetTouches[0].clientX
  }

  const handleTouchMove = (event) => {
    touchEndX.current = event.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current

    if (Math.abs(difference) <= 60) return

    if (difference > 0) {
      goNext()
    } else {
      goPrev()
    }
  }

  const currentProject = projects[currentIndex]

  return (
    <section ref={setSectionRef} id="projects" className="projects-section section-frame snap-start">
      <div className="projects-section-inner section-inner">
        <div className="content-wrap projects-content-wrap">
          <div className="projects-heading-row">
            <div className="projects-heading-copy">
              <p className="projects-eyebrow">Projects</p>
              <h2>Selected work.</h2>
            </div>
          </div>

          <div
            className="projects-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="projects-carousel-bg-wash"
              style={{
                background: `radial-gradient(circle at 72% 50%, ${currentProject.accent}16 0%, transparent 62%)`,
              }}
            />

            <div className="projects-carousel-shell">
              <div className="projects-carousel-copy">
                <div
                  className={`projects-carousel-count ${
                    isTransitioning ? 'projects-carousel-transitioning' : 'projects-carousel-visible'
                  }`}
                >
                  <span className="projects-carousel-count-line" />
                  <span className="projects-carousel-count-text">
                    {String(currentIndex + 1).padStart(2, '0')} /{' '}
                    {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className={`projects-carousel-title ${currentProject.titleClassName} ${
                    isTransitioning ? 'projects-carousel-transitioning' : 'projects-carousel-visible'
                  }`}
                >
                  {currentProject.title}
                </h3>

                <p
                  className={`projects-carousel-subtitle ${
                    isTransitioning ? 'projects-carousel-transitioning' : 'projects-carousel-visible'
                  }`}
                  style={{ color: currentProject.accent }}
                >
                  {currentProject.subtitle}
                </p>

                <p
                  className={`projects-carousel-description ${
                    isTransitioning ? 'projects-carousel-transitioning' : 'projects-carousel-visible'
                  }`}
                >
                  {currentProject.description}
                </p>

                <div className="projects-carousel-nav">
                  <button type="button" onClick={goPrev} aria-label="Previous project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button type="button" onClick={goNext} aria-label="Next project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="projects-carousel-visual">
                <div
                  className={`projects-carousel-image-frame ${
                    isTransitioning ? 'projects-carousel-transitioning' : 'projects-carousel-visible'
                  }`}
                >
                  <a
                    href={currentProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="projects-carousel-image-link"
                    aria-label={`Open ${currentProject.title} website`}
                  >
                    <img
                      key={currentProject.title}
                      src={currentProject.imageUrl}
                      alt={currentProject.title}
                      className="projects-carousel-image"
                    />
                    <div
                      className="projects-carousel-image-overlay"
                      style={{
                        background: `linear-gradient(135deg, ${currentProject.accent}22 0%, transparent 52%)`,
                      }}
                    />
                    <div className="projects-carousel-image-hover">
                      <span>Visit site</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </div>
                  </a>
                </div>

                <div
                  className="projects-carousel-frame-corner projects-carousel-frame-corner-tl"
                  style={{ borderColor: currentProject.accent }}
                />
                <div
                  className="projects-carousel-frame-corner projects-carousel-frame-corner-br"
                  style={{ borderColor: currentProject.accent }}
                />
              </div>
            </div>

            <div className="projects-carousel-progress">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`projects-carousel-progress-item ${
                    index === currentIndex ? 'projects-carousel-progress-item-active' : ''
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                >
                  <div className="projects-carousel-progress-track">
                    <div
                      className="projects-carousel-progress-fill"
                      style={{
                        width:
                          index === currentIndex
                            ? `${progress}%`
                            : index < currentIndex
                              ? '100%'
                              : '0%',
                        backgroundColor:
                          index === currentIndex
                            ? currentProject.accent
                            : index < currentIndex
                              ? 'rgba(248, 250, 252, 0.78)'
                              : 'transparent',
                      }}
                    />
                  </div>
                  <span className="projects-carousel-progress-label">{project.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
