import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigationStore } from '@/stores/navigationStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { copyToClipboard } from '@/utils/clipboardUtils'
import PromptDetailModal from './PromptDetailModal'
import VersionHistoryPanel from './VersionHistoryPanel'
import type { PromptListItem } from '@/types/prompt'
import { get, del } from '@/services/apiService'

interface PromptListProps {
  searchKeyword: string
  onCreatePrompt: () => void
}

export interface PromptListRef {
  searchWithKeyword: (keyword: string) => void
  loadPrompts: () => Promise<void>
}

const PromptList = forwardRef<PromptListRef, PromptListProps>(({ searchKeyword }, ref) => {
  const navigate = useNavigate()
  const navigationStore = useNavigationStore()
  const notificationStore = useNotificationStore()

  // 数据状态
  const [prompts, setPrompts] = useState<PromptListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [total, setTotal] = useState(0)

  // 搜索和筛选
  const [selectedTag] = useState('')
  const [sortBy] = useState('create_time')
  const [onlyFavorites] = useState('0')
  const [, setAvailableTags] = useState<string[]>([])

  // UI状态
  const [showActionMenu, setShowActionMenu] = useState<Record<number, boolean>>({})
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<PromptListItem | null>(null)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [selectedPromptForVersion, setSelectedPromptForVersion] = useState<PromptListItem | null>(null)

  // 内部搜索关键词状态
  const [internalSearchKeyword, setInternalSearchKeyword] = useState('')

  // 计算总页数
  const totalPages = Math.ceil(total / pageSize)

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    searchWithKeyword: (keyword: string) => {
      setInternalSearchKeyword(keyword)
      setCurrentPage(1)
      loadPrompts()
    },
    loadPrompts
  }))

  // 监听搜索关键词变化
  useEffect(() => {
    if (searchKeyword !== internalSearchKeyword) {
      setInternalSearchKeyword(searchKeyword)
      setCurrentPage(1)
      loadPrompts()
    }
  }, [searchKeyword])

  // 加载提示词列表
  const loadPrompts = async () => {
    try {
      setIsLoading(true)

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString(),
        keyword: internalSearchKeyword,
        tag: selectedTag,
        sort: sortBy,
        is_favorite: onlyFavorites
      })

      const result = await get<{
        code: number
        message?: string
        data: {
          items: PromptListItem[]
          total: number
        }
      }>(`/api/prompts/?${params}`)

      if (result.code === 200) {
        setPrompts(result.data.items.map((item: any) => ({
          ...item,
          final_prompt: item.final_prompt || '',
          current_version: item.current_version || '1.0.0'
        })))
        setTotal(result.data.total)

        // 提取所有可用标签
        const allTags = new Set<string>()
        result.data.items.forEach((prompt: PromptListItem) => {
          if (prompt.tags) {
            const tags = Array.isArray(prompt.tags) ? prompt.tags : []
            tags.forEach((tag: string) => allTags.add(tag))
          }
        })
        setAvailableTags(Array.from(allTags).sort())
      } else {
        throw new Error(result.message || '加载失败')
      }
    } catch (err: any) {
      console.error('加载提示词列表失败:', err)
      notificationStore.error(`加载失败: ${err.message}`, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  // 分页
  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    loadPrompts()
  }, [currentPage, selectedTag, sortBy, onlyFavorites])

  // 查看详情
  const handleViewPrompt = async (prompt: PromptListItem) => {
    try {
      const result = await get<{
        code: number
        message?: string
        data: PromptListItem
      }>(`/api/prompts/${prompt.id}`)

      if (result.code === 200) {
        setSelectedPrompt(result.data)
        setShowDetailModal(true)
      }
    } catch (err) {
      console.error('获取提示词详情失败:', err)
      // 即使失败也显示弹窗（使用列表中的数据）
      setSelectedPrompt(prompt)
      setShowDetailModal(true)
    }
  }

  // 编辑提示词
  const handleEditPrompt = (prompt: PromptListItem) => {
    setSelectedPrompt(prompt)
    setShowDetailModal(true)

    // 直接设置延时来触发编辑
    setTimeout(() => {
      const editBtn = document.querySelector('button[data-edit="prompt-detail"]') as HTMLElement
      if (editBtn) {
        editBtn.click()
      }
    }, 100)
  }

  // 提示词更新完成回调
  const handlePromptUpdated = (updatedPrompt: PromptListItem) => {
    // 更新列表中对应的数据
    setPrompts((prev) => prev.map((p) => (p.id === updatedPrompt.id ? { ...updatedPrompt } : p)))
    // 关闭模态框
    setShowDetailModal(false)
  }

  // 优化提示词
  const handleOptimizePrompt = (prompt: PromptListItem) => {
    navigationStore.setCurrentModule('optimize')
    navigate(`/optimize/${prompt.id}`)
    setShowDetailModal(false)
  }

  // 复制提示词
  const handleCopyPrompt = async (prompt: PromptListItem) => {
    try {
      await copyToClipboard(prompt.final_prompt)
      notificationStore.success('提示词已复制到剪贴板', 2000)
    } catch (err) {
      console.error('复制失败:', err)
      notificationStore.error('复制失败', 2000)
    }
  }

  // 显示版本历史
  const handleShowVersionHistory = (prompt: PromptListItem) => {
    setSelectedPromptForVersion(prompt)
    setShowVersionHistory(true)
    setShowActionMenu({})
  }

  // 处理版本回滚完成
  const handleVersionRollback = () => {
    // 不显示通知，版本组件已经显示过了
    loadPrompts()
  }

  // 删除提示词
  const handleDeletePrompt = async (prompt: PromptListItem) => {
    if (!confirm(`确定要删除提示词"${prompt.title}"吗？此操作不可恢复。`)) {
      return
    }

    try {
      const result = await del(`/api/prompts/${prompt.id}`)

      if (result.code === 200) {
        notificationStore.success('删除成功', 2000)
        loadPrompts()
      } else {
        throw new Error(result.message || '删除失败')
      }
    } catch (err: any) {
      console.error('删除提示词失败:', err)
      notificationStore.error(`删除失败: ${err.message}`, 3000)
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.relative.group')) {
        setShowActionMenu({})
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="h-full flex flex-col">
      {/* 提示词列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 加载状态 */}
        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>加载中...</span>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!isLoading && prompts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {internalSearchKeyword || selectedTag ? '没有找到匹配的提示词' : '还没有保存的提示词'}
            </h3>
            <p className="text-gray-600 mb-4">
              {internalSearchKeyword || selectedTag ? '请尝试其他搜索条件' : '去生成页面创建您的第一个提示词吧！'}
            </p>
            <a
              href="/generate"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              开始生成
            </a>
          </div>
        )}

        {/* 提示词卡片列表 */}
        {!isLoading && prompts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewPrompt(prompt)}
              >
                {/* 头部：标题和类型标签 */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 truncate mb-1">{prompt.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 h-10">{prompt.description || '暂无描述'}</p>
                  </div>
                  {/* 提示词类型标签（固定右端） */}
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded border flex-shrink-0 ${
                      prompt.prompt_type === 'system'
                        ? 'bg-purple-100 text-purple-700 border-purple-200'
                        : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}
                  >
                    {prompt.prompt_type === 'system' ? '系统' : '用户'}
                  </span>
                </div>

                {/* 内容预览 */}
                <div className="text-sm text-gray-700 mb-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md border border-gray-200">
                  <div className="line-clamp-2 h-10 font-mono text-xs leading-relaxed">
                    {prompt.final_prompt ? (
                      <>
                        {prompt.final_prompt.slice(0, 150)}
                        {prompt.final_prompt.length > 150 ? '...' : ''}
                      </>
                    ) : (
                      <span className="text-gray-400 italic">暂无提示词内容</span>
                    )}
                  </div>
                </div>

                {/* 底部：统计信息和操作按钮 */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  {/* 统计信息 */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {prompt.view_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {prompt.use_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      v{prompt.current_version || '1.0.0'}
                    </span>
                    <span className="text-gray-400">
                      • {formatDate(prompt.update_time || prompt.create_time)}
                    </span>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-1">
                    {/* 复制按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyPrompt(prompt)
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="复制"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>

                    {/* 更多操作 */}
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowActionMenu((prev) => ({
                            ...prev,
                            [prompt.id]: !prev[prompt.id]
                          }))
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="更多操作"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>

                      {/* 下拉菜单 */}
                      {showActionMenu[prompt.id] && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditPrompt(prompt)
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            编辑
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOptimizePrompt(prompt)
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            优化
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShowVersionHistory(prompt)
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            版本历史
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePrompt(prompt)
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            删除
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 标签 - 固定在底部 */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(prompt.tags) ? (
                      prompt.tags.map((tag) => (
                        <span key={tag} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">暂无标签</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>

            <span className="text-sm text-gray-600">
              第 {currentPage} 页，共 {totalPages} 页
            </span>

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        )}
      </div>

      {/* 提示词详情弹窗 */}
      {showDetailModal && selectedPrompt && (
        <PromptDetailModal
          prompt={selectedPrompt}
          onClose={() => setShowDetailModal(false)}
          onEdit={handlePromptUpdated}
          onOptimize={handleOptimizePrompt}
          onRollback={handleVersionRollback}
        />
      )}

      {showVersionHistory && selectedPromptForVersion && (
        <VersionHistoryPanel
          isOpen={showVersionHistory}
          promptId={selectedPromptForVersion.id}
          onClose={() => setShowVersionHistory(false)}
          onRollback={handleVersionRollback}
        />
      )}
    </div>
  )
})

PromptList.displayName = 'PromptList'

export default PromptList
