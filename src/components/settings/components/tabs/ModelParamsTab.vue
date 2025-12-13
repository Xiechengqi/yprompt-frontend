<template>
  <div class="space-y-6">
    <!-- 参数配置表单 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">模型参数</h3>
        <button
          @click="handleReset"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          重置为默认值
        </button>
      </div>

      <!-- Temperature -->
      <div v-if="isParamSupported('temperature')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('temperature') }}
          </label>
          <input
            type="number"
            v-model.number="params.temperature"
            @input="handleParamChange('temperature', $event)"
            :min="getParamRange('temperature').min"
            :max="getParamRange('temperature').max"
            :step="getParamRange('temperature').step"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.temperature"
          @input="handleParamChange('temperature', $event)"
          :min="getParamRange('temperature').min"
          :max="getParamRange('temperature').max"
          :step="getParamRange('temperature').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('temperature') }}</p>
      </div>

      <!-- Max Tokens -->
      <div v-if="isParamSupported('maxTokens')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('maxTokens') }}
          </label>
          <input
            type="number"
            v-model.number="params.maxTokens"
            @input="handleParamChange('maxTokens', $event)"
            :min="getParamRange('maxTokens').min"
            :max="getParamRange('maxTokens').max"
            :step="getParamRange('maxTokens').step"
            class="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.maxTokens"
          @input="handleParamChange('maxTokens', $event)"
          :min="getParamRange('maxTokens').min"
          :max="getParamRange('maxTokens').max"
          :step="getParamRange('maxTokens').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('maxTokens') }}</p>
      </div>

      <!-- Top P -->
      <div v-if="isParamSupported('topP')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('topP') }}
          </label>
          <input
            type="number"
            v-model.number="params.topP"
            @input="handleParamChange('topP', $event)"
            :min="getParamRange('topP').min"
            :max="getParamRange('topP').max"
            :step="getParamRange('topP').step"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.topP"
          @input="handleParamChange('topP', $event)"
          :min="getParamRange('topP').min"
          :max="getParamRange('topP').max"
          :step="getParamRange('topP').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('topP') }}</p>
      </div>

      <!-- Frequency Penalty (OpenAI only) -->
      <div v-if="isParamSupported('frequencyPenalty')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('frequencyPenalty') }}
          </label>
          <input
            type="number"
            v-model.number="params.frequencyPenalty"
            @input="handleParamChange('frequencyPenalty', $event)"
            :min="getParamRange('frequencyPenalty').min"
            :max="getParamRange('frequencyPenalty').max"
            :step="getParamRange('frequencyPenalty').step"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.frequencyPenalty"
          @input="handleParamChange('frequencyPenalty', $event)"
          :min="getParamRange('frequencyPenalty').min"
          :max="getParamRange('frequencyPenalty').max"
          :step="getParamRange('frequencyPenalty').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('frequencyPenalty') }}</p>
      </div>

      <!-- Presence Penalty (OpenAI only) -->
      <div v-if="isParamSupported('presencePenalty')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('presencePenalty') }}
          </label>
          <input
            type="number"
            v-model.number="params.presencePenalty"
            @input="handleParamChange('presencePenalty', $event)"
            :min="getParamRange('presencePenalty').min"
            :max="getParamRange('presencePenalty').max"
            :step="getParamRange('presencePenalty').step"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.presencePenalty"
          @input="handleParamChange('presencePenalty', $event)"
          :min="getParamRange('presencePenalty').min"
          :max="getParamRange('presencePenalty').max"
          :step="getParamRange('presencePenalty').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('presencePenalty') }}</p>
      </div>

      <!-- Top K (Claude/Gemini only) -->
      <div v-if="isParamSupported('topK')" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">
            {{ getParamLabel('topK') }}
          </label>
          <input
            type="number"
            v-model.number="params.topK"
            @input="handleParamChange('topK', $event)"
            :min="getParamRange('topK').min"
            :max="getParamRange('topK').max"
            :step="getParamRange('topK').step"
            class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <input
          type="range"
          v-model.number="params.topK"
          @input="handleParamChange('topK', $event)"
          :min="getParamRange('topK').min"
          :max="getParamRange('topK').max"
          :step="getParamRange('topK').step"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p class="text-xs text-gray-500">{{ getParamDescription('topK') }}</p>
      </div>

      <!-- 参数说明 -->
      <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 class="text-sm font-medium text-gray-900 mb-2">参数说明</h4>
        <ul class="text-xs text-gray-600 space-y-1">
          <li>• Temperature: 控制输出的随机性（0-2）</li>
          <li>• Max Tokens: 生成的最大token数量</li>
          <li>• Top P: 核采样参数，控制考虑的词汇范围</li>
          <li>• Frequency Penalty: 降低重复词汇的频率（OpenAI）</li>
          <li>• Presence Penalty: 鼓励模型谈论新话题（OpenAI）</li>
          <li>• Top K: 只考虑概率最高的K个词汇（Claude/Gemini）</li>
          <li class="mt-2">这些参数会全局应用到所有AI模型，无需单独配置</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useModelParams } from '../../composables/useModelParams'
import { useSettingsStore } from '@/stores/settingsStore'
import type { ModelParams } from '@/stores/settingsStore'

const {
  getCurrentParams,
  updateCurrentModelParams,
  resetToDefaults,
  isParamSupported,
  getParamRange,
  getParamLabel,
  getParamDescription
} = useModelParams()

const settingsStore = useSettingsStore()
const params = ref<ModelParams>(getCurrentParams())

// 更新参数的函数
const updateParams = () => {
  params.value = getCurrentParams()
}

// 监听设置加载完成（当 providers 数组长度变化时，说明设置已加载）
watch(() => settingsStore.providers.length, () => {
  // 延迟更新，确保参数已加载
  nextTick(() => {
    updateParams()
  })
})

// 监听全局参数变化
watch(() => settingsStore.globalModelParams, () => {
  // 当全局参数变化时，更新显示
  nextTick(() => {
    updateParams()
  })
}, { deep: true })

// 组件挂载时确保参数已加载
onMounted(async () => {
  // 等待设置加载完成
  await nextTick()
  updateParams()
})

const handleParamChange = (paramName: keyof ModelParams, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)

  // 立即更新本地状态（用于 UI 响应）
  params.value = {
    ...params.value,
    [paramName]: value
  }

  // 保存到 store
  updateCurrentModelParams({
    [paramName]: value
  })
}

const handleReset = () => {
  resetToDefaults()
  params.value = getCurrentParams()
}
</script>
