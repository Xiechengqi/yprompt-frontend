import { useRef, useEffect } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

interface ThinkingTabProps {
  thinkingPoints: string[]
  setThinkingPoints: (points: string[]) => void
  isAutoMode: boolean
  isExecuting: boolean
  isGenerating: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isCopied: boolean
  onRegenerate: () => void
  onCopy: () => void
  onAddPoint: () => void
  onRemovePoint: (index: number) => void
  onUpdatePoint: (index: number, value: string) => void
  onExecuteInitial: () => void
  onScrollMounted?: (element: HTMLElement) => void
}

export default function ThinkingTab({
  thinkingPoints,
  setThinkingPoints,
  isAutoMode,
  isExecuting,
  isGenerating,
  currentExecutionStep,
  isCopied,
  onRegenerate,
  onCopy,
  onAddPoint,
  onRemovePoint,
  onUpdatePoint,
  onExecuteInitial,
  onScrollMounted
}: ThinkingTabProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current && onScrollMounted) {
      onScrollMounted(scrollContainerRef.current)
    }
  }, [onScrollMounted])

  useEffect(() => {
    if (scrollContainerRef.current && isGenerating) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [thinkingPoints, isGenerating])

  const handleUpdatePoint = (index: number, value: string) => {
    const newPoints = [...thinkingPoints]
    newPoints[index] = value
    setThinkingPoints(newPoints)
    onUpdatePoint(index, value)
  }

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 flex items-center justify-between flex-shrink-0">
        <span>关键指令</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerate}
            disabled={isExecuting || isGenerating}
            className="text-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重新生成关键指令"
          >
            <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'thinking') ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onCopy}
            className="text-purple-500 hover:text-purple-600"
            title="复制到剪贴板"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="bg-white flex flex-col p-3 flex-1">
        <div ref={scrollContainerRef} className="space-y-2 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          {thinkingPoints.map((point, index) => (
            <div key={index} className="flex items-start">
              <span className="text-purple-500 mr-2 mt-2">•</span>
              <input
                value={point}
                onChange={(e) => handleUpdatePoint(index, e.target.value)}
                onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  onRemovePoint(index)
                  const newPoints = thinkingPoints.filter((_, i) => i !== index)
                  setThinkingPoints(newPoints)
                }}
                className="ml-2 px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                title="删除这条指令"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-3 pt-4 flex justify-between flex-shrink-0 border-t border-gray-100 bg-white">
          <button
            onClick={() => {
              onAddPoint()
              setThinkingPoints([...thinkingPoints, ''])
            }}
            className="px-3 py-1 text-purple-600 hover:text-purple-800 text-sm"
          >
            + 添加指令
          </button>
          
          {!isAutoMode && (
            <button
              onClick={onExecuteInitial}
              disabled={!thinkingPoints || thinkingPoints.length === 0 || isExecuting}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'initial') ? 'animate-spin' : ''}`} />
              <span>{(isExecuting && currentExecutionStep === 'initial') ? '执行中...' : '生成初始提示词'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
