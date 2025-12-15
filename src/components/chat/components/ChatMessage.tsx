import { memo, useRef, useEffect } from 'react'
import { RefreshCw, Edit2, Trash2, Copy, X, Send } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/stores/promptStore'

interface ChatMessageProps {
  message: ChatMessageType
  messageIndex: number
  renderMarkdown: (content: string) => string
  renderUserMessage: (content: string) => string
  editingContent?: string
  isDisabled?: boolean
  onStartEdit?: (messageId: string) => void
  onSaveEdit?: (messageId: string) => void
  onCancelEdit?: (messageId: string) => void
  onDelete?: (messageId: string) => void
  onCopy?: (content: string) => void
  onRegenerate?: (messageId: string) => void
  onResend?: (messageId: string) => void
  onResendUser?: (messageId: string) => void
  onEditKeydown?: (event: React.KeyboardEvent, messageId: string) => void
  onSetEditRef?: (messageId: string, el: HTMLTextAreaElement | null) => void
  onSetMessageRef?: (messageId: string, el: HTMLElement | null) => void
  onUpdateEditingContent?: (messageId: string, content: string) => void
}

const ChatMessage = memo(function ChatMessage({
  message,
  messageIndex: _messageIndex,
  renderMarkdown,
  renderUserMessage,
  editingContent = '',
  isDisabled = false,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onCopy,
  onRegenerate,
  onResend,
  onResendUser,
  onEditKeydown,
  onSetEditRef,
  onSetMessageRef,
  onUpdateEditingContent
}: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)
  const editTextareaRef = useRef<HTMLTextAreaElement>(null)
  const isUser = message.type === 'user'
  const isEditing = message.isEditing || false

  useEffect(() => {
    if (onSetMessageRef && messageRef.current) {
      onSetMessageRef(message.id!, messageRef.current)
    }
  }, [message.id, onSetMessageRef])

  useEffect(() => {
    if (isEditing && editTextareaRef.current && onSetEditRef) {
      onSetEditRef(message.id!, editTextareaRef.current)
      editTextareaRef.current.focus()
      const length = editTextareaRef.current.value.length
      editTextareaRef.current.setSelectionRange(length, length)
    }
  }, [isEditing, message.id, onSetEditRef])

  const content = isUser ? renderUserMessage(message.content) : renderMarkdown(message.content)

  return (
    <div
      ref={messageRef}
      className={`flex group ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex flex-col w-full ${isEditing ? 'max-w-full sm:max-w-2xl' : 'max-w-xs lg:max-w-md'}`}>
        <div
          className={`${
            isEditing
              ? 'bg-transparent border-0 shadow-none p-0'
              : isUser
                ? 'bg-blue-500 text-white px-4 py-3 rounded-lg'
                : message.isProgress
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 px-4 py-3 rounded-lg animate-pulse'
                  : 'bg-gray-100 text-gray-800 px-4 py-3 rounded-lg'
          } ${
            !isEditing && (isUser ? 'ml-auto' : 'mr-auto')
          } transition-all duration-300 relative`}
        >
          {isEditing ? (
            <div className="relative">
              <div className="relative border border-blue-300 rounded-2xl overflow-hidden bg-white">
                <div className="relative">
                  <textarea
                    ref={editTextareaRef}
                    value={editingContent}
                    onChange={(e) => onUpdateEditingContent?.(message.id!, e.target.value)}
                    onKeyDown={(e) => onEditKeydown?.(e, message.id!)}
                    className="w-full p-4 border-0 resize-none focus:outline-none text-gray-800 bg-white min-h-[80px] max-h-[200px] overflow-y-auto text-base"
                    placeholder="编辑消息内容..."
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {message.type === 'ai' ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-800"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div
                  className="text-sm text-white [&_h1]:text-base [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-1 [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-white [&_h5]:text-sm [&_h5]:font-bold [&_h5]:text-white [&_h6]:text-sm [&_h6]:font-bold [&_h6]:text-white [&_p]:text-sm [&_p]:text-white [&_p]:mb-2 [&_strong]:font-bold [&_strong]:text-white [&_b]:font-bold [&_b]:text-white [&_em]:italic [&_em]:text-white [&_i]:italic [&_i]:text-white [&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-white [&_ul]:text-sm [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-white [&_ol]:text-sm [&_ol]:mb-2 [&_li]:text-sm [&_li]:text-white [&_li]:mb-1 [&_code]:bg-blue-600 [&_code]:text-blue-100 [&_code]:text-xs [&_code]:px-1 [&_code]:rounded [&_code]:font-mono [&_pre]:bg-blue-600 [&_pre]:text-blue-100 [&_pre]:text-xs [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_a]:text-blue-200 [&_a]:underline [&_a]:text-sm [&_blockquote]:border-l-2 [&_blockquote]:border-blue-300 [&_blockquote]:pl-2 [&_blockquote]:text-blue-100 [&_blockquote]:text-sm"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </div>
          )}
        </div>

        {/* 附件显示 */}
        {message.attachments && message.attachments.length > 0 && !isEditing && (
          <div className={`mt-2 ${isUser ? 'ml-auto max-w-xs lg:max-w-md' : 'mr-auto max-w-xs lg:max-w-md'}`}>
            <div className="text-xs text-gray-500 mb-1">附件 ({message.attachments.length})</div>
            <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-1">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className={`flex-shrink-0 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs border min-w-0 ${
                    isUser ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex-shrink-0">
                      {attachment.type === 'image' && (
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {attachment.type === 'document' && (
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {attachment.type === 'audio' && (
                        <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      )}
                      {attachment.type === 'video' && (
                        <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate max-w-20 font-medium text-xs ${
                          isUser ? 'text-blue-700' : 'text-gray-700'
                        }`}
                        title={attachment.name}
                      >
                        {attachment.name}
                      </div>
                      <div className={`text-xs ${isUser ? 'text-blue-500' : 'text-gray-500'}`}>
                        {(attachment.size / 1024).toFixed(1)}KB
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        {!message.isProgress && (
          <div
            className={`flex space-x-1 mt-2 transition-opacity duration-200 ${
              isEditing
                ? 'opacity-100 justify-end'
                : `opacity-0 group-hover:opacity-100 ${isUser ? 'justify-end' : 'justify-start'}`
            }`}
          >
            {isEditing ? (
              <>
                <button
                  onClick={() => isUser ? onResend?.(message.id!) : onSaveEdit?.(message.id!)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                  title={isUser ? '保存并重新发送' : '保存编辑'}
                  disabled={isDisabled}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onCancelEdit?.(message.id!)}
                  className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="取消编辑"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                {message.type === 'ai' && (
                  <button
                    onClick={() => onRegenerate?.(message.id!)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                    title="重新生成回复"
                    disabled={isDisabled}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                {message.type === 'user' && (
                  <button
                    onClick={() => onResendUser?.(message.id!)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                    title="重新发送消息"
                    disabled={isDisabled}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onStartEdit?.(message.id!)}
                  className="p-1.5 text-gray-500 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="编辑消息"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(message.id!)}
                  className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="删除消息"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onCopy?.(message.content)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="复制消息内容"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default ChatMessage
