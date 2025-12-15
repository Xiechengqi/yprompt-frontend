import { useRef, useEffect } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

interface AdviceTabProps {
  advice: string[]
  setAdvice: (advice: string[]) => void
  isAutoMode: boolean
  isExecuting: boolean
  isGenerating: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isCopied: boolean
  onRegenerate: () => void
  onCopy: () => void
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  onUpdateItem: (index: number, value: string) => void
  onExecuteFinal: () => void
  onScrollMounted?: (element: HTMLElement) => void
}

export default function AdviceTab({
  advice,
  setAdvice,
  isAutoMode,
  isExecuting,
  isGenerating,
  currentExecutionStep,
  isCopied,
  onRegenerate,
  onCopy,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onExecuteFinal,
  onScrollMounted
}: AdviceTabProps) {
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
  }, [advice, isGenerating])

  const handleUpdateItem = (index: number, value: string) => {
    const newAdvice = [...advice]
    newAdvice[index] = value
    setAdvice(newAdvice)
    onUpdateItem(index, value)
  }

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 flex items-center justify-between flex-shrink-0">
        <span>优化建议</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerate}
            disabled={isExecuting || isGenerating}
            className="text-yellow-500 hover:text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="重新生成优化建议"
          >
            <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'advice') ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onCopy}
            className="text-yellow-500 hover:text-yellow-600"
            title="复制到剪贴板"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="bg-white flex flex-col p-3 flex-1">
        <div ref={scrollContainerRef} className="space-y-2 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          {advice.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="text-yellow-500 mr-2 mt-2">•</span>
              <input
                value={item}
                onChange={(e) => handleUpdateItem(index, e.target.value)}
                onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  onRemoveItem(index)
                  const newAdvice = advice.filter((_, i) => i !== index)
                  setAdvice(newAdvice)
                }}
                className="ml-2 px-2 py-1 text-red-500 hover:text-red-700 text-sm"
                title="删除这条建议"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-3 pt-4 flex justify-between flex-shrink-0 border-t border-gray-100 bg-white">
          <button
            onClick={() => {
              onAddItem()
              setAdvice([...advice, ''])
            }}
            className="px-3 py-1 text-yellow-600 hover:text-yellow-800 text-sm"
          >
            + 添加建议
          </button>
          
          {!isAutoMode && (
            <button
              onClick={onExecuteFinal}
              disabled={!advice || advice.length === 0 || isExecuting}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${(isExecuting && currentExecutionStep === 'final') ? 'animate-spin' : ''}`} />
              <span>{(isExecuting && currentExecutionStep === 'final') ? '执行中...' : '生成最终提示词'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
