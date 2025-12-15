import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { usePromptStore } from '@/stores/promptStore'

export function useChatQuickReplies(inputContainerRef: React.RefObject<HTMLElement>) {
  const promptStore = usePromptStore()
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const quickRepliesContainerRef = useRef<HTMLDivElement>(null)

  const quickReplies = useMemo(() => {
    const messageCount = promptStore.chatMessages.length
    const baseReplies = ['请使用相关最佳实践的推荐建议']
    
    if (messageCount >= 6) {
      const hasReport = !!promptStore.promptData.requirementReport
      const actionText = hasReport ? '重新生成需求报告' : '强制生成需求报告'
      return [...baseReplies, actionText]
    }
    
    return baseReplies
  }, [promptStore.chatMessages.length, promptStore.promptData.requirementReport])

  const shouldShowQuickReplies = useMemo(() => {
    return promptStore.chatMessages.length >= 2 && showQuickReplies
  }, [promptStore.chatMessages.length, showQuickReplies])

  const checkForceGenerate = useCallback((userInput: string): boolean => {
    const forceKeywords = ['强制生成需求报告', '重新生成需求报告']
    return forceKeywords.some(keyword => userInput.includes(keyword))
  }, [])

  const selectQuickReply = useCallback((reply: string, onSelect: (reply: string) => void) => {
    onSelect(reply)
    setShowQuickReplies(false)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node
    
    // 检查是否点击在输入区域内
    if (inputContainerRef.current?.contains(target)) {
      return
    }
    
    // 检查是否点击在快捷回复区域内
    if (quickRepliesContainerRef.current?.contains(target)) {
      return
    }
    
    // 点击在外部，隐藏快捷回复
    setShowQuickReplies(false)
  }, [inputContainerRef])

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return {
    showQuickReplies,
    setShowQuickReplies,
    quickReplies,
    quickRepliesContainerRef,
    shouldShowQuickReplies,
    checkForceGenerate,
    selectQuickReply
  }
}
