import { useState, useRef, useCallback } from 'react'

export type TabType = 'report' | 'thinking' | 'initial' | 'advice' | 'zh' | 'en'

export interface TabRefs {
  tabContainer?: HTMLElement | null
  reportTab?: HTMLButtonElement | null
  thinkingTab?: HTMLButtonElement | null
  initialTab?: HTMLButtonElement | null
  adviceTab?: HTMLButtonElement | null
  zhTab?: HTMLButtonElement | null
}

export function usePreviewTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('report')
  const [newContentTabs, setNewContentTabs] = useState<Set<string>>(new Set())
  const tabRefs = useRef<TabRefs>({})

  const setTabRefs = useCallback((refs: Partial<TabRefs>) => {
    tabRefs.current = { ...tabRefs.current, ...refs }
  }, [])

  const markTabAsViewed = useCallback((tab: string) => {
    setNewContentTabs(prev => {
      const newSet = new Set(prev)
      newSet.delete(tab)
      return newSet
    })
  }, [])

  const scrollToActiveTab = useCallback((tabName: string) => {
    const tabRefMap: Record<string, HTMLElement | null | undefined> = {
      'report': tabRefs.current.reportTab,
      'thinking': tabRefs.current.thinkingTab,
      'initial': tabRefs.current.initialTab,
      'advice': tabRefs.current.adviceTab,
      'zh': tabRefs.current.zhTab
    }

    const targetTab = tabRefMap[tabName]
    const container = tabRefs.current.tabContainer

    if (targetTab && container) {
      const containerRect = container.getBoundingClientRect()
      const tabRect = targetTab.getBoundingClientRect()

      const tabLeftRelativeToContainer = tabRect.left - containerRect.left + container.scrollLeft
      const tabRightRelativeToContainer = tabLeftRelativeToContainer + tabRect.width

      const containerWidth = containerRect.width
      const scrollLeft = container.scrollLeft
      const scrollRight = scrollLeft + containerWidth

      if (tabLeftRelativeToContainer < scrollLeft) {
        container.scrollTo({
          left: tabLeftRelativeToContainer - 20,
          behavior: 'smooth'
        })
      } else if (tabRightRelativeToContainer > scrollRight) {
        container.scrollTo({
          left: tabLeftRelativeToContainer - containerWidth + tabRect.width + 20,
          behavior: 'smooth'
        })
      }
    }
  }, [])

  const switchToTabWithScroll = useCallback((tab: string) => {
    setActiveTab(tab as TabType)
    setTimeout(() => {
      scrollToActiveTab(tab)
    }, 0)
  }, [scrollToActiveTab])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as TabType)
    markTabAsViewed(tab)
    setTimeout(() => {
      scrollToActiveTab(tab)
    }, 0)
  }, [markTabAsViewed, scrollToActiveTab])

  return {
    activeTab,
    newContentTabs,
    setNewContentTabs,
    setTabRefs,
    markTabAsViewed,
    scrollToActiveTab,
    switchToTabWithScroll,
    handleTabChange
  }
}
