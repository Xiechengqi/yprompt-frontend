import { X } from 'lucide-react'

interface SystemPromptModalProps {
  isOpen: boolean
  modelValue: string
  onUpdateModelValue: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function SystemPromptModal({
  isOpen,
  modelValue,
  onUpdateModelValue,
  onClose,
  onSave
}: SystemPromptModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">系统提示词设置</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-gray-600 mb-3">
            设置系统提示词可以帮助AI更好地理解对话上下文，提供更准确的优化建议。
          </p>
          <textarea
            value={modelValue}
            onChange={(e) => onUpdateModelValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900"
            rows={8}
            placeholder="例如：你是一个专业的编程助手，擅长解决代码问题和提供技术建议。"
          />
        </div>

        {/* 底部 */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => {
              onSave()
              onClose()
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  )
}
