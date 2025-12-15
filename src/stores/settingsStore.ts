import { create } from 'zustand'
import { promptConfigManager } from '@/config/prompts'
import { THINKING_POINTS_EXTRACTION_PROMPT } from '@/config/prompts/thinkingPointsExtraction'
import { SYSTEM_PROMPT_GENERATION_PROMPT } from '@/config/prompts/systemPromptGeneration'
import { OPTIMIZATION_ADVICE_PROMPT } from '@/config/prompts/optimizationAdvice'
import { OPTIMIZATION_APPLICATION_PROMPT } from '@/config/prompts/optimizationApplication'
import { QUALITY_ANALYSIS_SYSTEM_PROMPT } from '@/config/prompts/qualityAnalysis'
import { USER_PROMPT_OPTIMIZATION_CONFIG } from '@/config/prompts/userPromptOptimization'
import { USER_PROMPT_QUALITY_ANALYSIS } from '@/config/prompts/userPromptQualityAnalysis'

// 模型参数类型
export interface ModelParams {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  topK: number
}

// 推理类型
export type ReasoningType = 
  | 'openai-reasoning' 
  | 'generic-cot' 
  | 'gemini-thought' 
  | 'claude-thinking' 
  | null

// 支持的参数配置
export interface SupportedParams {
  temperature: boolean | string
  maxTokens: string | boolean
  streaming: boolean
  systemMessage: boolean
}

// 测试结果
export interface TestResult {
  connected: boolean
  reasoning: boolean
  responseTime: number
  timestamp: Date
  error?: string
}

// 模型能力
export interface ModelCapabilities {
  reasoning: boolean
  reasoningType: ReasoningType
  supportedParams: SupportedParams
  testResult?: TestResult
}

interface EditingFinalPromptRules {
  THINKING_POINTS_EXTRACTION: string
  SYSTEM_PROMPT_GENERATION: string
  OPTIMIZATION_ADVICE_GENERATION: string
  OPTIMIZATION_APPLICATION: string
}

interface EditingQualityAnalysisRules {
  systemPrompt: string
}

interface EditingUserPromptOptimizationRules {
  qualityAnalysis: string
  quickOptimization: string
}

interface SettingsState {
  showSettings: boolean
  globalModelParams: ModelParams
  useSlimRules: boolean
  editingSystemRules: string
  editingUserRules: string
  editingRequirementReportRules: string
  editingFinalPromptRules: EditingFinalPromptRules
  editingQualityAnalysisRules: EditingQualityAnalysisRules
  editingUserPromptOptimizationRules: EditingUserPromptOptimizationRules
  setShowSettings: (show: boolean) => void
  saveSettings: () => void
  loadSettings: () => void
  openPromptEditor: (type: string) => void
}

// 从 localStorage 加载默认参数
const loadDefaultParams = (): ModelParams => {
  const saved = localStorage.getItem('yprompt_global_model_params')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // 解析失败，使用默认值
    }
  }
  return {
    temperature: 1.0,
    maxTokens: 8192,
    topP: 0.95,
    frequencyPenalty: 0,
    presencePenalty: 0,
    topK: 0
  }
}

// 加载默认的提示词规则
const loadDefaultEditingRules = () => {
  // 从 localStorage 加载 useSlimRules 状态
  const savedUseSlimRules = localStorage.getItem('yprompt_use_slim_rules')
  const useSlimRules = savedUseSlimRules === 'true'
  
  // 设置 promptConfigManager 的状态
  promptConfigManager.setUseSlimRules(useSlimRules)
  
  return {
    useSlimRules,
    editingSystemRules: promptConfigManager.getSystemPromptRules(),
    editingUserRules: promptConfigManager.getUserGuidedPromptRules(),
    editingRequirementReportRules: promptConfigManager.getRequirementReportRules(),
    editingFinalPromptRules: {
      THINKING_POINTS_EXTRACTION: THINKING_POINTS_EXTRACTION_PROMPT,
      SYSTEM_PROMPT_GENERATION: SYSTEM_PROMPT_GENERATION_PROMPT,
      OPTIMIZATION_ADVICE_GENERATION: OPTIMIZATION_ADVICE_PROMPT,
      OPTIMIZATION_APPLICATION: OPTIMIZATION_APPLICATION_PROMPT
    },
    editingQualityAnalysisRules: {
      systemPrompt: QUALITY_ANALYSIS_SYSTEM_PROMPT
    },
    editingUserPromptOptimizationRules: {
      qualityAnalysis: USER_PROMPT_QUALITY_ANALYSIS,
      quickOptimization: USER_PROMPT_OPTIMIZATION_CONFIG.quick
    }
  }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  showSettings: false,
  globalModelParams: loadDefaultParams(),
  ...loadDefaultEditingRules(),
  setShowSettings: (show: boolean) => set({ showSettings: show }),
  saveSettings: () => {
    const state = get()
    const params = state.globalModelParams
    localStorage.setItem('yprompt_global_model_params', JSON.stringify(params))
    // 保存 useSlimRules 状态
    localStorage.setItem('yprompt_use_slim_rules', String(state.useSlimRules))
  },
  loadSettings: () => {
    const saved = localStorage.getItem('yprompt_global_model_params')
    if (saved) {
      try {
        const params = JSON.parse(saved) as ModelParams
        set({ globalModelParams: params })
      } catch {
        // 解析失败，使用默认值
      }
    }
    // 加载 useSlimRules 状态
    const savedUseSlimRules = localStorage.getItem('yprompt_use_slim_rules')
    if (savedUseSlimRules !== null) {
      const useSlimRules = savedUseSlimRules === 'true'
      // 更新状态并同步 promptConfigManager
      promptConfigManager.setUseSlimRules(useSlimRules)
      set({ 
        useSlimRules,
        // 根据状态更新编辑中的系统提示词规则
        editingSystemRules: promptConfigManager.getSystemPromptRules()
      })
    }
  },
  openPromptEditor: (_type: string) => {
    // 打开提示词编辑器时的初始化逻辑
    // 确保 editingSystemRules 与当前的 useSlimRules 状态同步
    const state = get()
    promptConfigManager.setUseSlimRules(state.useSlimRules)
    set({ 
      editingSystemRules: promptConfigManager.getSystemPromptRules()
    })
  }
}))
