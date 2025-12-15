import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSettingsStore } from '@/stores/settingsStore'
import { useProviderStore } from '@/stores/providerStore'
import { useOptimizeStore } from '@/stores/optimizeStore'
import { useNotificationStore } from '@/stores/notificationStore'
import OptimizeSectionRedesign from './optimize/components/OptimizeSectionRedesign'
import DiffViewer from './optimize/components/DiffViewer'
import { get } from '@/services/apiService'

// localStorage key
const ACTIVE_MODE_KEY = 'yprompt_optimize_active_mode'

function OptimizeModule() {
  const params = useParams<{ id?: string }>()
  // 使用选择器避免不必要的重渲染
  const loadSettings = useSettingsStore((state) => state.loadSettings)
  const isProviderInitialized = useProviderStore((state) => state.isInitialized)
  const initializeProvider = useProviderStore((state) => state.initialize)
  const optimizeStore = useOptimizeStore()
  const notificationStore = useNotificationStore()

  const [showDiffModal, setShowDiffModal] = useState(false)
  const [activeMode, setActiveMode] = useState<'system' | 'user' | 'compare'>('system')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  // windowWidth 用于响应式布局，暂时未直接使用但保留用于未来扩展
  void windowWidth
  const [, setIsLoadingPrompt] = useState(false)

  const compareTriggerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // 从localStorage恢复activeMode (仅当URL中没有promptId时)
  useEffect(() => {
    if (!params.id) {
      try {
        const savedMode = localStorage.getItem(ACTIVE_MODE_KEY)
        if (savedMode && ['system', 'user', 'compare'].includes(savedMode)) {
          setActiveMode(savedMode as 'system' | 'user' | 'compare')
        }
      } catch (e) {
        console.error('读取activeMode失败:', e)
      }
    }
  }, [params.id])

  // 计算属性
  // const isDesktop = windowWidth >= 1200 // 暂时未使用

  const optimizationModes = [
    { key: 'system' as const, label: '系统提示词优化' },
    { key: 'user' as const, label: '用户提示词优化' },
    { key: 'compare' as const, label: '效果对比' }
  ]

  // 事件处理
  const handleModeChange = (mode: 'system' | 'user' | 'compare') => {
    setActiveMode(mode)
    // 保存到localStorage
    try {
      localStorage.setItem(ACTIVE_MODE_KEY, mode)
    } catch (e) {
      console.error('保存activeMode失败:', e)
    }
  }

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 从"我的"页面加载提示词
  const loadPromptFromLibrary = async (promptId: number) => {
    setIsLoadingPrompt(true)

    try {
      const result = await get<{
        code: number
        message?: string
        data: {
          id: number
          title: string
          prompt_type: string
          final_prompt?: string
          system_prompt?: string
          conversation_history?: string
        }
      }>(`/api/prompts/${promptId}`)

      if (result.code === 200) {
        const prompt = result.data

        console.log('🟢 加载提示词成功:', {
          id: prompt.id,
          title: prompt.title,
          type: prompt.prompt_type,
          final_prompt_length: prompt.final_prompt?.length,
          system_prompt_length: prompt.system_prompt?.length,
          conversation_history_length: prompt.conversation_history?.length
        })

        // 根据prompt_type智能路由
        if (prompt.prompt_type === 'user') {
          // 用户提示词 - 加载到用户提示词优化标签页
          setActiveMode('user')
          optimizeStore.setLoadedPromptId(prompt.id)
          console.log('🔵 用户提示词 - 设置loadedPromptId:', prompt.id)

          // 这里需要通过store或者事件将数据传递给OptimizeSectionRedesign
          // 暂时使用localStorage作为中转
          const userData = {
            draftPrompt: prompt.final_prompt || '',
            systemPrompt: prompt.system_prompt || '',
            conversationHistory: prompt.conversation_history || ''
          }
          console.log('🔵 保存用户提示词数据到localStorage:', userData)
          localStorage.setItem('yprompt_optimize_loaded_user_prompt', JSON.stringify(userData))
        } else {
          // 系统提示词 - 加载到系统提示词优化标签页
          setActiveMode('system')
          optimizeStore.setPrompts(prompt.final_prompt || '', '')
          optimizeStore.setLoadedPromptId(prompt.id)
          console.log('🔵 系统提示词 - 设置loadedPromptId:', prompt.id)
          console.log('🔵 设置系统提示词到store:', prompt.final_prompt?.substring(0, 50))
        }

        // 保存activeMode到localStorage
        localStorage.setItem(ACTIVE_MODE_KEY, activeMode)
      } else {
        throw new Error(result.message || '加载失败')
      }
    } catch (error: any) {
      console.error('加载提示词失败:', error)
      notificationStore.error(`加载失败: ${error.message}`, 3000)
    } finally {
      setIsLoadingPrompt(false)
    }
  }

  // 监听路由变化，加载对应的提示词
  useEffect(() => {
    if (params.id) {
      loadPromptFromLibrary(Number(params.id))
    }
  }, [params.id])

  // 监听对比触发标志和返回优化页面标志
  // 使用 storage 事件监听替代轮询，大幅减少 CPU 使用
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'yprompt_trigger_compare' && e.newValue === 'true') {
        console.log('🟢 检测到对比触发，切换到compare模式')
        setActiveMode('compare')
        localStorage.removeItem('yprompt_trigger_compare')
        localStorage.setItem(ACTIVE_MODE_KEY, 'compare')
      }

      if (e.key === 'yprompt_back_to_optimize' && e.newValue === 'true') {
        console.log('🟢 检测到返回触发，切换回优化模式')
        const savedMode = localStorage.getItem(ACTIVE_MODE_KEY)
        if (savedMode && ['system', 'user'].includes(savedMode)) {
          setActiveMode(savedMode as 'system' | 'user')
        }
        localStorage.removeItem('yprompt_back_to_optimize')
      }
    }

    // 使用 storage 事件监听，避免轮询
    window.addEventListener('storage', handleStorageChange)
    
    // 也监听同窗口内的 localStorage 变化（通过自定义事件）
    const handleCustomStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; newValue: string | null }>
      if (customEvent.detail.key === 'yprompt_trigger_compare' && customEvent.detail.newValue === 'true') {
        console.log('🟢 检测到对比触发，切换到compare模式')
        setActiveMode('compare')
        localStorage.removeItem('yprompt_trigger_compare')
        localStorage.setItem(ACTIVE_MODE_KEY, 'compare')
      }

      if (customEvent.detail.key === 'yprompt_back_to_optimize' && customEvent.detail.newValue === 'true') {
        console.log('🟢 检测到返回触发，切换回优化模式')
        const savedMode = localStorage.getItem(ACTIVE_MODE_KEY)
        if (savedMode && ['system', 'user'].includes(savedMode)) {
          setActiveMode(savedMode as 'system' | 'user')
        }
        localStorage.removeItem('yprompt_back_to_optimize')
      }
    }
    
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener)
      if (compareTriggerIntervalRef.current) {
        clearInterval(compareTriggerIntervalRef.current)
        compareTriggerIntervalRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 只在挂载时设置监听器

  // 初始化设置和模型列表
  useEffect(() => {
    loadSettings()
    if (!isProviderInitialized) {
      initializeProvider()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 只在挂载时执行一次

  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-2">
      {/* 模块特定顶栏 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">提示词优化</h2>
          </div>
        </div>

        {/* 优化模式选择 */}
        <div className="flex space-x-2 mt-4">
          {optimizationModes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => handleModeChange(mode.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeMode === mode.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <OptimizeSectionRedesign
          activeMode={activeMode}
          onUpdateActiveMode={setActiveMode}
        />
      </div>

      {/* Diff查看器模态框 */}
      {showDiffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] w-[90vw] overflow-hidden">
            <DiffViewer
              leftContent={optimizeStore.systemPrompt}
              rightContent={optimizeStore.optimizedPrompts.system}
              leftLabel="原始版本"
              rightLabel="优化版本"
              onClose={() => setShowDiffModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default OptimizeModule
