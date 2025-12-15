import { useState, useEffect } from 'react'
import { useModelParams } from '../../composables/useModelParams'
import { useSettingsStore } from '@/stores/settingsStore'
import { useConfirmDialog } from '@/composables/useConfirmDialog'
import { useNotificationStore } from '@/stores/notificationStore'
import type { ModelParams } from '@/stores/settingsStore'

export default function ModelParamsTab() {
  const settingsStore = useSettingsStore()
  const {
    getCurrentParams,
    updateCurrentModelParams,
    resetToDefaults,
    isParamSupported,
    getParamRange,
    getParamLabel,
    getParamDescription
  } = useModelParams()
  const { confirm } = useConfirmDialog()
  const notificationStore = useNotificationStore()

  const [params, setParams] = useState<ModelParams>(getCurrentParams())

  // 监听全局参数变化
  useEffect(() => {
    setParams(getCurrentParams())
  }, [settingsStore.globalModelParams])

  const handleParamChange = (paramName: keyof ModelParams, value: number) => {
    // 立即更新本地状态（用于 UI 响应）
    setParams((prev) => ({
      ...prev,
      [paramName]: value
    }))

    // 保存到 store
    updateCurrentModelParams({
      [paramName]: value
    })
  }

  const handleReset = async () => {
    const confirmed = await confirm({
      message: '确定要重置模型参数为默认值吗？',
      type: 'warning'
    })
    if (confirmed) {
      resetToDefaults()
      setParams(getCurrentParams())
      notificationStore.success('已重置为默认值', 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* 参数配置表单 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">模型参数</h3>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            重置为默认值
          </button>
        </div>

        {/* Temperature */}
        {isParamSupported('temperature') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('temperature')}
              </label>
              <input
                type="number"
                value={params.temperature}
                onChange={(e) => handleParamChange('temperature', parseFloat(e.target.value))}
                min={getParamRange('temperature').min}
                max={getParamRange('temperature').max}
                step={getParamRange('temperature').step}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.temperature}
              onChange={(e) => handleParamChange('temperature', parseFloat(e.target.value))}
              min={getParamRange('temperature').min}
              max={getParamRange('temperature').max}
              step={getParamRange('temperature').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('temperature')}</p>
          </div>
        )}

        {/* Max Tokens */}
        {isParamSupported('maxTokens') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('maxTokens')}
              </label>
              <input
                type="number"
                value={params.maxTokens}
                onChange={(e) => handleParamChange('maxTokens', parseInt(e.target.value))}
                min={getParamRange('maxTokens').min}
                max={getParamRange('maxTokens').max}
                step={getParamRange('maxTokens').step}
                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.maxTokens}
              onChange={(e) => handleParamChange('maxTokens', parseInt(e.target.value))}
              min={getParamRange('maxTokens').min}
              max={getParamRange('maxTokens').max}
              step={getParamRange('maxTokens').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('maxTokens')}</p>
          </div>
        )}

        {/* Top P */}
        {isParamSupported('topP') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('topP')}
              </label>
              <input
                type="number"
                value={params.topP}
                onChange={(e) => handleParamChange('topP', parseFloat(e.target.value))}
                min={getParamRange('topP').min}
                max={getParamRange('topP').max}
                step={getParamRange('topP').step}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.topP}
              onChange={(e) => handleParamChange('topP', parseFloat(e.target.value))}
              min={getParamRange('topP').min}
              max={getParamRange('topP').max}
              step={getParamRange('topP').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('topP')}</p>
          </div>
        )}

        {/* Frequency Penalty (OpenAI only) */}
        {isParamSupported('frequencyPenalty') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('frequencyPenalty')}
              </label>
              <input
                type="number"
                value={params.frequencyPenalty}
                onChange={(e) => handleParamChange('frequencyPenalty', parseFloat(e.target.value))}
                min={getParamRange('frequencyPenalty').min}
                max={getParamRange('frequencyPenalty').max}
                step={getParamRange('frequencyPenalty').step}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.frequencyPenalty}
              onChange={(e) => handleParamChange('frequencyPenalty', parseFloat(e.target.value))}
              min={getParamRange('frequencyPenalty').min}
              max={getParamRange('frequencyPenalty').max}
              step={getParamRange('frequencyPenalty').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('frequencyPenalty')}</p>
          </div>
        )}

        {/* Presence Penalty (OpenAI only) */}
        {isParamSupported('presencePenalty') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('presencePenalty')}
              </label>
              <input
                type="number"
                value={params.presencePenalty}
                onChange={(e) => handleParamChange('presencePenalty', parseFloat(e.target.value))}
                min={getParamRange('presencePenalty').min}
                max={getParamRange('presencePenalty').max}
                step={getParamRange('presencePenalty').step}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.presencePenalty}
              onChange={(e) => handleParamChange('presencePenalty', parseFloat(e.target.value))}
              min={getParamRange('presencePenalty').min}
              max={getParamRange('presencePenalty').max}
              step={getParamRange('presencePenalty').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('presencePenalty')}</p>
          </div>
        )}

        {/* Top K (Claude/Gemini only) */}
        {isParamSupported('topK') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {getParamLabel('topK')}
              </label>
              <input
                type="number"
                value={params.topK}
                onChange={(e) => handleParamChange('topK', parseInt(e.target.value))}
                min={getParamRange('topK').min}
                max={getParamRange('topK').max}
                step={getParamRange('topK').step}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              value={params.topK}
              onChange={(e) => handleParamChange('topK', parseInt(e.target.value))}
              min={getParamRange('topK').min}
              max={getParamRange('topK').max}
              step={getParamRange('topK').step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500">{getParamDescription('topK')}</p>
          </div>
        )}

        {/* 参数说明 */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">参数说明</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Temperature: 控制输出的随机性（0-2）</li>
            <li>• Max Tokens: 生成的最大token数量</li>
            <li>• Top P: 核采样参数，控制考虑的词汇范围</li>
            <li>• Frequency Penalty: 降低重复词汇的频率（OpenAI）</li>
            <li>• Presence Penalty: 鼓励模型谈论新话题（OpenAI）</li>
            <li>• Top K: 只考虑概率最高的K个词汇（Claude/Gemini）</li>
            <li className="mt-2">这些参数会全局应用到所有AI模型，无需单独配置</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
