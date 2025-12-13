<template>
  <nav class="nav-container atmospheric-bg">
    <div class="flex items-center justify-between w-full">
      <!-- Logo Area -->
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 flex items-center justify-center rounded-lg shadow-soft interactive">
          <div class="w-full h-full rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <span class="font-bold text-white text-sm tracking-tighter">YP</span>
          </div>
        </div>
        <h1 class="text-xl font-bold text-gradient">YPrompt</h1>
      </div>

      <!-- Center Navigation Menu -->
      <div class="flex items-center gap-2 p-1 bg-white/40 rounded-lg border border-slate-200 shadow-soft">
        <router-link
          v-for="module in navigationStore.modules"
          :key="module.id"
          :to="module.path"
          class="nav-link interactive"
          :class="{ 'nav-link-active': navigationStore.currentModule === module.id }"
          @click.prevent="handleModuleClick(module)"
        >
          <span>{{ module.name }}</span>
        </router-link>

        <!-- AI Model Selector after Library module -->
        <div class="ml-2 pl-2 border-l border-slate-200">
          <TopModelSelector />
        </div>
      </div>

      <!-- Right Tools Area -->
      <div class="flex items-center gap-2">
        <!-- Settings Button -->
        <button
          @click="settingsStore.showSettings = true"
          class="control-btn interactive"
          title="设置"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <!-- Logout Button -->
        <button
          v-if="authStore.isLoggedIn"
          @click="handleLogout"
          class="control-btn-danger interactive"
          title="登出账号"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigationStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useAuthStore } from '@/stores/authStore'
import TopModelSelector from './TopModelSelector.vue'
import type { ModuleConfig } from '@/stores/navigationStore'

const router = useRouter()
const navigationStore = useNavigationStore()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

// 处理模块点击
const handleModuleClick = (module: ModuleConfig) => {
  navigationStore.setCurrentModule(module.id)
  if (router.currentRoute.value.path !== module.path) {
    router.push(module.path)
  }
}


// 处理登出
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('登出失败:', error)
  }
}
</script>

<style scoped>
/* Navigation Container */
.nav-container {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: var(--ct-space-3) var(--ct-space-6);
  background-color: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--ct-slate-200);
  transition: all 0.3s ease;
}

/* Logo and Branding */
.text-gradient {
  background: var(--ct-gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navigation Links */
.nav-link {
  padding: var(--ct-space-2) var(--ct-space-4);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ct-slate-600);
  border-radius: var(--ct-radius);
  transition: all 0.2s ease-in-out;
  position: relative;
}

.nav-link:hover {
  color: var(--ct-slate-900);
  background-color: rgba(79, 70, 229, 0.05);
}

.nav-link.nav-link-active {
  color: white;
  background: var(--ct-gradient-primary);
  box-shadow: var(--ct-shadow-button);
}

/* Control Buttons */
.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--ct-radius-lg);
  color: var(--ct-slate-500);
  background-color: white;
  border: 1px solid var(--ct-slate-200);
  transition: all 0.2s ease-in-out;
}

.control-btn:hover {
  color: var(--ct-slate-700);
  background-color: var(--ct-slate-50);
  border-color: var(--ct-slate-300);
  transform: translateY(-1px);
  box-shadow: var(--ct-shadow-soft);
}

.control-btn-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--ct-radius-lg);
  color: #ef4444;
  background-color: white;
  border: 1px solid #fecaca;
  transition: all 0.2s ease-in-out;
}

.control-btn-danger:hover {
  color: white;
  background-color: #ef4444;
  border-color: #ef4444;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.3);
}

</style>