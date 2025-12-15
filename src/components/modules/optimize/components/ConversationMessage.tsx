import { useState } from 'react'
import { Message } from '@/types/optimize'
import { Edit2, Trash2 } from 'lucide-react'

interface Props {
  message: Message
  index: number
  editingIndex: number | null
  editingContent: string
  onEditMessage: (index: number) => void
  onSaveEdit: (index: number) => void
  onCancelEdit: () => void
  onRemoveMessage: (index: number) => void
  onUpdateEditingContent: (content: string) => void
}

export default function ConversationMessage({
  message,
  index,
  editingIndex,
  editingContent,
  onEditMessage,
  onSaveEdit,
  onCancelEdit,
  onRemoveMessage,
  onUpdateEditingContent
}: Props) {
  const getRoleIcon = () => {
    const icons = {
      user: 'U',
      assistant: 'A',
      system: 'S'
    }
    return icons[message.role] || '?'
  }

  const isEditing = editingIndex === index
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex mb-4 group ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* 头像 */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
          isUser
            ? 'bg-blue-500 text-white ml-2 order-2'
            : isAssistant
            ? 'bg-green-500 text-white mr-2 order-1'
            : 'bg-purple-500 text-white mr-2 order-1'
        }`}
      >
        {getRoleIcon()}
      </div>

      {/* 消息内容 */}
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg relative ${
          isUser
            ? 'bg-blue-500 text-white order-1'
            : isAssistant
            ? 'bg-green-100 text-gray-800 border border-green-200 order-2'
            : 'bg-purple-100 text-gray-800 border border-purple-200 order-2'
        }`}
      >
        {/* 编辑模式 */}
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editingContent}
              onChange={(e) => onUpdateEditingContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm resize-none bg-white text-gray-800"
              rows={3}
              placeholder="编辑消息内容..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={onCancelEdit}
                className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 bg-gray-100 rounded"
              >
                取消
              </button>
              <button
                onClick={() => onSaveEdit(index)}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          /* 显示模式 */
          <div>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>

            {/* 编辑按钮 */}
            {message.role !== 'system' && (
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEditMessage(index)}
                  className={`p-1 text-xs hover:bg-white hover:bg-opacity-20 rounded transition-colors ${
                    isUser ? 'text-blue-100' : 'text-gray-600'
                  }`}
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 删除按钮 */}
      {message.role !== 'system' && !isEditing && (
        <div
          className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? 'order-3 ml-2' : 'order-0 mr-2'
          }`}
        >
          <button
            onClick={() => onRemoveMessage(index)}
            className="p-1 text-xs text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}