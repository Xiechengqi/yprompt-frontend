import { useState, useEffect, useRef, useMemo } from 'react'
import { X, Copy, Edit, Zap, Save, X as XIcon } from 'lucide-react'
import { copyToClipboard } from '@/utils/clipboardUtils'
import { useNotificationStore } from '@/stores/notificationStore'
import { put } from '@/services/apiService'
import VersionHistoryContent from './VersionHistoryContent'
import type { Prompt, PromptListItem } from '@/types/prompt'

interface PromptDetailModalProps {
  prompt: Prompt | PromptListItem | null
  onClose: () => void
  onEdit: (prompt: Prompt | PromptListItem) => void
  onOptimize: (prompt: Prompt | PromptListItem) => void
  onRollback: (versionNumber: string) => void
}

export default function PromptDetailModal({
  prompt,
  onClose,
  onEdit,
  onOptimize,
  onRollback
}: PromptDetailModalProps) {
  const notificationStore = useNotificationStore()

  const [activeTab, setActiveTab] = useState<'content' | 'info' | 'versions'>('content')
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [editedPromptType, setEditedPromptType] = useState<'system' | 'user'>('system')
  const [editedIsPublic, setEditedIsPublic] = useState(false)
  const [editedTags, setEditedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const tagInputRef = useRef<HTMLInputElement>(null)

  const isOpen = !!prompt

  // 确保 tags 始终是数组格式
  const promptTags = useMemo(() => {
    if (!prompt) return []
    const tags = prompt.tags
    return Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
      : []
  }, [prompt])

  const tabs = [
    { key: 'content' as const, label: '提示词内容' },
    { key: 'info' as const, label: '基本信息' },
    { key: 'versions' as const, label: '版本历史' }
  ]

  // 监听标签输入框显示状态，自动聚焦
  useEffect(() => {
    if (showTagInput && tagInputRef.current) {
      tagInputRef.current.focus()
    }
  }, [showTagInput])

  // 初始化编辑状态
  useEffect(() => {
    if (prompt && isEditing) {
      setEditedContent(prompt.final_prompt)
      setEditedTitle(prompt.title)
      setEditedDescription(prompt.description || '')
      setEditedPromptType((prompt.prompt_type as 'system' | 'user') || 'system')
      setEditedIsPublic(!!prompt.is_public)
      const tags = prompt.tags
      setEditedTags(
        Array.isArray(tags)
          ? [...tags]
          : typeof tags === 'string'
          ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
          : []
      )
    }
  }, [prompt, isEditing])

  // 关闭弹窗
  const handleClose = () => {
    setIsEditing(false)
    onClose()
    setActiveTab('content')
  }

  // 开始编辑
  const handleEdit = () => {
    if (!prompt) return
    setIsEditing(true)
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedContent('')
    setEditedTitle('')
    setEditedDescription('')
    setEditedPromptType('system')
    setEditedIsPublic(false)
    setEditedTags([])
    setTagInput('')
    setShowTagInput(false)
  }

  // 添加标签
  const addTag = () => {
    const tag = tagInput.trim()

    // 验证：非空
    if (!tag) {
      return
    }

    // 验证：最多5个标签
    if (editedTags.length >= 5) {
      notificationStore.warning('最多只能添加5个标签', 2000)
      return
    }

    // 验证：标签不重复
    if (editedTags.includes(tag)) {
      notificationStore.warning('标签已存在', 2000)
      setTagInput('')
      return
    }

    // 验证：最多8个字符
    if (tag.length > 8) {
      notificationStore.warning('标签最多8个字符', 2000)
      return
    }

    // 添加标签
    setEditedTags([...editedTags, tag])
    setTagInput('')
    setShowTagInput(false)
  }

  // 移除标签
  const removeTag = (index: number) => {
    setEditedTags(editedTags.filter((_, i) => i !== index))
  }

  // 保存编辑
  const handleSaveEdit = async () => {
    if (!prompt) return

    try {
      setIsSaving(true)

      const result = await put(`/api/prompts/${prompt.id}`, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        final_prompt: editedContent,
        prompt_type: editedPromptType,
        is_public: editedIsPublic ? 1 : 0,
        tags: editedTags
      })

      if (result.code === 200) {
        notificationStore.success('保存成功', 2000)
        setIsEditing(false)
        // 更新本地数据
        const updatedPrompt = {
          ...prompt,
          title: editedTitle.trim(),
          description: editedDescription.trim(),
          final_prompt: editedContent,
          prompt_type: editedPromptType,
          is_public: editedIsPublic ? 1 : 0,
          tags: editedTags
        }
        // 通知父组件刷新列表
        onEdit(updatedPrompt)
      } else {
        throw new Error(result.message || '保存失败')
      }
    } catch (err: any) {
      console.error('保存失败:', err)
      notificationStore.error(`保存失败: ${err.message}`, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  // 复制提示词
  const handleCopy = async () => {
    if (!prompt) return

    try {
      await copyToClipboard(prompt.final_prompt)
      notificationStore.success('提示词已复制到剪贴板', 2000)
    } catch (err) {
      console.error('复制失败:', err)
      notificationStore.error('复制失败', 2000)
    }
  }

  // 格式化日期时间
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (!isOpen || !prompt) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="prompt-detail-modal bg-white rounded-lg shadow-xl w-full h-[90vh] max-w-6xl mx-4 overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="flex items-start justify-between p-6 border-b bg-gray-50">
          <div className="flex-1 min-w-0">
            {/* 编辑模式 */}
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  {/* 标题输入 */}
                  <div className="flex-1 min-w-0">
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-xl font-semibold text-gray-900"
                      placeholder="请输入标题"
                    />
                  </div>

                  {/* 编辑模式按钮 */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <XIcon className="w-4 h-4" />
                      取消
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={isSaving}
                      className="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      {isSaving ? (
                        '保存中...'
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          保存
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 描述输入 */}
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm text-gray-700 resize-none"
                  rows={2}
                  placeholder="请输入描述（可选）"
                />

                {/* 提示词设置：类型、可见性、标签（紧凑单行） */}
                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  {/* 类型 */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-600">类型</span>
                    <div className="flex gap-2">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          checked={editedPromptType === 'system'}
                          onChange={() => setEditedPromptType('system')}
                          className="w-3.5 h-3.5 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-1"
                        />
                        <span className="ml-1 text-xs text-gray-700 group-hover:text-purple-600">系统</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          checked={editedPromptType === 'user'}
                          onChange={() => setEditedPromptType('user')}
                          className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-1"
                        />
                        <span className="ml-1 text-xs text-gray-700 group-hover:text-blue-600">用户</span>
                      </label>
                    </div>
                  </div>

                  <div className="w-px h-4 bg-gray-300"></div>

                  {/* 可见性 */}
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={editedIsPublic}
                      onChange={(e) => setEditedIsPublic(e.target.checked)}
                      className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-1"
                    />
                    <span className="ml-1 text-xs text-gray-700 group-hover:text-green-600">公开</span>
                  </label>

                  <div className="w-px h-4 bg-gray-300"></div>

                  {/* 标签 */}
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-xs font-medium text-gray-600 flex-shrink-0">标签</span>
                    {/* 已有标签 */}
                    <div className="flex items-center gap-1 flex-wrap flex-1 min-w-0">
                      {editedTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
                        >
                          <span className="max-w-[80px] truncate">{tag}</span>
                          <button
                            onClick={() => removeTag(index)}
                            className="text-blue-600 hover:text-blue-800 font-bold text-sm leading-none"
                            title="移除标签"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {/* 添加按钮 */}
                      {editedTags.length < 5 ? (
                        <button
                          onClick={() => setShowTagInput(!showTagInput)}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs rounded transition-colors"
                          title="添加标签"
                        >
                          <span>+</span>
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">(最多5个)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 标签输入框（展开时显示） */}
                {showTagInput && (
                  <div className="px-3">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <input
                        ref={tagInputRef}
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        type="text"
                        placeholder="输入标签名（最多8字）"
                        maxLength={8}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded outline-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                          } else if (e.key === 'Escape') {
                            setShowTagInput(false)
                            setTagInput('')
                          }
                        }}
                      />
                      <button
                        onClick={addTag}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                      >
                        添加
                      </button>
                      <button
                        onClick={() => {
                          setShowTagInput(false)
                          setTagInput('')
                        }}
                        className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 查看模式 */
              <div>
                <div className="flex items-center gap-4">
                  {/* 标题和描述 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">{prompt.title}</h2>
                      {/* 提示词类型标签 */}
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded border flex-shrink-0 ${
                          prompt.prompt_type === 'system'
                            ? 'bg-purple-100 text-purple-700 border-purple-200'
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                      >
                        {prompt.prompt_type === 'system' ? '系统提示词' : '用户提示词'}
                      </span>
                    </div>
                    {prompt.description && (
                      <p className="text-sm text-gray-600 mt-1 truncate">{prompt.description}</p>
                    )}
                  </div>

                  {/* 查看模式按钮 */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      复制
                    </button>
                    <button
                      onClick={handleEdit}
                      data-edit="prompt-detail"
                      className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      编辑
                    </button>
                    <button
                      onClick={() => onOptimize(prompt)}
                      className="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-4 h-4" />
                      优化
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 ml-4">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 内容区域 */}
        {prompt && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* 统计信息栏（编辑模式时隐藏） */}
            {!isEditing && (
              <div className="px-6 py-3 bg-gray-50 border-b">
                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {prompt.is_public ? '公开' : '私有'}
                  </span>

                  <span className="w-px h-4 bg-gray-300"></span>

                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {prompt.view_count || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {prompt.use_count || 0}
                  </span>

                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    v{prompt.current_version || '1.0.0'}
                  </span>

                  <span className="flex items-center gap-1">
                    {prompt.is_favorite ? (
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                    {prompt.is_favorite ? '已收藏' : '未收藏'}
                  </span>

                  <span className="w-px h-4 bg-gray-300"></span>

                  {/* 标签（仅查看模式显示） */}
                  <div className="flex items-center gap-2">
                    <span>标签:</span>
                    <div className="flex flex-wrap gap-1">
                      {promptTags.length > 0 ? (
                        promptTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">暂无标签</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 标签页 */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* 标签栏 */}
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 标签内容 */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* 提示词内容 */}
                {activeTab === 'content' && (
                  <div className="h-full">
                    {/* 编辑模式 */}
                    {isEditing ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-full p-4 outline-none resize-none text-sm text-gray-800 font-mono bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                        placeholder="请输入提示词内容..."
                      />
                    ) : (
                      /* 查看模式 */
                      <pre className="h-full p-4 whitespace-pre-wrap text-sm text-gray-800 font-mono overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        {prompt.final_prompt}
                      </pre>
                    )}
                  </div>
                )}

                {/* 基本信息 */}
                {activeTab === 'info' && (
                  <div className="space-y-4">
                    <div>
                      <dl className="space-y-3">
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">标题:</dt>
                          <dd className="text-sm text-gray-900">{prompt.title}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">描述:</dt>
                          <dd className="text-sm text-gray-900">{prompt.description || '暂无描述'}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">语言:</dt>
                          <dd className="text-sm text-gray-900">{prompt.language === 'zh' ? '中文' : '英文'}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">格式:</dt>
                          <dd className="text-sm text-gray-900">{prompt.format}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">字符数:</dt>
                          <dd className="text-sm text-gray-900">{prompt.final_prompt.length}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">创建时间:</dt>
                          <dd className="text-sm text-gray-900">{formatDateTime(prompt.create_time)}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-sm font-medium text-gray-600">更新时间:</dt>
                          <dd className="text-sm text-gray-900">{formatDateTime(prompt.update_time)}</dd>
                        </div>

                        {/* 用户提示词特有字段 */}
                        {prompt.prompt_type === 'user' && (
                          <>
                            <div className="pt-3 border-t border-gray-200">
                              <dt className="text-sm font-medium text-gray-600 mb-2">系统提示词:</dt>
                              <dd className="text-sm text-gray-900">
                                {'system_prompt' in prompt && prompt.system_prompt ? (
                                  <pre className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap font-mono text-xs">
                                    {prompt.system_prompt}
                                  </pre>
                                ) : (
                                  <span className="text-gray-400 italic">未设置</span>
                                )}
                              </dd>
                            </div>
                            <div className="pt-3 border-t border-gray-200">
                              <dt className="text-sm font-medium text-gray-600 mb-2">对话上下文:</dt>
                              <dd className="text-sm text-gray-900">
                                {'conversation_history' in prompt && prompt.conversation_history ? (
                                  <pre className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap font-mono text-xs">
                                    {prompt.conversation_history}
                                  </pre>
                                ) : (
                                  <span className="text-gray-400 italic">未设置</span>
                                )}
                              </dd>
                            </div>
                          </>
                        )}
                      </dl>
                    </div>
                  </div>
                )}

                {/* 版本历史 */}
                {activeTab === 'versions' && (
                  <div className="h-full">
                    <VersionHistoryContent promptId={prompt.id} onRollback={onRollback} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
