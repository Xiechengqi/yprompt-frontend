import { createPortal } from 'react-dom'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useNotificationStore } from '@/stores/notificationStore'
import { useState, useEffect } from 'react'

export default function NotificationContainer() {
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore((state) => state.removeNotification)
  const confirmDialog = useNotificationStore((state) => state.confirmDialog)
  const closeConfirmDialog = useNotificationStore((state) => state.closeConfirmDialog)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  
  const getNotificationClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-white/95 border border-green-200/50 text-green-800 shadow-green-100/50'
      case 'error':
        return 'bg-white/95 border border-red-200/50 text-red-800 shadow-red-100/50'
      case 'warning':
        return 'bg-white/95 border border-yellow-200/50 text-yellow-800 shadow-yellow-100/50'
      case 'info':
        return 'bg-white/95 border border-blue-200/50 text-blue-800 shadow-blue-100/50'
      default:
        return 'bg-white/95 border border-gray-200/50 text-gray-800 shadow-gray-100/50'
    }
  }
  
  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      case 'info':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle
      case 'error':
        return XCircle
      case 'warning':
        return AlertTriangle
      case 'info':
        return Info
      default:
        return Info
    }
  }
  
  // 处理确认对话框的显示/隐藏动画
  useEffect(() => {
    if (confirmDialog) {
      setIsDialogVisible(true)
    } else {
      setIsDialogVisible(false)
    }
  }, [confirmDialog])

  const content = (
    <>
      {/* 通知列表 */}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type)
          return (
            <div
              key={notification.id}
              className={`max-w-sm w-full shadow-xl rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm transform transition-all duration-300 ease-out ${getNotificationClasses(notification.type)}`}
              style={{
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium break-words leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors rounded p-0.5 hover:bg-black/5"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              {/* 进度条 */}
              {notification.duration && notification.duration > 0 && (
                <div className="h-1 bg-black/10 overflow-hidden">
                  <div
                    className="h-full bg-current opacity-30 transition-all linear"
                    style={{
                      animation: `shrink ${notification.duration}ms linear forwards`,
                      animationFillMode: 'forwards'
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 确认对话框 */}
      {confirmDialog && (
        <div 
          className={`fixed bottom-4 right-4 z-[10000] transition-all duration-300 ease-out ${
            isDialogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-sm w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {confirmDialog.type === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 break-words leading-relaxed">
                    {confirmDialog.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  onClick={() => closeConfirmDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {confirmDialog.cancelText || '取消'}
                </button>
                <button
                  onClick={() => closeConfirmDialog(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {confirmDialog.confirmText || '确认'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
  
  return createPortal(content, document.body)
}
