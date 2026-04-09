import { useEffect, useRef, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

export function ShaderBackground({ children }) {
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="hero-shader-wrap">
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.04
                      0 0 1 0 0.08
                      0 0 0 0.92 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={['#020617', '#0f172a', '#e0f2fe', '#1d4ed8', '#0ea5e9']}
        speed={isActive ? 0.34 : 0.22}
        backgroundColor="#eff6ff"
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-35"
        colors={['#f8fbff', '#38bdf8', '#0f172a', '#bfdbfe']}
        speed={isActive ? 0.24 : 0.16}
        wireframe="true"
        backgroundColor="transparent"
      />

      <div className="hero-shader-overlay" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
