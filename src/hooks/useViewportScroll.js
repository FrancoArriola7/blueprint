import { useEffect, useRef } from 'react'

export function useViewportScroll(containerRef, sectionIds, sectionRefs) {
  const currentIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const getSections = () =>
      sectionIds.map((id) => sectionRefs.current[id]).filter(Boolean)

    const updateCurrentIndex = () => {
      const sections = getSections()

      if (!sections.length) return

      const viewportCenter = window.innerHeight / 2
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      currentIndexRef.current = closestIndex
    }

    const scrollToIndex = (nextIndex) => {
      const sections = getSections()
      const target = sections[nextIndex]

      if (!target) return

      isAnimatingRef.current = true
      currentIndexRef.current = nextIndex

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })

      window.setTimeout(() => {
        isAnimatingRef.current = false
        updateCurrentIndex()
      }, 950)
    }

    const handleWheel = (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (Math.abs(event.deltaY) < 12) return
      if (isAnimatingRef.current) {
        event.preventDefault()
        return
      }

      const sections = getSections()
      if (!sections.length) return

      const direction = event.deltaY > 0 ? 1 : -1
      const nextIndex = Math.max(
        0,
        Math.min(currentIndexRef.current + direction, sections.length - 1),
      )

      if (nextIndex === currentIndexRef.current) return

      event.preventDefault()
      scrollToIndex(nextIndex)
    }

    const handleKeyDown = (event) => {
      if (isAnimatingRef.current) return

      if (!['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'Space'].includes(event.key)) {
        return
      }

      const direction =
        event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1

      const sections = getSections()
      const nextIndex = Math.max(
        0,
        Math.min(currentIndexRef.current + direction, sections.length - 1),
      )

      if (nextIndex === currentIndexRef.current) return

      event.preventDefault()
      scrollToIndex(nextIndex)
    }

    updateCurrentIndex()
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', updateCurrentIndex, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', updateCurrentIndex)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [containerRef, sectionIds, sectionRefs])
}
