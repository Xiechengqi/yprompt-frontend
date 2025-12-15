import { useEffect, useMemo } from 'react'
import { useProviderStore } from '@/stores/providerStore'

export default function TopModelSelector() {
  // 使用选择器确保响应式更新
  const isInitialized = useProviderStore((state) => state.isInitialized)
  const initialize = useProviderStore((state) => state.initialize)
  const selectedProviderId = useProviderStore((state) => state.selectedProviderId)
  const selectedModelId = useProviderStore((state) => state.selectedModelId)
  const providers = useProviderStore((state) => state.providers)
  const setSelectedProvider = useProviderStore((state) => state.setSelectedProvider)
  const setSelectedModel = useProviderStore((state) => state.setSelectedModel)
  const getProviderById = useProviderStore((state) => state.getProviderById)
  const getAvailableModelsByProvider = useProviderStore((state) => state.getAvailableModelsByProvider)
  
  // 只在未初始化时调用一次
  useEffect(() => {
    if (!isInitialized) {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]) // 依赖 isInitialized
  
  // 辅助方法：生成 provider key (name + id)
  const getProviderKey = (provider: any) => {
    return `${provider.name}|${provider.id}`
  }
  
  // 辅助方法：解析 provider key
  const parseProviderKey = (key: string) => {
    const [name, id] = key.split('|')
    return { name, id }
  }
  
  // 辅助方法：获取 provider 显示文本
  const getProviderDisplay = (provider: any) => {
    return provider.name
  }
  
  // 辅助方法：获取 model 显示文本
  const getModelDisplay = (model: any) => {
    return model.name
  }
  
  // 辅助方法：生成 model key (name + id)
  const getModelKey = (model: any) => {
    return `${model.name}|${model.id}`
  }
  
  // 可用的提供商（有API Key的）
  const availableProviders = useMemo(() => {
    return providers.filter(p => p.apiKey)
  }, [providers])
  
  // 当前选中的提供商
  // 重要：必须依赖 providers，确保 providers 加载后重新计算
  const currentProvider = useMemo(() => {
    return selectedProviderId ? getProviderById(selectedProviderId) : null
  }, [selectedProviderId, getProviderById, providers])

  // 当前选中的模型
  // 重要：必须依赖 providers，确保 providers 加载后重新计算
  const currentModel = useMemo(() => {
    if (!currentProvider || !selectedModelId) return null
    return currentProvider.models.find(m => m.id === selectedModelId) || null
  }, [currentProvider, selectedModelId, providers])

  // 可用的模型（基于选中的提供商）
  // 重要：必须依赖 providers，确保 providers 加载后重新计算
  const availableModels = useMemo(() => {
    if (!selectedProviderId) return []
    return getAvailableModelsByProvider(selectedProviderId)
  }, [selectedProviderId, getAvailableModelsByProvider, providers])
  
  // 当前选中的 provider key
  const selectedProviderKey = useMemo(() => {
    if (!selectedProviderId || !currentProvider) return ''
    return getProviderKey(currentProvider)
  }, [selectedProviderId, currentProvider])
  
  // 当前选中的 model key
  const selectedModelKey = useMemo(() => {
    if (!selectedModelId || !currentModel) return ''
    return getModelKey(currentModel)
  }, [selectedModelId, currentModel])
  
  // 注意：自动选择第一个提供商和模型的逻辑已经在 providerStore.refreshProviders() 中实现
  // 这里不需要重复实现，providerStore 会在初始化时自动处理

  // 监听提供商变化，自动选择第一个模型
  // 重要：只在初始化完成后才执行，防止页面刷新时错误清空选择
  useEffect(() => {
    // 只在已初始化且有提供商时执行
    if (!isInitialized || !selectedProviderId) return

    if (availableModels.length > 0) {
      // 如果当前选中的模型不在新提供商的模型列表中，选择第一个模型
      const currentModelExists = availableModels.some(m => m.id === selectedModelId)
      if (!currentModelExists) {
        console.log('[TopModelSelector] 当前模型不存在，自动选择第一个模型:', availableModels[0].name)
        setSelectedModel(availableModels[0].id)
      }
    } else if (availableModels.length === 0) {
      // 如果提供商没有模型，清空模型选择
      console.log('[TopModelSelector] 提供商没有模型，清空选择')
      setSelectedModel('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, selectedProviderId, availableModels.length]) // 依赖初始化状态、提供商ID和模型数量
  
  const onProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value
    if (!key) {
      setSelectedProvider('')
      setSelectedModel('')
      return
    }
    const { id } = parseProviderKey(key)
    setSelectedProvider(id)
    
    // 自动选择第一个模型（useEffect会处理）
  }
  
  const onModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value
    if (!key) {
      setSelectedModel('')
      return
    }
    const { id } = parseProviderKey(key)
    setSelectedModel(id)
  }
  
  return (
    <div className="flex items-center gap-3">
      {/* AI图标 */}
      <div className="flex-shrink-0">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      {/* 提供商选择 */}
      <div className="relative">
        <select
          value={selectedProviderKey}
          onChange={onProviderChange}
          className="px-2 py-1 text-sm font-medium text-gray-700 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none cursor-pointer appearance-none pr-6"
        >
          <option value="" disabled>提供商</option>
          {availableProviders.map((provider) => (
            <option key={provider.id} value={getProviderKey(provider)}>
              {getProviderDisplay(provider)}
            </option>
          ))}
        </select>
        {/* 简化的下拉箭头 */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 模型选择 */}
      <div className="relative">
        <select
          value={selectedModelKey}
          onChange={onModelChange}
          disabled={!selectedProviderId}
          className="px-2 py-1 text-sm text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed pr-6"
        >
          <option value="" disabled>模型</option>
          {availableModels.map((model) => (
            <option key={model.id} value={getModelKey(model)}>
              {getModelDisplay(model)}
            </option>
          ))}
        </select>
        {/* 简化的下拉箭头 */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
