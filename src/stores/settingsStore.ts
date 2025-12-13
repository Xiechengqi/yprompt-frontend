import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { promptConfigManager } from '@/config/prompts'

export interface ModelConfig {
  id: string
  name: string
  provider: string
  enabled: boolean
  apiType?: 'openai' | 'anthropic' | 'google' // 模型使用的API类型
  
  // 能力检测相关字段
  capabilities?: ModelCapabilities
  lastTested?: Date
  testStatus?: 'untested' | 'testing' | 'success' | 'failed'
  
  // 模型参数配置
  params?: ModelParams
}

export interface ModelCapabilities {
  reasoning: boolean                    // 是否支持思考
  reasoningType: ReasoningType | null   // 思考类型
  supportedParams: SupportedParams     // 支持的API参数
  testResult?: TestResult              // 详细测试结果
}

export type ReasoningType = 
  | 'openai-reasoning'    // OpenAI o1系列
  | 'gemini-thought'      // Gemini thought字段
  | 'claude-thinking'     // Claude thinking标签
  | 'generic-cot'         // 通用链式思考

// 模型参数配置
export interface ModelParams {
  // 通用参数
  temperature?: number
  maxTokens?: number
  topP?: number
  
  // OpenAI 特有参数
  frequencyPenalty?: number
  presencePenalty?: number
  
  // Claude/Gemini 特有参数
  topK?: number
}

export interface SupportedParams {
  temperature: boolean                  // 是否支持temperature参数
  maxTokens: 'max_tokens' | 'max_completion_tokens'  // 使用的token参数名
  streaming: boolean                   // 是否支持流式输出
  systemMessage: boolean               // 是否支持系统消息
}

export interface TestResult {
  connected: boolean                   // 基础连接是否成功
  reasoning: boolean                   // 思考能力是否可用
  responseTime: number                // 响应时间(ms)
  error?: string                      // 错误信息
  timestamp: Date                     // 测试时间戳
}

export interface ProviderConfig {
  id: string
  name: string
  type: 'openai' | 'anthropic' | 'google' | 'custom'
  apiKey: string
  baseUrl?: string
  models: ModelConfig[]
  enabled: boolean
  allowCustomUrl?: boolean // 是否允许自定义URL
}

export const useSettingsStore = defineStore('settings', () => {
  const showSettings = ref(false)
  const providers = ref<ProviderConfig[]>([])
  const selectedProvider = ref<string>('')
  const selectedModel = ref<string>('')
  const streamMode = ref(true) // 默认开启流式模式
  const useSlimRules = ref(false) // 是否使用精简版提示词规则，默认为false（使用完整版）
  const isSyncingToProviderStore = ref(false) // 防止循环同步的标志

  // 全局模型参数（应用到所有模型）
  const globalModelParams = ref<ModelParams>({
    temperature: 1.0,
    maxTokens: 8192,
    topP: 0.95,
    frequencyPenalty: 0,
    presencePenalty: 0,
    topK: 0
  })

  // 提示词编辑相关状态
  const showPromptEditor = ref(false)
  const editingPromptType = ref<'system' | 'user'>('system')
  const editingSystemRules = ref('')
  const editingUserRules = ref('')
  const editingRequirementReportRules = ref('')
  const editingFinalPromptRules = ref({
    THINKING_POINTS_EXTRACTION: '',
    SYSTEM_PROMPT_GENERATION: '',
    OPTIMIZATION_ADVICE_GENERATION: '',
    OPTIMIZATION_APPLICATION: ''
  })

  const editingQualityAnalysisRules = ref({
    systemPrompt: ''
  })

  const editingUserPromptOptimizationRules = ref({
    qualityAnalysis: '',
    quickOptimization: ''
  })

  // 初始化默认配置
  const initializeDefaults = () => {
    // 从后端 API 加载配置（通过 loadSettings）
    providers.value = []
  }

  // 获取预设的提供商模板
  const getProviderTemplate = (type: 'openai' | 'anthropic' | 'google' | 'custom') => {
    const templates = {
      openai: {
        name: 'OpenAI',
        type: 'openai' as const,
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        allowCustomUrl: true,
        models: []
      },
      anthropic: {
        name: 'Anthropic',
        type: 'anthropic' as const,
        baseUrl: 'https://api.anthropic.com/v1/messages',
        allowCustomUrl: true,
        models: [
          { id: 'claude-opus-4-1-20250805', name: 'claude-opus-4-1', enabled: false, apiType: 'anthropic' as const },
          { id: 'claude-opus-4-20250514', name: 'claude-opus-4-0', enabled: false, apiType: 'anthropic' as const },
          { id: 'claude-sonnet-4-20250514', name: 'claude-sonnet-4-0', enabled: false, apiType: 'anthropic' as const },
          { id: 'claude-3-7-sonnet-20250219', name: 'claude-3-7-sonnet-latest', enabled: true, apiType: 'anthropic' as const },
          { id: 'claude-3-5-sonnet-20241022', name: 'claude-3-5-sonnet-latest', enabled: true, apiType: 'anthropic' as const },
          { id: 'claude-3-5-haiku-20241022', name: 'claude-3-5-haiku-latest', enabled: true, apiType: 'anthropic' as const },
          { id: 'claude-3-haiku-20240307', name: 'claude-3-haiku-20240307', enabled: false, apiType: 'anthropic' as const }
        ]
      },
      google: {
        name: 'Gemini',
        type: 'google' as const,
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        allowCustomUrl: true,
        models: []
      },
      custom: {
        name: '',
        type: 'custom' as const,
        baseUrl: 'https://api.example.com/v1/chat/completions',
        allowCustomUrl: true,
        models: []
      }
    }
    return templates[type]
  }

  // 获取可用的提供商
  const getAvailableProviders = () => {
    return providers.value.filter(p => p.enabled && p.apiKey.trim() !== '')
  }

  // 获取指定提供商的可用模型
  const getAvailableModels = (providerId: string) => {
    const provider = providers.value.find(p => p.id === providerId)
    return provider ? provider.models.filter(m => m.enabled) : []
  }

  // 获取当前选中的提供商配置
  const getCurrentProvider = () => {
    console.log(`[settingsStore.getCurrentProvider] selectedProvider=${selectedProvider.value}, providers数量=${providers.value.length}`)
    const provider = providers.value.find(p => p.id === selectedProvider.value)
    if (!provider) {
      console.log(`[settingsStore.getCurrentProvider] 没有找到提供商 ${selectedProvider.value}`)
      console.log(`[settingsStore.getCurrentProvider] 可用提供商:`, providers.value.map(p => p.id))
    } else {
      console.log(`[settingsStore.getCurrentProvider] 找到提供商: ${provider.id}`)
    }
    return provider
  }

  // 获取当前选中的模型配置
  const getCurrentModel = () => {
    console.log(`[settingsStore.getCurrentModel] selectedProvider=${selectedProvider.value}, selectedModel=${selectedModel.value}`)
    const provider = getCurrentProvider()
    if (!provider) {
      console.log(`[settingsStore.getCurrentModel] 没有找到提供商`)
      return null
    }
    console.log(`[settingsStore.getCurrentModel] 找到提供商: ${provider.id}, 模型数量: ${provider.models.length}`)
    const model = provider.models.find(m => m.id === selectedModel.value)
    if (!model) {
      console.log(`[settingsStore.getCurrentModel] 没有找到模型 ${selectedModel.value}`)
      console.log(`[settingsStore.getCurrentModel] 可用模型:`, provider.models.map(m => m.id))
    } else {
      console.log(`[settingsStore.getCurrentModel] 找到模型: ${model.id}`)
    }
    return model
  }





  const saveSettings = async () => {
    console.log('[settingsStore] 开始保存设置...')
    console.log('[settingsStore] 设置为只读模式，不保存设置。')
    // 同步到 providerStore
    syncSelectionToProviderStore()

    console.log('[settingsStore] 设置保存完成')
  }

  // 同步选择到 providerStore
  const syncSelectionToProviderStore = () => {
    // 如果正在同步中，跳过以避免循环
    if (isSyncingToProviderStore.value) {
      console.log(`[settingsStore] 跳过同步到 providerStore（正在同步中）`)
      return
    }

    console.log(`[settingsStore] 同步选择到 providerStore: provider=${selectedProvider.value}, model=${selectedModel.value}`)

    isSyncingToProviderStore.value = true

    // 动态导入以避免循环依赖
    import('@/stores/providerStore').then(({ useProviderStore }) => {
      const providerStore = useProviderStore()
      
      // 检查 providerStore 是否已经有有效的选择
      const currentProviderExists = providerStore.selectedProviderId && 
        providerStore.enabledProviders.find(p => p.id === providerStore.selectedProviderId)
      const currentModelExists = currentProviderExists && providerStore.selectedModelId &&
        providerStore.getAvailableModelsByProvider(providerStore.selectedProviderId)
          .find(m => m.id === providerStore.selectedModelId)
      
      // 如果 providerStore 已经有有效的选择，且与 settingsStore 不同，优先使用 providerStore 的选择
      // 这样可以避免覆盖用户在导航栏中的选择
      if (currentProviderExists && currentModelExists && 
          providerStore.selectedProviderId !== selectedProvider.value) {
        console.log(`[settingsStore] providerStore 已有有效选择，不覆盖: provider=${providerStore.selectedProviderId}, model=${providerStore.selectedModelId}`)
        // 同步 providerStore 的选择到 settingsStore
        selectedProvider.value = providerStore.selectedProviderId
        selectedModel.value = providerStore.selectedModelId
      } else if (!currentProviderExists || !currentModelExists) {
        // providerStore 没有有效选择，使用 settingsStore 的选择
        if (selectedProvider.value) {
          providerStore.selectProvider(selectedProvider.value)
        }
        if (selectedModel.value && selectedProvider.value) {
          providerStore.selectModel(selectedModel.value)
        }
        console.log(`[settingsStore] 设置 providerStore: provider=${selectedProvider.value}, model=${selectedModel.value}`)
      } else {
        console.log(`[settingsStore] providerStore 和 settingsStore 选择一致，无需同步`)
      }
    }).catch(error => {
      console.warn('[settingsStore] 同步到 providerStore 失败:', error)
    }).finally(() => {
      // 延迟重置标志，确保不会立即再次触发
      setTimeout(() => {
        isSyncingToProviderStore.value = false
      }, 100)
    })
  }

  // 从本地存储加载设置
  const loadSettings = async () => {
    console.log('[settingsStore] 开始加载设置...')

    // 从后端 API 加载配置
    try {
      const { getSettings } = await import('@/services/settingsApi')
      const settings = await getSettings()
      providers.value = settings.providers as ProviderConfig[]
    } catch (error) {
      console.error('[settingsStore] 从后端加载配置失败:', error)
      // 如果后端加载失败，尝试从 localStorage 加载（向后兼容）
      const savedProviders = localStorage.getItem('yprompt_providers')
      if (savedProviders) {
        try {
          const userProviders = JSON.parse(savedProviders)
          if (Array.isArray(userProviders)) {
            providers.value = userProviders
          }
        } catch (e) {
          console.error('[settingsStore] 从localStorage加载配置失败:', e)
        }
      }
    }

    const savedProvider = localStorage.getItem('yprompt_selected_provider')
    const savedModel = localStorage.getItem('yprompt_selected_model')
    const savedStreamMode = localStorage.getItem('yprompt_stream_mode')
    const savedUseSlimRules = localStorage.getItem('yprompt_use_slim_rules')

    console.log('[settingsStore] 从localStorage加载:')
    console.log('- yprompt_selected_provider:', savedProvider)
    console.log('- yprompt_selected_model:', savedModel)

    // 加载全局模型参数（应用到所有模型）
    const savedGlobalParams = localStorage.getItem('yprompt_global_model_params')
    if (savedGlobalParams) {
      try {
        console.log('[settingsStore] 加载全局模型参数...')
        const params = JSON.parse(savedGlobalParams)
        globalModelParams.value = { ...globalModelParams.value, ...params }
        console.log('[settingsStore] 全局模型参数加载完成:', globalModelParams.value)
      } catch (error) {
        console.error('加载全局模型参数失败:', error)
      }
    } else {
      console.log('[settingsStore] 没有保存的全局模型参数，使用默认值')
    }

    if (savedStreamMode) {
      try {
        streamMode.value = JSON.parse(savedStreamMode)
      } catch (error) {
        streamMode.value = true // 默认开启流式模式
      }
    }

    // 加载精简版规则开关
    if (savedUseSlimRules) {
      try {
        useSlimRules.value = JSON.parse(savedUseSlimRules)
      } catch (error) {
        useSlimRules.value = false // 默认使用完整版
      }
    }

    // 验证并恢复保存的提供商和模型选择
    const availableProviders = getAvailableProviders()
    let validProviderSelected = false
    let validModelSelected = false

    if (savedProvider) {
      // 检查保存的提供商是否仍然存在且可用
      const savedProviderExists = availableProviders.find(p => p.id === savedProvider)
      if (savedProviderExists) {
        selectedProvider.value = savedProvider
        validProviderSelected = true
        
        // 检查保存的模型是否仍然存在且可用
        if (savedModel) {
          const availableModels = getAvailableModels(savedProvider)
          const savedModelExists = availableModels.find(m => m.id === savedModel)
          if (savedModelExists) {
            selectedModel.value = savedModel
            validModelSelected = true
          }
        }
      }
    }

    // 自动选择逻辑
    if (!validProviderSelected && availableProviders.length > 0) {
      // 自动选择第一个可用的提供商
      selectedProvider.value = availableProviders[0].id
    }

    if (selectedProvider.value && !validModelSelected) {
      // 为当前提供商自动选择第一个可用模型
      const availableModels = getAvailableModels(selectedProvider.value)
      if (availableModels.length > 0) {
        selectedModel.value = availableModels[0].id
      } else {
        selectedModel.value = '' // 清空无效的模型选择
      }
    }

    // 从云端加载提示词规则（每次打开浏览器都调用，确保最新）
    try {
      await promptConfigManager.loadFromCloud()
    } catch (error) {
      console.error('从云端加载提示词规则失败:', error)
    }

    // 加载完成后同步到 providerStore（但不覆盖已有的有效选择）
    // 延迟执行，确保 providerStore 已经初始化
    setTimeout(() => {
      syncSelectionToProviderStore()
    }, 0)
  }





  // 保存原始值,用于对比是否改变
  const originalPromptRules = ref<any>(null)

  // 加载所有提示词内容到编辑器
  const loadPromptRules = () => {
    // 同步精简版开关状态到配置管理器
    promptConfigManager.setUseSlimRules(useSlimRules.value)
    editingSystemRules.value = promptConfigManager.getSystemPromptRules()
    editingUserRules.value = promptConfigManager.getUserGuidedPromptRules()
    editingRequirementReportRules.value = promptConfigManager.getRequirementReportRules()
    const finalRules = promptConfigManager.getFinalPromptGenerationRules()
    editingFinalPromptRules.value = { ...finalRules }
    
    // 加载质量分析规则
    editingQualityAnalysisRules.value.systemPrompt = promptConfigManager.getQualityAnalysisSystemPrompt()
    
    // 加载用户提示词优化规则
    editingUserPromptOptimizationRules.value.qualityAnalysis = promptConfigManager.getUserPromptQualityAnalysis()
    editingUserPromptOptimizationRules.value.quickOptimization = promptConfigManager.getUserPromptQuickOptimization()
    
    // 保存原始值快照
    originalPromptRules.value = {
      systemRules: editingSystemRules.value,
      userRules: editingUserRules.value,
      requirementReportRules: editingRequirementReportRules.value,
      finalPromptRules: JSON.parse(JSON.stringify(editingFinalPromptRules.value)),
      qualityAnalysisRules: { systemPrompt: editingQualityAnalysisRules.value.systemPrompt },
      userPromptOptimizationRules: {
        qualityAnalysis: editingUserPromptOptimizationRules.value.qualityAnalysis,
        quickOptimization: editingUserPromptOptimizationRules.value.quickOptimization
      }
    }
  }

  // 提示词编辑相关方法
  const openPromptEditor = (type: 'system' | 'user') => {
    editingPromptType.value = type
    // 加载当前的提示词内容到编辑器
    loadPromptRules()
    showPromptEditor.value = true
  }

  const closePromptEditor = () => {
    showPromptEditor.value = false
    // 重置编辑内容
    editingSystemRules.value = ''
    editingUserRules.value = ''
    editingRequirementReportRules.value = ''
    editingFinalPromptRules.value = {
      THINKING_POINTS_EXTRACTION: '',
      SYSTEM_PROMPT_GENERATION: '',
      OPTIMIZATION_ADVICE_GENERATION: '',
      OPTIMIZATION_APPLICATION: ''
    }
  }

  const savePromptRules = async () => {
    try {
      // 对比每个字段,只更新真正改变的字段
      if (originalPromptRules.value) {
        // 1. 系统提示词规则
        if (editingSystemRules.value !== originalPromptRules.value.systemRules) {
          promptConfigManager.updateSystemPromptRules(editingSystemRules.value)
        }
        
        // 2. 用户引导规则
        if (editingUserRules.value !== originalPromptRules.value.userRules) {
          promptConfigManager.updateUserGuidedPromptRules(editingUserRules.value)
        }
        
        // 3. 需求报告规则
        if (editingRequirementReportRules.value !== originalPromptRules.value.requirementReportRules) {
          promptConfigManager.updateRequirementReportRules(editingRequirementReportRules.value)
        }
        
        // 4. 最终提示词生成规则
        if (editingFinalPromptRules.value.THINKING_POINTS_EXTRACTION !== originalPromptRules.value.finalPromptRules.THINKING_POINTS_EXTRACTION) {
          promptConfigManager.updateThinkingPointsExtractionPrompt(editingFinalPromptRules.value.THINKING_POINTS_EXTRACTION)
        }
        if (editingFinalPromptRules.value.SYSTEM_PROMPT_GENERATION !== originalPromptRules.value.finalPromptRules.SYSTEM_PROMPT_GENERATION) {
          promptConfigManager.updateSystemPromptGenerationPrompt(editingFinalPromptRules.value.SYSTEM_PROMPT_GENERATION)
        }
        if (editingFinalPromptRules.value.OPTIMIZATION_ADVICE_GENERATION !== originalPromptRules.value.finalPromptRules.OPTIMIZATION_ADVICE_GENERATION) {
          promptConfigManager.updateOptimizationAdvicePrompt(editingFinalPromptRules.value.OPTIMIZATION_ADVICE_GENERATION)
        }
        if (editingFinalPromptRules.value.OPTIMIZATION_APPLICATION !== originalPromptRules.value.finalPromptRules.OPTIMIZATION_APPLICATION) {
          promptConfigManager.updateOptimizationApplicationPrompt(editingFinalPromptRules.value.OPTIMIZATION_APPLICATION)
        }
        
        // 5. 质量分析规则
        if (editingQualityAnalysisRules.value.systemPrompt !== originalPromptRules.value.qualityAnalysisRules.systemPrompt) {
          promptConfigManager.updateQualityAnalysisSystemPrompt(editingQualityAnalysisRules.value.systemPrompt)
        }
        
        // 6. 用户提示词优化规则
        if (editingUserPromptOptimizationRules.value.qualityAnalysis !== originalPromptRules.value.userPromptOptimizationRules.qualityAnalysis) {
          promptConfigManager.updateUserPromptQualityAnalysis(editingUserPromptOptimizationRules.value.qualityAnalysis)
        }
        if (editingUserPromptOptimizationRules.value.quickOptimization !== originalPromptRules.value.userPromptOptimizationRules.quickOptimization) {
          promptConfigManager.updateUserPromptQuickOptimization(editingUserPromptOptimizationRules.value.quickOptimization)
        }
      } else {
        // 如果没有原始值(不应该发生),则全部更新
        console.warn('[SavePromptRules] 没有原始值,将更新所有字段')
        promptConfigManager.updateSystemPromptRules(editingSystemRules.value)
        promptConfigManager.updateUserGuidedPromptRules(editingUserRules.value)
        promptConfigManager.updateRequirementReportRules(editingRequirementReportRules.value)
        promptConfigManager.updateThinkingPointsExtractionPrompt(editingFinalPromptRules.value.THINKING_POINTS_EXTRACTION)
        promptConfigManager.updateSystemPromptGenerationPrompt(editingFinalPromptRules.value.SYSTEM_PROMPT_GENERATION)
        promptConfigManager.updateOptimizationAdvicePrompt(editingFinalPromptRules.value.OPTIMIZATION_ADVICE_GENERATION)
        promptConfigManager.updateOptimizationApplicationPrompt(editingFinalPromptRules.value.OPTIMIZATION_APPLICATION)
        promptConfigManager.updateQualityAnalysisSystemPrompt(editingQualityAnalysisRules.value.systemPrompt)
        promptConfigManager.updateUserPromptQualityAnalysis(editingUserPromptOptimizationRules.value.qualityAnalysis)
        promptConfigManager.updateUserPromptQuickOptimization(editingUserPromptOptimizationRules.value.quickOptimization)
      }
      
      // 保存到云端
      await promptConfigManager.saveToCloud()
      
      closePromptEditor()
    } catch (error) {
      console.error('保存提示词规则失败:', error)
      throw error
    }
  }

  const resetSystemPromptRules = async () => {
    // 重置系统提示词规则为默认值
    await promptConfigManager.resetSystemPromptRules()
    editingSystemRules.value = promptConfigManager.getSystemPromptRules()
  }

  const resetUserPromptRules = async () => {
    // 重置用户引导规则为默认值
    await promptConfigManager.resetUserGuidedPromptRules()
    editingUserRules.value = promptConfigManager.getUserGuidedPromptRules()
  }

  const resetRequirementReportRules = async () => {
    // 重置需求报告规则为默认值
    await promptConfigManager.resetRequirementReportRules()
    editingRequirementReportRules.value = promptConfigManager.getRequirementReportRules()
  }

  // 重置独立的最终提示词生成配置
  const resetThinkingPointsExtractionPrompt = async () => {
    await promptConfigManager.resetThinkingPointsExtractionPrompt()
    const finalRules = promptConfigManager.getFinalPromptGenerationRules()
    editingFinalPromptRules.value = { ...finalRules }
  }

  const resetSystemPromptGenerationPrompt = async () => {
    await promptConfigManager.resetSystemPromptGenerationPrompt()
    const finalRules = promptConfigManager.getFinalPromptGenerationRules()
    editingFinalPromptRules.value = { ...finalRules }
  }

  const resetOptimizationAdvicePrompt = async () => {
    await promptConfigManager.resetOptimizationAdvicePrompt()
    const finalRules = promptConfigManager.getFinalPromptGenerationRules()
    editingFinalPromptRules.value = { ...finalRules }
  }

  const resetOptimizationApplicationPrompt = async () => {
    await promptConfigManager.resetOptimizationApplicationPrompt()
    const finalRules = promptConfigManager.getFinalPromptGenerationRules()
    editingFinalPromptRules.value = { ...finalRules }
  }

  // 重置质量分析配置
  const resetQualityAnalysisSystemPrompt = async () => {
    await promptConfigManager.resetQualityAnalysisSystemPrompt()
    editingQualityAnalysisRules.value.systemPrompt = promptConfigManager.getQualityAnalysisSystemPrompt()
  }

  const resetUserPromptQualityAnalysis = async () => {
    await promptConfigManager.resetUserPromptQualityAnalysis()
    editingUserPromptOptimizationRules.value.qualityAnalysis = promptConfigManager.getUserPromptQualityAnalysis()
  }

  const resetUserPromptQuickOptimization = async () => {
    await promptConfigManager.resetUserPromptQuickOptimization()
    editingUserPromptOptimizationRules.value.quickOptimization = promptConfigManager.getUserPromptQuickOptimization()
  }


  // 获取当前的提示词规则
  const getCurrentSystemRules = () => {
    // 同步精简版开关状态到配置管理器
    promptConfigManager.setUseSlimRules(useSlimRules.value)
    return promptConfigManager.getSystemPromptRules()
  }

  const getCurrentUserRules = () => {
    return promptConfigManager.getUserGuidedPromptRules()
  }

  // 更新模型测试状态
  const updateModelTestStatus = (providerId: string, modelId: string, status: 'untested' | 'testing' | 'success' | 'failed') => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) {
        model.testStatus = status
        if (status === 'testing') {
          model.lastTested = new Date()
        }
      }
    }
  }

  // 更新模型能力信息
  const updateModelCapabilities = (providerId: string, modelId: string, capabilities: ModelCapabilities) => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) {
        model.capabilities = capabilities
        model.lastTested = new Date()
        model.testStatus = capabilities.testResult?.connected ? 'success' : 'failed'
      }
    }
  }

  // 快速更新连接状态（不等思考结果）
  const updateModelConnectionStatus = (providerId: string, modelId: string, connected: boolean, error?: string) => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) {
        // 如果还没有capabilities，创建一个临时的
        if (!model.capabilities) {
          model.capabilities = {
            reasoning: false,
            reasoningType: null,
            supportedParams: {
              temperature: true,
              maxTokens: 'max_tokens',
              streaming: true,
              systemMessage: true
            },
            testResult: {
              connected,
              reasoning: false,
              responseTime: 0,
              timestamp: new Date(),
              error
            }
          }
        } else {
          // 更新现有的连接状态
          if (model.capabilities.testResult) {
            model.capabilities.testResult.connected = connected
            model.capabilities.testResult.timestamp = new Date()
            if (error) {
              model.capabilities.testResult.error = error
            }
          }
        }
        
        model.lastTested = new Date()
        model.testStatus = connected ? 'success' : 'failed'
      }
    }
  }

  // 清空模型测试状态
  const clearModelTestStatus = (providerId: string, modelId: string) => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) {
        model.testStatus = 'untested'
        model.capabilities = undefined
        model.lastTested = undefined
      }
    }
  }

  // 获取模型测试状态
  const getModelTestStatus = (providerId: string, modelId: string) => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      return model?.testStatus || 'untested'
    }
    return 'untested'
  }

  // 检查模型是否需要重新测试
  const shouldRetestModel = (providerId: string, modelId: string): boolean => {
    const provider = providers.value.find(p => p.id === providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (!model?.lastTested || !model.capabilities) {
        return true
      }
      
      // 24小时后需要重新测试
      const age = Date.now() - model.lastTested.getTime()
      return age > 24 * 60 * 60 * 1000
    }
    return true
  }

  // 获取思考能力类型描述
  const getReasoningTypeDescription = (reasoningType: ReasoningType | null | undefined): string => {
    switch (reasoningType) {
      case 'openai-reasoning':
        return 'OpenAI o1系列推理能力'
      case 'gemini-thought':
        return 'Gemini内置思考功能'
      case 'claude-thinking':
        return 'Claude思考标签支持'
      case 'generic-cot':
        return '通用链式思考'
      default:
        return '无思考能力'
    }
  }



  const getCurrentRequirementReportRules = () => {
    return promptConfigManager.getRequirementReportRules()
  }

  // 监听设置界面打开状态，自动加载提示词内容
  watch(showSettings, (newValue) => {
    if (newValue) {
      // 当设置界面打开时，加载最新的提示词内容
      loadPromptRules()
    }
  })

  return {
    showSettings,
    providers,
    selectedProvider,
    selectedModel,
    streamMode,
    useSlimRules,
    globalModelParams,  // 全局模型参数
    // 提示词编辑状态
    showPromptEditor,
    editingPromptType,
    editingSystemRules,
    editingUserRules,
    editingRequirementReportRules,
    editingFinalPromptRules,
    editingQualityAnalysisRules,
    editingUserPromptOptimizationRules,
    // 原有方法
    initializeDefaults,
    getProviderTemplate,
    getAvailableProviders,
    getAvailableModels,
    getCurrentProvider,
    getCurrentModel,
    saveSettings,
    loadSettings,
    // 提示词编辑方法
    loadPromptRules,
    openPromptEditor,
    closePromptEditor,
    savePromptRules,
    resetSystemPromptRules,
    resetUserPromptRules,
    resetRequirementReportRules,
    // 独立的最终提示词重置方法
    resetThinkingPointsExtractionPrompt,
    resetSystemPromptGenerationPrompt,
    resetOptimizationAdvicePrompt,
    resetOptimizationApplicationPrompt,
    // 质量分析重置方法
    resetQualityAnalysisSystemPrompt,
    // 用户提示词优化重置方法
    resetUserPromptQualityAnalysis,
    resetUserPromptQuickOptimization,
    getCurrentSystemRules,
    getCurrentUserRules,
    getCurrentRequirementReportRules,
    // 模型测试相关方法
    updateModelTestStatus,
    updateModelCapabilities,
    updateModelConnectionStatus,
    clearModelTestStatus,
    getModelTestStatus,
    shouldRetestModel,
    getReasoningTypeDescription,
  }
})