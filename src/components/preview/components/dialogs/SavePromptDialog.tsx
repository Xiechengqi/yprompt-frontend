import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface SavePromptDialogProps {
  isOpen: boolean
  promptContent: string
  isSaving: boolean
  onSave: (formData: {
    title: string
    description: string
    tags: string[]
    isPublic: boolean
    promptType: string
  }) => void
  onCancel: () => void
}

export default function SavePromptDialog({
  isOpen,
  promptContent,
  isSaving,
  onSave,
  onCancel
}: SavePromptDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    isPublic: false,
    promptType: 'system' as 'system' | 'user',
    content: ''
  })
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        tags: [],
        isPublic: false,
        promptType: 'system',
        content: ''
      })
      setNewTag('')
    }
  }, [isOpen])

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleSave = () => {
    if (!formData.title.trim()) {
      return
    }
    onSave({
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      isPublic: formData.isPublic,
      promptType: formData.promptType
    })
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">保存提示词</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-4">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              type="text"
              placeholder="请输入提示词标题"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={200}
            />
            <p className="mt-1 text-xs text-gray-500">{formData.title.length}/200</p>
          </div>

          {/* 描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="简短描述这个提示词的用途（可选）"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500</p>
          </div>

          {/* 提示词类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              提示词类型 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={formData.promptType === 'system'}
                  onChange={() => setFormData(prev => ({ ...prev, promptType: 'system' }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">系统提示词</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={formData.promptType === 'user'}
                  onChange={() => setFormData(prev => ({ ...prev, promptType: 'user' }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">用户提示词</span>
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              系统提示词：用于定义AI的角色和行为规则；用户提示词：用于具体任务和指令
            </p>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2 text-blue-500 hover:text-blue-700">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && addTag()}
                type="text"
                placeholder="输入标签后按回车添加"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                添加
              </button>
            </div>
          </div>

          {/* 是否公开 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              公开分享（其他用户可以看到）
            </label>
          </div>

          {/* 提示词内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              提示词内容 <span className="text-red-500">*</span>
            </label>
            {promptContent && promptContent.trim() ? (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg max-h-40 overflow-y-auto text-sm text-gray-600">
                {promptContent.slice(0, 200)}{promptContent.length > 200 ? '...' : ''}
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="请输入或粘贴提示词内容..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            )}
            <p className="mt-1 text-xs text-gray-500">共 {(promptContent || formData.content).length} 个字符</p>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.title.trim() || isSaving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
}
