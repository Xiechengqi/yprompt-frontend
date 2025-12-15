import { useState, useEffect, useCallback, useMemo } from 'react'
import { useProviderStore } from '@/stores/providerStore'

export function useChatModel() {
  const [isStreamMode, setIsStreamMode] = useState(true)

  // 使用选择器订阅具体的状态，确保响应式更新
  const providers = useProviderStore((state) => state.providers)
  const isInitialized = useProviderStore((state) => state.isInitialized)
  const selectedProviderId = useProviderStore((state) => state.selectedProviderId)
  const selectedModelId = useProviderStore((state) => state.selectedModelId)
  const getProviderById = useProviderStore((state) => state.getProviderById)
  const getAvailableModelsByProvider = useProviderStore((state) => state.getAvailableModelsByProvider)
  const setSelectedProvider = useProviderStore((state) => state.setSelectedProvider)
  const setSelectedModel = useProviderStore((state) => state.setSelectedModel)

  // 计算当前选中的 provider 和 model
  const currentProvider = useMemo(() => {
    if (!selectedProviderId || !isInitialized) return null
    return getProviderById(selectedProviderId) || null
  }, [selectedProviderId, isInitialized, getProviderById, providers])

  const currentModel = useMemo(() => {
    if (!currentProvider || !selectedModelId) return null
    return currentProvider.models.find(m => m.id === selectedModelId) || null
  }, [currentProvider, selectedModelId])

  // 确保在初始化完成后，如果没有选择，自动选择第一个
  useEffect(() => {
    if (isInitialized && providers.length > 0) {
      const enabledProviders = providers.filter(p => p.apiKey)
      if (enabledProviders.length > 0 && !selectedProviderId) {
        const firstProvider = enabledProviders[0]
        console.log('[useChatModel] 自动选择第一个提供商:', firstProvider.name)
        setSelectedProvider(firstProvider.id)
        
        if (firstProvider.models.length > 0) {
          console.log('[useChatModel] 自动选择第一个模型:', firstProvider.models[0].name)
          setSelectedModel(firstProvider.models[0].id)
        }
      } else if (selectedProviderId && !currentProvider) {
        // 如果选中的提供商不存在，选择第一个
        const firstProvider = enabledProviders[0]
        if (firstProvider) {
          console.log('[useChatModel] 选中的提供商不存在，自动选择第一个:', firstProvider.name)
          setSelectedProvider(firstProvider.id)
          if (firstProvider.models.length > 0) {
            setSelectedModel(firstProvider.models[0].id)
          }
        }
      } else if (currentProvider && !currentModel && selectedModelId) {
        // 如果选中的模型不存在，选择第一个
        const availableModels = getAvailableModelsByProvider(currentProvider.id)
        if (availableModels.length > 0) {
          console.log('[useChatModel] 选中的模型不存在，自动选择第一个:', availableModels[0].name)
          setSelectedModel(availableModels[0].id)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, providers.length, selectedProviderId, selectedModelId, currentProvider, currentModel])

  // 直接使用计算后的值，添加调试日志
  // 注意：这里不使用 useCallback，每次都重新计算，确保获取最新值
  const getCurrentChatModel = () => {
    // 重新计算，确保获取最新值
    const latestProvider = selectedProviderId && isInitialized 
      ? getProviderById(selectedProviderId) 
      : null
    const latestModel = latestProvider && selectedModelId
      ? latestProvider.models.find(m => m.id === selectedModelId) || null
      : null
    
    console.log('[useChatModel] getCurrentChatModel 调用:', {
      isInitialized,
      providersCount: providers.length,
      selectedProviderId,
      selectedModelId,
      currentProvider: latestProvider?.name || 'null',
      currentModel: latestModel?.name || 'null',
      hasProvider: !!latestProvider,
      hasModel: !!latestModel
    })
    return { provider: latestProvider, model: latestModel }
  }

  const getChatModelDisplay = useCallback(() => {
    const { provider, model } = getCurrentChatModel()
    if (!provider || !model) return '未选择模型'
    return `${provider.name} - ${model.name}`
  }, [getCurrentChatModel])

  const toggleStreamMode = useCallback(() => {
    setIsStreamMode(prev => {
      const newValue = !prev
      localStorage.setItem('yprompt_stream_mode', JSON.stringify(newValue))
      return newValue
    })
  }, [])

  const loadSettings = useCallback(() => {
    const savedStreamMode = localStorage.getItem('yprompt_stream_mode')
    if (savedStreamMode !== null) {
      try {
        setIsStreamMode(JSON.parse(savedStreamMode))
      } catch (e) {
        setIsStreamMode(true)
      }
    }
  }, [])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  return {
    isStreamMode,
    getCurrentChatModel,
    getChatModelDisplay,
    toggleStreamMode,
    loadSettings
  }
}
