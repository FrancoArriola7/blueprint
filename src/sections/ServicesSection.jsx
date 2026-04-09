import { forwardRef, useEffect, useRef, useState } from 'react'
import { SectionShell } from '../components/SectionShell'
import { ServiceCard } from '../components/ServiceCard'

const services = [
  {
    id: '01',
    title: 'Custom Websites',
    description:
      'Premium websites and digital experiences designed to communicate clearly and convert with intent.',
    available: true,
  },
  {
    id: '02',
    title: 'AI Solutions',
    description:
      'Applied AI tools and product features built around practical workflows and real business value.',
    available: false,
  },
  {
    id: '03',
    title: 'Internal Tools',
    description:
      'Custom internal platforms and dashboards built to simplify operations, centralize workflows, and support growth.',
    available: false,
  },
]

export const ServicesSection = forwardRef(function ServicesSection({ onKnowMore }, ref) {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const updateActiveIndex = () => {
      if (!window.matchMedia('(max-width: 1023px)').matches) {
        setActiveIndex(0)
        return
      }

      const trackRect = track.getBoundingClientRect()
      const trackCenter = trackRect.left + trackRect.width / 2
      let nextIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cardRefs.current.forEach((card, index) => {
        if (!card) return

        const rect = card.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const distance = Math.abs(cardCenter - trackCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
    }

    updateActiveIndex()
    track.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateActiveIndex)

    return () => {
      track.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [])

  const scrollToCard = (index) => {
    const target = cardRefs.current[index]
    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <SectionShell
      ref={ref}
      id="services"
      eyebrow="Services"
      title="What we build"
      description="From custom websites to smarter tools, every solution is designed to be clear, useful, and built to last."
      className="services-section-dark justify-center"
    >
      <div className="services-mobile-carousel">
        <div ref={trackRef} className="services-card-grid">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="services-card-slide"
            >
              <ServiceCard {...service} onKnowMore={onKnowMore} />
            </div>
          ))}
        </div>

        <div className="services-mobile-dots" aria-label="Services carousel pagination">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className={`services-mobile-dot ${
                activeIndex === index ? 'services-mobile-dot-active' : ''
              }`}
              aria-label={`Go to service ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
})
