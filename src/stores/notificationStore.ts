import { create } from 'zustand'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export interface ConfirmDialog {
  id: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'info'
  resolve: (value: boolean) => void
}

interface NotificationState {
  notifications: Notification[]
  confirmDialog: ConfirmDialog | null
  addNotification: (notification: Omit<Notification, 'id'>) => string
  removeNotification: (id: string) => void
  showConfirmDialog: (options: Omit<ConfirmDialog, 'id' | 'resolve'>) => Promise<boolean>
  closeConfirmDialog: (confirmed: boolean) => void
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  warning: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  confirmDialog: null,
  
  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      ...notification,
      duration: notification.duration ?? 3000,
    }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // 自动移除通知
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  },
  
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
  
  showConfirmDialog: (options: Omit<ConfirmDialog, 'id' | 'resolve'>): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = `confirm-${Date.now()}`
      set({
        confirmDialog: {
          id,
          ...options,
          resolve
        }
      })
    })
  },
  
  closeConfirmDialog: (confirmed: boolean) => {
    const dialog = get().confirmDialog
    if (dialog) {
      dialog.resolve(confirmed)
      set({ confirmDialog: null })
    }
  },
  
  success: (message: string, duration?: number) => {
    return get().addNotification({ message, type: 'success', duration })
  },
  
  error: (message: string, duration?: number) => {
    return get().addNotification({ message, type: 'error', duration })
  },
  
  warning: (message: string, duration?: number) => {
    return get().addNotification({ message, type: 'warning', duration })
  },
  
  info: (message: string, duration?: number) => {
    return get().addNotification({ message, type: 'info', duration })
  }
}))
