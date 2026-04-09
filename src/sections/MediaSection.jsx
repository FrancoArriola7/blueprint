import { forwardRef } from 'react'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { SectionShell } from '../components/SectionShell'

export const MediaSection = forwardRef(function MediaSection(_, ref) {
  return (
    <SectionShell
      ref={ref}
      id="media"
      eyebrow="Impact"
      title="Your profile, reimagined"
      className="media-section-dark justify-center"
    >
      <div className="media-comparison-wrap">
        <BeforeAfterSlider
          beforeSrc="/media/before-interface.png"
          afterSrc="/media/after-interface.png"
          beforeLabel="Before"
          afterLabel="After"
        />
        <div className="media-comparison-copy" aria-hidden="true">
          <p>Generic link page — just like everyone else</p>
          <p>Your own website — designed around you</p>
        </div>
      </div>
    </SectionShell>
  )
})
