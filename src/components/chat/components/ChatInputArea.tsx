import { X, ArrowUp, Paperclip } from 'lucide-react'
import { useRef, useEffect } from 'react'
import type { MessageAttachment } from '@/stores/promptStore'

interface ChatInputAreaProps {
  isEditing: boolean
  userInput: string
  setUserInput: (value: string) => void
  attachments: MessageAttachment[]
  placeholder: string
  isDisabled: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement>
  showQuickReplies: boolean
  quickReplies: string[]
  quickRepliesContainerRef?: React.RefObject<HTMLDivElement>
  onKeydown: (event: React.KeyboardEvent) => void
  onCompositionStart: () => void
  onCompositionEnd: () => void
  onFocus: () => void
  onSend: () => void
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveAttachment: (id: string) => void
  onClearAttachments: () => void
  onQuickReplySelect: (reply: string) => void
  fileInputRef: React.RefObject<HTMLInputElement>
}

export default function ChatInputArea({
  isEditing,
  userInput,
  setUserInput,
  attachments,
  placeholder,
  isDisabled,
  textareaRef,
  showQuickReplies,
  quickReplies,
  quickRepliesContainerRef,
  onKeydown,
  onCompositionStart,
  onCompositionEnd,
  onFocus,
  onSend,
  onFileSelect,
  onRemoveAttachment,
  onClearAttachments,
  onQuickReplySelect,
  fileInputRef
}: ChatInputAreaProps) {
  const quickRepliesRef = useRef<HTMLDivElement>(null)

  // 同步 quickRepliesRef 到父组件
  useEffect(() => {
    if (quickRepliesContainerRef && quickRepliesRef.current) {
      // 在React中，ref通过props传递，这里只需要确保ref正确设置
      // 如果需要，可以通过callback ref的方式同步
    }
  }, [quickRepliesContainerRef])

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget
    if (document.activeElement !== target) {
      // 保存当前滚动位置
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      
      // 让默认行为执行，但立即恢复滚动位置
      setTimeout(() => {
        window.scrollTo(scrollLeft, scrollTop)
      }, 0)
    }
  }

  return (
    <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0 relative z-20">
      {/* 快速回复选项 - 绝对定位在输入框上方 */}
      {showQuickReplies && quickReplies && quickReplies.length > 0 && (
        <div ref={quickRepliesRef} className="absolute bottom-full left-0 right-0 px-6 py-3 bg-gray-50 border-b border-gray-200 shadow-lg">
          <div className="text-xs text-gray-500 mb-2">快速回复：</div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => onQuickReplySelect(reply)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.csv,.json,.xml,.html,.css,.js,.ts,.py,.java,.c,.cpp,.yaml,.yml"
        onChange={onFileSelect}
        className="hidden"
      />
      
      {attachments.length > 0 && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">已选择 {attachments.length} 个附件</span>
            <button
              onClick={onClearAttachments}
              className="text-xs text-red-500 hover:text-red-700"
            >
              清空全部
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-1">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex-shrink-0 flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-200 min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex-shrink-0">
                    {attachment.type === 'image' && (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {attachment.type === 'document' && (
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {attachment.type === 'audio' && (
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    )}
                    {attachment.type === 'video' && (
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                    {!['image', 'document', 'audio', 'video'].includes(attachment.type) && (
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-gray-700 truncate max-w-24" title={attachment.name}>
                      {attachment.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(attachment.size / 1024).toFixed(1)}KB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="flex-shrink-0 w-4 h-4 text-gray-400 hover:text-red-500 transition-colors"
                  title="移除附件"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!isEditing && (
        <div className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden" style={{ height: '120px' }}>
          <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={onKeydown}
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
              onFocus={onFocus}
              onMouseDown={handleMouseDown}
              placeholder={placeholder}
              disabled={isDisabled}
              className="w-full h-full px-2 pt-3 pb-1 border-0 outline-none resize-none disabled:opacity-50 text-base overflow-y-auto bg-transparent"
              rows={1}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-2 bg-transparent pointer-events-none">
            <button
              onClick={triggerFileSelect}
              className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors flex items-center justify-center pointer-events-auto relative"
              title="支持拖拽上传图片、文档、音频等格式，单个文件最大25MB"
            >
              <Paperclip className="w-4 h-4" />
              {attachments.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center" style={{ fontSize: '9px' }}>
                  {attachments.length}
                </span>
              )}
            </button>
            <button
              onClick={onSend}
              disabled={!userInput.trim() || isDisabled}
              className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center pointer-events-auto"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
