import { useRef, useCallback } from 'react'

export interface ScrollContainerRefs {
  reportScrollContainer?: HTMLElement | null
  thinkingScrollContainer?: HTMLElement | null
  initialScrollContainer?: HTMLElement | null
  adviceScrollContainer?: HTMLElement | null
  finalScrollContainer?: HTMLElement | null
}

export function usePreviewScrollSync() {
  const scrollContainerRefs = useRef<ScrollContainerRefs>({})
  
  const setScrollContainerRefs = useCallback((refs: Partial<ScrollContainerRefs>) => {
    scrollContainerRefs.current = { ...scrollContainerRefs.current, ...refs }
  }, [])

  const scrollToBottomOfContent = useCallback(() => {
    setTimeout(() => {
      const containers = [
        scrollContainerRefs.current.reportScrollContainer,
        scrollContainerRefs.current.thinkingScrollContainer,
        scrollContainerRefs.current.initialScrollContainer,
        scrollContainerRefs.current.adviceScrollContainer,
        scrollContainerRefs.current.finalScrollContainer
      ]

      containers.forEach(container => {
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }, 0)
  }, [])

  const scrollContainerToBottom = useCallback((containerName: keyof ScrollContainerRefs) => {
    setTimeout(() => {
      const container = scrollContainerRefs.current[containerName]
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }, 0)
  }, [])

  return {
    setScrollContainerRefs,
    scrollToBottomOfContent,
    scrollContainerToBottom
  }
}
