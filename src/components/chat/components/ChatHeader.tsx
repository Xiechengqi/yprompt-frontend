import { RefreshCw, Square } from 'lucide-react'

interface ChatHeaderProps {
  isStreamMode: boolean
  isGenerating: boolean
  isTyping: boolean
  onToggleStream: () => void
  onClearChat: () => void
  onInterrupt: () => void
}

export default function ChatHeader({
  isStreamMode,
  isGenerating,
  isTyping,
  onToggleStream,
  onClearChat,
  onInterrupt
}: ChatHeaderProps) {
  const shouldShowInterrupt = isGenerating || isTyping

  return (
    <div className="p-4 border-b border-gray-200 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold text-gray-800">AI助手对话</h4>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">流式:</span>
            <button
              onClick={onToggleStream}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                isStreamMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              title={isStreamMode ? '关闭流式模式' : '开启流式模式'}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  isStreamMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {shouldShowInterrupt && (
            <button
              onClick={onInterrupt}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-100 rounded transition-colors"
              title="中断生成"
            >
              <Square className="w-4 h-4" />
              <span>中断</span>
            </button>
          )}

          <button
            onClick={onClearChat}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="重新开始"
          >
            <RefreshCw className="w-4 h-4" />
            <span>重新开始</span>
          </button>
        </div>
      </div>
    </div>
  )
}
