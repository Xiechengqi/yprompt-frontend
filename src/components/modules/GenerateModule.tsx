import { useEffect } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import ChatInterface from '../ChatInterface'
import PreviewPanel from '../PreviewPanel'
import GenerateSettingsModal from '../GenerateSettingsModal'
import NotificationContainer from '../NotificationContainer'

export default function GenerateModule() {
  const isInitialized = useProviderStore((state) => state.isInitialized)
  const initialize = useProviderStore((state) => state.initialize)

  useEffect(() => {
    const init = async () => {
      // 如果还没有初始化，则初始化
      if (!isInitialized) {
        await initialize()
      }

      // 如果没有配置，显示设置界面
      const providerStore = useProviderStore.getState()
      const hasConfiguredProvider = providerStore.enabledProviders.length > 0
      if (!hasConfiguredProvider) {
        setTimeout(() => {
          // TODO: 显示设置界面或提示用户配置
        }, 1000)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]) // 只依赖 isInitialized

  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-2">
      {/* 设置按钮 */}
      <GenerateSettingsModal />

      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* 模块特定顶栏 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">智能提示词创建</h2>
              <p className="text-sm lg:text-base text-gray-600">AI引导式对话，帮您构建专业的提示词</p>
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex flex-row flex-1 min-h-0 gap-4 overflow-hidden">
          {/* 左侧 - Chat Interface */}
          <div className="flex flex-col flex-1 min-h-0">
            <ChatInterface />
          </div>

          {/* 右侧 - Preview Panel */}
          <div className="flex flex-col flex-1 min-h-0">
            <PreviewPanel />
          </div>
        </div>
      </div>

      {/* 通知容器 */}
      <NotificationContainer />
    </div>
  )
}
