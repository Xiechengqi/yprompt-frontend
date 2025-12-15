import { useState, useRef, useCallback } from 'react'
import type { MessageAttachment } from '@/stores/promptStore'
import { useNotificationStore } from '@/stores/notificationStore'

export function useChatAttachments() {
  const notificationStore = useNotificationStore()
  const [currentAttachments, setCurrentAttachments] = useState<MessageAttachment[]>([])
  const [isGlobalDragging, setIsGlobalDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    if (files.length > 0) {
      try {
        const { processFiles } = await import('@/utils/fileUtils')
        const result = await processFiles(files)
        
        if (result.attachments.length > 0) {
          setCurrentAttachments(prev => [...prev, ...result.attachments])
        }
        
        if (result.errors.length > 0) {
          result.errors.forEach(error => notificationStore.error(error))
        }
      } catch (error) {
        notificationStore.error('文件处理失败')
      }
      
      event.target.value = ''
    }
  }, [notificationStore])

  const removeAttachment = useCallback((attachmentId: string) => {
    setCurrentAttachments(prev => prev.filter(att => att.id !== attachmentId))
  }, [])

  const clearAttachments = useCallback(() => {
    setCurrentAttachments([])
  }, [])

  const handleGlobalDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer?.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          setIsGlobalDragging(true)
          break
        }
      }
    }
  }, [])

  const handleGlobalDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsGlobalDragging(true)
  }, [])

  const handleGlobalDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX
    const y = event.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsGlobalDragging(false)
    }
  }, [])

  const handleGlobalDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault()
    setIsGlobalDragging(false)
    
    const files = Array.from(event.dataTransfer?.files || [])
    if (files.length > 0) {
      try {
        const { processFiles } = await import('@/utils/fileUtils')
        const result = await processFiles(files)
        
        if (result.attachments.length > 0) {
          setCurrentAttachments(prev => [...prev, ...result.attachments])
        }
        
        if (result.errors.length > 0) {
          result.errors.forEach(error => notificationStore.error(error))
        }
      } catch (error) {
        notificationStore.error('文件处理失败')
      }
    }
  }, [notificationStore])

  return {
    currentAttachments,
    isGlobalDragging,
    fileInputRef,
    triggerFileSelect,
    handleFileSelect,
    removeAttachment,
    clearAttachments,
    handleGlobalDragEnter,
    handleGlobalDragOver,
    handleGlobalDragLeave,
    handleGlobalDrop
  }
}
