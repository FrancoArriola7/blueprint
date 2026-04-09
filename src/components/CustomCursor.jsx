import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPositionRef = useRef({ x: -100, y: -100 })
  const animationRef = useRef()
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (!canUseCustomCursor) return undefined

    const render = () => {
      const mouse = mouseRef.current
      const ring = ringPositionRef.current

      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }

      animationRef.current = window.requestAnimationFrame(render)
    }

    const updatePointerState = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }
      setIsVisible(true)
      setIsPointer(Boolean(event.target.closest('a, button, input, textarea, [role="button"]')))
    }

    const handlePointerMove = (event) => {
      updatePointerState(event)
    }

    const handlePointerDown = (event) => {
      updatePointerState(event)
    }

    const handleWindowMouseOut = (event) => {
      if (!event.relatedTarget && !event.toElement) {
        setIsVisible(false)
      }
    }

    const handleWindowMouseOver = () => {
      setIsVisible(true)
    }

    const handleWindowBlur = () => {
      setIsVisible(false)
    }

    animationRef.current = window.requestAnimationFrame(render)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('mouseout', handleWindowMouseOut)
    window.addEventListener('mouseover', handleWindowMouseOver)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.cancelAnimationFrame(animationRef.current)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('mouseout', handleWindowMouseOut)
      window.removeEventListener('mouseover', handleWindowMouseOver)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'custom-cursor-visible' : ''} ${
          isPointer ? 'custom-cursor-pointer' : ''
        }`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'custom-cursor-visible' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
