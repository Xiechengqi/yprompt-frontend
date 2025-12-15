import { useRef, useEffect, ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface TabContainerProps {
  isGenerating: boolean
  children: ReactNode
  onMounted?: (element: HTMLElement) => void
}

export default function TabContainer({ isGenerating, children, onMounted }: TabContainerProps) {
  const tabContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tabContainerRef.current && onMounted) {
      onMounted(tabContainerRef.current)
    }
  }, [onMounted])

  return (
    <div ref={tabContainerRef} className="flex space-x-2 mb-4 flex-shrink-0 overflow-x-auto scrollbar-hide scroll-smooth">
      <div className="flex space-x-2 min-w-max px-1">
        {isGenerating && (
          <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm whitespace-nowrap">
            <RefreshCw className="w-3 h-3 animate-spin mr-1" />
            <span>生成中</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
