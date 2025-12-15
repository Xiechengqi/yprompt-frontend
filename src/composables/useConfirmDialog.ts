import { useNotificationStore } from '@/stores/notificationStore'

interface ConfirmDialogOptions {
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'info'
}

/**
 * 确认对话框 Hook
 * 显示右下角友好的确认提示，返回 Promise<boolean>
 */
export function useConfirmDialog() {
  const showConfirmDialog = useNotificationStore((state) => state.showConfirmDialog)

  const confirm = (options: ConfirmDialogOptions): Promise<boolean> => {
    return showConfirmDialog(options)
  }

  return { confirm }
}
