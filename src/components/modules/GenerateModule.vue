<template>
  <div class="w-full h-full flex flex-col overflow-hidden p-2">
    <!-- 设置按钮 -->
    <GenerateSettingsModal />

    <div class="w-full h-full flex flex-col overflow-hidden">
      <!-- 模块特定顶栏 -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="min-w-0">
            <h2 class="text-xl lg:text-2xl font-bold text-gray-800 mb-1">智能提示词创建</h2>
            <p class="text-sm lg:text-base text-gray-600">AI引导式对话，帮您构建专业的提示词</p>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="flex flex-row flex-1 min-h-0 gap-4 overflow-hidden">
        <!-- 左侧 - Chat Interface -->
        <div class="flex flex-col flex-1 min-h-0">
          <ChatInterface />
        </div>

        <!-- 右侧 - Preview Panel -->
        <div class="flex flex-col flex-1 min-h-0">
          <PreviewPanel />
        </div>
      </div>
    </div>

    <!-- 通知容器 -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import ChatInterface from '@/components/ChatInterface.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import GenerateSettingsModal from '@/components/GenerateSettingsModal.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import { useProviderStore } from '@/stores/providerStore'
import { onMounted } from 'vue'

const providerStore = useProviderStore()


// 初始化
onMounted(async () => {
  await providerStore.initialize()

  // 如果没有配置，显示设置界面
  const hasConfiguredProvider = providerStore.enabledProviders.length > 0
  if (!hasConfiguredProvider) {
    setTimeout(() => {
      // TODO: 显示设置界面或提示用户配置
    }, 1000)
  }
})
</script>