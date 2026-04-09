import { forwardRef } from 'react'

const projects = [
  {
    title: 'Lucia Mar Studio',
    category: 'Wedding photography',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    summary:
      'A refined portfolio built to highlight destination weddings with immersive galleries, elegant pacing, and inquiry-first navigation.',
  },
  {
    title: 'Mateo Lens Archive',
    category: 'Editorial portraiture',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    summary:
      'A minimalist photographer portfolio focused on portrait stories, published series, and a strong art-direction sensibility.',
  },
  {
    title: 'Isla Norte Frames',
    category: 'Travel photography',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    summary:
      'A cinematic showcase for travel and landscape work, designed around large visuals, quiet typography, and curated collections.',
  },
]

export const ProjectsSection = forwardRef(function ProjectsSection(_, ref) {
  return (
    <section ref={ref} id="projects" className="projects-section section-frame snap-start">
      <div className="projects-section-inner section-inner">
        <div className="content-wrap projects-content-wrap">
          <div className="projects-heading-row">
            <div className="projects-heading-copy">
              <p className="projects-eyebrow">Projects</p>
              <h2>Selected work.</h2>
            </div>
          </div>

          <div className="projects-list" role="list" aria-label="Selected projects">
            {projects.map((project) => (
              <a key={project.title} href="#contact" className="project-row" role="listitem">
                <div className="project-hover-preview" aria-hidden="true">
                  <div className="project-hover-preview-frame">
                    <img
                      src={project.image}
                      alt=""
                      className="project-hover-preview-image"
                    />
                    <span className="project-hover-preview-button">View</span>
                  </div>
                </div>

                <div className="project-row-main">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>

                <div className="project-row-meta">
                  <span>{project.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
