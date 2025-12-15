import { X } from 'lucide-react'

interface SettingsHeaderProps {
  activeTab: 'providers' | 'params' | 'prompts'
  onActiveTabChange: (tab: 'providers' | 'params' | 'prompts') => void
  onClose: () => void
}

export default function SettingsHeader({
  activeTab,
  onActiveTabChange,
  onClose
}: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">设置</h2>
        <div className="flex space-x-1">
          <button
            onClick={() => onActiveTabChange('providers')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              activeTab === 'providers'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            AI模型
          </button>
          <button
            onClick={() => onActiveTabChange('params')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              activeTab === 'params'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            模型参数
          </button>
          <button
            onClick={() => onActiveTabChange('prompts')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              activeTab === 'prompts'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            提示词规则
          </button>
        </div>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
