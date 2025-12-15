import { useEffect, useMemo } from 'react'
import type { ChatMessage as ChatMessageType } from '@/stores/promptStore'
import ChatMessage from './ChatMessage'

interface ChatMessageListProps {
  chatContainerRef: React.RefObject<HTMLDivElement>
  messages: ChatMessageType[]
  renderMarkdown: (content: string) => string
  renderUserMessage: (content: string) => string
  chatContainerMaxHeight?: string
  editingContent?: Record<string, string>
  isTyping?: boolean
  isGenerating?: boolean
  onStartEdit?: (messageId: string) => void
  onSaveEdit?: (messageId: string) => void
  onCancelEdit?: (messageId: string) => void
  onDelete?: (messageId: string) => void
  onCopy?: (content: string) => void
  onRegenerate?: (messageId: string, messageIndex: number) => void
  onResend?: (messageId: string, messageIndex: number) => void
  onResendUser?: (messageId: string, messageIndex: number) => void
  onEditKeydown?: (event: React.KeyboardEvent, messageId: string) => void
  onSetEditRef?: (messageId: string, el: HTMLTextAreaElement | null) => void
  onSetMessageRef?: (messageId: string, el: HTMLElement | null) => void
  onUpdateEditingContent?: (messageId: string, content: string) => void
}

export default function ChatMessageList({
  chatContainerRef,
  messages,
  renderMarkdown,
  renderUserMessage,
  chatContainerMaxHeight,
  editingContent = {},
  isTyping = false,
  isGenerating = false,
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
}: ChatMessageListProps) {
  // 使用 useMemo 缓存过滤后的消息列表，避免每次渲染都重新过滤
  const validMessages = useMemo(() => {
    return messages.filter(msg => !msg.isDeleted)
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validMessages.length, isTyping]) // 依赖消息数量和输入状态

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
      style={chatContainerMaxHeight ? { maxHeight: chatContainerMaxHeight } : undefined}
    >
      {validMessages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>开始对话，AI 将引导您创建专业的提示词</p>
        </div>
      ) : (
        validMessages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            messageIndex={index}
            renderMarkdown={renderMarkdown}
            renderUserMessage={renderUserMessage}
            editingContent={editingContent[message.id!] || ''}
            isDisabled={isTyping || isGenerating}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onCopy={onCopy}
            onRegenerate={(messageId) => onRegenerate?.(messageId, index)}
            onResend={(messageId) => onResend?.(messageId, index)}
            onResendUser={(messageId) => onResendUser?.(messageId, index)}
            onEditKeydown={onEditKeydown}
            onSetEditRef={onSetEditRef}
            onSetMessageRef={onSetMessageRef}
            onUpdateEditingContent={onUpdateEditingContent}
          />
        ))
      )}
      
      {/* 输入中指示器 */}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
