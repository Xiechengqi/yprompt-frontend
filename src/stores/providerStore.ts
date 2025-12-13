/**
 * Provider Store - 只读配置管理
 * 所有配置从后端 API 读取（.setting.json），不支持前端编辑
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSettings } from '@/services/settingsApi'
import type { Settings } from '@/services/settingsApi'

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

export const useProviderStore = defineStore('provider', () => {
  // ==========================================
  // 状态
  // ==========================================

  const providers = ref<ProviderConfig[]>([])
  const lastRefreshedAt = ref<Date | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false) // 标记是否已经初始化过

  // 当前选中的 Provider 和 Model
  const selectedProviderId = ref<string>('')
  const selectedModelId = ref<string>('')

  // 流式模式（保存在 localStorage）
  const streamMode = ref(true)

  // API Key 显示状态（保存在 localStorage）
  const showApiKeys = ref(JSON.parse(localStorage.getItem('yprompt_show_api_keys') || 'false'))

  // 防止循环同步的标志
  const isSyncingToSettingsStore = ref(false)

  // ==========================================
  // Getters
  // ==========================================

  const allProviders = computed(() => providers.value)

  const enabledProviders = computed(() =>
    providers.value.filter(p => p.apiKey)
  )

  const getProviderById = computed(() => (id: string) =>
    providers.value.find(p => p.id === id)
  )

  const currentProvider = computed(() =>
    providers.value.find(p => p.id === selectedProviderId.value) || null
  )

  const currentModel = computed(() => {
    if (!currentProvider.value) return null
    return currentProvider.value.models.find(m => m.id === selectedModelId.value) || null
  })

  const allModels = computed(() => {
    const models: ModelConfig[] = []
    providers.value.forEach(provider => {
      provider.models.forEach(model => {
        models.push({
          ...model,
          provider: provider.id
        } as any)
      })
    })
    return models
  })

  const availableModels = computed(() => {
    if (!currentProvider.value) return []
    return currentProvider.value.models
  })

  /**
   * 根据 Provider ID 获取可用的模型列表
   */
  const getAvailableModelsByProvider = computed(() => (providerId: string) => {
    const provider = getProviderById.value(providerId)
    if (!provider) return []
    return provider.models
  })

  // ==========================================
  // Actions
  // ==========================================

  /**
   * 从后端 API 刷新配置
   * @param autoSelectFirst 如果当前选择无效，是否自动选择第一个（默认true）
   */
  const refreshSettings = async (autoSelectFirst: boolean = true) => {
    isLoading.value = true
    error.value = null

    try {
      // 保存当前选择，以便在刷新后恢复
      const currentProviderId = selectedProviderId.value
      const currentModelId = selectedModelId.value

      const settings: Settings = await getSettings()

      // 更新 providers
      providers.value = settings.providers as ProviderConfig[]

      // 更新刷新时间
      lastRefreshedAt.value = new Date()

      // 验证当前选择是否仍然有效
      const currentProviderExists = enabledProviders.value.find(p => p.id === currentProviderId)
      const currentModelExists = currentProviderExists?.models.find(m => m.id === currentModelId)

      // 如果当前选择仍然有效，恢复它（确保不被重置）
      if (currentProviderExists && currentModelExists) {
        selectedProviderId.value = currentProviderId
        selectedModelId.value = currentModelId
        console.log('[providerStore] 当前选择有效，保持不变:', currentProviderId, currentModelId)
      } else if (!currentProviderExists || !currentModelExists) {
        // 如果当前选择无效（不存在或已被删除）
        // 先尝试从 localStorage 恢复
        const savedProvider = localStorage.getItem('yprompt_selected_provider')
        const savedModel = localStorage.getItem('yprompt_selected_model')
        
        const savedProviderExists = savedProvider ? enabledProviders.value.find(p => p.id === savedProvider) : null
        const savedModelExists = savedProviderExists && savedModel ? savedProviderExists.models.find(m => m.id === savedModel) : null
        
        if (savedProviderExists && savedModelExists && savedProvider && savedModel) {
          // 如果 localStorage 中有有效选择，使用它
          selectedProviderId.value = savedProvider
          selectedModelId.value = savedModel
          console.log('[providerStore] 当前选择无效，从localStorage恢复:', savedProvider, savedModel)
        } else if (autoSelectFirst) {
          // 如果 localStorage 也没有有效选择，且允许自动选择，使用第一个
          console.log('[providerStore] 当前选择无效，使用配置文件中的第一个提供商和模型')

          if (enabledProviders.value.length > 0) {
            const firstProvider = enabledProviders.value[0]
            selectedProviderId.value = firstProvider.id

            const firstModel = firstProvider.models[0]
            if (firstModel) {
              selectedModelId.value = firstModel.id
            } else {
              selectedModelId.value = ''
            }
          } else {
            // 没有可用的提供商
            selectedProviderId.value = ''
            selectedModelId.value = ''
          }

          // 保存新的选择到 localStorage
          saveSelectionToLocalStorage()
        } else {
          console.log('[providerStore] 当前选择无效，但不自动选择（由调用方处理）')
        }
      }

    } catch (err: any) {
      error.value = err.message || '刷新配置失败'
      console.error('刷新配置失败:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 初始化：从 API 加载配置 + 恢复用户选择
   * 默认从 .setting.json 的第一个提供商和模型获取
   * 如果已经初始化过，只刷新配置，不重置选择
   */
  const initialize = async () => {
    // 如果已经初始化过，只刷新配置，保持当前选择
    if (isInitialized.value) {
      console.log('[providerStore] 已经初始化过，只刷新配置，保持当前选择')
      const currentProviderId = selectedProviderId.value
      const currentModelId = selectedModelId.value
      
      await refreshSettings(false)
      
      // 验证当前选择是否仍然有效
      const currentProviderExists = enabledProviders.value.find(p => p.id === currentProviderId)
      const currentModelExists = currentProviderExists?.models.find(m => m.id === currentModelId)
      
      // 如果当前选择仍然有效，恢复它（refreshSettings 可能已经改变了它）
      if (currentProviderExists && currentModelExists) {
        if (selectedProviderId.value !== currentProviderId || selectedModelId.value !== currentModelId) {
          selectedProviderId.value = currentProviderId
          selectedModelId.value = currentModelId
          console.log('[providerStore] 恢复之前的选择:', currentProviderId, currentModelId)
        }
      } else {
        // 如果当前选择无效，尝试从 localStorage 恢复
        const savedProvider = localStorage.getItem('yprompt_selected_provider')
        const savedModel = localStorage.getItem('yprompt_selected_model')
        
        const savedProviderExists = savedProvider ? enabledProviders.value.find(p => p.id === savedProvider) : null
        const savedModelExists = savedProviderExists && savedModel ? savedProviderExists.models.find(m => m.id === savedModel) : null
        
        if (savedProviderExists && savedModelExists && savedProvider && savedModel) {
          selectedProviderId.value = savedProvider
          selectedModelId.value = savedModel
          console.log('[providerStore] 当前选择无效，从localStorage恢复:', savedProvider, savedModel)
        } else if (enabledProviders.value.length > 0) {
          // 如果 localStorage 也没有有效选择，使用第一个
          const firstProvider = enabledProviders.value[0]
          selectedProviderId.value = firstProvider.id
          const firstModel = firstProvider.models[0]
          if (firstModel) {
            selectedModelId.value = firstModel.id
          }
          saveSelectionToLocalStorage()
          console.log('[providerStore] 使用第一个提供商和模型:', firstProvider.id, firstModel?.id)
        }
      }
      return
    }

    // 首次初始化
    console.log('[providerStore] 首次初始化')
    
    // 1. 从 localStorage 恢复流式模式
    loadStreamModeFromLocalStorage()

    // 2. 从 API 加载配置（不自动选择，由后续逻辑处理）
    await refreshSettings(false)

    // 3. 检查是否有有效的localStorage选择
    const savedProvider = localStorage.getItem('yprompt_selected_provider')
    const savedModel = localStorage.getItem('yprompt_selected_model')
    
    // 验证保存的选择是否仍然有效
    const savedProviderExists = savedProvider ? enabledProviders.value.find(p => p.id === savedProvider) : null
    const savedModelExists = savedProviderExists && savedModel ? savedProviderExists.models.find(m => m.id === savedModel) : null
    
    if (savedProviderExists && savedModelExists && savedProvider && savedModel) {
      // 如果有有效的保存选择，使用它
      selectedProviderId.value = savedProvider
      selectedModelId.value = savedModel
      console.log('[providerStore] 使用localStorage中保存的选择:', savedProvider, savedModel)
    } else {
      // 如果没有保存的选择或选择无效，使用 .setting.json 中的第一个作为默认值
      if (enabledProviders.value.length > 0) {
        const firstProvider = enabledProviders.value[0]
        selectedProviderId.value = firstProvider.id
        
        const firstModel = firstProvider.models[0]
        if (firstModel) {
          selectedModelId.value = firstModel.id
        } else {
          selectedModelId.value = ''
        }
        
        // 保存默认选择到 localStorage
        saveSelectionToLocalStorage()
        console.log('[providerStore] 使用 .setting.json 中的第一个提供商和模型:', firstProvider.id, firstModel?.id)
      } else {
        // 没有可用的提供商
        selectedProviderId.value = ''
        selectedModelId.value = ''
        console.log('[providerStore] 没有可用的提供商')
      }
    }

    // 4. 标记为已初始化
    isInitialized.value = true

    // 5. 初始化后同步到 settingsStore
    syncSelectionToSettingsStore()
  }

  /**
   * 切换 Provider
   */
  const selectProvider = (providerId: string) => {
    selectedProviderId.value = providerId

    // 自动选择该 Provider 的第一个模型
    const provider = getProviderById.value(providerId)
    if (provider) {
      const firstModel = provider.models[0]
      if (firstModel) {
        selectedModelId.value = firstModel.id
      }
    }

    saveSelectionToLocalStorage()

    // 同步到 settingsStore
    syncSelectionToSettingsStore()
  }

  /**
   * 切换 Model
   */
  const selectModel = (modelId: string) => {
    selectedModelId.value = modelId
    saveSelectionToLocalStorage()

    // 同步到 settingsStore
    syncSelectionToSettingsStore()
  }

  /**
   * 切换流式模式
   */
  const toggleStreamMode = (enabled: boolean) => {
    streamMode.value = enabled
    localStorage.setItem('yprompt_stream_mode', JSON.stringify(enabled))
  }

  // ==========================================
  // LocalStorage 辅助方法（仅保存用户选择）
  // ==========================================

  const saveSelectionToLocalStorage = () => {
    localStorage.setItem('yprompt_selected_provider', selectedProviderId.value)
    localStorage.setItem('yprompt_selected_model', selectedModelId.value)
  }

  const loadStreamModeFromLocalStorage = () => {
    const saved = localStorage.getItem('yprompt_stream_mode')
    if (saved) {
      try {
        streamMode.value = JSON.parse(saved)
      } catch {
        streamMode.value = true
      }
    }
  }

  // 同步选择到 settingsStore
  const syncSelectionToSettingsStore = () => {
    // 如果正在同步中，跳过以避免循环
    if (isSyncingToSettingsStore.value) {
      console.log(`[providerStore] 跳过同步到 settingsStore（正在同步中）`)
      return
    }

    console.log(`[providerStore] 同步选择到 settingsStore: provider=${selectedProviderId.value}, model=${selectedModelId.value}`)

    isSyncingToSettingsStore.value = true

    // 动态导入以避免循环依赖
    import('@/stores/settingsStore').then(({ useSettingsStore }) => {
      const settingsStore = useSettingsStore()
      console.log(`[providerStore] 设置 settingsStore: provider=${selectedProviderId.value}, model=${selectedModelId.value}`)
      settingsStore.selectedProvider = selectedProviderId.value
      settingsStore.selectedModel = selectedModelId.value
      settingsStore.saveSettings()
    }).catch(error => {
      console.warn('[providerStore] 同步到 settingsStore 失败:', error)
    }).finally(() => {
      // 延迟重置标志，确保不会立即再次触发
      setTimeout(() => {
        isSyncingToSettingsStore.value = false
      }, 100)
    })
  }

  const toggleApiKeysVisibility = () => {
    showApiKeys.value = !showApiKeys.value
    localStorage.setItem('yprompt_show_api_keys', JSON.stringify(showApiKeys.value))
  }

  // ==========================================
  // 返回
  // ==========================================

  return {
    // 状态
    providers,
    lastRefreshedAt,
    isLoading,
    error,
    isInitialized,
    selectedProviderId,
    selectedModelId,
    streamMode,
    showApiKeys,

    // Getters
    allProviders,
    enabledProviders,
    getProviderById,
    currentProvider,
    currentModel,
    allModels,
    availableModels,
    getAvailableModelsByProvider,

    // Actions
    refreshSettings,
    initialize,
    selectProvider,
    selectModel,
    toggleStreamMode,
    toggleApiKeysVisibility
  }
})
