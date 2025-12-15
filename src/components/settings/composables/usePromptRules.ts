import { useSettingsStore } from '@/stores/settingsStore'
import { promptConfigManager } from '@/config/prompts'
import {
  SYSTEM_PROMPT_RULES,
  USER_GUIDED_PROMPT_RULES,
  REQUIREMENT_REPORT_RULES
} from '@/config/prompts/index'
import { THINKING_POINTS_EXTRACTION_PROMPT } from '@/config/prompts/thinkingPointsExtraction'
import { SYSTEM_PROMPT_GENERATION_PROMPT } from '@/config/prompts/systemPromptGeneration'
import { OPTIMIZATION_ADVICE_PROMPT } from '@/config/prompts/optimizationAdvice'
import { OPTIMIZATION_APPLICATION_PROMPT } from '@/config/prompts/optimizationApplication'
import { QUALITY_ANALYSIS_SYSTEM_PROMPT } from '@/config/prompts/qualityAnalysis'
import { USER_PROMPT_OPTIMIZATION_CONFIG } from '@/config/prompts/userPromptOptimization'
import { USER_PROMPT_QUALITY_ANALYSIS } from '@/config/prompts/userPromptQualityAnalysis'

export function usePromptRules() {
  const settingsStore = useSettingsStore()

  const resetSystemPromptRules = () => {
    if (confirm('确定要重置系统提示词规则为默认值吗？')) {
      settingsStore.editingSystemRules = SYSTEM_PROMPT_RULES
    }
  }

  const resetUserPromptRules = () => {
    if (confirm('确定要重置用户引导规则为默认值吗？')) {
      settingsStore.editingUserRules = USER_GUIDED_PROMPT_RULES
    }
  }

  const resetRequirementReportRules = () => {
    if (confirm('确定要重置需求报告规则为默认值吗？')) {
      settingsStore.editingRequirementReportRules = REQUIREMENT_REPORT_RULES
    }
  }

  const resetThinkingPointsExtractionPrompt = () => {
    if (confirm('确定要重置关键指令提取规则为默认值吗？')) {
      settingsStore.editingFinalPromptRules.THINKING_POINTS_EXTRACTION = THINKING_POINTS_EXTRACTION_PROMPT
    }
  }

  const resetSystemPromptGenerationPrompt = () => {
    if (confirm('确定要重置系统提示词生成规则为默认值吗？')) {
      settingsStore.editingFinalPromptRules.SYSTEM_PROMPT_GENERATION = SYSTEM_PROMPT_GENERATION_PROMPT
    }
  }

  const resetOptimizationAdvicePrompt = () => {
    if (confirm('确定要重置优化建议生成规则为默认值吗？')) {
      settingsStore.editingFinalPromptRules.OPTIMIZATION_ADVICE_GENERATION = OPTIMIZATION_ADVICE_PROMPT
    }
  }

  const resetOptimizationApplicationPrompt = () => {
    if (confirm('确定要重置优化应用规则为默认值吗？')) {
      settingsStore.editingFinalPromptRules.OPTIMIZATION_APPLICATION = OPTIMIZATION_APPLICATION_PROMPT
    }
  }

  const handleSlimRulesToggle = () => {
    settingsStore.useSlimRules = !settingsStore.useSlimRules
    settingsStore.saveSettings()
  }

  const saveAndClose = async () => {
    try {
      // 保存编辑的规则到 promptConfigManager
      promptConfigManager.updateSystemPromptRules(settingsStore.editingSystemRules)
      promptConfigManager.updateUserGuidedPromptRules(settingsStore.editingUserRules)
      promptConfigManager.updateRequirementReportRules(settingsStore.editingRequirementReportRules)
      // 保存其他规则...
      
      settingsStore.saveSettings()
      settingsStore.setShowSettings(false)
      // 显示成功提示
      const { useNotificationStore } = await import('@/stores/notificationStore')
      const notificationStore = useNotificationStore()
      notificationStore.success('设置保存成功', 2000)
    } catch (error) {
      console.error('保存设置失败:', error)
      const { useNotificationStore } = await import('@/stores/notificationStore')
      const notificationStore = useNotificationStore()
      notificationStore.error('保存失败，请检查网络连接后重试', 3000)
    }
  }

  const resetQualityAnalysisSystemPrompt = () => {
    if (confirm('确定要重置质量分析系统提示词为默认值吗？')) {
      settingsStore.editingQualityAnalysisRules.systemPrompt = QUALITY_ANALYSIS_SYSTEM_PROMPT
    }
  }

  const resetUserPromptQualityAnalysis = () => {
    if (confirm('确定要重置用户提示词质量分析规则为默认值吗？')) {
      settingsStore.editingUserPromptOptimizationRules.qualityAnalysis = USER_PROMPT_QUALITY_ANALYSIS
    }
  }

  const resetUserPromptQuickOptimization = () => {
    if (confirm('确定要重置用户提示词快速优化规则为默认值吗？')) {
      settingsStore.editingUserPromptOptimizationRules.quickOptimization = USER_PROMPT_OPTIMIZATION_CONFIG.quick
    }
  }

  return {
    resetSystemPromptRules,
    resetUserPromptRules,
    resetRequirementReportRules,
    resetThinkingPointsExtractionPrompt,
    resetSystemPromptGenerationPrompt,
    resetOptimizationAdvicePrompt,
    resetOptimizationApplicationPrompt,
    resetQualityAnalysisSystemPrompt,
    resetUserPromptQualityAnalysis,
    resetUserPromptQuickOptimization,
    handleSlimRulesToggle,
    saveAndClose
  }
}
