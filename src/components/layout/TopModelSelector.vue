<template>
  <div class="flex items-center gap-3">
    <!-- AI图标 -->
    <div class="flex-shrink-0">
      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- 提供商选择 -->
    <div class="relative">
      <select
        v-model="selectedProviderKey"
        @change="onProviderChange"
        class="px-2 py-1 text-sm font-medium text-gray-700 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none cursor-pointer appearance-none"
      >
        <option value="" disabled>提供商</option>
        <option
          v-for="provider in availableProviders"
          :key="provider.id"
          :value="getProviderKey(provider)"
        >
          {{ getProviderDisplay(provider) }}
        </option>
      </select>
      <!-- 简化的下拉箭头 -->
      <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- 模型选择 -->
    <div class="relative">
      <select
        v-model="selectedModelKey"
        @change="onModelChange"
        :disabled="!selectedProviderId"
        class="px-2 py-1 text-sm text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>模型</option>
        <option
          v-for="model in availableModels"
          :key="model.id"
          :value="getModelKey(model)"
        >
          {{ getModelDisplay(model) }}
        </option>
      </select>
      <!-- 简化的下拉箭头 -->
      <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- 状态指示器 -->
    <div v-if="providerStore.currentProvider && providerStore.currentModel" class="flex-shrink-0 ml-2">
      <div class="w-1.5 h-1.5 rounded-full bg-green-500" :title="`${providerStore.currentProvider.name} / ${providerStore.currentModel.name}`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useProviderStore } from '@/stores/providerStore'

const providerStore = useProviderStore()

// 辅助方法：生成 provider key (name + id)
const getProviderKey = (provider: any) => {
  return `${provider.name}|${provider.id}`
}

// 辅助方法：解析 provider key
const parseProviderKey = (key: string) => {
  const [name, id] = key.split('|')
  return { name, id }
}

// 辅助方法：获取 provider 显示文本
const getProviderDisplay = (provider: any) => {
  return provider.name
}

// 辅助方法：获取 model 显示文本
const getModelDisplay = (model: any) => {
  return model.name
}

// 辅助方法：生成 model key (name + id)
const getModelKey = (model: any) => {
  return `${model.name}|${model.id}`
}

// 当前选中的 provider key
const selectedProviderKey = computed({
  get: () => {
    if (!providerStore.selectedProviderId) return ''
    const provider = providerStore.getProviderById(providerStore.selectedProviderId)
    return provider ? getProviderKey(provider) : ''
  },
  set: (key: string) => {
    if (!key) {
      providerStore.selectedProviderId = ''
      return
    }
    const { id } = parseProviderKey(key)
    providerStore.selectedProviderId = id
  }
})

// 当前选中的 model key
const selectedModelKey = computed({
  get: () => {
    if (!providerStore.selectedModelId) return ''
    const model = providerStore.currentModel
    return model ? `${model.name}|${model.id}` : ''
  },
  set: (key: string) => {
    if (!key) {
      providerStore.selectedModelId = ''
      return
    }
    const [, id] = key.split('|')
    providerStore.selectedModelId = id
  }
})

// 保持向后兼容的 computed 属性
const selectedProviderId = computed(() => providerStore.selectedProviderId)

const availableProviders = computed(() => {
  return providerStore.enabledProviders
})

const availableModels = computed(() => {
  if (!providerStore.selectedProviderId) return []
  return providerStore.getAvailableModelsByProvider(providerStore.selectedProviderId)
})

// 监听Provider变化，自动更新模型选择
watch(selectedProviderKey, (newProviderKey, oldProviderKey) => {
  if (newProviderKey && newProviderKey !== oldProviderKey) {
    const { id } = parseProviderKey(newProviderKey)
    providerStore.selectProvider(id) // providerStore会自动选择第一个模型
  }
}, { immediate: false })

const onProviderChange = () => {
  // 不需要在这里做额外处理，watch会处理
}

const onModelChange = () => {
  if (selectedModelKey.value) {
    const [, id] = selectedModelKey.value.split('|')
    providerStore.selectModel(id)
  }
}
</script>

<style scoped>
/* 自定义下拉框样式 */
select {
  appearance: none;
  background-image: none;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

/* Firefox 自定义样式 */
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

/* 悬停效果 */
:hover select {
  color: #374151;
}

/* 禁用状态样式 */
select:disabled {
  color: #9ca3af;
}

/* 选项样式 */
select option {
  background: #f9fafb;
  color: #374151;
  padding: 0.5rem;
}

/* 整体组件动画 */
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>