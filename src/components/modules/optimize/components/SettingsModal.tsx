import { useState } from 'react'
import { X } from 'lucide-react'

interface Variable {
  id: string
  name: string
  value: string
  description?: string
}

interface OptimizeSettings {
  temperature: number
  maxTokens: number
  focusAreas: string[]
  language: string
  autoApplySuggestions: boolean
  preserveStyle: boolean
  enableQualityComparison: boolean
}

interface Props {
  show: boolean
  settings?: OptimizeSettings
  variables?: Variable[]
  predefinedVariables?: Variable[]
  onClose: () => void
  onSave: (settings: OptimizeSettings) => void
}

export default function SettingsModal({
  show,
  settings,
  variables = [],
  predefinedVariables = [],
  onClose,
  onSave
}: Props) {
  // 本地状态
  const [localSettings, setLocalSettings] = useState<OptimizeSettings>({
    temperature: settings?.temperature ?? 0.7,
    maxTokens: settings?.maxTokens ?? 1000,
    focusAreas: settings?.focusAreas ?? ['clarity', 'completeness'],
    language: settings?.language ?? 'zh',
    autoApplySuggestions: settings?.autoApplySuggestions ?? false,
    preserveStyle: settings?.preserveStyle ?? true,
    enableQualityComparison: settings?.enableQualityComparison ?? true
  })

  if (!show) return null

  const handleFocusAreaToggle = (area: string) => {
    const newFocusAreas = localSettings.focusAreas?.includes(area)
      ? localSettings.focusAreas.filter(a => a !== area)
      : [...(localSettings.focusAreas || []), area]

    setLocalSettings(prev => ({ ...prev, focusAreas: newFocusAreas }))
  }

  const handleSave = () => {
    onSave(localSettings)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">优化设置</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 基本设置 */}
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-base font-medium text-gray-800 mb-4">基本设置</h4>

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
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
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
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">生成内容的最大长度</p>
              </div>
            </div>
          </div>

          {/* 优化重点 */}
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-base font-medium text-gray-800 mb-4">优化重点</h4>

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
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-base font-medium text-gray-800 mb-4">语言设置</h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">输出语言</label>
              <select
                value={localSettings.language}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, language: e.target.value }))}
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
          <div className="pb-6">
            <h4 className="text-base font-medium text-gray-800 mb-4">高级设置</h4>

            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={localSettings.autoApplySuggestions}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, autoApplySuggestions: e.target.checked }))}
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
                    checked={localSettings.preserveStyle}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, preserveStyle: e.target.checked }))}
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
                    checked={localSettings.enableQualityComparison}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, enableQualityComparison: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">启用质量对比</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">显示优化前后的质量评分对比</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  )
}