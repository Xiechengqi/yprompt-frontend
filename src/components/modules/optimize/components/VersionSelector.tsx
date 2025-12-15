import { useState, useMemo } from 'react'
import { X, Clock, RotateCcw } from 'lucide-react'
import { useOptimizeStore } from '@/stores/optimizeStore'
import type { Version } from '@/stores/optimizeStore'

export default function VersionSelector() {
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  const optimizeStore = useOptimizeStore()
  const {
    versions,
    currentVersion,
    currentVersionData,
    systemPrompt,
    userPrompt,
    switchVersion: storeSwitchVersion
  } = optimizeStore

  // 计算显示的版本（最多显示5个）
  const displayVersions = useMemo(() => {
    const allVersions = [
      { version: 'original', tag: 'initial' as const, createdAt: new Date() },
      ...versions
    ]
    return allVersions.slice(-5).reverse()
  }, [versions])

  const switchVersion = (version: string) => {
    storeSwitchVersion(version)
    setShowVersionHistory(false)
  }

  const rollbackToVersion = () => {
    // 这里可以添加回滚逻辑，比如创建一个新的回滚版本
    console.log('Rollback to version:', currentVersion)
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTagLabel = (tag: string) => {
    const labels: Record<string, string> = {
      'initial': '初始',
      'draft': '草稿',
      'beta': '测试',
      'stable': '稳定',
      'production': '生产',
      'archived': '归档',
      'rollback': '回滚'
    }
    return labels[tag] || tag
  }

  const getTagClass = (tag: string) => {
    const classes: Record<string, string> = {
      'initial': 'bg-gray-100 text-gray-600',
      'draft': 'bg-yellow-100 text-yellow-600',
      'beta': 'bg-blue-100 text-blue-600',
      'stable': 'bg-green-100 text-green-600',
      'production': 'bg-purple-100 text-purple-600',
      'archived': 'bg-gray-100 text-gray-600',
      'rollback': 'bg-orange-100 text-orange-600'
    }
    return classes[tag] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="version-selector">
      {/* 版本选择器 */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium text-gray-700">版本:</span>
        <div className="flex flex-wrap gap-1">
          {displayVersions.map((version) => (
            <button
              key={version.version}
              onClick={() => switchVersion(version.version)}
              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                currentVersion === version.version
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {version.version}
              {version.tag && (
                <span className="ml-1 text-xs opacity-70">
                  {getTagLabel(version.tag)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 版本信息 */}
      {currentVersionData && (
        <div className="text-xs text-gray-500 space-y-1">
          {currentVersionData.createdAt && (
            <div>创建时间: {formatDate(currentVersionData.createdAt)}</div>
          )}
          {currentVersionData.note && (
            <div>备注: {currentVersionData.note}</div>
          )}
          {currentVersionData.appliedSuggestions?.length > 0 && (
            <div>应用了 {currentVersionData.appliedSuggestions.length} 条建议</div>
          )}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center space-x-2 mt-3">
        <button
          onClick={() => setShowVersionHistory(true)}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Clock className="w-3 h-3" />
          历史版本
        </button>
        {currentVersion !== 'original' && (
          <button
            onClick={rollbackToVersion}
            className="text-xs text-gray-600 hover:text-gray-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            回滚到此版本
          </button>
        )}
      </div>

      {/* 版本历史模态框 */}
      {showVersionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">版本历史</h3>
              <button
                onClick={() => setShowVersionHistory(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* 原始版本 */}
              <div
                onClick={() => switchVersion('original')}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  currentVersion === 'original'
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">原始版本</span>
                    <span className="text-xs text-gray-500">Initial</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(new Date(systemPrompt || userPrompt))}
                  </div>
                </div>
              </div>

              {/* 历史版本 */}
              {[...versions].reverse().map((version) => (
                <div
                  key={version.id}
                  onClick={() => switchVersion(version.version)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    currentVersion === version.version
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{version.version}</span>
                      {version.tag && (
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getTagClass(version.tag)}`}
                        >
                          {getTagLabel(version.tag)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(version.createdAt)}
                    </div>
                  </div>
                  {version.note && (
                    <div className="text-sm text-gray-600 mt-1">{version.note}</div>
                  )}
                  {version.changes?.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {version.changes.length} 处修改
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}