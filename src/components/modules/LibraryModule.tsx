import { useState, useRef } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import PromptList from './library/components/PromptList'
import SavePromptDialog from '@/components/preview/components/dialogs/SavePromptDialog'
import { post } from '@/services/apiService'

function LibraryModule() {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const notificationStore = useNotificationStore()

  // 新建提示词状态
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newPromptContent, setNewPromptContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // 搜索状态
  const [searchKeyword, setSearchKeyword] = useState('')

  // PromptList ref
  const promptListRef = useRef<{ searchWithKeyword: (keyword: string) => void; loadPrompts: () => Promise<void> } | null>(null)

  // 防抖定时器
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 搜索处理（防抖）
  const handleSearch = () => {
    // 清除之前的定时器
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current)
    }

    // 设置新的定时器，500ms后执行搜索
    searchTimerRef.current = setTimeout(() => {
      // 通过ref调用子组件的搜索方法
      if (promptListRef.current) {
        promptListRef.current.searchWithKeyword(searchKeyword)
      }
    }, 500)
  }

  // 创建提示词
  const handleCreatePrompt = async (formData: {
    title: string
    description: string
    tags: string[]
    isPublic: boolean
    promptType: string
    content?: string
  }) => {
    try {
      setIsSaving(true)

      const result = await post('/api/prompts/', {
        title: formData.title,
        description: formData.description,
        final_prompt: formData.content || newPromptContent,
        language: 'zh',
        format: 'markdown',
        prompt_type: formData.promptType,
        tags: formData.tags,
        is_public: formData.isPublic ? 1 : 0
      })

      if (result.code === 200) {
        notificationStore.success('提示词创建成功！', 2000)
        setShowCreateDialog(false)
        setNewPromptContent('')
        // 刷新列表（调用子组件的loadPrompts方法）
        if (promptListRef.current) {
          await promptListRef.current.loadPrompts()
        }
      } else {
        throw new Error(result.message || '创建失败')
      }
    } catch (err: any) {
      console.error('创建提示词失败:', err)
      notificationStore.error(`创建失败: ${err.message}`, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="h-full flex flex-col overflow-hidden p-2">
      {/* 模块特定顶栏（搜索和操作功能） */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4 flex-shrink-0">
        {/* 主要内容区域：搜索和操作 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* 标题 */}
          <div className="min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">模板库</h2>
            <p className="text-sm text-gray-500 mt-1">管理和使用您的提示词模板</p>
          </div>

          {/* 搜索和操作区域 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* 搜索框 */}
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                  handleSearch()
                }}
                type="text"
                placeholder="搜索提示词..."
                className="w-80 pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none"
              />
            </div>

            {/* 操作按钮组 */}
            <div className="flex items-center gap-3">
              {/* 新建按钮 */}
              <button
                onClick={() => setShowCreateDialog(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap text-sm font-medium"
              >
                <span>新建提示词</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* 已登录状态 */}
        {token && user ? (
          <>
            {/* 提示词列表 */}
            <PromptList
              ref={promptListRef}
              searchKeyword={searchKeyword}
              onCreatePrompt={() => setShowCreateDialog(true)}
            />

            {/* 新建提示词对话框 */}
            <SavePromptDialog
              isOpen={showCreateDialog}
              promptContent={newPromptContent}
              isSaving={isSaving}
              onSave={handleCreatePrompt}
              onCancel={() => setShowCreateDialog(false)}
            />
          </>
        ) : (
          /* 未登录状态 */
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <svg className="w-16 h-16 mb-4 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">请先登录</h4>
              <p className="text-gray-600">
                登录后即可访问您的个人提示词库
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LibraryModule
