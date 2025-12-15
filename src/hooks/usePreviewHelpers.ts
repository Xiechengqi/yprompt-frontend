import { useMemo, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'

export function usePreviewHelpers() {
  const promptStore = usePromptStore()

  const hasAnyContent = useMemo(() => {
    return true // 始终显示，以便用户可以输入需求描述
  }, [])

  const hasConversationData = useMemo(() => {
    return promptStore.chatMessages && promptStore.chatMessages.length > 0
  }, [promptStore.chatMessages])

  const getStepDisplayName = useCallback((step: string): string => {
    const stepNames: { [key: string]: string } = {
      'report': '生成需求报告',
      'thinking': '提取关键指令', 
      'initial': '生成初始提示词',
      'advice': '分析优化建议',
      'final': '合成最终提示词'
    }
    return stepNames[step] || '生成'
  }, [])

  return {
    hasAnyContent,
    hasConversationData,
    getStepDisplayName
  }
}
