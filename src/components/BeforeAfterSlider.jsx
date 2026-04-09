import { useRef, useState } from 'react'

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) {
  const [position, setPosition] = useState(48)
  const sliderRef = useRef(null)
  const draggingRef = useRef(false)

  const updatePosition = (clientX) => {
    const element = sliderRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, next)))
  }

  const handlePointerDown = (event) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return
    updatePosition(event.clientX)
  }

  const handlePointerUp = (event) => {
    draggingRef.current = false
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleInput = (event) => {
    setPosition(Number(event.target.value))
  }

  return (
    <div className="before-after-shell">
      <div
        ref={sliderRef}
        className="before-after-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src={afterSrc}
          alt="After concept"
          className="before-after-image"
          draggable="false"
        />

        <div className="before-after-overlay" style={{ width: `${position}%` }}>
          <img
            src={beforeSrc}
            alt="Before concept"
            className="before-after-image"
            draggable="false"
          />
        </div>

        <div className="before-after-handle" style={{ left: `${position}%` }}>
          <div className="before-after-line" />
          <div className="before-after-knob">
            <span aria-hidden="true">‹</span>
            <span aria-hidden="true">›</span>
          </div>
        </div>

        <div className="before-after-label before-after-label-left">{beforeLabel}</div>
        <div className="before-after-label before-after-label-right">{afterLabel}</div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleInput}
          aria-label="Before and after comparison"
          className="before-after-input"
        />
      </div>
    </div>
  )
}

