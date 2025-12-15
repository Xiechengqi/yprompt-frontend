import { ProviderConfig, ModelConfig } from '@/stores/providerStore'

interface Props {
  show: boolean
  chatProvider: string
  chatModel: string
  availableProviders: ProviderConfig[]
  availableModels: ModelConfig[]
  modelDisplay: string
  onUpdateChatProvider: (value: string) => void
  onUpdateChatModel: (value: string) => void
  onReset: () => void
}

export default function ChatModelSelector({
  show,
  chatProvider,
  chatModel,
  availableProviders,
  availableModels,
  modelDisplay,
  onUpdateChatProvider,
  onUpdateChatModel,
  onReset
}: Props) {
  if (!show) return null

  return (
    <div className="px-4 pb-2 border-b border-gray-200 bg-gray-50">
      <div className="py-2 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">AI助手专用模型</label>
          {chatProvider && (
            <button
              onClick={onReset}
              className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="重置为全局模型"
            >
              重置
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <select
              value={chatProvider}
              onChange={(e) => onUpdateChatProvider(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">使用全局模型</option>
              {availableProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <select
              value={chatModel}
              onChange={(e) => onUpdateChatModel(e.target.value)}
              disabled={!chatProvider}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
            >
              <option value="">选择模型</option>
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          {!chatProvider ? (
            <span>当前: 跟随全局模型设置</span>
          ) : !chatModel ? (
            <span>请选择模型</span>
          ) : (
            <span>当前: {modelDisplay}</span>
          )}
        </div>
      </div>
    </div>
  )
}