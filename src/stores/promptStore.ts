import { create } from 'zustand'
import { savePrompt, type SavePromptData } from '@/services/apiService'

export interface MessageAttachment {
  id: string
  name: string
  type: 'image' | 'document' | 'audio' | 'video'
  mimeType: string
  size: number
  data: string // Base64编码的文件数据
  url?: string // 用于预览的临时URL（如果需要）
}

export interface ChatMessage {
  id?: string  // 消息ID，用于更新消息
  type: 'user' | 'ai'
  content: string
  timestamp: string
  isProgress?: boolean  // 标记是否为进度消息
  isDeleted?: boolean   // 标记是否被删除
  isEditing?: boolean   // 标记是否正在编辑
  originalContent?: string  // 编辑时保存原始内容
  attachments?: MessageAttachment[]  // 附件列表
}

export interface CollectedData {
  taskDefinition: string
  context: string
  outputFormat: string
  qualityCriteria: string
  executionParams: string
}

export interface PromptData {
  requirementReport: string // 需求总结报告
  thinkingPoints?: string[] // GPrompt关键指令
  initialPrompt?: string    // GPrompt初始提示词
  advice?: string[]         // GPrompt优化建议
  generatedPrompt: string | {
    zh: string
    en: string
  } | {
    markdown: { zh: string, en: string }
    xml: { zh: string, en: string }
  }  // 支持二维缓存：格式 x 语言
  optimizedPrompt: {
    zh: string
    en: string
  }
}

interface Step {
  id: string
  title: string
  description: string
}

interface PromptState {
  currentStep: number
  currentStepUserMessages: number
  chatMessages: ChatMessage[]
  isTyping: boolean
  isGenerating: boolean
  showPreview: boolean
  currentLanguage: 'zh' | 'en'
  isAutoMode: boolean
  isInitialized: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  collectedData: CollectedData
  promptData: PromptData
  steps: Step[]
  
  // Zustand compatibility methods
  getState: () => PromptState
  setState: (partial: Partial<PromptState> | ((state: PromptState) => Partial<PromptState>)) => void
  
  // Actions
  addMessage: (type: 'user' | 'ai', content: string, attachments?: MessageAttachment[], options?: { id?: string, isProgress?: boolean }) => void
  addOrUpdateProgressMessage: (content: string, messageId?: string) => void
  clearChat: () => void
  nextStep: () => void
  updateCollectedData: (stepId: string, value: string) => void
  deleteMessage: (messageId: string) => void
  updateMessage: (messageId: string, content: string) => void
  startEditMessage: (messageId: string) => void
  saveEditMessage: (messageId: string, newContent: string) => void
  cancelEditMessage: (messageId: string) => void
  getValidMessages: () => ChatMessage[]
  clearProgressMessages: () => void
  savePromptToLibrary: (data: SavePromptData) => Promise<void>
  saveToBackend: (title: string, description?: string, tags?: string[], promptType?: string) => Promise<{ success: boolean; promptId?: number; error?: string }>
  setShowPreview: (show: boolean) => void
  setCurrentLanguage: (lang: 'zh' | 'en') => void
  setIsAutoMode: (auto: boolean) => void
  setIsGenerating: (generating: boolean) => void
  setIsTyping: (typing: boolean) => void
  setCurrentExecutionStep: (step: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null) => void
}

const steps: Step[] = [
  {
    id: 'taskDefinition',
    title: '任务定义',
    description: '明确AI助手的核心任务和主要功能'
  },
  {
    id: 'context',
    title: '使用场景',
    description: '了解AI的使用环境和目标用户'
  },
  {
    id: 'outputFormat',
    title: '输出格式',
    description: '定义AI回答的结构、格式和风格'
  },
  {
    id: 'qualityCriteria',
    title: '质量要求',
    description: '确定成功标准和质量期望'
  },
  {
    id: 'executionParams',
    title: '工作方式',
    description: '设定AI的思考方式和互动风格'
  },
  {
    id: 'optimization',
    title: '最终确认',
    description: '确认信息完整性并生成提示词'
  }
]

export const usePromptStore = create<PromptState>((set, get) => ({
  currentStep: 0,
  currentStepUserMessages: 0,
  chatMessages: [],
  isTyping: false,
  isGenerating: false,
  showPreview: false,
  currentLanguage: 'zh',
  isAutoMode: true,
  isInitialized: false,
  currentExecutionStep: null,
  collectedData: {
    taskDefinition: '',
    context: '',
    outputFormat: '',
    qualityCriteria: '',
    executionParams: ''
  },
  promptData: {
    requirementReport: '',
    generatedPrompt: '', // 改为字符串初始化
    optimizedPrompt: {
      zh: '',
      en: ''
    }
  },
  steps,
  
  addMessage: (type, content, attachments, options) => {
    const message: ChatMessage = {
      id: options?.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      timestamp: new Date().toISOString(),
      isProgress: options?.isProgress || false,
      attachments: attachments && attachments.length > 0 ? attachments : []
    }
    
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
      currentStepUserMessages: type === 'user' ? state.currentStepUserMessages + 1 : state.currentStepUserMessages
    }))
  },
  
  addOrUpdateProgressMessage: (content, messageId = 'progress_message') => {
    const state = get()
    const existingIndex = state.chatMessages.findIndex(msg => msg.id === messageId)
    
    if (existingIndex !== -1) {
      // 更新现有消息
      const updatedMessages = [...state.chatMessages]
      updatedMessages[existingIndex] = {
        ...updatedMessages[existingIndex],
        content,
        timestamp: new Date().toISOString()
      }
      set({ chatMessages: updatedMessages })
    } else {
      // 添加新的进度消息
      get().addMessage('ai', content, undefined, { id: messageId, isProgress: true })
    }
  },
  
  clearChat: () => {
    set({
      chatMessages: [],
      currentStep: 0,
      currentStepUserMessages: 0,
      showPreview: false,
      isInitialized: false,
      currentExecutionStep: null,
      collectedData: {
        taskDefinition: '',
        context: '',
        outputFormat: '',
        qualityCriteria: '',
        executionParams: ''
      },
      promptData: {
        requirementReport: '',
        generatedPrompt: {
          zh: '',
          en: ''
        },
        optimizedPrompt: {
          zh: '',
          en: ''
        }
      }
    })
  },
  
  nextStep: () => {
    const state = get()
    if (state.currentStep < steps.length - 1) {
      set({
        currentStep: state.currentStep + 1,
        currentStepUserMessages: 0
      })
    }
  },
  
  updateCollectedData: (stepId, value) => {
    const state = get()
    if (stepId in state.collectedData) {
      const current = state.collectedData[stepId as keyof CollectedData]
      set({
        collectedData: {
          ...state.collectedData,
          [stepId]: current ? current + '\n' + value : value
        }
      })
    }
  },
  
  deleteMessage: (messageId) => {
    const state = get()
    const updatedMessages = state.chatMessages.map(msg =>
      msg.id === messageId ? { ...msg, isDeleted: true } : msg
    )
    set({ chatMessages: updatedMessages })
  },
  
  updateMessage: (messageId, content) => {
    const state = get()
    const updatedMessages = state.chatMessages.map(msg =>
      msg.id === messageId ? { ...msg, content, timestamp: new Date().toISOString() } : msg
    )
    set({ chatMessages: updatedMessages })
  },
  
  startEditMessage: (messageId) => {
    const state = get()
    const updatedMessages = state.chatMessages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          isEditing: true,
          originalContent: msg.content
        }
      }
      return msg
    })
    set({ chatMessages: updatedMessages })
  },
  
  saveEditMessage: (messageId, newContent) => {
    const state = get()
    const updatedMessages = state.chatMessages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          content: newContent.trim(),
          isEditing: false,
          originalContent: undefined,
          timestamp: new Date().toISOString()
        }
      }
      return msg
    })
    set({ chatMessages: updatedMessages })
  },
  
  cancelEditMessage: (messageId) => {
    const state = get()
    const updatedMessages = state.chatMessages.map(msg => {
      if (msg.id === messageId && msg.originalContent !== undefined) {
        return {
          ...msg,
          content: msg.originalContent,
          isEditing: false,
          originalContent: undefined
        }
      }
      return msg
    })
    set({ chatMessages: updatedMessages })
  },
  
  getValidMessages: () => {
    const state = get()
    return state.chatMessages.filter(msg => !msg.isDeleted && !msg.isProgress)
  },
  
  clearProgressMessages: () => {
    const state = get()
    set({ chatMessages: state.chatMessages.filter(msg => !msg.isProgress) })
  },
  
  savePromptToLibrary: async (data: SavePromptData) => {
    await savePrompt(data)
  },
  
  saveToBackend: async (title, description, tags, promptType = 'system') => {
    const { useAuthStore } = await import('./authStore')
    const authStore = useAuthStore.getState()
    
    if (!authStore.token || !authStore.user) {
      return {
        success: false,
        error: '请先登录后再保存提示词'
      }
    }
    
    const state = get()
    let finalPrompt: string
    const gp = state.promptData.generatedPrompt
    if (typeof gp === 'string') {
      finalPrompt = gp
    } else if ('markdown' in gp && 'xml' in gp) {
      finalPrompt = gp.markdown.zh || gp.markdown.en || gp.xml.zh || gp.xml.en
    } else {
      finalPrompt = gp[state.currentLanguage]
    }
    
    if (!finalPrompt || !finalPrompt.trim()) {
      return {
        success: false,
        error: '没有可保存的提示词'
      }
    }
    
    try {
      const saveData: SavePromptData = {
        title: title.trim(),
        description: description?.trim(),
        requirement_report: state.promptData.requirementReport,
        thinking_points: state.promptData.thinkingPoints,
        initial_prompt: state.promptData.initialPrompt,
        advice: state.promptData.advice,
        final_prompt: finalPrompt,
        language: state.currentLanguage,
        format: 'markdown',
        prompt_type: promptType,
        tags
      }
      
      const result = await savePrompt(saveData)
      
      if (result.code === 200 && result.data) {
        return {
          success: true,
          promptId: result.data.id
        }
      } else {
        return {
          success: false,
          error: result.message || '保存失败'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '保存失败，请稍后重试'
      }
    }
  },
  
  setShowPreview: (show) => {
    set({ showPreview: show })
  },
  
  setCurrentLanguage: (lang) => {
    set({ currentLanguage: lang })
  },
  
  setIsAutoMode: (auto) => {
    set({ isAutoMode: auto })
  },
  
  setIsGenerating: (generating) => {
    set({ isGenerating: generating })
  },
  
  setIsTyping: (typing) => {
    set({ isTyping: typing })
  },
  
  setCurrentExecutionStep: (step) => {
    set({ currentExecutionStep: step })
  },
  
  // Zustand compatibility methods
  getState: () => get(),
  setState: (partial) => {
    if (typeof partial === 'function') {
      set(partial(get()))
    } else {
      set(partial)
    }
  }
}))

// 为了向后兼容，也导出 store 实例的方法
export const promptStore = {
  getState: () => usePromptStore.getState(),
  setState: (partial: Partial<PromptState> | ((state: PromptState) => Partial<PromptState>)) => {
    if (typeof partial === 'function') {
      usePromptStore.setState(partial(usePromptStore.getState()))
    } else {
      usePromptStore.setState(partial)
    }
  }
}
