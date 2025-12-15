import { useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'

export function usePreviewListOperations() {
  const promptStore = usePromptStore()

  const addThinkingPoint = useCallback(() => {
    const state = promptStore.getState()
    const currentPoints = state.promptData.thinkingPoints || []
    promptStore.setState({
      promptData: {
        ...state.promptData,
        thinkingPoints: [...currentPoints, '']
      }
    })
  }, [promptStore])

  const removeThinkingPoint = useCallback((index: number) => {
    const state = promptStore.getState()
    const currentPoints = state.promptData.thinkingPoints || []
    if (index >= 0 && index < currentPoints.length) {
      const newPoints = currentPoints.filter((_, i) => i !== index)
      promptStore.setState({
        promptData: {
          ...state.promptData,
          thinkingPoints: newPoints
        }
      })
    }
  }, [promptStore])

  const addAdviceItem = useCallback(() => {
    const state = promptStore.getState()
    const currentAdvice = state.promptData.advice || []
    promptStore.setState({
      promptData: {
        ...state.promptData,
        advice: [...currentAdvice, '']
      }
    })
  }, [promptStore])

  const removeAdviceItem = useCallback((index: number) => {
    const state = promptStore.getState()
    const currentAdvice = state.promptData.advice || []
    if (index >= 0 && index < currentAdvice.length) {
      const newAdvice = currentAdvice.filter((_, i) => i !== index)
      promptStore.setState({
        promptData: {
          ...state.promptData,
          advice: newAdvice
        }
      })
    }
  }, [promptStore])

  return {
    addThinkingPoint,
    removeThinkingPoint,
    addAdviceItem,
    removeAdviceItem
  }
}
