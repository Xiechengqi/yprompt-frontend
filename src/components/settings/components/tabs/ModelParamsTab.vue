<template>
  <div class="space-y-6">
    <!-- 当前模型信息 -->
    <div v-if="currentModel && currentProvider" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-900">当前配置模型</h3>
          <p class="text-sm text-gray-600 mt-1">
            {{ currentProvider.name }} - {{ currentModel.name }}
          </p>
        </div>
        <div class="flex items-center space-x-2 text-xs">
          <span :class="[
            'px-2 py-1 rounded',
            currentApiType === 'openai' ? 'bg-green-100 text-green-700' :
            currentApiType === 'anthropic' ? 'bg-purple-100 text-purple-700' :
            currentApiType === 'google' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          ]">
            {{ currentApiType === 'openai' ? 'OpenAI' :
               currentApiType === 'anthropic' ? 'Claude' :
               currentApiType === 'google' ? 'Gemini' : 'Unknown' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 无模型选中提示 -->
    <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <p class="text-sm text-yellow-800">
        请先在「AI模型」标签页选择一个提供商和模型
      </p>
    </div>

    <!-- 参数配置表单 -->
    <div v-if="currentModel" class="space-y-4">
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
          <li v-if="currentApiType === 'openai'">
            • OpenAI 模型支持: Temperature, Max Tokens, Top P, Frequency Penalty, Presence Penalty
          </li>
          <li v-else-if="currentApiType === 'anthropic'">
            • Claude 模型支持: Temperature, Max Tokens, Top P, Top K
          </li>
          <li v-else-if="currentApiType === 'google'">
            • Gemini 模型支持: Temperature, Max Tokens, Top P, Top K
          </li>
          <li class="mt-2">这些参数会在调用 AI 时自动应用，无需手动配置</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModelParams } from '../../composables/useModelParams'
import type { ModelParams } from '@/stores/settingsStore'

const {
  currentModel,
  currentProvider,
  currentApiType,
  getCurrentParams,
  updateCurrentModelParams,
  resetToDefaults,
  isParamSupported,
  getParamRange,
  getParamLabel,
  getParamDescription
} = useModelParams()

const params = ref<ModelParams>(getCurrentParams())

watch(currentModel, () => {
  params.value = getCurrentParams()
})

const handleParamChange = (paramName: keyof ModelParams, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  
  updateCurrentModelParams({
    [paramName]: value
  })
}

const handleReset = () => {
  resetToDefaults()
  params.value = getCurrentParams()
}
</script>
