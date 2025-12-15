import { useRef, useEffect } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

interface InitialTabProps {
  initialPrompt: string
  setInitialPrompt: (value: string) => void
  isAutoMode: boolean
  isExecuting: boolean
  isGenerating: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isCopied: boolean
  onRegenerate: () => void
  onCopy: () => void
  onExecuteAdvice: () => void
  onScrollMounted?: (element: HTMLElement) => void
}

export default function InitialTab({
  initialPrompt,
  setInitialPrompt,
  isAutoMode,
  isExecuting,
  isGenerating,
  currentExecutionStep,
  isCopied,
  onRegenerate,
  onCopy,
  onExecuteAdvice,
  onScrollMounted
}: InitialTabProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current && onScrollMounted) {
      onScrollMounted(textareaRef.current)
    }
  }, [onScrollMounted])

  useEffect(() => {
    if (textareaRef.current && isGenerating) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
  }, [initialPrompt, isGenerating])

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col flex-1">
      <div className="bg-green-50 px-3 py-2 text-sm font-medium text-green-700 flex items-center justify-between flex-shrink-0">
        <span>初始提示词</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerate}
            disabled={isExecuting || isGenerating}
            className="text-green-500 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重新生成初始提示词"
          >
            <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'initial') ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onCopy}
            className="text-green-500 hover:text-green-600"
            title="复制到剪贴板"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-3 bg-white flex-1 flex flex-col overflow-hidden">
        <textarea
          ref={textareaRef}
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          placeholder="初始提示词将在这里显示..."
          className="w-full flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 resize-none"
        />
        
        {!isAutoMode && (
          <div className="mt-4 flex justify-end flex-shrink-0">
            <button
              onClick={onExecuteAdvice}
              disabled={!initialPrompt.trim() || isExecuting}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'advice') ? 'animate-spin' : ''}`} />
              <span>{(isExecuting && currentExecutionStep === 'advice') ? '执行中...' : '生成优化建议'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
