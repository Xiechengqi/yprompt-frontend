<template>
  <SettingsButton @open="settingsStore.showSettings = true" />

  <div
    v-if="settingsStore.showSettings"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b flex-shrink-0">
        <div class="flex items-center space-x-4">
          <h4 class="text-xl font-semibold">设置</h4>
          <div class="flex space-x-1">
            <button
              @click="activeTab = 'providers'"
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                activeTab === 'providers' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              AI模型
            </button>
            <button
              @click="activeTab = 'params'"
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                activeTab === 'params' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              模型参数
            </button>
            <button
              @click="activeTab = 'prompts'"
              :class="[
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                activeTab === 'prompts' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              提示词规则
            </button>
          </div>
        </div>
        <button
          @click="settingsStore.showSettings = false"
          class="p-1 hover:bg-gray-100 rounded"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <ProvidersTab
          v-if="activeTab === 'providers'"
          :providers="providerStore.allProviders"
          :last-refreshed-at="providerStore.lastRefreshedAt"
          :is-loading="providerStore.isLoading"
          @refresh-config="handleRefreshConfig"
        />

        <ModelParamsTab v-if="activeTab === 'params'" />

        <PromptsTab
          v-if="activeTab === 'prompts'"
          @reset-system="promptRules.resetSystemPromptRules"
          @reset-user="promptRules.resetUserPromptRules"
          @reset-requirement="promptRules.resetRequirementReportRules"
          @reset-quality-analysis-system="promptRules.resetQualityAnalysisSystemPrompt"
          @reset-thinking="promptRules.resetThinkingPointsExtractionPrompt"
          @reset-generation="promptRules.resetSystemPromptGenerationPrompt"
          @reset-advice="promptRules.resetOptimizationAdvicePrompt"
          @reset-application="promptRules.resetOptimizationApplicationPrompt"
          @toggle-slim-rules="promptRules.handleSlimRulesToggle"
          @reset-user-prompt-quality-analysis="promptRules.resetUserPromptQualityAnalysis"
          @reset-user-prompt-quick-optimization="promptRules.resetUserPromptQuickOptimization"
        />
      </div>

      <!-- 底部按钮 -->
      <div class="flex justify-end space-x-3 p-4 border-t bg-gray-50 flex-shrink-0">
        <button
          @click="settingsStore.showSettings = false"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          @click="promptRules.saveAndClose"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useProviderStore } from '@/stores/providerStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { usePromptRules } from '@/components/settings/composables/usePromptRules'

import SettingsButton from '@/components/settings/components/SettingsButton.vue'
import ProvidersTab from '@/components/settings/components/tabs/ProvidersTab.vue'
import ModelParamsTab from '@/components/settings/components/tabs/ModelParamsTab.vue'
import PromptsTab from '@/components/settings/components/tabs/PromptsTab.vue'

const providerStore = useProviderStore()
const settingsStore = useSettingsStore() // 仅用于提示词规则
const notificationStore = useNotificationStore()
const activeTab = ref<'providers' | 'params' | 'prompts'>('providers')

// Composables
const promptRules = usePromptRules()

/**
 * 刷新配置从后端 API
 */
const handleRefreshConfig = async () => {
  try {
    await providerStore.refreshSettings()
    notificationStore.success('配置已刷新')
  } catch (error: any) {
    console.error('刷新配置失败:', error)
    notificationStore.error(`刷新配置失败: ${error.message || '未知错误'}`)
  }
}

onMounted(() => {
  providerStore.initialize()
  settingsStore.loadSettings()
})
</script>