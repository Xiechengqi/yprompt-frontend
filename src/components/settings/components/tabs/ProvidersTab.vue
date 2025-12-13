<template>
  <div>
    <!-- 测试详情弹框 -->
    <TestDetailDialog
      v-model:visible="showDetailDialog"
      :provider-name="detailInfo.providerName"
      :model-id="detailInfo.modelId"
      :status="detailInfo.status"
      :request-info="detailInfo.requestInfo"
      :response-info="detailInfo.responseInfo"
      :error-message="detailInfo.errorMessage"
      :test-time="detailInfo.testTime"
      :duration="detailInfo.duration"
      @close="showDetailDialog = false"
    />

    <!-- 只读提示横幅 -->
    <div class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div class="flex items-start space-x-3">
        <AlertCircle class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div class="flex-1">
          <h4 class="text-sm font-semibold text-yellow-800 mb-2">配置为只读模式</h4>
          <div class="text-sm text-yellow-700 space-y-1">
            <p>AI模型配置由系统管理员统一管理，前端仅用于查看。</p>
            <p>
              <strong>如需修改：</strong>请编辑后端项目中的
              <code class="bg-yellow-100 px-2 py-0.5 rounded text-xs font-mono">.setting.json</code>
              文件，然后点击"刷新配置"按钮。
            </p>
            <p class="text-xs mt-2">
              <strong>配置文件路径：</strong>
              <code class="bg-yellow-100 px-2 py-0.5 rounded font-mono">/app/projects/yprompt/.setting.json</code>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部操作栏 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <h3 class="text-lg font-medium">AI服务提供商</h3>
          <div v-if="lastRefreshedAt" class="text-sm text-gray-500">
            上次刷新: {{ formatTime(lastRefreshedAt) }}
          </div>
        </div>
        <button
          @click="emit('refresh-config')"
          :disabled="isLoading"
          class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" />
          <span>刷新配置</span>
        </button>
      </div>

      <!-- API配置说明 -->
      <div class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-sm font-medium text-blue-800 mb-2">API配置说明</h4>
        <div class="text-sm text-blue-700 space-y-2">
          <div><strong>OpenAI及兼容服务：</strong>API URL填写完整路径，如 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://api.openai.com/v1/chat/completions</code></div>
          <div><strong>Anthropic Claude：</strong>API URL填写 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://api.anthropic.com/v1/messages</code></div>
          <div><strong>Google Gemini：</strong>API URL填写 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://generativelanguage.googleapis.com/v1beta</code></div>
        </div>
      </div>
    </div>

    <!-- Provider 列表 -->
    <div v-if="providers.length === 0" class="text-center py-12 text-gray-500">
      <Settings class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p class="text-lg mb-2">暂无配置</p>
      <p class="text-sm">请在后端 .setting.json 文件中添加 Provider 配置</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="provider in providers"
        :key="provider.id"
        class="border rounded-lg p-5 bg-white shadow-sm"
      >
        <!-- Provider 头部 -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <!-- API Key 状态指示器 -->
            <div
              :class="[
                'w-3 h-3 rounded-full',
                provider.apiKey
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              ]"
              :title="provider.apiKey ? 'API Key 已配置' : 'API Key 未配置'"
            />
            <div>
              <h4 class="text-base font-semibold text-gray-900">{{ provider.name }}</h4>
              <div class="flex items-center space-x-2 mt-1">
                <span
                  :class="[
                    'text-xs px-2 py-0.5 rounded-full',
                    getProviderTypeColor(provider.type)
                  ]"
                >
                  {{ getProviderTypeLabel(provider.type) }}
                </span>
                <span v-if="!provider.apiKey" class="text-xs text-red-600">
                  未配置 API Key
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Provider 信息 -->
        <div class="space-y-3 mb-4 pl-6">
          <div class="grid grid-cols-1 gap-2 text-sm">
            <div class="flex items-start">
              <span class="text-gray-500 w-24 flex-shrink-0">API Key:</span>
              <div class="flex-1 flex items-center space-x-2">
                <span class="text-gray-900 font-mono text-xs break-all">
                  {{ '********' + provider.apiKey.substring(provider.apiKey.length - 4) }}
                </span>

              </div>
            </div>
            <div v-if="provider.baseUrl" class="flex items-start">
              <span class="text-gray-500 w-24 flex-shrink-0">Base URL:</span>
              <span class="text-gray-700 font-mono text-xs break-all">
                {{ provider.baseUrl }}
              </span>
            </div>
          </div>
        </div>

        <!-- Models 列表 -->
        <div class="pl-6 border-l-2 border-gray-200">
          <h5 class="text-sm font-medium text-gray-700 mb-3">
            模型列表 ({{ provider.models.length }})
          </h5>

          <div v-if="provider.models.length === 0" class="text-sm text-gray-500 py-2">
            该提供商暂无模型配置
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="model in provider.models"
              :key="model.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center space-x-3 flex-1">
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-gray-900">{{ model.name }}</div>
                  <div class="text-xs text-gray-500 font-mono truncate">{{ model.id }}</div>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0">
                <!-- API 类型标签 -->
                <div v-if="model.apiType" class="flex-shrink-0">
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded',
                      getApiTypeColor(model.apiType)
                    ]"
                  >
                    {{ getApiTypeLabel(model.apiType) }}
                  </span>
                </div>

                <!-- 测试按钮 -->
                <button
                  @click="testModel(provider, model.id)"
                  :disabled="!provider.apiKey || testingModels.has(`${provider.id}-${model.id}`)"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5',
                    getTestButtonClass(provider.id, model.id)
                  ]"
                  :title="getTestButtonTitle(provider.id, model.id)"
                >
                  <component 
                    :is="getTestButtonIcon(provider.id, model.id)" 
                    :class="['w-3.5 h-3.5', testingModels.has(`${provider.id}-${model.id}`) ? 'animate-spin' : '']"
                  />
                  <span>{{ getTestButtonText(provider.id, model.id) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Settings, AlertCircle, RefreshCw, Play, CheckCircle, XCircle, Clock } from 'lucide-vue-next'
import type { ProviderConfig } from '@/stores/providerStore'
import { useSettingsStore } from '@/stores/settingsStore'
import type { ModelParams } from '@/stores/settingsStore'
import { AIService } from '@/services/aiService'
import { useNotificationStore } from '@/stores/notificationStore'
import TestDetailDialog from '../TestDetailDialog.vue'

// Props
interface Props {
  providers: ProviderConfig[]
  lastRefreshedAt: Date | null
  isLoading: boolean
}

defineProps<Props>()

// Emits
const emit = defineEmits<{
  'refresh-config': []
}>()

// Store
const settingsStore = useSettingsStore()
const notificationStore = useNotificationStore()

// 测试状态管理
const testingModels = ref<Set<string>>(new Set())
const testResults = ref<Map<string, 'success' | 'error' | 'timeout'>>(new Map())

// 详情弹框状态
const showDetailDialog = ref(false)
const detailInfo = ref<{
  providerName: string
  modelId: string
  status: 'success' | 'error' | 'timeout' | 'testing'
  requestInfo?: {
    url: string
    method: string
    headers: Record<string, string>
    body: any
  }
  responseInfo?: {
    status?: number
    statusText?: string
    headers?: Record<string, string>
    body?: any
  }
  errorMessage?: string
  testTime?: string
  duration?: number
}>({
  providerName: '',
  modelId: '',
  status: 'testing'
})



// 构建请求信息
const buildRequestInfo = (
  provider: ProviderConfig,
  modelId: string,
  messages: any[],
  params: ModelParams
): {
  url: string
  method: string
  headers: Record<string, string>
  body: any
} => {
  const model = provider.models.find(m => m.id === modelId)
  const apiType = model?.apiType || provider.type

  let url = provider.baseUrl || ''
  let headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  let body: any = {}

  // 根据 API 类型构建请求信息
  if (apiType === 'openai') {
    // OpenAI API
    if (url.includes('/chat/completions')) {
      // 已经是完整URL
    } else if (url.includes('/v1')) {
      url = url.replace(/\/+$/, '') + '/chat/completions'
    } else {
      url = url.replace(/\/+$/, '') + '/v1/chat/completions'
    }
    headers['Authorization'] = `Bearer ${provider.apiKey}`
    body = {
      model: modelId,
      messages: messages.map((msg: any) => ({
        role: msg.type === 'ai' ? 'assistant' : 'user',
        content: msg.content
      })),
      temperature: params.temperature ?? 1.0,
      max_tokens: params.maxTokens ?? 8192,
      top_p: params.topP ?? 0.95
    }
    // OpenAI 特有参数
    if (params.frequencyPenalty !== undefined) {
      body.frequency_penalty = params.frequencyPenalty
    }
    if (params.presencePenalty !== undefined) {
      body.presence_penalty = params.presencePenalty
    }
  } else if (apiType === 'anthropic') {
    // Anthropic API
    if (!url.includes('/v1/messages')) {
      url = url.replace(/\/+$/, '') + '/v1/messages'
    }
    headers['x-api-key'] = provider.apiKey || ''
    headers['anthropic-version'] = '2023-06-01'
    headers['anthropic-dangerous-direct-browser-access'] = 'true'
    body = {
      model: modelId,
      max_tokens: params.maxTokens ?? 8192,
      temperature: params.temperature ?? 1.0,
      messages: messages.map((msg: any) => ({
        role: msg.type === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }))
    }
    // Claude 特有参数
    if (params.topP !== undefined) {
      body.top_p = params.topP
    }
    if (params.topK !== undefined && params.topK > 0) {
      body.top_k = params.topK
    }
  } else if (apiType === 'google') {
    // Google Gemini API
    if (!url.endsWith('/v1beta')) {
      if (url.includes('/models/')) {
        url = url.split('/models/')[0]
      }
      if (!url.endsWith('/v1beta')) {
        url = url.replace(/\/+$/, '') + '/v1beta'
      }
    }
    url = `${url}/models/${modelId}:generateContent`
    headers['x-goog-api-key'] = provider.apiKey || ''
    body = {
      contents: messages.map((msg: any) => ({
        role: msg.type === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: params.temperature ?? 1.0,
        maxOutputTokens: params.maxTokens ?? 8192
      }
    }
    // Gemini 特有参数
    if (params.topP !== undefined) {
      body.generationConfig.topP = params.topP
    }
    if (params.topK !== undefined && params.topK > 0) {
      body.generationConfig.topK = params.topK
    }
  }

  return {
    url,
    method: 'POST',
    headers,
    body
  }
}

// 测试模型
const testModel = async (provider: ProviderConfig, modelId: string) => {
  const testKey = `${provider.id}-${modelId}`
  
  // 检查是否有 API Key
  if (!provider.apiKey) {
    notificationStore.warning('请先配置 API Key', 2000)
    return
  }

  // 如果正在测试，则返回
  if (testingModels.value.has(testKey)) {
    return
  }

  // 开始测试
  testingModels.value.add(testKey)
  testResults.value.delete(testKey)

  const startTime = Date.now()
  const testMessages: Array<{ type: 'user' | 'ai', content: string, timestamp: string }> = [
    { type: 'user', content: '你好', timestamp: new Date().toISOString() }
  ]

  // 获取全局模型参数
  const globalParams = settingsStore.globalModelParams
  console.log('[ProvidersTab] 使用全局模型参数进行测试:', globalParams)

  // 构建请求信息
  const requestInfo = buildRequestInfo(provider, modelId, testMessages, globalParams)

  // 初始化详情信息（隐藏敏感信息）
  const sanitizedHeaders: Record<string, string> = { ...requestInfo.headers }
  if (sanitizedHeaders['Authorization']) {
    sanitizedHeaders['Authorization'] = 'Bearer ***'
  }
  if (sanitizedHeaders['x-api-key']) {
    sanitizedHeaders['x-api-key'] = '***'
  }
  if (sanitizedHeaders['x-goog-api-key']) {
    sanitizedHeaders['x-goog-api-key'] = '***'
  }

  detailInfo.value = {
    providerName: provider.name,
    modelId: modelId,
    status: 'testing',
    requestInfo: {
      ...requestInfo,
      headers: sanitizedHeaders
    },
    testTime: new Date().toLocaleString('zh-CN')
  }

  // 显示详情弹框
  showDetailDialog.value = true

  try {
    // 创建包装的 fetch 来捕获响应
    const originalFetch = window.fetch
    let responseBody: any = null
    let responseHeaders: Record<string, string> = {}
    let responseStatus: number | undefined = undefined
    let responseStatusText: string | undefined = undefined

    // 临时替换 fetch
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const response = await originalFetch(input, init)
      responseStatus = response.status
      responseStatusText = response.statusText
      
      // 克隆响应以便读取 body
      const clonedResponse = response.clone()
      
      // 捕获响应头
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      // 尝试捕获响应体
      try {
        const contentType = response.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          responseBody = await clonedResponse.json()
        } else {
          const text = await clonedResponse.text()
          responseBody = { raw: text }
        }
      } catch (e) {
        responseBody = { error: '无法解析响应体' }
      }

      return response
    }

    const aiService = AIService.getInstance()
    
    // 创建超时 Promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        window.fetch = originalFetch // 恢复原始 fetch
        reject(new Error('TIMEOUT'))
      }, 10000) // 10秒超时
    })

    // 创建测试请求 Promise
    const testPromise = aiService.callAI(
      testMessages,
      provider,
      modelId,
      false
    )

    // 竞争执行：超时或请求完成
    try {
      await Promise.race([testPromise, timeoutPromise])
      
      // 恢复原始 fetch
      window.fetch = originalFetch

      const duration = Date.now() - startTime
      
      // 请求成功
      testResults.value.set(testKey, 'success')
      detailInfo.value.status = 'success'
      detailInfo.value.duration = duration
      detailInfo.value.responseInfo = {
        status: responseStatus,
        statusText: responseStatusText,
        headers: responseHeaders,
        body: responseBody
      }
      
      notificationStore.success(`模型 ${modelId} 测试成功`, 2000)
    } catch (error: any) {
      // 恢复原始 fetch
      window.fetch = originalFetch

      const duration = Date.now() - startTime
      
      // 判断是超时还是请求失败
      if (error?.message === 'TIMEOUT') {
        testResults.value.set(testKey, 'timeout')
        detailInfo.value.status = 'timeout'
        detailInfo.value.duration = duration
        detailInfo.value.errorMessage = '请求超时（10秒）'
        notificationStore.warning(`模型 ${modelId} 测试超时（10秒）`, 3000)
      } else {
        // 请求失败
        testResults.value.set(testKey, 'error')
        detailInfo.value.status = 'error'
        detailInfo.value.duration = duration
        detailInfo.value.errorMessage = error?.message || '请求失败'
        detailInfo.value.responseInfo = {
          status: responseStatus,
          statusText: responseStatusText,
          headers: responseHeaders,
          body: responseBody || (error?.error ? { error: error.error } : null)
        }
        const errorMsg = error?.message || '请求失败'
        notificationStore.error(`模型 ${modelId} 测试失败: ${errorMsg}`, 3000)
      }
    }
  } catch (error: any) {
    // 确保恢复原始 fetch
    window.fetch = window.fetch || (() => Promise.reject(new Error('Fetch not available')))
    
    const duration = Date.now() - startTime
    testResults.value.set(testKey, 'error')
    detailInfo.value.status = 'error'
    detailInfo.value.duration = duration
    detailInfo.value.errorMessage = error?.message || '测试失败'
    const errorMsg = error?.message || '测试失败'
    notificationStore.error(`模型 ${modelId} 测试失败: ${errorMsg}`, 3000)
  } finally {
    // 延迟移除测试状态，让用户看到结果
    setTimeout(() => {
      testingModels.value.delete(testKey)
    }, 2000)
  }
}

// 获取测试按钮样式
const getTestButtonClass = (providerId: string, modelId: string): string => {
  const testKey = `${providerId}-${modelId}`
  const isTesting = testingModels.value.has(testKey)
  const result = testResults.value.get(testKey)

  if (isTesting) {
    return 'bg-blue-100 text-blue-700 border border-blue-300 cursor-wait'
  }

  switch (result) {
    case 'success':
      return 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
    case 'error':
      return 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
    case 'timeout':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200'
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
  }
}

// 获取测试按钮图标
const getTestButtonIcon = (providerId: string, modelId: string) => {
  const testKey = `${providerId}-${modelId}`
  const isTesting = testingModels.value.has(testKey)
  const result = testResults.value.get(testKey)

  if (isTesting) {
    return RefreshCw
  }

  switch (result) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'timeout':
      return Clock
    default:
      return Play
  }
}

// 获取测试按钮文本
const getTestButtonText = (providerId: string, modelId: string): string => {
  const testKey = `${providerId}-${modelId}`
  const isTesting = testingModels.value.has(testKey)
  const result = testResults.value.get(testKey)

  if (isTesting) {
    return '测试中...'
  }

  switch (result) {
    case 'success':
      return '成功'
    case 'error':
      return '失败'
    case 'timeout':
      return '超时'
    default:
      return '测试'
  }
}

// 获取测试按钮标题
const getTestButtonTitle = (providerId: string, modelId: string): string => {
  const testKey = `${providerId}-${modelId}`
  const isTesting = testingModels.value.has(testKey)
  const result = testResults.value.get(testKey)

  if (isTesting) {
    return '正在测试模型连接...'
  }

  switch (result) {
    case 'success':
      return '模型测试成功'
    case 'error':
      return '模型测试失败'
    case 'timeout':
      return '模型测试超时（10秒）'
    default:
      return '点击测试模型连接'
  }
}

// 辅助函数
const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}



const getProviderTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    openai: 'bg-green-100 text-green-700',
    anthropic: 'bg-orange-100 text-orange-700',
    google: 'bg-blue-100 text-blue-700',
    custom: 'bg-purple-100 text-purple-700'
  }
  return colors[type] || 'bg-gray-100 text-gray-700'
}

const getProviderTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google',
    custom: '自定义'
  }
  return labels[type] || type
}

const getApiTypeColor = (apiType: string) => {
  const colors: Record<string, string> = {
    openai: 'bg-green-50 text-green-600 border border-green-200',
    anthropic: 'bg-orange-50 text-orange-600 border border-orange-200',
    google: 'bg-blue-50 text-blue-600 border border-blue-200'
  }
  return colors[apiType] || 'bg-gray-50 text-gray-600 border border-gray-200'
}

const getApiTypeLabel = (apiType: string) => {
  const labels: Record<string, string> = {
    openai: 'OpenAI API',
    anthropic: 'Claude API',
    google: 'Gemini API'
  }
  return labels[apiType] || apiType
}
</script>
