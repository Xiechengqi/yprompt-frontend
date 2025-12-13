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
   */
  const refreshSettings = async () => {
    isLoading.value = true
    error.value = null

    try {
      const settings: Settings = await getSettings()

      // 更新 providers
      providers.value = settings.providers as ProviderConfig[]

      // 更新刷新时间
      lastRefreshedAt.value = new Date()

      // 验证当前选择是否仍然有效
      const currentProviderExists = enabledProviders.value.find(p => p.id === selectedProviderId.value)
      const currentModelExists = currentProviderExists?.models.find(m => m.id === selectedModelId.value)

      // 如果当前选择无效（不存在或已被删除），使用 .setting.json 中的第一个作为默认值
      if (!currentProviderExists || !currentModelExists) {
        console.log('[providerStore] 当前选择无效，使用配置文件���的第一个提供商和模型')

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
        console.log('[providerStore] 当前选择有效，保持不变')
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
   */
  const initialize = async () => {
    // 1. 从 localStorage 恢复选择和流式模式
    loadSelectionFromLocalStorage()
    loadStreamModeFromLocalStorage()

    // 2. 从 API 加载配置（会自动验证选择并使用第一个作为默认值）
    await refreshSettings()

    // 3. 初始化后同步到 settingsStore
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

  const loadSelectionFromLocalStorage = () => {
    const savedProvider = localStorage.getItem('yprompt_selected_provider')
    const savedModel = localStorage.getItem('yprompt_selected_model')

    if (savedProvider) selectedProviderId.value = savedProvider
    if (savedModel) selectedModelId.value = savedModel
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
