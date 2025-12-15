import { useState, useRef, useCallback } from 'react'

export function useChatInput() {
  const [userInput, setUserInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isComposing, setIsComposing] = useState(false)

  const adjustTextareaHeight = useCallback(() => {
    // 可以在这里实现自动调整高度逻辑
  }, [])

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false)
  }, [])

  const handleKeydown = useCallback((event: React.KeyboardEvent, onSend: () => void) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return
      } else {
        if (isComposing) {
          return
        }
        event.preventDefault()
        onSend()
      }
    }
  }, [isComposing])

  const clearInput = useCallback(() => {
    setUserInput('')
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '80px'
    }
  }, [])

  return {
    userInput,
    setUserInput,
    textareaRef,
    isComposing,
    adjustTextareaHeight,
    handleCompositionStart,
    handleCompositionEnd,
    handleKeydown,
    clearInput
  }
}
