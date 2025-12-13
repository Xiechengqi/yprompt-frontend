import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ModuleType = 'generate' | 'optimize' | 'playground' | 'library'

export interface ModuleConfig {
  id: ModuleType
  name: string
  icon: string
  path: string
  color: string
}

export const useNavigationStore = defineStore('navigation', () => {
  // 状态
  const currentModule = ref<ModuleType>('generate')

  // 模块配置
  const modules: ModuleConfig[] = [
    {
      id: 'generate',
      name: '生成',
      icon: '🏠',
      path: '/generate',
      color: '#3B82F6'
    },
    {
      id: 'optimize',
      name: '优化',
      icon: '⚡',
      path: '/optimize',
      color: '#F59E0B'
    },
    {
      id: 'playground',
      name: '操练场',
      icon: '🎯',
      path: '/playground',
      color: '#10B981'
    },
    {
      id: 'library',
      name: '模板库',
      icon: '📚',
      path: '/library',
      color: '#8B5CF6'
    }
  ]

  // 计算属性
  const currentModuleConfig = computed(() => {
    return modules.find(m => m.id === currentModule.value) || modules[0]
  })

  // 方法
  const setCurrentModule = (module: ModuleType) => {
    currentModule.value = module
  }

  const getModuleByPath = (path: string): ModuleConfig | undefined => {
    return modules.find(m => m.path === path)
  }

  return {
    // 状态
    currentModule,
    modules,
    
    // 计算属性
    currentModuleConfig,
    
    // 方法
    setCurrentModule,
    getModuleByPath
  }
})