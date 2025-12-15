import { useRef, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { usePromptStore } from '@/stores/promptStore'
import { useChatMessages } from '@/hooks/useChatMessages'
import { useChatInput } from '@/hooks/useChatInput'
import { useChatAttachments } from '@/hooks/useChatAttachments'
import { useChatModel } from '@/hooks/useChatModel'
import { useChatQuickReplies } from '@/hooks/useChatQuickReplies'
import { useChatLogic } from '@/hooks/useChatLogic'
import { useChatMessageOperations } from '@/hooks/useChatMessageOperations'
import ChatHeader from './chat/components/ChatHeader'
import ChatMessageList from './chat/components/ChatMessageList'
import ChatQuickReplies from './chat/components/ChatQuickReplies'
import ChatInputArea from './chat/components/ChatInputArea'

export default function ChatInterface() {
  const inputContainerRef = useRef<HTMLDivElement>(null)
  
  // 使用选择器来避免不必要的重渲染
  const isGenerating = usePromptStore((state) => state.isGenerating)
  const isTyping = usePromptStore((state) => state.isTyping)
  const chatMessagesFromStore = usePromptStore((state) => state.chatMessages)
  
  const chatMessages = useChatMessages()
  const chatInput = useChatInput()
  const chatAttachments = useChatAttachments()
  const chatModel = useChatModel()
  const chatQuickReplies = useChatQuickReplies(inputContainerRef)
  const chatMessageOperations = useChatMessageOperations()
  
  const chatLogic = useChatLogic({
    chatMessages,
    chatModel,
    chatInput,
    chatAttachments,
    chatQuickReplies
  })

  useEffect(() => {
    chatLogic.initializeChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 只在组件挂载时初始化一次

  const handleSendMessage = () => {
    if (!chatInput.userInput.trim() && chatAttachments.currentAttachments.length === 0) {
      return
    }
    
    chatLogic.sendMessage(chatInput.userInput)
  }

  const handleInputKeydown = (event: React.KeyboardEvent) => {
    chatInput.handleKeydown(event, handleSendMessage)
  }

  const handleQuickReplySelect = (reply: string) => {
    chatQuickReplies.selectQuickReply(reply, (selectedReply: string) => {
      chatInput.setUserInput(selectedReply)
      handleSendMessage()
    })
  }

  const handleClearChat = () => {
    chatLogic.clearChat()
  }

  const handleInterrupt = () => {
    chatLogic.interruptGeneration()
  }

  const handleRegenerate = (messageId: string, messageIndex: number) => {
    const { provider, model } = chatModel.getCurrentChatModel()
    chatLogic.regenerateMessage(messageId, messageIndex, provider, model)
  }

  const handleResend = (messageId: string, messageIndex: number) => {
    // 处理编辑后的重新发送 - 先保存编辑
    const message = chatMessagesFromStore.find(msg => msg.id === messageId)
    if (message && message.type === 'user' && message.isEditing) {
      chatMessageOperations.saveEdit(messageId)
    }
    const { provider, model } = chatModel.getCurrentChatModel()
    chatLogic.resendUserMessage(messageId, messageIndex, provider, model)
  }

  const handleResendUser = (messageId: string, messageIndex: number) => {
    const { provider, model } = chatModel.getCurrentChatModel()
    chatLogic.resendUserMessage(messageId, messageIndex, provider, model)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm flex flex-col h-full max-h-full overflow-hidden relative"
      onDragOver={chatAttachments.handleGlobalDragOver}
      onDragEnter={chatAttachments.handleGlobalDragEnter}
      onDragLeave={chatAttachments.handleGlobalDragLeave}
      onDrop={chatAttachments.handleGlobalDrop}
    >
      {/* Chat Header */}
      <ChatHeader
        isStreamMode={chatModel.isStreamMode}
        isGenerating={isGenerating}
        isTyping={isTyping}
        onToggleStream={chatModel.toggleStreamMode}
        onClearChat={handleClearChat}
        onInterrupt={handleInterrupt}
      />

      {/* Chat Messages */}
      <ChatMessageList
        chatContainerRef={chatMessages.chatContainer}
        messages={chatMessagesFromStore}
        renderMarkdown={chatMessages.renderMarkdown}
        renderUserMessage={chatMessages.renderUserMessage}
        chatContainerMaxHeight={chatLogic.chatContainerMaxHeight}
        editingContent={chatMessageOperations.editingContent}
        isTyping={isTyping}
        isGenerating={isGenerating}
        onStartEdit={chatMessageOperations.startEdit}
        onSaveEdit={chatMessageOperations.saveEdit}
        onCancelEdit={chatMessageOperations.cancelEdit}
        onDelete={chatMessageOperations.deleteMessage}
        onCopy={chatMessageOperations.copyMessage}
        onRegenerate={handleRegenerate}
        onResend={handleResend}
        onResendUser={handleResendUser}
        onEditKeydown={chatMessageOperations.handleEditKeydown}
        onSetEditRef={chatMessageOperations.setEditTextareaRef}
        onSetMessageRef={chatMessageOperations.setMessageRef}
        onUpdateEditingContent={chatMessageOperations.updateEditingContent}
      />

      {/* 快速回复选项 */}
      <ChatQuickReplies
        show={chatQuickReplies.shouldShowQuickReplies}
        replies={chatQuickReplies.quickReplies}
        quickRepliesContainerRef={chatQuickReplies.quickRepliesContainerRef}
        inputContainerRef={inputContainerRef}
        onSelect={handleQuickReplySelect}
      />

      {/* Input Area */}
      <div ref={inputContainerRef}>
        <ChatInputArea
          isEditing={chatMessageOperations.isEditing}
          userInput={chatInput.userInput}
          setUserInput={chatInput.setUserInput}
          attachments={chatAttachments.currentAttachments}
          placeholder={chatQuickReplies.shouldShowQuickReplies ? '输入或点击上方快速回复...' : 'Shift+Enter换行'}
          isDisabled={isTyping || isGenerating}
          textareaRef={chatInput.textareaRef}
          showQuickReplies={chatQuickReplies.shouldShowQuickReplies}
          quickReplies={chatQuickReplies.quickReplies}
          quickRepliesContainerRef={chatQuickReplies.quickRepliesContainerRef}
          onKeydown={handleInputKeydown}
          onCompositionStart={chatInput.handleCompositionStart}
          onCompositionEnd={chatInput.handleCompositionEnd}
          onFocus={() => chatQuickReplies.setShowQuickReplies(true)}
          onSend={handleSendMessage}
          onFileSelect={chatAttachments.handleFileSelect}
          onRemoveAttachment={chatAttachments.removeAttachment}
          onClearAttachments={chatAttachments.clearAttachments}
          onQuickReplySelect={handleQuickReplySelect}
          fileInputRef={chatAttachments.fileInputRef}
        />
      </div>
      
      {/* 全局拖拽覆盖层 */}
      {chatAttachments.isGlobalDragging && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center z-50 border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <div className="text-lg font-medium text-blue-700 mb-2">
              释放文件以上传
            </div>
            <div className="text-sm text-blue-600">
              支持图片、文档、音频等格式
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
