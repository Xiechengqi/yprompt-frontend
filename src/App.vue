<template>
  <div id="app">
    <!-- 根据路由判断是否显示布局：登录页不显示布局 -->
    <template v-if="shouldShowLayout">
      <DesktopLayout />
    </template>
    <template v-else>
      <!-- 登录页等公开页面直接显示路由视图，不包含布局 -->
      <router-view />
    </template>

    <!-- 全局设置弹窗 -->
    <SettingsModal />

    <!-- 全局通知容器 -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigationStore'
import { useAuthStore } from '@/stores/authStore'
import DesktopLayout from '@/components/layout/DesktopLayout.vue'
import SettingsModal from '@/components/settings/SettingsModal.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

const router = useRouter()
const navigationStore = useNavigationStore()
const authStore = useAuthStore()

// 判断是否应该显示布局（登录页不显示布局）
const shouldShowLayout = computed(() => {
  const currentRoute = router.currentRoute.value
  // 公开页面（登录页）不显示布局
  return !currentRoute.meta.public
})

// 监听路由变化，更新当前模块
const updateCurrentModule = (to?: any) => {
  const currentPath = to?.path || router.currentRoute.value.path
  const module = navigationStore.getModuleByPath(currentPath)
  if (module && navigationStore.currentModule !== module.id) {
    // 立即更新模块状态，不等待组件加载完成
    navigationStore.setCurrentModule(module.id)
  }
}

onMounted(async () => {
  // 初始化认证状态
  await authStore.initialize()
  
  // 初始化当前模块
  updateCurrentModule()
  
  // 监听路由变化，在路由解析后立即更新状态
  router.afterEach((to) => {
    updateCurrentModule(to)
  })
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>