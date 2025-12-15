import { useState, useRef, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { copyToClipboard } from '@/utils/clipboardUtils'

export function useChatMessageOperations() {
  const promptStore = usePromptStore()
  const notificationStore = useNotificationStore()
  
  const [editingContent, setEditingContent] = useState<Record<string, string>>({})
  const editTextareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})
  const messageRefs = useRef<Record<string, HTMLElement | null>>({})
  
  const isEditing = Object.keys(editingContent).length > 0

  const setEditTextareaRef = useCallback((messageId: string, el: HTMLTextAreaElement | null) => {
    if (el) {
      editTextareaRefs.current[messageId] = el
    }
  }, [])

  const setMessageRef = useCallback((messageId: string, el: HTMLElement | null) => {
    if (el) {
      messageRefs.current[messageId] = el
    }
  }, [])

  const startEdit = useCallback((messageId: string) => {
    const message = promptStore.chatMessages.find(msg => msg.id === messageId)
    if (message) {
      setEditingContent(prev => ({ ...prev, [messageId]: message.content }))
      promptStore.startEditMessage(messageId)
      
      // 聚焦到textarea
      setTimeout(() => {
        const textarea = editTextareaRefs.current[messageId]
        if (textarea) {
          textarea.focus()
          const length = textarea.value.length
          textarea.setSelectionRange(length, length)
        }
      }, 0)
    }
  }, [promptStore])

  const saveEdit = useCallback((messageId: string) => {
    const newContent = editingContent[messageId]
    if (newContent !== undefined && newContent.trim()) {
      promptStore.saveEditMessage(messageId, newContent)
      setEditingContent(prev => {
        const next = { ...prev }
        delete next[messageId]
        return next
      })
      delete editTextareaRefs.current[messageId]
    } else {
      notificationStore.warning('消息内容不能为空')
    }
  }, [editingContent, promptStore, notificationStore])

  const cancelEdit = useCallback((messageId: string) => {
    promptStore.cancelEditMessage(messageId)
    setEditingContent(prev => {
      const next = { ...prev }
      delete next[messageId]
      return next
    })
    delete editTextareaRefs.current[messageId]
  }, [promptStore])

  const deleteMessage = useCallback((messageId: string) => {
    if (confirm('确定要删除这条消息吗？删除后该消息将不会在后续的AI对话中被考虑。')) {
      promptStore.deleteMessage(messageId)
      notificationStore.success('消息已删除')
    }
  }, [promptStore, notificationStore])

  const copyMessage = useCallback(async (content: string) => {
    try {
      await copyToClipboard(content)
      notificationStore.success('已复制到剪贴板')
    } catch (error) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        notificationStore.success('已复制到剪贴板')
      } catch (fallbackError) {
        notificationStore.error('复制失败，请手动选择复制')
      }
      document.body.removeChild(textArea)
    }
  }, [notificationStore])

  const handleEditKeydown = useCallback((event: React.KeyboardEvent, messageId: string) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      saveEdit(messageId)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      cancelEdit(messageId)
    }
  }, [saveEdit, cancelEdit])

  const updateEditingContent = useCallback((messageId: string, content: string) => {
    setEditingContent(prev => ({ ...prev, [messageId]: content }))
  }, [])

  return {
    editingContent,
    editTextareaRefs,
    messageRefs,
    isEditing,
    setEditTextareaRef,
    setMessageRef,
    startEdit,
    saveEdit,
    cancelEdit,
    deleteMessage,
    copyMessage,
    handleEditKeydown,
    updateEditingContent
  }
}
