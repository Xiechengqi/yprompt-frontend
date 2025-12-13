<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none">
      <TransitionGroup
        name="toast"
        tag="div"
      >
        <div
          v-for="notification in notificationStore.notifications"
          :key="notification.id"
          :class="[
            'max-w-sm w-full shadow-xl rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm',
            getNotificationClasses(notification.type)
          ]"
          class="transform transition-all duration-300 ease-out"
        >
          <div class="p-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 mt-0.5">
                <component :is="getIcon(notification.type)" :class="[
                  'h-5 w-5',
                  getIconColor(notification.type)
                ]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium break-words leading-relaxed">
                  {{ notification.message }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <button
                  @click="notificationStore.removeNotification(notification.id)"
                  class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors rounded p-0.5 hover:bg-black/5"
                >
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <!-- 进度条 -->
          <div
            v-if="notification.duration && notification.duration > 0"
            class="h-1 bg-black/10 overflow-hidden"
          >
            <div
              class="h-full bg-current opacity-30 transition-all linear"
              :style="{ 
                animation: `shrink ${notification.duration}ms linear forwards`,
                animationFillMode: 'forwards'
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const notificationStore = useNotificationStore()

const getNotificationClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-white/95 border border-green-200/50 text-green-800 shadow-green-100/50'
    case 'error':
      return 'bg-white/95 border border-red-200/50 text-red-800 shadow-red-100/50'
    case 'warning':
      return 'bg-white/95 border border-yellow-200/50 text-yellow-800 shadow-yellow-100/50'
    case 'info':
      return 'bg-white/95 border border-blue-200/50 text-blue-800 shadow-blue-100/50'
    default:
      return 'bg-white/95 border border-gray-200/50 text-gray-800 shadow-gray-100/50'
  }
}

const getIconColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Info
  }
}
</script>

<style scoped>
/* Toast 进入和离开动画 */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* 进度条动画 */
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>