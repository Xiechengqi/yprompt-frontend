/**
 * 认证状态管理
 * 管理用户登录、token、用户信息
 * 支持 debug 模式，在 debug 模式下使用 mock API
 */
import { create } from 'zustand'
import { isDebugMode, mockRequest } from '@/services/mockApiService'

export interface User {
  id: number
  username: string
  name: string
  avatar: string
  email?: string
  auth_type: 'local'
  is_admin: number
  last_login_time?: string
}

interface AuthState {
  token: string | null
  user: User | null
  isLoading: boolean
  
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  restoreUser: () => void
  loginWithPassword: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  getAuthConfig: () => Promise<{ local_auth_enabled: boolean; login_username?: string } | null>
  refreshToken: () => Promise<boolean>
  fetchUserInfo: () => Promise<boolean>
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('yprompt_token'),
  user: null,
  isLoading: false,
  
  setToken: (newToken: string | null) => {
    set({ token: newToken })
    if (newToken) {
      localStorage.setItem('yprompt_token', newToken)
    } else {
      localStorage.removeItem('yprompt_token')
    }
  },
  
  setUser: (newUser: User | null) => {
    set({ user: newUser })
    if (newUser) {
      localStorage.setItem('yprompt_user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('yprompt_user')
    }
  },
  
  restoreUser: () => {
    const savedUser = localStorage.getItem('yprompt_user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        set({ user })
      } catch (error) {
        localStorage.removeItem('yprompt_user')
      }
    }
  },
  
  loginWithPassword: async (username: string, password: string) => {
    set({ isLoading: true })
    try {
      let result: any
      
      if (isDebugMode()) {
        result = await mockRequest('POST', '/api/auth/local/login', { username, password })
      } else {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
        const url = `${apiBaseUrl}/api/auth/local/login`
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
        
        if (!response.ok) {
          try {
            const errorResult = await response.json()
            return {
              success: false,
              message: errorResult.message || `请求失败: ${response.status} ${response.statusText}`
            }
          } catch (parseError) {
            return {
              success: false,
              message: `网络错误: ${response.status} ${response.statusText}`
            }
          }
        }
        
        result = await response.json()
      }
      
      if (result.code === 200 && result.data) {
        get().setToken(result.data.token)
        get().setUser(result.data.user)
        
        // 登录成功后，强制重新加载云端提示词配置
        try {
          const { promptConfigManager } = await import('@/config/prompts')
          await promptConfigManager.forceReloadFromCloud()
        } catch (error) {
          console.error('登录后加载云端配置失败:', error)
        }
        
        return { success: true }
      } else {
        return {
          success: false,
          message: result.message || '登录失败，请检查用户名和密码'
        }
      }
    } catch (error) {
      console.error('登录请求失败:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: '无法连接到服务器，请检查网络连接和 API 地址配置'
        }
      }
      return {
        success: false,
        message: error instanceof Error ? error.message : '登录失败，请稍后重试'
      }
    } finally {
      set({ isLoading: false })
    }
  },
  
  getAuthConfig: async () => {
    try {
      let result: any
      
      if (isDebugMode()) {
        result = await mockRequest('GET', '/api/auth/config')
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/config`)
        result = await response.json()
      }
      
      if (result.code === 200 && result.data) {
        return result.data
      }
      return null
    } catch (error) {
      return null
    }
  },
  
  refreshToken: async () => {
    const { token } = get()
    if (!token) return false
    
    try {
      let result: any
      
      if (isDebugMode()) {
        result = await mockRequest('POST', '/api/auth/refresh')
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        result = await response.json()
      }
      
      if (result.code === 200 && result.data) {
        get().setToken(result.data.token)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
  
  fetchUserInfo: async () => {
    const { token } = get()
    if (!token) return false
    
    try {
      let result: any
      
      if (isDebugMode()) {
        result = await mockRequest('GET', '/api/auth/userinfo')
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/userinfo`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        result = await response.json()
      }
      
      if (result.code === 200 && result.data) {
        get().setUser(result.data)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
  
  logout: async () => {
    const { token } = get()
    if (token) {
      try {
        if (isDebugMode()) {
          await mockRequest('POST', '/api/auth/logout')
        } else {
          await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
        }
      } catch (error) {
        // 忽略登出错误，继续清除本地状态
      }
    }
    
    get().setToken(null)
    get().setUser(null)
    
    sessionStorage.removeItem('yprompt_config_session_loaded')
    
    const keysToRemove = [
      'user_prompt_optimize_data',
      'yprompt_optimize_active_mode',
      'yprompt_optimize_cache',
      'yprompt_user_optimize_active_tab',
      'yprompt_optimize_loaded_user_prompt',
      'yprompt_optimize_result',
      'yprompt_generate_messages',
      'yprompt_generate_prompt_data',
      'yprompt_settings_cache',
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    const allKeys = Object.keys(localStorage)
    allKeys.forEach(key => {
      if (key.startsWith('yprompt_') || key.startsWith('user_prompt_')) {
        if (key !== 'yprompt_token' && key !== 'yprompt_user') {
          localStorage.removeItem(key)
        }
      }
    })
  },
  
  initialize: async () => {
    get().restoreUser()
    
    const { token, user } = get()
    if (token && !user) {
      await get().fetchUserInfo()
    }
  }
}))
