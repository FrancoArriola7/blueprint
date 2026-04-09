import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

const processSteps = [
  {
    id: '01',
    title: 'Direction',
    description:
      'We start by understanding your brand, goals, audience, and what the digital experience needs to achieve.',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: '02',
    title: 'Design',
    description:
      'We translate the direction into a visual system and user experience that feels intentional, elevated, and easy to use.',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: '03',
    title: 'Build',
    description:
      'We turn the approved design into a fast, responsive, production-ready product built for real-world performance.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: '04',
    title: 'Launch & Refine',
    description:
      'Once everything is polished and tested, we launch, measure, and refine the experience where needed.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
  },
]

const AUTO_PLAY_DURATION = 5000

export const ProcessSection = forwardRef(function ProcessSection(_, ref) {
  const sectionRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const hasActivatedRef = useRef(false)
  const progressValueRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)

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

  const handleNext = useCallback(() => {
    window.clearInterval(progressIntervalRef.current)
    setDirection(1)
    progressValueRef.current = 0
    setProgress(0)
    setActiveIndex((current) => (current + 1) % processSteps.length)
  }, [])

  const handlePrev = useCallback(() => {
    window.clearInterval(progressIntervalRef.current)
    setDirection(-1)
    progressValueRef.current = 0
    setProgress(0)
    setActiveIndex((current) => (current - 1 + processSteps.length) % processSteps.length)
  }, [])

  const handleStepClick = (index) => {
    if (index === activeIndex) return
    window.clearInterval(progressIntervalRef.current)
    setDirection(index > activeIndex ? 1 : -1)
    progressValueRef.current = 0
    setProgress(0)
    setActiveIndex(index)
    setIsPaused(false)
  }

  useEffect(() => {
    window.clearInterval(progressIntervalRef.current)

    if (isPaused || !isSectionVisible) return undefined

    progressIntervalRef.current = window.setInterval(() => {
      const next = Math.min(progressValueRef.current + 100 / (AUTO_PLAY_DURATION / 50), 100)

      if (next >= 100) {
        window.clearInterval(progressIntervalRef.current)
        progressValueRef.current = 0
        setProgress(0)
        setDirection(1)
        setActiveIndex((current) => (current + 1) % processSteps.length)
        return
      }

      progressValueRef.current = next
      setProgress(next)
    }, 50)

    return () => {
      window.clearInterval(progressIntervalRef.current)
    }
  }, [activeIndex, isPaused, isSectionVisible])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)

        if (entry.isIntersecting && !hasActivatedRef.current) {
          hasActivatedRef.current = true
          progressValueRef.current = 0
          setActiveIndex(0)
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
      window.clearInterval(progressIntervalRef.current)
    }
  }, [])

  const activeStep = processSteps[activeIndex]

  return (
    <section ref={setSectionRef} id="process" className="process-section section-frame snap-start">
      <div className="process-inner">
        <div className="process-content">
          <div className="process-copy">
            <div className="process-heading">
              <p className="process-eyebrow">Process</p>
              <h2>How We Work</h2>
            </div>

            <div className="process-tabs">
              {processSteps.map((step, index) => {
                const isActive = activeIndex === index

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={`process-tab ${isActive ? 'process-tab-active' : ''}`}
                  >
                    <span className="process-tab-progress">
                      {isActive ? (
                        <span
                          className="process-tab-progress-fill"
                          style={{ transform: `scaleY(${progress / 100})` }}
                        />
                      ) : null}
                    </span>
                    <span className="process-tab-id">/{step.id}</span>
                    <span className="process-tab-body">
                      <span className="process-tab-title">{step.title}</span>
                      <span className="process-tab-description">{step.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className="process-visual-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="process-visual">
              <img
                key={activeStep.id}
                src={activeStep.image}
                alt={activeStep.title}
                className={`process-visual-image ${
                  direction > 0 ? 'process-visual-image-next' : 'process-visual-image-prev'
                }`}
              />
              <div className="process-visual-scrim" />
              <div className="process-visual-label">
                <span>{activeStep.id}</span>
                <strong>{activeStep.title}</strong>
              </div>

              <div className="process-controls">
                <button type="button" onClick={handlePrev} aria-label="Previous process step">
                  ‹
                </button>
                <button type="button" onClick={handleNext} aria-label="Next process step">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
