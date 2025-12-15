import { useState, useEffect } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useNotificationStore } from '@/stores/notificationStore'
import SettingsButton from './components/SettingsButton'
import SettingsHeader from './components/SettingsHeader'
import ProvidersTab from './components/tabs/ProvidersTab'
import ModelParamsTab from './components/tabs/ModelParamsTab'
import PromptsTab from './components/tabs/PromptsTab'
import { usePromptRules } from './composables/usePromptRules'

export default function SettingsModal() {
  // 使用 selector 确保组件能响应 store 的变化
  // 直接订阅 providers 数组，而不是 getter，以确保响应式更新
  const providers = useProviderStore((state) => state.providers)
  const lastRefreshedAt = useProviderStore((state) => state.lastRefreshedAt)
  const isLoading = useProviderStore((state) => state.isLoading)
  const isInitialized = useProviderStore((state) => state.isInitialized)
  const error = useProviderStore((state) => state.error)
  const refreshProviders = useProviderStore((state) => state.refreshProviders)
  
  const settingsStore = useSettingsStore()
  const showSettings = useSettingsStore((state) => state.showSettings)
  const setShowSettings = useSettingsStore((state) => state.setShowSettings)
  const notificationStore = useNotificationStore()
  const promptRules = usePromptRules()

  const [activeTab, setActiveTab] = useState<'providers' | 'params' | 'prompts'>('providers')

  useEffect(() => {
    // 只在未初始化时调用
    if (!isInitialized) {
      useProviderStore.getState().initialize()
    }
    settingsStore.loadSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]) // 依赖 isInitialized

  useEffect(() => {
    if (activeTab === 'prompts') {
      settingsStore.openPromptEditor('system')
    } else if (activeTab === 'params') {
      // 切换到模型参数标签时，确保设置已加载
      settingsStore.loadSettings()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]) // 只依赖 activeTab

  const handleRefreshConfig = async () => {
    try {
      console.log('[SettingsModal] 开始刷新配置...')
      await refreshProviders()
      
      // 等待一下，确保状态已更新
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 从 store 获取最新状态
      const currentProviders = useProviderStore.getState().providers
      const currentError = useProviderStore.getState().error
      
      console.log('[SettingsModal] 刷新后的 providers:', currentProviders)
      console.log('[SettingsModal] providers 数量:', currentProviders.length)
      
      if (currentProviders.length === 0) {
        if (currentError) {
          notificationStore.error(`刷新配置失败: ${currentError}`)
        } else {
          notificationStore.warning(
            '配置已刷新，但未找到任何 AI 模型配置。\n' +
            '请检查：\n' +
            '1. 后端 .setting.json 文件是否存在（应在项目根目录）\n' +
            '2. .setting.json 文件中是否包含 providers 数组\n' +
            '3. 查看浏览器控制台获取详细日志'
          )
        }
      } else {
        notificationStore.success(`配置已刷新，共加载 ${currentProviders.length} 个 AI 模型`)
      }
    } catch (error: any) {
      console.error('[SettingsModal] 刷新配置失败:', error)
      console.error('[SettingsModal] 错误堆栈:', error.stack)
      notificationStore.error(`刷新配置失败: ${error.message || '未知错误'}`)
    }
  }

  if (!showSettings) {
    return <SettingsButton onOpen={() => setShowSettings(true)} />
  }

  return (
    <>
      <SettingsButton onOpen={() => setShowSettings(true)} />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full h-[85vh] overflow-hidden flex flex-col">
          <div className="p-6">
            <SettingsHeader
              activeTab={activeTab}
              onActiveTabChange={setActiveTab}
              onClose={() => setShowSettings(false)}
            />
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {activeTab === 'providers' && (
              <ProvidersTab
                providers={providers}
                lastRefreshedAt={lastRefreshedAt}
                isLoading={isLoading}
                onRefreshConfig={handleRefreshConfig}
              />
            )}
            
            {/* 调试信息 - 开发环境显示 */}
            {import.meta.env.DEV && activeTab === 'providers' && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs space-y-1">
                <p className="font-semibold">调试信息:</p>
                <p>Providers 数量: {providers.length}</p>
                <p>已初始化: {isInitialized ? '是' : '否'}</p>
                <p>加载中: {isLoading ? '是' : '否'}</p>
                <p>API URL: {import.meta.env.VITE_API_BASE_URL || '未设置'}</p>
                {error && (
                  <p className="text-red-600 font-semibold">错误: {error}</p>
                )}
                {lastRefreshedAt && (
                  <p>上次刷新: {lastRefreshedAt.toLocaleString()}</p>
                )}
                {providers.length === 0 && !error && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-semibold text-yellow-800">提示:</p>
                    <p className="text-yellow-700">
                      1. 打开浏览器控制台（F12）查看详细日志
                    </p>
                    <p className="text-yellow-700">
                      2. 检查后端 .setting.json 文件路径是否正确
                    </p>
                    <p className="text-yellow-700">
                      3. 确认 .setting.json 中包含 providers 数组
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'params' && <ModelParamsTab />}

            {activeTab === 'prompts' && (
              <PromptsTab
                onResetSystem={promptRules.resetSystemPromptRules}
                onResetUser={promptRules.resetUserPromptRules}
                onResetRequirement={promptRules.resetRequirementReportRules}
                onResetQualityAnalysisSystem={promptRules.resetQualityAnalysisSystemPrompt}
                onResetThinking={promptRules.resetThinkingPointsExtractionPrompt}
                onResetGeneration={promptRules.resetSystemPromptGenerationPrompt}
                onResetAdvice={promptRules.resetOptimizationAdvicePrompt}
                onResetApplication={promptRules.resetOptimizationApplicationPrompt}
                onToggleSlimRules={promptRules.handleSlimRulesToggle}
                onResetUserPromptQualityAnalysis={promptRules.resetUserPromptQualityAnalysis}
                onResetUserPromptQuickOptimization={promptRules.resetUserPromptQuickOptimization}
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 flex-shrink-0">
            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={promptRules.saveAndClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
