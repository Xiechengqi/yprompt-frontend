import { useProviderStore } from '@/stores/providerStore'
import { useNotificationStore } from '@/stores/notificationStore'

/**
 * 确保 AI 配置已正确设置
 * 如果没有选择提供商/模型，会尝试自动选择第一个可用的
 * @returns { provider, model } 返回可用的提供商和模型，如果无法获取则抛出错误
 */
export async function ensureAIConfig(): Promise<{ provider: any; model: any }> {
  const providerStore = useProviderStore()
  const notificationStore = useNotificationStore()

  // 确保已初始化
  if (!providerStore.isInitialized) {
    notificationStore.error('AI模型配置加载中，请稍候再试')
    throw new Error('Provider store not initialized')
  }

  let provider = providerStore.currentProvider
  let model = providerStore.currentModel

  // 如果没有选择，尝试自动选择
  if (!provider || !model) {
    if (providerStore.enabledProviders.length > 0) {
      const firstProvider = providerStore.enabledProviders[0]
      providerStore.setSelectedProvider(firstProvider.id)
      if (firstProvider.models.length > 0) {
        providerStore.setSelectedModel(firstProvider.models[0].id)
      }

      // 重新获取
      provider = providerStore.currentProvider
      model = providerStore.currentModel

      if (!provider || !model) {
        notificationStore.warning('请先在导航栏选择AI模型')
        throw new Error('No valid model selection')
      }

      console.log('[ensureAIConfig] 自动选择模型成功:', provider.name, model.name)
    } else {
      notificationStore.error('请先在右上角设置中配置AI模型和API密钥')
      throw new Error('No configured providers')
    }
  }

  return { provider, model }
}