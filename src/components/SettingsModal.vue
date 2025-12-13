<template>
  <SettingsButton @open="settingsStore.showSettings = true" />

  <div
    v-if="settingsStore.showSettings"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-4xl w-full h-[85vh] overflow-hidden flex flex-col">
      <SettingsHeader
        v-model:active-tab="activeTab"
        @close="settingsStore.showSettings = false"
      />

      <div class="p-6 overflow-y-auto flex-1">
        <ProvidersTab
          v-if="activeTab === 'providers'"
          :providers="providerStore.allProviders"
          :last-refreshed-at="providerStore.lastRefreshedAt"
          :is-loading="providerStore.isLoading"
          @refresh-config="handleRefreshConfig"
        />

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

      <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50 flex-shrink-0">
        <button
          @click="settingsStore.showSettings = false"
          class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          取消
        </button>
        <button
          @click="promptRules.saveAndClose"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useProviderStore } from '@/stores/providerStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useNotificationStore } from '@/stores/notificationStore'

import SettingsButton from './settings/components/SettingsButton.vue'
import SettingsHeader from './settings/components/SettingsHeader.vue'
import ProvidersTab from './settings/components/tabs/ProvidersTab.vue'
import PromptsTab from './settings/components/tabs/PromptsTab.vue'

import { usePromptRules } from './settings/composables/usePromptRules'

const providerStore = useProviderStore()
const settingsStore = useSettingsStore()
const notificationStore = useNotificationStore()

const activeTab = ref<'providers' | 'prompts'>('providers')

const promptRules = usePromptRules()

const handleRefreshConfig = async () => {
  try {
    await providerStore.refreshSettings()
    notificationStore.success('配置已刷新')
  } catch (error: any) {
    notificationStore.error(`刷新配置失败: ${error.message || '未知错误'}`)
  }
}

watch(activeTab, (newTab) => {
  if (newTab === 'prompts') {
    settingsStore.openPromptEditor('system')
  }
})

onMounted(() => {
  providerStore.initialize()
  settingsStore.loadSettings()
})
</script>
