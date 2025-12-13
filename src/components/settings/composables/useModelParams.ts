import { useSettingsStore } from '@/stores/settingsStore'
import type { ModelParams } from '@/stores/settingsStore'

export function useModelParams() {
  const settingsStore = useSettingsStore()

  // 获取全局模型参数（应用到所有模型）
  const getCurrentParams = (): ModelParams => {
    console.log('[useModelParams] 获取全局模型参数:', settingsStore.globalModelParams)
    return { ...settingsStore.globalModelParams }
  }

  // 更新全局模型参数
  const updateCurrentModelParams = (params: Partial<ModelParams>) => {
    console.log('[useModelParams] 更新全局模型参数:', params)

    // 合并参数
    settingsStore.globalModelParams = {
      ...settingsStore.globalModelParams,
      ...params
    }

    console.log('[useModelParams] 更新后的全局参数:', settingsStore.globalModelParams)

    // 保存到 localStorage
    settingsStore.saveSettings()
  }

  // 重置为默认参数
  const resetToDefaults = () => {
    console.log('[useModelParams] 重置全局参数为默认值')
    const defaultParams: ModelParams = {
      temperature: 1.0,
      maxTokens: 8192,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
      topK: 0
    }
    updateCurrentModelParams(defaultParams)
  }

  // 检查参数是否支持（所有参数都支持，因为是全局的）
  const isParamSupported = (paramName: keyof ModelParams): boolean => {
    // 所有基础参数都支持显示
    return ['temperature', 'maxTokens', 'topP', 'frequencyPenalty', 'presencePenalty', 'topK'].includes(paramName)
  }

  // 获取参数的取值范围
  const getParamRange = (paramName: keyof ModelParams) => {
    switch (paramName) {
      case 'temperature':
        return { min: 0, max: 2, step: 0.1 }
      case 'maxTokens':
        return { min: 1, max: 8000, step: 1 }
      case 'topP':
        return { min: 0, max: 1, step: 0.01 }
      case 'frequencyPenalty':
      case 'presencePenalty':
        return { min: -2, max: 2, step: 0.1 }
      case 'topK':
        return { min: 1, max: 100, step: 1 }
      default:
        return { min: 0, max: 1, step: 0.1 }
    }
  }

  // 获取参数的显示名称
  const getParamLabel = (paramName: keyof ModelParams): string => {
    const labels: Record<string, string> = {
      temperature: 'Temperature',
      maxTokens: 'Max Tokens',
      topP: 'Top P',
      frequencyPenalty: 'Frequency Penalty',
      presencePenalty: 'Presence Penalty',
      topK: 'Top K'
    }
    return labels[paramName] || paramName
  }

  // 获取参数的描述
  const getParamDescription = (paramName: keyof ModelParams): string => {
    const descriptions: Record<string, string> = {
      temperature: '控制输出的随机性。值越高，输出越随机；值越低，输出越确定',
      maxTokens: '生成的最大 token 数量',
      topP: '核采样参数，控制考虑的词汇范围',
      frequencyPenalty: '降低重复词汇的频率（OpenAI 专用）',
      presencePenalty: '鼓励模型谈论新话题（OpenAI 专用）',
      topK: '只考虑概率最高的 K 个词汇（Claude/Gemini）'
    }
    return descriptions[paramName] || ''
  }

  return {
    getCurrentParams,
    updateCurrentModelParams,
    resetToDefaults,
    isParamSupported,
    getParamRange,
    getParamLabel,
    getParamDescription
  }
}
