import { useRef, useEffect } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

interface ReportTabProps {
  requirementReport: string
  setRequirementReport: (value: string) => void
  hasConversationData: boolean
  isAutoMode: boolean
  isExecuting: boolean
  isGenerating: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isCopied: boolean
  onRegenerate: () => void
  onCopy: () => void
  onExecuteFull: () => void
  onExecuteThinking: () => void
  onScrollMounted?: (element: HTMLElement) => void
}

export default function ReportTab({
  requirementReport,
  setRequirementReport,
  hasConversationData,
  isAutoMode,
  isExecuting,
  isGenerating,
  currentExecutionStep,
  isCopied,
  onRegenerate,
  onCopy,
  onExecuteFull,
  onExecuteThinking,
  onScrollMounted
}: ReportTabProps) {
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
  }, [requirementReport, isGenerating])

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col flex-1">
      <div className="bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 flex items-center justify-between flex-shrink-0">
        <span>需求描述</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerate}
            disabled={isExecuting || isGenerating}
            className="text-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重新生成需求描述"
          >
            <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'report') ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onCopy}
            className="text-orange-500 hover:text-orange-600"
            title="复制到剪贴板"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="p-3 bg-white flex-1 flex flex-col overflow-hidden">
        <textarea
          ref={textareaRef}
          value={requirementReport}
          onChange={(e) => setRequirementReport(e.target.value)}
          placeholder={hasConversationData ? '基于对话生成的需求描述...' : '请直接描述您的需求，例如：我需要一个专业的代码审查助手，能够分析代码质量、发现潜在问题并提供改进建议...'}
          className="w-full flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 resize-none"
        />
        
        <div className="mt-4 flex justify-end flex-shrink-0">
          {isAutoMode ? (
            <button
              onClick={onExecuteFull}
              disabled={!requirementReport.trim() || isExecuting || isGenerating}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${(isExecuting || isGenerating) ? 'animate-spin' : ''}`} />
              <span>{(isExecuting || isGenerating) ? '自动生成中...' : '自动生成提示词'}</span>
            </button>
          ) : (
            <button
              onClick={onExecuteThinking}
              disabled={!requirementReport.trim() || isExecuting}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'thinking') ? 'animate-spin' : ''}`} />
              <span>{(isExecuting && currentExecutionStep === 'thinking') ? '执行中...' : '生成关键指令'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
