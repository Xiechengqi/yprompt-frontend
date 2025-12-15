import { useState, useEffect, useRef } from 'react'
import {
  ArrowUp,
  FileText,
  MessageSquare,
  RefreshCw,
  ArrowLeftRight,
  Trash2,
  Copy,
  Edit2,
  X,
  Check
} from 'lucide-react'
import { copyToClipboard } from '@/utils/clipboardUtils'
import { useConversationMessages, type ConversationMessage } from '@/hooks/useConversationMessages'
import SystemPromptModal from './SystemPromptModal'

const STORAGE_KEY = 'user_prompt_optimize_data'

interface QuickOptimizeInputProps {
  draftPrompt: string
  systemPrompt: string
  conversationHistory: string
  isOptimizing: boolean
  onUpdateDraftPrompt: (value: string) => void
  onUpdateSystemPrompt: (value: string) => void
  onUpdateConversationHistory: (value: string) => void
  onOptimize: () => void
  onRestart: () => void
}

export default function QuickOptimizeInput({
  draftPrompt,
  systemPrompt,
  conversationHistory,
  isOptimizing,
  onUpdateDraftPrompt,
  onUpdateSystemPrompt,
  onUpdateConversationHistory,
  onOptimize,
  onRestart
}: QuickOptimizeInputProps) {
  const messages = useConversationMessages()
  const [showSystemPromptModal, setShowSystemPromptModal] = useState(false)
  const [systemPromptValue, setSystemPromptValue] = useState(systemPrompt)
  const [currentRole, setCurrentRole] = useState<'user' | 'ai'>('user')
  const [inputText, setInputText] = useState('')
  const isInternalUpdateRef = useRef(false)

  // 从JSON格式的对话历史恢复消息
  const loadFromConversationHistory = () => {
    if (conversationHistory.trim()) {
      try {
        const parsed = JSON.parse(conversationHistory)
        if (Array.isArray(parsed)) {
          const loadedMessages: ConversationMessage[] = parsed.map((msg: any, index: number) => ({
            id: `msg-${Date.now()}-${index}`,
            role: msg.role === 'assistant' ? 'ai' : 'user',
            content: msg.content,
            isEditing: false
          }))

          // 如果有draftPrompt,添加为最后一条消息
          if (draftPrompt.trim()) {
            loadedMessages.push({
              id: `msg-${Date.now()}-draft`,
              role: 'user',
              content: draftPrompt,
              isEditing: false
            })
          }

          messages.setMessagesState(loadedMessages)
        }
      } catch (e) {
        console.error('解析对话历史JSON失败:', e)
      }
    } else if (draftPrompt.trim()) {
      // 没有对话历史，但有草稿提示词
      messages.addMessage('user')
      const lastMsg = messages.messages[messages.messages.length - 1]
      messages.updateMessage(lastMsg.id, draftPrompt)
    }
  }

  // 加载保存的数据
  useEffect(() => {
    // 检查是否正在从"我的"页面加载数据
    const isLoadingFromLibrary = localStorage.getItem('yprompt_optimize_loaded_user_prompt')

    // 如果正在从库加载，跳过本地编辑数据的加载，等待父组件设置props
    if (isLoadingFromLibrary) {
      return
    }

    // 否则加载上次编辑的数据
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.messages) {
          messages.setMessagesState(data.messages)
        }
        if (data.systemPrompt) {
          setSystemPromptValue(data.systemPrompt)
          onUpdateSystemPrompt(data.systemPrompt)
        }
      }
    } catch (e) {
      console.error('加载保存数据失败:', e)
    }
  }, [])

  // 监听props变化，从"我的"页面加载时
  useEffect(() => {
    if (!isInternalUpdateRef.current) {
      loadFromConversationHistory()
    }
  }, [conversationHistory, draftPrompt])

  // 保存数据到localStorage
  const saveMessageData = () => {
    try {
      const data = {
        messages: messages.messages,
        systemPrompt: systemPromptValue
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('保存数据失败:', e)
    }
  }

  // 监听systemPrompt变化
  useEffect(() => {
    setSystemPromptValue(systemPrompt)
  }, [systemPrompt])

  // 监听messages变化，更新conversationHistory和draftPrompt
  useEffect(() => {
    isInternalUpdateRef.current = true

    // 对话历史：前n-1条消息（排除最后一条，因为最后一条是要优化的草稿）
    if (messages.messages.length > 1) {
      const contextMessages = messages.messages.slice(0, -1)
      const jsonMessages = contextMessages
        .filter((msg) => msg.content.trim())
        .map((msg) => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.content
        }))
      onUpdateConversationHistory(JSON.stringify(jsonMessages, null, 2))
    } else {
      onUpdateConversationHistory('')
    }

    // 更新draftPrompt为最后一条消息（要优化的草稿）
    if (messages.messages.length > 0) {
      const lastMessage = messages.messages[messages.messages.length - 1]
      onUpdateDraftPrompt(lastMessage.content)
    } else {
      onUpdateDraftPrompt('')
    }

    saveMessageData()

    setTimeout(() => {
      isInternalUpdateRef.current = false
    }, 0)
  }, [messages.messages])

  const addMessageToConversation = () => {
    if (!inputText.trim()) return

    const roleToAdd = currentRole
    messages.addMessage(roleToAdd)
    const lastMessage = messages.messages[messages.messages.length - 1]
    messages.updateMessage(lastMessage.id, inputText)

    setInputText('')
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      addMessageToConversation()
    }
  }

  const handleEditKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>, messageId: string) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      messages.cancelEdit(messageId)
      saveMessageData()
    }

    if (event.key === 'Escape') {
      messages.cancelEdit(messageId)
    }
  }

  const handleOptimize = () => {
    if (messages.messages.length === 0 || isOptimizing) return
    onOptimize()
  }

  const handleRestart = () => {
    if (confirm('确定要重新开始吗？这将清除所有对话历史、系统提示词和优化结果。')) {
      messages.reset()
      setInputText('')
      setSystemPromptValue('')
      onUpdateDraftPrompt('')
      onUpdateSystemPrompt('')
      onUpdateConversationHistory('')
      onRestart()
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleSaveSystemPrompt = () => {
    onUpdateSystemPrompt(systemPromptValue)
    saveMessageData()
  }

  const copyMessage = async (content: string) => {
    try {
      await copyToClipboard(content)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const getLengthCategory = (length: number): string => {
    if (length <= 20) return '短草稿'
    if (length <= 100) return '中等草稿'
    if (length <= 300) return '长草稿'
    return '超长草稿'
  }

  return (
    <>
      <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
        {/* 标题栏 */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800">构建对话上下文</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSystemPromptModal(true)}
                className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors text-sm ${
                  systemPromptValue.trim() ? 'text-green-600' : 'text-gray-400'
                }`}
                title={systemPromptValue.trim() ? '系统提示词已设置' : '设置系统提示词'}
              >
                <FileText className="w-4 h-4" />
                <span>{systemPromptValue.trim() ? '系统提示词已设置' : '设置系统提示词'}</span>
              </button>
              <button
                onClick={handleRestart}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="重新开始"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重新开始</span>
              </button>
            </div>
          </div>
        </div>

        {/* 对话消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {/* 消息卡片 */}
          {messages.messages.map((message) => (
            <div
              key={message.id}
              className={`flex group ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex flex-col w-full ${
                  message.isEditing ? 'max-w-full sm:max-w-2xl' : 'max-w-xs lg:max-w-md'
                }`}
              >
                <div
                  className={`flex gap-2 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } ${message.isEditing ? 'items-start' : ''}`}
                >
                  {/* 头像 */}
                  {!message.isEditing && (
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          message.role === 'user'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {message.role === 'user' ? '👤' : '🤖'}
                      </div>
                    </div>
                  )}

                  {/* 消息内容 */}
                  <div className="flex flex-col w-full">
                    {/* 编辑状态 */}
                    {message.isEditing ? (
                      <div className="relative">
                        <div className="relative border border-blue-300 rounded-2xl overflow-hidden bg-white">
                          <textarea
                            value={message.content}
                            onChange={(e) => messages.updateMessage(message.id, e.target.value)}
                            onKeyDown={(e) => handleEditKeydown(e, message.id)}
                            className="w-full p-4 border-0 resize-none focus:outline-none text-gray-800 bg-white min-h-[80px] max-h-[200px] overflow-y-auto text-base"
                            placeholder="编辑消息内容..."
                          />
                        </div>
                      </div>
                    ) : (
                      /* 正常显示状态 */
                      <div
                        className={`rounded-lg px-4 py-3 transition-all duration-300 ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-800 mr-auto'
                        }`}
                      >
                        {!message.content ? (
                          <div className="text-sm opacity-50">
                            {message.role === 'ai' ? '输入AI助手的回复...' : '输入你的消息...'}
                          </div>
                        ) : (
                          <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                        )}
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div
                      className={`flex space-x-1 mt-2 transition-opacity duration-200 ${
                        message.isEditing
                          ? 'opacity-100 justify-end'
                          : `opacity-0 group-hover:opacity-100 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`
                      }`}
                    >
                      {message.isEditing ? (
                        <>
                          <button
                            onClick={() => {
                              messages.cancelEdit(message.id)
                              saveMessageData()
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                            title="取消编辑"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              messages.cancelEdit(message.id)
                              saveMessageData()
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                            title="保存"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              messages.startEdit(message.id)
                            }}
                            className="p-1.5 text-gray-500 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-100"
                            title="编辑消息"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              messages.updateMessageRole(message.id, message.role === 'user' ? 'ai' : 'user')
                              saveMessageData()
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                            title={message.role === 'user' ? '切换为AI助手' : '切换为用户'}
                          >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              messages.removeMessage(message.id)
                              saveMessageData()
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                            title="删除消息"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                            title="复制内容"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 空状态 */}
          {messages.messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center py-12">
              <div>
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500 mb-1">暂无对话历史</p>
                <p className="text-xs text-gray-400">在下方输入框添加对话消息构建上下文</p>
              </div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0 rounded-b-lg">
          {/* 角色选择 */}
          <div className="flex items-center gap-2 mb-2">
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as 'user' | 'ai')}
              className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">👤 用户</option>
              <option value="ai">🤖 AI助手</option>
            </select>
            <span className="text-xs text-gray-500">
              {currentRole === 'user' ? '以用户身份发送消息' : '以AI助手身份发送消息'}
            </span>
          </div>

          {/* 输入框 */}
          <div className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden" style={{ height: '120px' }}>
            <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeydown}
                placeholder="输入消息内容 (Shift+Enter换行)"
                className="w-full h-full px-4 pt-3 pb-1 border-0 outline-none resize-none text-base overflow-y-auto bg-transparent text-gray-800"
                rows={1}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-2 bg-transparent">
              <div className="text-xs text-gray-500 ml-2">
                {inputText.length} 字
                {inputText.length > 0 && (
                  <span className="ml-2 text-blue-600">· {getLengthCategory(inputText.length)}</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={addMessageToConversation}
                  disabled={!inputText.trim()}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  title="发送消息到对话历史"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOptimize}
                  disabled={messages.messages.length === 0 || isOptimizing}
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-sm rounded-full transition-colors disabled:cursor-not-allowed"
                  title="开始优化最后一条消息"
                >
                  {isOptimizing ? '优化中...' : '优化'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 系统提示词模态框 */}
      {showSystemPromptModal && (
        <SystemPromptModal
          isOpen={showSystemPromptModal}
          modelValue={systemPromptValue}
          onUpdateModelValue={setSystemPromptValue}
          onClose={() => setShowSystemPromptModal(false)}
          onSave={handleSaveSystemPrompt}
        />
      )}
    </>
  )
}
