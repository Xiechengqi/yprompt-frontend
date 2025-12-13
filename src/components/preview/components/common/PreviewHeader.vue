<template>
  <div class="p-4 border-b border-gray-200 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <h4 class="font-semibold text-gray-800">生成预览</h4>
      <div v-if="currentExecutionStep || (isGenerating && !currentExecutionStep)" class="flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200">
        <RefreshCw class="w-3 h-3 animate-spin mr-1" />
        <span>{{ currentExecutionStep ? getStepDisplayName(currentExecutionStep): '生成需求报告' }}</span>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <div class="flex items-center space-x-2">
        <label class="flex items-center cursor-pointer">
          <input
            :checked="isAutoMode"
            @change="$emit('update:isAutoMode', ($event.target as HTMLInputElement).checked)"
            type="checkbox"
            class="sr-only peer"
          />
          <span class="text-sm text-gray-600">{{ isAutoMode ? '自动：' : '手动：' }}</span>
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'

defineProps<{
  isAutoMode: boolean
  currentExecutionStep: 'report' | 'thinking' | 'initial' | 'advice' | 'final' | null
  isGenerating: boolean
}>()

defineEmits<{
  'update:isAutoMode': [value: boolean]
}>()

const getStepDisplayName = (step: string) => {
  const stepNames: Record<string, string> = {
    'report': '生成需求报告',
    'thinking': '生成关键指令',
    'initial': '生成初始提示词',
    'advice': '生成优化建议',
    'final': '生成最终提示词'
  }
  return stepNames[step] || step
}
</script>
