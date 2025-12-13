import { ref, onMounted } from 'vue'
import { useProviderStore } from '@/stores/providerStore'

export function useChatModel() {
  const providerStore = useProviderStore()
  const isStreamMode = ref(true)

  const getCurrentChatModel = () => {
    // 直接使用全局选择的提供商和模型
    const globalProvider = providerStore.currentProvider
    const globalModel = providerStore.currentModel
    return { provider: globalProvider, model: globalModel }
  }

  const getChatModelDisplay = () => {
    const { provider, model } = getCurrentChatModel()
    if (!provider || !model) return '未选择模型'
    return `${provider.name} - ${model.name}`
  }

  const toggleStreamMode = () => {
    isStreamMode.value = !isStreamMode.value
    localStorage.setItem('yprompt_stream_mode', JSON.stringify(isStreamMode.value))
  }

  const loadSettings = () => {
    const savedStreamMode = localStorage.getItem('yprompt_stream_mode')
    if (savedStreamMode !== null) {
      try {
        isStreamMode.value = JSON.parse(savedStreamMode)
      } catch (e) {
        isStreamMode.value = true
      }
    }
  }

  onMounted(() => {
    loadSettings()
  })

  return {
    isStreamMode,
    getCurrentChatModel,
    getChatModelDisplay,
    toggleStreamMode,
    loadSettings
  }
}
