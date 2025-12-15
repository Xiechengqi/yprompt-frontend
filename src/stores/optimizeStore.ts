import { create } from 'zustand'

// 类型定义
export interface Suggestion {
  id: string
  type: 'add' | 'modify' | 'remove'
  category: 'role' | 'profile' | 'skills' | 'goal' | 'rules' | 'workflow' | 'format' | 'example' | 'initialization' | 'task' | 'context' | 'constraints' | 'language'
  title: string
  description: string
  reason: string
  expectedEffect: string
  priority: 'high' | 'medium' | 'low'
  content?: string
  applied?: boolean
}

export interface PromptAnalysis {
  overall_score: number
  analysis: {
    role: { score: number; status: string; feedback: string }
    task: { score: number; status: string; feedback: string }
    format: { score: number; status: string; feedback: string }
    constraints: { score: number; status: string; feedback: string }
    example: { score: number; status: string; feedback: string }
    language: { score: number; status: string; feedback: string }
  }
  suggestions: Array<{ area: string; suggestion: string }>
  language: 'zh' | 'en'
  word_count: number
  estimated_tokens: number
  issues?: string[]
}

export interface Version {
  id: string
  version: string
  systemPrompt: string
  userPrompt: string
  changes: Change[]
  appliedSuggestions: string[]
  createdAt: Date
  note?: string
  tag?: 'initial' | 'draft' | 'beta' | 'stable' | 'production' | 'archived' | 'rollback'
}

export interface Change {
  type: 'add' | 'modify' | 'remove'
  field: 'system' | 'user'
  content: string
  position?: { start: number; end: number }
}

export interface TestResult {
  id: string
  testCase: string
  response: string
  responseTime: number
  tokenCount: number
  modelId: string
  modelName: string
  status: 'success' | 'failed'
  rating: number
}

export interface ModelTestConfig {
  provider: string
  modelId: string
  temperature: number
  maxTokens: number
  promptVersion: 'original' | 'optimized'
}

export interface SingleTestResult {
  response: string
  responseTime: number
  tokenCount: number
  model: string
}

interface OptimizeState {
  // 输入状态
  systemPrompt: string
  userPrompt: string
  importedPromptId: string | null
  loadedPromptId: number | null

  // 分析状态
  analysis: PromptAnalysis | null
  isAnalyzing: boolean

  // 优化状态
  suggestions: Suggestion[]
  selectedSuggestions: string[]
  optimizedPrompts: {
    system: string
    user: string
  }
  isGeneratingSuggestions: boolean
  isApplyingSuggestions: boolean

  // 版本管理
  versions: Version[]
  currentVersion: string
  isVersionLoading: boolean

  // 测试状态
  testCases: string[]
  currentTestCase: string
  testResults: TestResult[]
  isTesting: boolean

  // UI 状态
  activeTab: 'input' | 'optimize' | 'test'
  showDiffView: boolean
  showVersionHistory: boolean

  // Actions
  resetOptimization: () => void
  setPrompts: (system: string, user: string, promptId?: string) => void
  setLoadedPromptId: (promptId: number | null) => void
  setAnalysis: (analysisData: PromptAnalysis) => void
  setSuggestions: (suggestionsData: Suggestion[]) => void
  toggleSuggestion: (suggestionId: string) => void
  selectAllSuggestions: () => void
  deselectAllSuggestions: () => void
  setOptimizedPrompts: (system: string, user: string) => void
  addTestCase: (testCase: string) => void
  setCurrentTestCase: (testCase: string) => void
  setTestResults: (results: TestResult[]) => void
  switchTab: (tab: 'input' | 'optimize' | 'test') => void
  toggleDiffView: () => void
  toggleVersionHistory: () => void
  switchVersion: (version: string) => void
}

export const useOptimizeStore = create<OptimizeState>((set, get) => ({
  // State
  systemPrompt: '',
  userPrompt: '',
  importedPromptId: null,
  loadedPromptId: null,
  analysis: null,
  isAnalyzing: false,
  suggestions: [],
  selectedSuggestions: [],
  optimizedPrompts: {
    system: '',
    user: ''
  },
  isGeneratingSuggestions: false,
  isApplyingSuggestions: false,
  versions: [],
  currentVersion: 'original',
  isVersionLoading: false,
  testCases: [],
  currentTestCase: '',
  testResults: [],
  isTesting: false,
  activeTab: 'input',
  showDiffView: false,
  showVersionHistory: false,

  // Actions
  resetOptimization: () => {
    set({
      systemPrompt: '',
      userPrompt: '',
      importedPromptId: null,
      loadedPromptId: null,
      analysis: null,
      suggestions: [],
      selectedSuggestions: [],
      optimizedPrompts: { system: '', user: '' },
      versions: [],
      currentVersion: 'original',
      testCases: [],
      testResults: [],
      activeTab: 'input'
    })
  },

  setPrompts: (system: string, user: string, promptId?: string) => {
    set({
      systemPrompt: system,
      userPrompt: user,
      importedPromptId: promptId || null
    })
  },

  setLoadedPromptId: (promptId: number | null) => {
    set({ loadedPromptId: promptId })
  },

  setAnalysis: (analysisData: PromptAnalysis) => {
    set({ analysis: analysisData })
  },

  setSuggestions: (suggestionsData: Suggestion[]) => {
    set({
      suggestions: suggestionsData,
      selectedSuggestions: suggestionsData.map((s) => s.id)
    })
  },

  toggleSuggestion: (suggestionId: string) => {
    const state = get()
    const index = state.selectedSuggestions.indexOf(suggestionId)
    if (index > -1) {
      set({
        selectedSuggestions: state.selectedSuggestions.filter((id) => id !== suggestionId)
      })
    } else {
      set({
        selectedSuggestions: [...state.selectedSuggestions, suggestionId]
      })
    }
  },

  selectAllSuggestions: () => {
    const state = get()
    set({
      selectedSuggestions: state.suggestions.map((s) => s.id)
    })
  },

  deselectAllSuggestions: () => {
    set({ selectedSuggestions: [] })
  },

  setOptimizedPrompts: (system: string, user: string) => {
    const state = get()
    const newVersion: Version = {
      id: `v_${Date.now()}`,
      version: `V${state.versions.length + 1}`,
      systemPrompt: system,
      userPrompt: user,
      changes: generateChanges(state.systemPrompt, system, state.userPrompt, user),
      appliedSuggestions: [...state.selectedSuggestions],
      createdAt: new Date(),
      tag: 'draft'
    }
    set({
      optimizedPrompts: { system, user },
      versions: [...state.versions, newVersion],
      currentVersion: newVersion.version
    })
  },

  addTestCase: (testCase: string) => {
    const state = get()
    if (testCase.trim() && !state.testCases.includes(testCase.trim())) {
      set({
        testCases: [...state.testCases, testCase.trim()]
      })
    }
  },

  setCurrentTestCase: (testCase: string) => {
    set({ currentTestCase: testCase })
  },

  setTestResults: (results: TestResult[]) => {
    set({ testResults: results })
  },

  switchTab: (tab: 'input' | 'optimize' | 'test') => {
    set({ activeTab: tab })
  },

  toggleDiffView: () => {
    set((state) => ({ showDiffView: !state.showDiffView }))
  },

  toggleVersionHistory: () => {
    set((state) => ({ showVersionHistory: !state.showVersionHistory }))
  },

  switchVersion: (version: string) => {
    const state = get()
    const versionData = state.versions.find((v) => v.version === version)
    if (versionData) {
      set({
        currentVersion: version,
        optimizedPrompts: {
          system: versionData.systemPrompt,
          user: versionData.userPrompt
        }
      })
    }
  }
}))

// 辅助函数
function generateChanges(
  oldSystem: string,
  newSystem: string,
  oldUser: string,
  newUser: string
): Change[] {
  const changes: Change[] = []

  if (oldSystem !== newSystem) {
    changes.push({
      type: 'modify',
      field: 'system',
      content: newSystem
    })
  }

  if (oldUser !== newUser) {
    changes.push({
      type: 'modify',
      field: 'user',
      content: newUser
    })
  }

  return changes
}
