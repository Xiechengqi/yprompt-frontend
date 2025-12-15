import { useState, useEffect } from 'react'
import { X, Edit, BarChart3, MessageSquare, FileText, Tag } from 'lucide-react'
import { VersionService, type VersionInfo } from '@/services/versionService'
import { useNotificationStore } from '@/stores/notificationStore'

interface VersionDetailModalProps {
  version: VersionInfo | null
  promptId: number
  onClose: () => void
  onRollback: (version: VersionInfo) => void
}

export default function VersionDetailModal({
  version,
  promptId,
  onClose,
  onRollback
}: VersionDetailModalProps) {
  const notificationStore = useNotificationStore()

  const [versionDetail, setVersionDetail] = useState<VersionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadVersionDetail = async () => {
    if (!version) return

    try {
      setIsLoading(true)
      const result = await VersionService.getVersionDetail(promptId, version.id)

      if (result.code === 200) {
        setVersionDetail(result.data)
      } else {
        throw new Error(result.message || '加载失败')
      }
    } catch (err: any) {
      console.error('加载版本详情失败:', err)
      notificationStore.error(`加载失败: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (version) {
      loadVersionDetail()
    }
  }, [version, promptId])

  const handleRollback = () => {
    if (versionDetail) {
      onRollback(versionDetail)
    }
  }

  const getVersionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      manual: '手动创建',
      auto: '自动保存',
      rollback: '回滚创建',
      import: '导入创建'
    }
    return labels[type] || type
  }

  const getChangeTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      major: '主要更新',
      minor: '次要更新',
      patch: '修订更新'
    }
    return labels[type] || type
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }

  const formatConversationHistory = (history: string) => {
    try {
      // 尝试解析JSON格式的对话历史
      const parsed = JSON.parse(history)
      if (Array.isArray(parsed)) {
        return parsed
          .map((msg: any, index: number) => `[${index + 1}] ${msg.role}: ${msg.content}`)
          .join('\n\n')
      }
      return history
    } catch {
      // 如果不是JSON，直接返回原始内容
      return history
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">版本详情</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="关闭">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>加载中...</span>
              </div>
            </div>
          ) : versionDetail ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">v{versionDetail.version_number}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">创建时间：</span>
                    <span className="text-gray-900">{formatDateTime(versionDetail.create_time)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">创建者：</span>
                    <span className="text-gray-900">{versionDetail.author_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">版本类型：</span>
                    <span className="text-gray-900">{getVersionTypeLabel(versionDetail.version_type)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">变更类型：</span>
                    <span className="text-gray-900">{getChangeTypeLabel(versionDetail.change_type)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  变更说明
                </h4>
                <p className="text-sm text-gray-700">{versionDetail.change_summary || '无'}</p>
                {versionDetail.change_log && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700 whitespace-pre-wrap">
                    {versionDetail.change_log}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  统计信息
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">内容大小：</span>
                    <span className="text-gray-900">{formatSize(versionDetail.content_size)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">使用次数：</span>
                    <span className="text-gray-900">{versionDetail.use_count} 次</span>
                  </div>
                  <div>
                    <span className="text-gray-600">回滚次数：</span>
                    <span className="text-gray-900">{versionDetail.rollback_count} 次</span>
                  </div>
                </div>
              </div>

              {/* 用户提示词上下文（仅用户提示词显示） */}
              {(versionDetail.system_prompt || versionDetail.conversation_history) && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    用户提示词上下文
                  </h4>

                  {/* 系统提示词 */}
                  {versionDetail.system_prompt && (
                    <div className="mb-4">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">系统提示词</h5>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                          {versionDetail.system_prompt}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* 对话历史 */}
                  {versionDetail.conversation_history && (
                    <div className="mb-4">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">对话历史</h5>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                          {formatConversationHistory(versionDetail.conversation_history)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {versionDetail.system_prompt || versionDetail.conversation_history ? '用户提示词内容' : '提示词内容'}
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {versionDetail.final_prompt || '无内容'}
                  </pre>
                </div>
              </div>

              {versionDetail.tags && versionDetail.tags.length > 0 && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {versionDetail.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            关闭
          </button>
          <button
            onClick={handleRollback}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            回滚到此版本
          </button>
        </div>
      </div>
    </div>
  )
}
