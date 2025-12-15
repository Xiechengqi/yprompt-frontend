import { useState, useCallback } from 'react'

export interface ConversationMessage {
  id: string
  role: 'ai' | 'user'
  content: string
  isEditing?: boolean
}

export function useConversationMessages() {
  const [messages, setMessages] = useState<ConversationMessage[]>([])

  const addMessage = useCallback((role: 'ai' | 'user' = 'user') => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role,
      content: '',
      isEditing: false
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg))
    )
  }, [])

  const updateMessageRole = useCallback((id: string, role: 'ai' | 'user') => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, role } : msg))
    )
  }, [])

  const startEdit = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, isEditing: msg.id === id }))
    )
  }, [])

  const cancelEdit = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isEditing: false } : msg))
    )
  }, [])

  const formatForAI = useCallback((): string => {
    if (messages.length === 0) return ''

    return messages
      .filter((msg) => msg.content.trim())
      .map((msg) => {
        const label = msg.role === 'ai' ? 'AI助手' : '用户'
        return `${label}: ${msg.content}`
      })
      .join('\n\n')
  }, [messages])

  const reset = useCallback(() => {
    setMessages([])
  }, [])

  const setMessagesState = useCallback((newMessages: ConversationMessage[]) => {
    setMessages(newMessages)
  }, [])

  return {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    updateMessageRole,
    startEdit,
    cancelEdit,
    formatForAI,
    reset,
    setMessagesState
  }
}
