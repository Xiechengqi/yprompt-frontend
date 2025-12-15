import { useRef, useEffect } from 'react'
import { RefreshCw, Copy, Check, Save } from 'lucide-react'

interface FinalTabProps {
  generatedPrompt: string
  setGeneratedPrompt: (value: string) => void
  isExecuting: boolean
  isGenerating: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isCopied: boolean
  isConvertingFormat: boolean
  isConvertingLanguage: boolean
  isSaving: boolean
  formatState: 'markdown' | 'xml'
  languageState: 'zh' | 'en'
  onRegenerate: () => void
  onCopy: () => void
  onToggleFormat: () => void
  onToggleLanguage: () => void
  onSavePrompt: () => void
  onScrollMounted?: (element: HTMLElement) => void
}

export default function FinalTab({
  generatedPrompt,
  setGeneratedPrompt,
  isExecuting,
  isGenerating,
  currentExecutionStep,
  isCopied,
  isConvertingFormat,
  isConvertingLanguage,
  isSaving,
  formatState,
  languageState,
  onRegenerate,
  onCopy,
  onToggleFormat,
  onToggleLanguage,
  onSavePrompt,
  onScrollMounted
}: FinalTabProps) {
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
  }, [generatedPrompt, isGenerating])

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col flex-1">
      <div className="bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 flex items-center justify-between flex-shrink-0">
        <span>最终提示词</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerate}
            disabled={isExecuting || isGenerating}
            className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重新生成最终提示词"
          >
            <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'final') ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onCopy}
            className="text-blue-500 hover:text-blue-600"
            title="复制到剪贴板"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-3 bg-white flex-1 flex flex-col overflow-hidden">
        <div className="mb-2 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleFormat}
              disabled={isConvertingFormat || isConvertingLanguage}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formatState === 'markdown' ? 'Markdown' : 'XML'}
            </button>
            <button
              onClick={onToggleLanguage}
              disabled={isConvertingFormat || isConvertingLanguage}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {languageState === 'zh' ? '中文' : 'English'}
            </button>
          </div>
          <button
            onClick={onSavePrompt}
            disabled={!generatedPrompt.trim() || isSaving}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? '保存中...' : '保存到库'}</span>
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={generatedPrompt}
          onChange={(e) => setGeneratedPrompt(e.target.value)}
          placeholder="最终提示词将在这里显示..."
          className="w-full flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 resize-none"
        />
      </div>
    </div>
  )
}
