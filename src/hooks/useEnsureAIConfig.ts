import { useCallback } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import { useNotificationStore } from '@/stores/notificationStore'

/**
 * Hook: 确保 AI 配置已正确设置
 * 验证选中的提供商和模型是否有效，不进行自动选择
 */
export function useEnsureAIConfig() {

  /**
   * 确保当前已选择有效的AI提供商和模型
   * 验证规则：
   * 1. provider 必须存在
   * 2. provider 必须有 API Key
   * 3. model 必须存在
   * @returns { provider, model } 返回可用的提供商和模型
   * @throws {Error} 如果配置无效（不存在或缺少 API Key）
   */
  const ensureConfig = useCallback(async () => {
    console.log('[useEnsureAIConfig] 开始确保配置...')

    // 获取最新的状态（在函数内部获取，确保获取最新值）
    const providerStore = useProviderStore.getState()
    const notificationStore = useNotificationStore.getState()
    const safeProviders = providerStore.providers || []
    const safeEnabledProviders = providerStore.enabledProviders || []
    
    console.log('[useEnsureAIConfig] providerStore 详细状态:', {
      isInitialized: providerStore.isInitialized,
      providers: safeProviders.map(p => ({
        id: p.id,
        name: p.name,
        hasApiKey: !!p.apiKey,
        apiKeyLength: p.apiKey ? p.apiKey.length : 0,
        modelsCount: (p.models || []).length
      })),
      enabledProviders: safeEnabledProviders.map(p => p.id),
      selectedProviderId: providerStore.selectedProviderId,
      selectedModelId: providerStore.selectedModelId
    })

    // 如果没有初始化，尝试初始化
    if (!providerStore.isInitialized) {
      console.log('[useEnsureAIConfig] providerStore 未初始化，尝试初始化...')
      try {
        await providerStore.initialize()
        console.log('[useEnsureAIConfig] 初始化成功')
        // 重新获取状态
        const updatedStore = useProviderStore.getState()
        if (!updatedStore.isInitialized) {
          throw new Error('初始化后仍然未初始化')
        }
      } catch (err) {
        console.error('[useEnsureAIConfig] 初始化失败:', err)
        notificationStore.error('AI模型配置加载中，请稍候再试')
        throw new Error('Provider store not initialized')
      }
    }

    // 重新获取最新状态
    const latestStore = useProviderStore.getState()
    const latestProviders = latestStore.providers || []
    
    // 先尝试从已选择的 ID 获取 provider 和 model
    let provider = latestStore.currentProvider
    let model = latestStore.currentModel

    // 如果 currentProvider 返回 null，但 selectedProviderId 有值，尝试直接从 providers 数组查找
    if (!provider && latestStore.selectedProviderId) {
      const selectedProvider = latestProviders.find(p => p.id === latestStore.selectedProviderId)
      if (selectedProvider) {
        console.log('[useEnsureAIConfig] 从 providers 数组中找到选中的提供商:', selectedProvider.name)
        provider = selectedProvider
        
        // 如果找到 provider，尝试查找对应的 model
        if (!model && latestStore.selectedModelId) {
          const providerModels = provider.models || []
          const selectedModel = providerModels.find(m => m.id === latestStore.selectedModelId)
          if (selectedModel) {
            console.log('[useEnsureAIConfig] 从 provider.models 中找到选中的模型:', selectedModel.name)
            model = selectedModel
          }
        }
      }
    }

    console.log('[useEnsureAIConfig] 检查配置:', {
      provider: provider ? { id: provider.id, name: provider.name, hasApiKey: !!provider.apiKey } : null,
      model: model ? { id: model.id, name: model.name } : null,
      hasProvider: !!provider,
      hasModel: !!model,
      isInitialized: latestStore.isInitialized,
      providersCount: latestProviders.length,
      enabledProvidersCount: latestStore.enabledProviders.length,
      selectedProviderId: latestStore.selectedProviderId,
      selectedModelId: latestStore.selectedModelId
    })

    // 验证 provider 是否存在
    if (!provider) {
      console.error('[useEnsureAIConfig] 未找到选中的提供商', {
        selectedProviderId: latestStore.selectedProviderId,
        providersCount: latestProviders.length
      })
      notificationStore.error('请先在导航栏选择AI提供商')
      throw new Error('Provider not found')
    }

    // 验证 provider 是否有 API Key（必需）
    if (!provider.apiKey) {
      console.error('[useEnsureAIConfig] 选中的提供商没有 API Key', {
        providerId: provider.id,
        providerName: provider.name
      })
      notificationStore.error(`提供商 "${provider.name}" 没有配置 API 密钥，请在设置中配置`)
      throw new Error('Provider missing API key')
    }

    // 验证 model 是否存在
    if (!model) {
      const providerModels = provider.models || []
      console.error('[useEnsureAIConfig] 未找到选中的模型', {
        providerId: provider.id,
        providerName: provider.name,
        selectedModelId: latestStore.selectedModelId,
        availableModels: providerModels.map(m => m.id)
      })
      notificationStore.error(`提供商 "${provider.name}" 没有选中的模型，请在导航栏选择模型`)
      throw new Error('Model not found')
    }

    console.log('[useEnsureAIConfig] 配置验证成功:', provider.name, model.name)
    return { provider, model }
  }, [])

  return { ensureConfig }
}