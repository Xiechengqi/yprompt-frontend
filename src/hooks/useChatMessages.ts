import { useRef, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { marked } from 'marked'

export function useChatMessages() {
  const promptStore = usePromptStore()
  const chatContainer = useRef<HTMLDivElement>(null)

  const renderMarkdown = useCallback((content: string): string => {
    try {
      const result = marked(content, {
        breaks: true,
        gfm: true
      })
      return typeof result === 'string' ? result : String(result)
    } catch (error) {
      return content
    }
  }, [])

  const renderUserMessage = useCallback((content: string): string => {
    try {
      const hasMarkdown = /^#|^\*\*|^##|^\*|^-|\*\*.*\*\*|^1\.|```/.test(content) || 
                         content.includes('**') || content.includes('##') || content.includes('# ')
      
      if (hasMarkdown || content.length > 50) {
        const result = marked(content, {
          breaks: true,
          gfm: true
        })
        return typeof result === 'string' ? result : String(result)
      } else {
        return content.replace(/\n/g, '<br>')
      }
    } catch (error) {
      try {
        const result = marked(content, { breaks: true, gfm: true })
        return typeof result === 'string' ? result : String(result)
      } catch {
        return content.replace(/\n/g, '<br>')
      }
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight
      }
    }, 0)
  }, [])

  const startStreamingMessage = useCallback(() => {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    promptStore.addMessage('ai', '', undefined, { id: messageId })
    const messages = promptStore.chatMessages
    const index = messages.findIndex(msg => msg.id === messageId)
    return index >= 0 ? index : messages.length - 1
  }, [promptStore])

  const updateStreamingMessage = useCallback((index: number, content: string) => {
    const messages = promptStore.chatMessages
    if (index >= 0 && index < messages.length) {
      promptStore.updateMessage(messages[index].id!, content)
    }
  }, [promptStore])

  const simulateTyping = useCallback(async (message: string, isStreaming: boolean = false) => {
    if (isStreaming) {
      const messageIndex = promptStore.chatMessages.length
      promptStore.addMessage('ai', '', undefined)
      
      for (let i = 0; i <= message.length; i++) {
        const messages = promptStore.chatMessages
        if (messages[messageIndex]) {
          promptStore.updateMessage(messages[messageIndex].id!, message.substring(0, i))
        }
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 10))
      }
    } else {
      promptStore.isTyping = true
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100))
      promptStore.isTyping = false
      promptStore.addMessage('ai', message, undefined)
    }
  }, [promptStore])

  return {
    chatContainer,
    renderMarkdown,
    renderUserMessage,
    scrollToBottom,
    startStreamingMessage,
    updateStreamingMessage,
    simulateTyping
  }
}
