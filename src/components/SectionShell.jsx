import { forwardRef } from 'react'

export const SectionShell = forwardRef(function SectionShell(
  { id, eyebrow, title, description, align = 'left', children, className = '' },
  ref,
) {
  return (
    <section ref={ref} id={id} className={`section-frame snap-start ${className}`}>
      <div className="section-inner">
        <div className="content-wrap">
          <div className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>

          {children}
        </div>
      </div>
    </section>
  )
})
