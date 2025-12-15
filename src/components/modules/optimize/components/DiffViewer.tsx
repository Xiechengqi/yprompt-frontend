import { X } from 'lucide-react'

interface DiffViewerProps {
  leftContent: string
  rightContent: string
  leftLabel: string
  rightLabel: string
  onClose: () => void
}

export default function DiffViewer({
  leftContent,
  rightContent,
  leftLabel,
  rightLabel,
  onClose
}: DiffViewerProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">对比查看</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-auto">
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-medium text-gray-700">{leftLabel}</div>
          <pre className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap overflow-auto">
            {leftContent}
          </pre>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-medium text-gray-700">{rightLabel}</div>
          <pre className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap overflow-auto">
            {rightContent}
          </pre>
        </div>
      </div>
    </div>
  )
}
