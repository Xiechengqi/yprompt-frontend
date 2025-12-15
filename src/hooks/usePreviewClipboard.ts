import { useState, useCallback } from 'react'
import { useNotificationStore } from '@/stores/notificationStore'
import { copyToClipboard as copyUtil } from '@/utils/clipboardUtils'

export function usePreviewClipboard() {
  const notificationStore = useNotificationStore()
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({
    report: false,
    thinking: false,
    initial: false,
    advice: false,
    final: false
  })

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    if (!text || text.trim() === '') {
      notificationStore.warning('内容为空，无法复制')
      return
    }

    try {
      await copyUtil(text)
      setCopyStatus(prev => ({ ...prev, [key]: true }))
      notificationStore.success('已复制到剪贴板')
      
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (error) {
      notificationStore.error('复制失败，请重试')
    }
  }, [notificationStore])

  return {
    copyStatus,
    copyToClipboard
  }
}
