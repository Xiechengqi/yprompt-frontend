<template>
  <div class="p-4 border-b border-gray-200 flex-shrink-0">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <h4 class="font-semibold text-gray-800">AI助手对话</h4>
      </div>
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">流式:</span>
          <button
            @click="$emit('toggle-stream')"
            :class="[
              'relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none',
              isStreamMode ? 'bg-blue-500' : 'bg-gray-300'
            ]"
            :title="isStreamMode ? '关闭流式模式' : '开启流式模式'"
          >
            <span
              :class="[
                'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
                isStreamMode ? 'translate-x-5' : 'translate-x-1'
              ]"
            />
          </button>
        </div>

        <button
          v-if="shouldShowInterrupt"
          @click="$emit('interrupt')"
          class="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-100 rounded transition-colors"
          title="中断生成"
        >
          <Square class="w-4 h-4" />
          <span>中断</span>
        </button>

        <button
          @click="$emit('clear-chat')"
          class="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="重新开始"
        >
          <RefreshCw class="w-4 h-4" />
          <span>重新开始</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RefreshCw, Square } from 'lucide-vue-next'

const props = defineProps<{
  isStreamMode: boolean
  isGenerating: boolean
  isTyping: boolean
}>()

defineEmits<{
  'toggle-stream': []
  'clear-chat': []
  'interrupt': []
}>()

// 计算是否显示中断按钮
const shouldShowInterrupt = computed(() => props.isGenerating || props.isTyping)
</script>
