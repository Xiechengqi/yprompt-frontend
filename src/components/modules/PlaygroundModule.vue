<template>
  <div class="w-full h-full flex flex-col overflow-hidden p-2 playground-container">
      <SystemPromptModal
      :is-open="showSystemPromptModal"
      v-model="systemPromptDraft"
      :title="'设置系统提示词'"
      @close="showSystemPromptModal = false"
      @save="handleSystemPromptSave"
    />

    <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="min-w-0">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900">提示词操练场</h2>
          <p class="text-sm text-gray-500">实时调试提示词、网页、图表与可视化 Artifact</p>
        </div>
      </div>
    </div>

    <div class="flex-1 min-h-0 overflow-hidden">
      <PlaygroundApp
        :system-prompt="systemPrompt"
        @open-system-prompt="openSystemPromptModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import PlaygroundApp from '@/components/playground/PlaygroundApp.js'
import SystemPromptModal from '@/components/modules/optimize/components/SystemPromptModal.vue'
import '@/utils/playgroundGlobals'
import '@/style/playground.css'
import { useProviderStore } from '@/stores/providerStore'

const providerStore = useProviderStore()

// 初始化 providerStore
onMounted(async () => {
  // 如果还没有初始化，则初始化
  if (!providerStore.isInitialized) {
    await providerStore.initialize()
  }
})

const STORAGE_KEY = 'yprompt_playground_system_prompt'
const systemPrompt = ref('')
const systemPromptDraft = ref('')
const showSystemPromptModal = ref(false)

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      systemPrompt.value = saved
    }
  } catch (error) {
    console.warn('加载系统提示词失败', error)
  }
}

watch(systemPrompt, (value) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, value)
})

const openSystemPromptModal = () => {
  systemPromptDraft.value = systemPrompt.value
  showSystemPromptModal.value = true
}

const handleSystemPromptSave = () => {
  systemPrompt.value = systemPromptDraft.value
}
</script>
