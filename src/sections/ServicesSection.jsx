import { forwardRef } from 'react'
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
  return (
    <SectionShell
      ref={ref}
      id="services"
      eyebrow="Services"
      title="What we build"
      description="From custom websites to smarter tools, every solution is designed to be clear, useful, and built to last."
      className="services-section-dark justify-center"
    >
      <div className="services-card-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} onKnowMore={onKnowMore} />
        ))}
      </div>
    </SectionShell>
  )
})
