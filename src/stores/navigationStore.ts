import { create } from 'zustand'

export type ModuleType = 'generate' | 'optimize' | 'playground' | 'library'

export interface ModuleConfig {
  id: ModuleType
  name: string
  icon: string
  path: string
  color: string
}

interface NavigationState {
  currentModule: ModuleType
  modules: ModuleConfig[]
  setCurrentModule: (module: ModuleType) => void
  getModuleByPath: (path: string) => ModuleConfig | undefined
  getCurrentModuleConfig: () => ModuleConfig
}

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

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentModule: 'generate',
  modules,
  
  setCurrentModule: (module: ModuleType) => {
    set({ currentModule: module })
  },
  
  getModuleByPath: (path: string) => {
    return modules.find(m => m.path === path)
  },
  
  getCurrentModuleConfig: () => {
    const { currentModule } = get()
    return modules.find(m => m.id === currentModule) || modules[0]
  }
}))
