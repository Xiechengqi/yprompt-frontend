/**
 * Provider Store - 只读配置管理
 * 所有配置从后端 API 读取（.setting.json），不支持前端编辑
 */
import { create } from 'zustand'
import { getSettings } from '@/services/settingsApi'

export interface ModelConfig {
  id: string
  name: string
  apiType?: 'openai' | 'anthropic' | 'google'
}

export interface ProviderConfig {
  id: string
  name: string
  type: 'openai' | 'anthropic' | 'google' | 'custom'
  apiKey: string
  baseUrl?: string
  models: ModelConfig[]
}

interface ProviderState {
  providers: ProviderConfig[]
  lastRefreshedAt: Date | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean
  selectedProviderId: string
  selectedModelId: string
  streamMode: boolean
  showApiKeys: boolean
  
  // Getters
  allProviders: ProviderConfig[]
  enabledProviders: ProviderConfig[]
  currentProvider: ProviderConfig | null
  currentModel: ModelConfig | null
  availableModels: ModelConfig[]
  
  // Actions
  getProviderById: (id: string) => ProviderConfig | undefined
  getAvailableModelsByProvider: (providerId: string) => ModelConfig[]
  refreshProviders: () => Promise<void>
  refreshSettings: () => Promise<void> // 别名，与 Vue 实现保持一致
  setSelectedProvider: (providerId: string) => void
  setSelectedModel: (modelId: string) => void
  setStreamMode: (enabled: boolean) => void
  setShowApiKeys: (show: boolean) => void
  initialize: () => Promise<void>
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  providers: [],
  lastRefreshedAt: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  selectedProviderId: localStorage.getItem('yprompt_selected_provider') || '',
  selectedModelId: localStorage.getItem('yprompt_selected_model') || '',
  streamMode: localStorage.getItem('yprompt_stream_mode') !== 'false',
  showApiKeys: JSON.parse(localStorage.getItem('yprompt_show_api_keys') || 'false'),
  
  get allProviders() {
    return get().providers
  },
  
  get enabledProviders() {
    return get().providers.filter(p => p.apiKey)
  },
  
  get currentProvider() {
    const { providers, selectedProviderId } = get()
    const provider = providers.find(p => p.id === selectedProviderId) || null
    console.log('[providerStore] currentProvider getter:', {
      providersCount: providers.length,
      selectedProviderId,
      foundProvider: provider?.name || 'null'
    })
    return provider
  },

  get currentModel() {
    const provider = get().currentProvider
    if (!provider) {
      console.log('[providerStore] currentModel getter: no provider found')
      return null
    }
    const { selectedModelId } = get()
    const model = provider.models.find(m => m.id === selectedModelId) || null
    console.log('[providerStore] currentModel getter:', {
      providerName: provider.name,
      selectedModelId,
      foundModel: model?.name || 'null',
      providerModelsCount: provider.models.length
    })
    return model
  },
  
  get availableModels() {
    const provider = get().currentProvider
    if (!provider) return []
    return provider.models
  },
  
  getProviderById: (id: string) => {
    return get().providers.find(p => p.id === id)
  },
  
  getAvailableModelsByProvider: (providerId: string) => {
    const provider = get().getProviderById(providerId)
    if (!provider) return []
    return provider.models
  },
  
  refreshProviders: async () => {
    const currentState = get()
    console.log('[providerStore] 开始刷新配置，当前状态:', {
      isInitialized: currentState.isInitialized,
      providersCount: currentState.providers.length,
      isLoading: currentState.isLoading
    })
    
    set({ isLoading: true, error: null })
    try {
      // 从后端 API 获取 .setting.json 配置
      // API 端点: GET /api/settings/
      const settings = await getSettings()
      console.log('[providerStore] getSettings 返回:', settings)
      
      // 确保 providers 是数组
      let providers: ProviderConfig[] = []
      console.log('[providerStore] settings 对象:', settings)
      console.log('[providerStore] settings.providers 原始值:', settings.providers)
      console.log('[providerStore] settings.providers 类型:', typeof settings.providers)
      console.log('[providerStore] settings.providers 是否为数组:', Array.isArray(settings.providers))
      
      if (Array.isArray(settings.providers)) {
        providers = settings.providers
        console.log('[providerStore] providers 是数组，直接使用')
      } else if (settings.providers && typeof settings.providers === 'object') {
        // 可能是对象而不是数组，尝试转换为数组
        console.warn('[providerStore] providers 不是数组，是对象，尝试转换:', settings.providers)
        // 检查是否是对象数组的包装
        if (settings.providers && 'length' in settings.providers) {
          // 可能是类数组对象
          providers = Array.from(settings.providers as any)
        } else {
          // 单个对象，转换为数组
          providers = [settings.providers as any]
        }
      } else if (!settings.providers) {
        console.warn('[providerStore] settings.providers 不存在或为 null/undefined')
        providers = []
      } else {
        console.warn('[providerStore] providers 格式未知:', settings.providers)
        providers = []
      }
      
      console.log('[providerStore] 解析后的 providers:', providers)
      console.log('[providerStore] providers 数量:', providers.length)
      if (providers.length > 0) {
        console.log('[providerStore] 第一个 provider 示例:', providers[0])
      }
      
      // 验证每个 provider 的结构
      providers.forEach((provider, index) => {
        if (!provider.id || !provider.name) {
          console.warn(`[providerStore] Provider ${index} 缺少必要字段:`, provider)
        }
      })
      
      // 获取当前选中的 provider 和 model（从 state 中获取，可能来自 localStorage）
      const currentProviderId = get().selectedProviderId
      const currentModelId = get().selectedModelId
      const wasInitialized = get().isInitialized
      
      // 检查 localStorage 中是否有保存的选择（用于判断是否是首次使用）
      const savedProviderId = localStorage.getItem('yprompt_selected_provider') || ''
      const savedModelId = localStorage.getItem('yprompt_selected_model') || ''
      const isFirstTime = !savedProviderId && !savedModelId
      
      // 获取可用的提供商（有 API Key 的）
      const enabledProviders = providers.filter(p => p.apiKey)
      
      console.log('[providerStore] 当前选择状态:', {
        currentProviderId,
        currentModelId,
        wasInitialized,
        savedProviderId,
        savedModelId,
        isFirstTime,
        enabledProvidersCount: enabledProviders.length
      })
      
      if (enabledProviders.length > 0) {
        console.log('[providerStore] 第一个可用提供商:', enabledProviders[0].name, enabledProviders[0].id, '模型数量:', enabledProviders[0].models.length)
      }
      
      // 自动选择第一个提供商和模型
      let newProviderId = currentProviderId
      let newModelId = currentModelId
      
      if (enabledProviders.length > 0) {
        const firstProvider = enabledProviders[0]
        
        // 如果是首次使用（localStorage 中没有保存的选择），强制选择第一个
        if (isFirstTime) {
          newProviderId = firstProvider.id
          console.log('[providerStore] ✅ 首次使用，自动选择第一个提供商:', firstProvider.name)
          
          // 自动选择第一个模型
          if (firstProvider.models.length > 0) {
            newModelId = firstProvider.models[0].id
            console.log('[providerStore] ✅ 自动选择第一个模型:', firstProvider.models[0].name)
          } else {
            newModelId = ''
            console.warn('[providerStore] ⚠️ 第一个提供商没有模型')
          }
        } else if (!currentProviderId || currentProviderId.trim() === '') {
          // 如果当前没有选择（但 localStorage 中可能有无效值），选择第一个
          newProviderId = firstProvider.id
          console.log('[providerStore] 当前没有选择，自动选择第一个提供商:', firstProvider.name)
          
          if (firstProvider.models.length > 0) {
            newModelId = firstProvider.models[0].id
            console.log('[providerStore] 自动选择第一个模型:', firstProvider.models[0].name)
          } else {
            newModelId = ''
          }
        } else {
          // 如果已选择提供商，检查该提供商是否仍然存在
          const selectedProvider = enabledProviders.find(p => p.id === currentProviderId)
          if (!selectedProvider) {
            // 如果选中的提供商不存在，选择第一个
            newProviderId = firstProvider.id
            console.log('[providerStore] 选中的提供商不存在，自动选择第一个:', firstProvider.name)
            
            // 自动选择第一个模型
            if (firstProvider.models.length > 0) {
              newModelId = firstProvider.models[0].id
              console.log('[providerStore] 自动选择第一个模型:', firstProvider.models[0].name)
            } else {
              newModelId = ''
            }
          } else {
            // 提供商存在，检查模型
            if (!currentModelId || currentModelId.trim() === '') {
              // 如果没有选中的模型，选择第一个
              if (selectedProvider.models.length > 0) {
                newModelId = selectedProvider.models[0].id
                console.log('[providerStore] 没有选择模型，自动选择第一个:', selectedProvider.models[0].name)
              } else {
                newModelId = ''
              }
            } else {
              // 检查选中的模型是否仍然存在
              const selectedModel = selectedProvider.models.find(m => m.id === currentModelId)
              if (!selectedModel) {
                // 如果选中的模型不存在，选择第一个
                if (selectedProvider.models.length > 0) {
                  newModelId = selectedProvider.models[0].id
                  console.log('[providerStore] 选中的模型不存在，自动选择第一个:', selectedProvider.models[0].name)
                } else {
                  newModelId = ''
                }
              }
              // 如果模型存在，保持当前选择
            }
          }
        }
      } else {
        // 没有可用的提供商，清空选择
        newProviderId = ''
        newModelId = ''
        console.warn('[providerStore] 没有可用的提供商（所有提供商都没有 API Key）')
      }
      
      set({
        providers,
        selectedProviderId: newProviderId,
        selectedModelId: newModelId,
        lastRefreshedAt: new Date(),
        isInitialized: true,
        isLoading: false,
        error: null
      })
      
      // 如果自动选择了新的值，更新 localStorage
      if (newProviderId !== currentProviderId) {
        localStorage.setItem('yprompt_selected_provider', newProviderId)
      }
      if (newModelId !== currentModelId) {
        localStorage.setItem('yprompt_selected_model', newModelId)
      }
      
      console.log('[providerStore] 配置更新完成，新的 providers 数量:', providers.length)
      console.log('[providerStore] 当前选中的提供商:', newProviderId)
      console.log('[providerStore] 当前选中的模型:', newModelId)
      
      // 如果 providers 为空，记录警告但不抛出错误（可能是配置文件中确实没有配置）
      if (providers.length === 0) {
        console.warn('[providerStore] 警告: 从 .setting.json 加载的 providers 为空，请检查后端配置文件')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '加载配置失败'
      console.error('[providerStore] 加载配置失败:', error)
      console.error('[providerStore] 错误详情:', {
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      })
      
      set({
        error: errorMessage,
        isLoading: false,
        isInitialized: false // 失败时重置初始化状态
      })
      
      // 抛出错误，让调用者知道失败了
      throw error
    }
  },
  
  // refreshSettings 作为 refreshProviders 的别名，与 Vue 实现保持一致
  refreshSettings: async () => {
    return get().refreshProviders()
  },
  
  setSelectedProvider: (providerId: string) => {
    set({ selectedProviderId: providerId })
    localStorage.setItem('yprompt_selected_provider', providerId)
  },
  
  setSelectedModel: (modelId: string) => {
    set({ selectedModelId: modelId })
    localStorage.setItem('yprompt_selected_model', modelId)
  },
  
  setStreamMode: (enabled: boolean) => {
    set({ streamMode: enabled })
    localStorage.setItem('yprompt_stream_mode', String(enabled))
  },
  
  setShowApiKeys: (show: boolean) => {
    set({ showApiKeys: show })
    localStorage.setItem('yprompt_show_api_keys', JSON.stringify(show))
  },
  
  initialize: async () => {
    const state = get()
    // 防止重复初始化：如果正在加载或已初始化，直接返回
    if (state.isInitialized || state.isLoading) return
    
    // 设置加载状态，防止并发调用
    set({ isLoading: true })
    try {
      await get().refreshProviders()
    } catch (error) {
      // 如果初始化失败，重置 isLoading 状态，允许重试
      set({ isLoading: false, isInitialized: false })
      throw error
    }
  }
}))
