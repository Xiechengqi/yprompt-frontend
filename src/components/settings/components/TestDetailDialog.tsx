import { useState, useEffect, useRef } from 'react'
import { Info, Send, Reply, Copy, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'
import { useNotificationStore } from '@/stores/notificationStore'
import { createPortal } from 'react-dom'

interface RequestInfo {
  url: string
  method: string
  headers: Record<string, string>
  body: any
}

interface ResponseInfo {
  status?: number
  statusText?: string
  headers?: Record<string, string>
  body?: any
}

interface TestDetailDialogProps {
  visible: boolean
  providerName: string
  modelId: string
  status: 'success' | 'error' | 'timeout' | 'testing'
  requestInfo?: RequestInfo
  responseInfo?: ResponseInfo
  errorMessage?: string
  testTime?: string
  duration?: number
  onClose: () => void
}

export default function TestDetailDialog({
  visible,
  providerName,
  modelId,
  status,
  requestInfo,
  responseInfo,
  errorMessage,
  testTime,
  duration,
  onClose
}: TestDetailDialogProps) {
  const notificationStore = useNotificationStore()
  const [isMinimized, setIsMinimized] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const dialogRef = useRef<HTMLDivElement>(null)
  const minimizedRef = useRef<HTMLDivElement>(null)
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mouseLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (visible) {
      setIsMinimized(false)
      setCountdown(5)
      clearTimers()
    } else {
      clearTimers()
    }
  }, [visible])

  useEffect(() => {
    if (isMinimized && visible) {
      startCountdown()
    }
    return () => clearTimers()
  }, [isMinimized, visible])

  const clearTimers = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
    if (mouseLeaveTimerRef.current) {
      clearTimeout(mouseLeaveTimerRef.current)
      mouseLeaveTimerRef.current = null
    }
  }

  const handleMouseEnter = () => {
    if (isMinimized) {
      setIsMinimized(false)
      clearTimers()
      setCountdown(5)
    }
    if (mouseLeaveTimerRef.current) {
      clearTimeout(mouseLeaveTimerRef.current)
      mouseLeaveTimerRef.current = null
    }
  }

  const handleMouseLeave = () => {
    mouseLeaveTimerRef.current = setTimeout(() => {
      if (!isMinimized) {
        setIsMinimized(true)
      }
    }, 300)
  }

  const expandDialog = () => {
    setIsMinimized(false)
    clearTimers()
    setCountdown(5)
  }

  const startCountdown = () => {
    clearTimers()
    setCountdown(5)
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleClose = () => {
    clearTimers()
    onClose()
  }

  const formatJSON = (obj: any): string => {
    try {
      return JSON.stringify(obj, null, 2)
    } catch {
      return String(obj)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      notificationStore.success('已复制到剪贴板', 1500)
    } catch (error) {
      notificationStore.error('复制失败', 2000)
    }
  }

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700'
      case 'error':
        return 'bg-red-100 text-red-700'
      case 'timeout':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'success':
        return '成功'
      case 'error':
        return '失败'
      case 'timeout':
        return '超时'
      default:
        return '测试中'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle
      case 'error':
        return XCircle
      case 'timeout':
        return Clock
      default:
        return Loader2
    }
  }

  const getStatusIconBgClass = (status: string): string => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'timeout':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (!visible) return null

  const StatusIcon = getStatusIcon(status)

  const content = (
    <>
      {/* 完整弹窗 */}
      {!isMinimized && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-end pointer-events-none"
          style={{ display: visible ? 'flex' : 'none' }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div
            ref={dialogRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto transform transition-all duration-300 ease-out border border-white/20"
          >
            {/* 头部 */}
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-t-3xl">
              <div className="relative flex items-center gap-3 z-10">
                <div
                  className={`w-3 h-3 rounded-full shadow-lg ${
                    status === 'success'
                      ? 'bg-green-500 shadow-green-500/50'
                      : status === 'error'
                      ? 'bg-red-500 shadow-red-500/50'
                      : status === 'timeout'
                      ? 'bg-yellow-500 shadow-yellow-500/50'
                      : 'bg-gray-400 shadow-gray-400/50'
                  }`}
                ></div>
                <h3 className="text-lg font-semibold text-gray-900">测试详情</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm ${getStatusBadgeClass(status)}`}>
                  {getStatusText(status)}
                </span>
              </div>
              <div className="relative flex items-center gap-2 text-xs text-gray-500 z-10">
                <span className="hidden sm:inline">移出自动缩小</span>
                <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse"></div>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-white/95 to-white/90">
              {/* 基本信息 */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  基本信息
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">提供商:</span>
                    <span className="text-gray-900 font-medium">{providerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">模型ID:</span>
                    <span className="text-gray-900 font-mono text-xs">{modelId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">测试时间:</span>
                    <span className="text-gray-900">{testTime || new Date().toLocaleString('zh-CN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">耗时:</span>
                    <span className="text-gray-900">{duration || 0}ms</span>
                  </div>
                </div>
              </div>

              {/* 请求信息 */}
              {requestInfo && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    请求信息
                  </h4>
                  <div className="bg-blue-50 rounded-lg border border-blue-200">
                    <div className="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-800">URL</span>
                        <button
                          onClick={() => copyToClipboard(requestInfo.url || '')}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                          title="复制URL"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="px-4 py-2">
                      <code className="text-xs text-blue-900 break-all">{requestInfo.url || 'N/A'}</code>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg border border-blue-200">
                    <div className="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-800">请求头</span>
                        <button
                          onClick={() => copyToClipboard(formatJSON(requestInfo.headers || {}))}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                          title="复制请求头"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <pre className="px-4 py-2 text-xs text-blue-900 overflow-x-auto">
                      <code>{formatJSON(requestInfo.headers || {})}</code>
                    </pre>
                  </div>
                  <div className="bg-blue-50 rounded-lg border border-blue-200">
                    <div className="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-800">请求体</span>
                        <button
                          onClick={() => copyToClipboard(formatJSON(requestInfo.body || {}))}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                          title="复制请求体"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <pre className="px-4 py-2 text-xs text-blue-900 overflow-x-auto max-h-60 overflow-y-auto">
                      <code>{formatJSON(requestInfo.body || {})}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* 响应信息 */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Reply className="w-4 h-4" />
                  响应信息
                </h4>
                {responseInfo && (
                  <>
                    <div className="bg-green-50 rounded-lg border border-green-200">
                      <div className="px-4 py-2 border-b border-green-200 bg-green-100/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-green-800">状态码</span>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded ${
                              responseInfo.status
                                ? responseInfo.status >= 200 && responseInfo.status < 300
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {responseInfo.status || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {responseInfo.headers && (
                      <div className="bg-green-50 rounded-lg border border-green-200">
                        <div className="px-4 py-2 border-b border-green-200 bg-green-100/50">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-800">响应头</span>
                            <button
                              onClick={() => copyToClipboard(formatJSON(responseInfo.headers || {}))}
                              className="text-green-600 hover:text-green-800 text-xs"
                              title="复制响应头"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <pre className="px-4 py-2 text-xs text-green-900 overflow-x-auto">
                          <code>{formatJSON(responseInfo.headers)}</code>
                        </pre>
                      </div>
                    )}
                    {responseInfo.body && (
                      <div className="bg-green-50 rounded-lg border border-green-200">
                        <div className="px-4 py-2 border-b border-green-200 bg-green-100/50">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-800">响应体</span>
                            <button
                              onClick={() => copyToClipboard(formatJSON(responseInfo.body || {}))}
                              className="text-green-600 hover:text-green-800 text-xs"
                              title="复制响应体"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <pre className="px-4 py-2 text-xs text-green-900 overflow-x-auto max-h-60 overflow-y-auto">
                          <code>{formatJSON(responseInfo.body)}</code>
                        </pre>
                      </div>
                    )}
                  </>
                )}
                {errorMessage && (
                  <div className="px-4 py-2 text-xs text-red-700 bg-red-50 rounded">
                    <strong>错误信息:</strong> {errorMessage}
                  </div>
                )}
              </div>
            </div>

            {/* 底部提示栏 */}
            <div className="px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-b-3xl flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Info className="w-3.5 h-3.5" />
                <span>鼠标移出弹窗将自动缩小，5秒后自动关闭</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 缩小后的状态图标 */}
      {isMinimized && (
        <div
          ref={minimizedRef}
          onMouseEnter={handleMouseEnter}
          onClick={expandDialog}
          className="fixed bottom-4 right-4 z-[10000] pointer-events-auto cursor-pointer group"
        >
          <div
            className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/30 hover:scale-110 hover:shadow-3xl ${getStatusIconBgClass(status)}`}
          >
            <StatusIcon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          {countdown > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs flex items-center justify-center font-bold shadow-lg border-2 border-white/50 backdrop-blur-sm">
              {countdown}
            </div>
          )}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            点击展开详情
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
          </div>
        </div>
      )}
    </>
  )

  return createPortal(content, document.body)
}
