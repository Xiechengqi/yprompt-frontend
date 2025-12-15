import { useState, useEffect, useCallback } from 'react'

interface OptimizationSettings {
  temperature: number
  maxTokens: number
  focusArea: string
  language: string
  focusAreas?: string[]
  autoApplySuggestions?: boolean
  preserveStyle?: boolean
  enableQualityComparison?: boolean
}

interface Props {
  optimizationSettings?: OptimizationSettings
  onUpdateSettings: (settings: OptimizationSettings) => void
}

export default function OptimizeTab({ optimizationSettings, onUpdateSettings }: Props) {
  // 简化的本地状态，确保有默认值
  const [localSettings, setLocalSettings] = useState<OptimizationSettings>({
    temperature: 0.7,
    maxTokens: 1000,
    focusArea: 'clarity',
    language: 'zh',
    focusAreas: ['clarity', 'completeness'],
    autoApplySuggestions: false,
    preserveStyle: true,
    enableQualityComparison: true
  })

  // 当前预设状态
  const [currentPreset, setCurrentPreset] = useState<'none' | 'conservative' | 'balanced' | 'aggressive'>('none')

  // 在组件挂载时应用props
  useEffect(() => {
    if (optimizationSettings) {
      setLocalSettings(prev => ({ ...prev, ...optimizationSettings }))
      // 检测当前预设
      detectCurrentPreset({ ...localSettings, ...optimizationSettings })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 检测当前预设
  const detectCurrentPreset = useCallback((settings: OptimizationSettings) => {
    const presets: Record<string, OptimizationSettings> = {
      conservative: {
        temperature: 0.3,
        maxTokens: 800,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity'],
        autoApplySuggestions: false,
        preserveStyle: true,
        enableQualityComparison: false
      },
      balanced: {
        temperature: 0.7,
        maxTokens: 1000,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity', 'completeness', 'specificity'],
        autoApplySuggestions: false,
        preserveStyle: true,
        enableQualityComparison: true
      },
      aggressive: {
        temperature: 1.0,
        maxTokens: 1500,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity', 'completeness', 'specificity', 'structure', 'examples'],
        autoApplySuggestions: true,
        preserveStyle: false,
        enableQualityComparison: true
      }
    }

    // 检查是否匹配某个预设
    for (const [presetName, presetConfig] of Object.entries(presets)) {
      const matches = Object.entries(presetConfig).every(([key, value]) => {
        if (Array.isArray(value)) {
          return Array.isArray(settings[key as keyof OptimizationSettings]) &&
                 JSON.stringify(settings[key as keyof OptimizationSettings]) === JSON.stringify(value)
        }
        return settings[key as keyof OptimizationSettings] === value
      })

      if (matches) {
        setCurrentPreset(presetName as 'conservative' | 'balanced' | 'aggressive')
        return
      }
    }

    setCurrentPreset('none')
  }, [])

  // 更新设置并触发事件
  const updateSettings = useCallback((updates: Partial<OptimizationSettings>) => {
    const newSettings = { ...localSettings, ...updates }
    setLocalSettings(newSettings)
    onUpdateSettings(newSettings)
  }, [localSettings, onUpdateSettings])

  // 获取按钮样式类
  const getPresetButtonClass = (preset: 'conservative' | 'balanced' | 'aggressive') => {
    const baseClass = 'p-3 border rounded-lg hover:bg-gray-50 text-center transition-colors'

    if (currentPreset === preset) {
      if (preset === 'balanced') {
        return `${baseClass} border-blue-200 bg-blue-50`
      }
      return `${baseClass} border-blue-300 bg-blue-50`
    }

    return `${baseClass} border-gray-200`
  }

  // 获取文字颜色类
  const getPresetTextClass = (preset: 'conservative' | 'balanced' | 'aggressive') => {
    if (currentPreset === preset) {
      if (preset === 'balanced') {
        return 'text-blue-800'
      }
      return 'text-blue-700'
    }
    return 'text-gray-800'
  }

  // 预设配置
  const applyPreset = (preset: 'conservative' | 'balanced' | 'aggressive') => {
    const presets: Record<string, OptimizationSettings> = {
      conservative: {
        temperature: 0.3,
        maxTokens: 800,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity'],
        autoApplySuggestions: false,
        preserveStyle: true,
        enableQualityComparison: false
      },
      balanced: {
        temperature: 0.7,
        maxTokens: 1000,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity', 'completeness', 'specificity'],
        autoApplySuggestions: false,
        preserveStyle: true,
        enableQualityComparison: true
      },
      aggressive: {
        temperature: 1.0,
        maxTokens: 1500,
        focusArea: 'clarity',
        language: 'zh',
        focusAreas: ['clarity', 'completeness', 'specificity', 'structure', 'examples'],
        autoApplySuggestions: true,
        preserveStyle: false,
        enableQualityComparison: true
      }
    }

    const newSettings = { ...localSettings, ...presets[preset] }
    setLocalSettings(newSettings)
    setCurrentPreset(preset)
    onUpdateSettings(newSettings)
  }

  const handleFocusAreaToggle = (area: string) => {
    const newFocusAreas = localSettings.focusAreas?.includes(area)
      ? localSettings.focusAreas.filter(a => a !== area)
      : [...(localSettings.focusAreas || []), area]

    updateSettings({ focusAreas: newFocusAreas })
  }

  return (
    <div className="space-y-6">
      {/* 基本设置 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">基本设置</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">温度值</label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={localSettings.temperature}
                onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">{localSettings.temperature}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">控制输出的随机性，值越高越有创造性</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">最大 Token 数</label>
            <input
              type="number"
              min="100"
              max="4000"
              value={localSettings.maxTokens}
              onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">生成内容的最大长度</p>
          </div>
        </div>
      </div>

      {/* 优化重点 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">优化重点</h3>

        <div className="space-y-3">
          {[
            { key: 'clarity', label: '清晰度 - 使提示词更明确易懂' },
            { key: 'completeness', label: '完整性 - 补充缺失的关键信息' },
            { key: 'specificity', label: '具体性 - 增加具体的指导和约束' },
            { key: 'structure', label: '结构 - 优化逻辑结构和流程' },
            { key: 'examples', label: '示例 - 添加或改进示例说明' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localSettings.focusAreas?.includes(key) || false}
                onChange={() => handleFocusAreaToggle(key)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 语言设置 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">语言设置</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输出语言</label>
          <select
            value={localSettings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="bilingual">中英双语</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">优化建议和输出内容的使用语言</p>
        </div>
      </div>

      {/* 高级设置 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">高级设置</h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localSettings.autoApplySuggestions || false}
                onChange={(e) => updateSettings({ autoApplySuggestions: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">自动应用高优先级建议</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">优先级为 "high" 的建议将自动应用</p>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localSettings.preserveStyle || false}
                onChange={(e) => updateSettings({ preserveStyle: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">保持原有风格</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">尽量保持原始提示词的语言风格和语气</p>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localSettings.enableQualityComparison || false}
                onChange={(e) => updateSettings({ enableQualityComparison: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">启用质量对比</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">显示优化前后的质量评分对比</p>
          </div>
        </div>
      </div>

      {/* 预设配置 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">预设配置</h3>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => applyPreset('conservative')}
            className={getPresetButtonClass('conservative')}
          >
            <div className={`text-sm font-medium ${getPresetTextClass('conservative')}`}>保守</div>
            <div className={`text-xs ${currentPreset === 'conservative' ? 'text-blue-600' : 'text-gray-600'}`}>最小改动</div>
          </button>

          <button
            onClick={() => applyPreset('balanced')}
            className={getPresetButtonClass('balanced')}
          >
            <div className={`text-sm font-medium ${getPresetTextClass('balanced')}`}>平衡</div>
            <div className={`text-xs ${currentPreset === 'balanced' ? 'text-blue-600' : 'text-blue-600'}`}>推荐设置</div>
          </button>

          <button
            onClick={() => applyPreset('aggressive')}
            className={getPresetButtonClass('aggressive')}
          >
            <div className={`text-sm font-medium ${getPresetTextClass('aggressive')}`}>激进</div>
            <div className={`text-xs ${currentPreset === 'aggressive' ? 'text-blue-600' : 'text-gray-600'}`}>大幅优化</div>
          </button>
        </div>
      </div>
    </div>
  )
}