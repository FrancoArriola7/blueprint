import { forwardRef, useEffect, useMemo, useState } from 'react'
import { ShaderBackground } from '../components/ShaderBackground'
import { LiquidGlassButton } from '../components/LiquidGlassButton'

export const HeroSection = forwardRef(function HeroSection(
  { onPrimaryClick, onSecondaryClick },
  ref,
) {
  const [titleNumber, setTitleNumber] = useState(0)
  const titleWords = useMemo(() => ['design', 'presence', 'clients'], [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((current) => (current + 1) % titleWords.length)
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [titleNumber, titleWords])

  return (
    <section ref={ref} id="hero" className="section-frame snap-start overflow-hidden">
      <ShaderBackground>
        <div className="section-inner relative flex h-full flex-col justify-between">
          <div className="content-wrap hero-layout flex h-full flex-col justify-between">
            <div />

            <div className="hero-content-grid flex flex-1 items-end">
              <div className="hero-copy max-w-4xl pb-8 sm:pb-12 lg:pb-16">
                <h1 className="hero-animated-title balance max-w-5xl text-[4.2rem] font-semibold leading-[0.9] tracking-[-0.06em] text-slate-950 sm:text-[5.8rem] lg:text-[8.6rem]">
                  <span>better</span>
                  <span className="hero-animated-word-wrap">
                    {titleWords.map((word, index) => (
                      <span
                        key={word}
                        className={`hero-animated-word ${
                          titleNumber === index ? 'hero-animated-word-active' : ''
                        }`}
                        style={{
                          transform:
                            titleNumber === index
                              ? 'translateY(0)'
                              : `translateY(${titleNumber > index ? '-120%' : '120%'})`,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-900/88 sm:text-lg sm:leading-8">
                  blueprint creates custom web platforms and digital products with sharper systems, cleaner execution, and a clearer point of view.
                </p>
                <div className="hero-actions mt-8 flex flex-col gap-4 sm:flex-row">
                  <LiquidGlassButton onClick={onPrimaryClick} emphasis="solid">
                    Start your project
                  </LiquidGlassButton>
                  <LiquidGlassButton onClick={onSecondaryClick} emphasis="secondary">
                    See our services
                  </LiquidGlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShaderBackground>
    </section>
  )
})
