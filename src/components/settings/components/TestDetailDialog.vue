<template>
  <Teleport to="body">
    <!-- 完整弹窗 -->
    <Transition name="fade">
      <div
        v-if="visible && !isMinimized"
        class="fixed inset-0 z-[10000] flex items-end justify-end pointer-events-none"
      >
        <!-- 背景遮罩（带透视效果） -->
        <div class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        
        <!-- 弹窗主体 -->
        <div
          ref="dialogRef"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          class="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto transform transition-all duration-300 ease-out border border-white/20"
          :class="[
            visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            'hover:shadow-3xl hover:scale-[1.01]'
          ]"
          style="box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;"
        >
          <!-- 头部（带渐变和透视效果） -->
          <div class="relative flex items-center justify-between px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-t-3xl">
            <!-- 装饰性渐变光晕 -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-t-3xl"></div>
            
            <div class="relative flex items-center gap-3 z-10">
              <div
                :class="[
                  'w-3 h-3 rounded-full shadow-lg',
                  status === 'success' ? 'bg-green-500 shadow-green-500/50' : 
                  status === 'error' ? 'bg-red-500 shadow-red-500/50' : 
                  status === 'timeout' ? 'bg-yellow-500 shadow-yellow-500/50' : 
                  'bg-gray-400 shadow-gray-400/50'
                ]"
              ></div>
              <h3 class="text-lg font-semibold text-gray-900">测试详情</h3>
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full shadow-sm',
                  getStatusBadgeClass(status)
                ]"
              >
                {{ getStatusText(status) }}
              </span>
            </div>
            
            <!-- 鼠标提示（替代关闭按钮） -->
            <div class="relative flex items-center gap-2 text-xs text-gray-500 z-10">
              <span class="hidden sm:inline">移出自动缩小</span>
              <div class="w-1 h-1 rounded-full bg-gray-400 animate-pulse"></div>
            </div>
          </div>

          <!-- 内容区域（带透视效果） -->
          <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-white/95 to-white/90">
            <!-- 基本信息 -->
            <div class="space-y-2">
              <h4 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Info class="w-4 h-4" />
                基本信息
              </h4>
              <div class="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">提供商:</span>
                  <span class="text-gray-900 font-medium">{{ providerName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">模型ID:</span>
                  <span class="text-gray-900 font-mono text-xs">{{ modelId }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">测试时间:</span>
                  <span class="text-gray-900">{{ testTime }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">耗时:</span>
                  <span class="text-gray-900">{{ duration }}ms</span>
                </div>
              </div>
            </div>

            <!-- 请求信息 -->
            <div class="space-y-2">
              <h4 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Send class="w-4 h-4" />
                请求信息
              </h4>
              <div class="bg-blue-50 rounded-lg border border-blue-200">
                <div class="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-blue-800">URL</span>
                    <button
                      @click="copyToClipboard(requestInfo?.url || '')"
                      class="text-blue-600 hover:text-blue-800 text-xs"
                      title="复制URL"
                    >
                      <Copy class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div class="px-4 py-2">
                  <code class="text-xs text-blue-900 break-all">{{ requestInfo?.url || 'N/A' }}</code>
                </div>
              </div>
              <div class="bg-blue-50 rounded-lg border border-blue-200">
                <div class="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-blue-800">请求头</span>
                    <button
                      @click="copyToClipboard(JSON.stringify(requestInfo?.headers || {}, null, 2))"
                      class="text-blue-600 hover:text-blue-800 text-xs"
                      title="复制请求头"
                    >
                      <Copy class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre class="px-4 py-2 text-xs text-blue-900 overflow-x-auto"><code>{{ formatJSON(requestInfo?.headers || {}) }}</code></pre>
              </div>
              <div class="bg-blue-50 rounded-lg border border-blue-200">
                <div class="px-4 py-2 border-b border-blue-200 bg-blue-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-blue-800">请求体</span>
                    <button
                      @click="copyToClipboard(JSON.stringify(requestInfo?.body || {}, null, 2))"
                      class="text-blue-600 hover:text-blue-800 text-xs"
                      title="复制请求体"
                    >
                      <Copy class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre class="px-4 py-2 text-xs text-blue-900 overflow-x-auto max-h-60 overflow-y-auto"><code>{{ formatJSON(requestInfo?.body || {}) }}</code></pre>
              </div>
            </div>

            <!-- 响应信息 -->
            <div class="space-y-2">
              <h4 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Reply class="w-4 h-4" />
                响应信息
              </h4>
              <div class="bg-green-50 rounded-lg border border-green-200">
                <div class="px-4 py-2 border-b border-green-200 bg-green-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-green-800">状态码</span>
                    <span
                      :class="[
                        'px-2 py-0.5 text-xs font-medium rounded',
                        responseInfo?.status ? (responseInfo.status >= 200 && responseInfo.status < 300 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800') : 'bg-gray-200 text-gray-800'
                      ]"
                    >
                      {{ responseInfo?.status || 'N/A' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="bg-green-50 rounded-lg border border-green-200">
                <div class="px-4 py-2 border-b border-green-200 bg-green-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-green-800">响应头</span>
                    <button
                      v-if="responseInfo?.headers"
                      @click="copyToClipboard(JSON.stringify(responseInfo.headers || {}, null, 2))"
                      class="text-green-600 hover:text-green-800 text-xs"
                      title="复制响应头"
                    >
                      <Copy class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre v-if="responseInfo?.headers" class="px-4 py-2 text-xs text-green-900 overflow-x-auto"><code>{{ formatJSON(responseInfo.headers) }}</code></pre>
                <div v-else class="px-4 py-2 text-xs text-green-700">无响应头信息</div>
              </div>
              <div class="bg-green-50 rounded-lg border border-green-200">
                <div class="px-4 py-2 border-b border-green-200 bg-green-100/50">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-green-800">响应体</span>
                    <button
                      v-if="responseInfo?.body"
                      @click="copyToClipboard(JSON.stringify(responseInfo.body || {}, null, 2))"
                      class="text-green-600 hover:text-green-800 text-xs"
                      title="复制响应体"
                    >
                      <Copy class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre v-if="responseInfo?.body" class="px-4 py-2 text-xs text-green-900 overflow-x-auto max-h-60 overflow-y-auto"><code>{{ formatJSON(responseInfo.body) }}</code></pre>
                <div v-else-if="errorMessage" class="px-4 py-2 text-xs text-red-700 bg-red-50 rounded">
                  <strong>错误信息:</strong> {{ errorMessage }}
                </div>
                <div v-else class="px-4 py-2 text-xs text-green-700">无响应体信息</div>
              </div>
            </div>
          </div>

          <!-- 底部提示栏（替代关闭按钮） -->
          <div class="px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-b-3xl flex items-center justify-center">
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <Info class="w-3.5 h-3.5" />
              <span>鼠标移出弹窗将自动缩小，5秒后自动关闭</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 缩小后的状态图标（带透视效果） -->
    <Transition name="fade">
      <div
        v-if="visible && isMinimized"
        ref="minimizedRef"
        @mouseenter="handleMouseEnter"
        @click="expandDialog"
        class="fixed bottom-4 right-4 z-[10000] pointer-events-auto cursor-pointer group"
      >
        <div
          :class="[
            'w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/30',
            'hover:scale-110 hover:shadow-3xl',
            getStatusIconBgClass(status)
          ]"
          style="box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;"
        >
          <component :is="getStatusIcon(status)" :class="['w-7 h-7 transition-transform duration-300 group-hover:scale-110', getStatusIconColorClass()]" />
        </div>
        <!-- 倒计时提示（带透视效果） -->
        <div
          v-if="countdown > 0"
          class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs flex items-center justify-center font-bold shadow-lg border-2 border-white/50 backdrop-blur-sm"
          style="box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.5);"
        >
          {{ countdown }}
        </div>
        <!-- 悬停提示 -->
        <div class="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          点击展开详情
          <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { Info, Send, Reply, Copy, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-vue-next'
import { useNotificationStore } from '@/stores/notificationStore'

interface RequestInfo {
  url: string
  method: string
  headers: Record<string, string>
  body: any
}

interface ResponseInfo {
  status?: number
  statusText?: string
  headers?: Record<string, string>
  body?: any
}

interface Props {
  visible: boolean
  providerName: string
  modelId: string
  status: 'success' | 'error' | 'timeout' | 'testing'
  requestInfo?: RequestInfo
  responseInfo?: ResponseInfo
  errorMessage?: string
  testTime?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  status: 'testing',
  testTime: () => new Date().toLocaleString('zh-CN'),
  duration: 0
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'close': []
}>()

const notificationStore = useNotificationStore()

// 状态管理
const isMinimized = ref(false)
const countdown = ref(5)
const dialogRef = ref<HTMLElement | null>(null)
const minimizedRef = ref<HTMLElement | null>(null)
let countdownTimer: ReturnType<typeof setInterval> | null = null
let mouseLeaveTimer: ReturnType<typeof setTimeout> | null = null

// 监听 visible 变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 弹窗显示时，重置状态
    isMinimized.value = false
    countdown.value = 5
    clearTimers()
  } else {
    // 弹窗关闭时，清理定时器
    clearTimers()
  }
})

// 清理定时器
const clearTimers = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  if (mouseLeaveTimer) {
    clearTimeout(mouseLeaveTimer)
    mouseLeaveTimer = null
  }
}

// 鼠标移入弹窗
const handleMouseEnter = () => {
  // 取消缩小
  if (isMinimized.value) {
    isMinimized.value = false
    clearTimers()
    countdown.value = 5
  }
  // 清除鼠标离开的延迟定时器
  if (mouseLeaveTimer) {
    clearTimeout(mouseLeaveTimer)
    mouseLeaveTimer = null
  }
}

// 鼠标移出弹窗
const handleMouseLeave = () => {
  // 延迟300ms后缩小，避免鼠标快速移过时误触发
  mouseLeaveTimer = setTimeout(() => {
    if (!isMinimized.value) {
      isMinimized.value = true
      startCountdown()
    }
  }, 300)
}

// 展开弹窗
const expandDialog = () => {
  isMinimized.value = false
  clearTimers()
  countdown.value = 5
}

// 开始倒计时
const startCountdown = () => {
  clearTimers()
  countdown.value = 5
  
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      handleClose()
    }
  }, 1000)
}

const handleClose = () => {
  clearTimers()
  emit('update:visible', false)
  emit('close')
}

// 获取状态图标
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'timeout':
      return Clock
    default:
      return Loader2
  }
}

// 获取状态图标背景颜色
const getStatusIconBgClass = (status: string): string => {
  switch (status) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'timeout':
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}

// 获取状态图标颜色
const getStatusIconColorClass = (): string => {
  return 'text-white'
}

onUnmounted(() => {
  clearTimers()
})

const formatJSON = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    notificationStore.success('已复制到剪贴板', 1500)
  } catch (error) {
    notificationStore.error('复制失败', 2000)
  }
}

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-700'
    case 'error':
      return 'bg-red-100 text-red-700'
    case 'timeout':
      return 'bg-yellow-100 text-yellow-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'success':
      return '成功'
    case 'error':
      return '失败'
    case 'timeout':
      return '超时'
    default:
      return '测试中'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 自定义阴影效果 */
.shadow-3xl {
  box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

/* 滚动条美化 */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

:deep(.overflow-y-auto::-webkit-scrollbar) {
  width: 6px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>
