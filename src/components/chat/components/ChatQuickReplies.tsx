interface ChatQuickRepliesProps {
  show: boolean
  replies: string[]
  quickRepliesContainerRef: React.RefObject<HTMLDivElement>
  inputContainerRef: React.RefObject<HTMLElement>
  onSelect: (reply: string) => void
}

export default function ChatQuickReplies({
  show,
  replies,
  quickRepliesContainerRef,
  onSelect
}: ChatQuickRepliesProps) {
  if (!show) {
    return null
  }

  return (
    <div
      ref={quickRepliesContainerRef}
      className="absolute bottom-full left-0 right-0 px-6 py-3 bg-gray-50 border-b border-gray-200 shadow-lg z-10"
    >
      <div className="text-xs text-gray-500 mb-2">快速回复：</div>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <button
            key={reply}
            onClick={() => onSelect(reply)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}
