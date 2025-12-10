/**
 * Mock API 服务
 * 在 debug 模式下模拟后端 API 响应，完全不依赖后端
 */

// Mock 数据存储（使用 localStorage 持久化）
const MOCK_STORAGE_KEY = 'yprompt_mock_data'

interface MockData {
  user: {
    id: number
    username: string
    name: string
    avatar: string
    email?: string
    auth_type: 'local'
    is_admin: number
    last_login_time?: string
  }
  prompts: any[]
  tags: any[]
  promptRules: any
}

// 初始化 Mock 数据
function initMockData(): MockData {
  const stored = localStorage.getItem(MOCK_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      // 解析失败，使用默认数据
    }
  }
  
  return {
    user: {
      id: 1,
      username: 'admin',
      name: '管理员',
      avatar: '',
      email: 'admin@example.com',
      auth_type: 'local',
      is_admin: 1,
      last_login_time: new Date().toISOString()
    },
    prompts: [],
    tags: [],
    promptRules: null
  }
}

// 保存 Mock 数据
function saveMockData(data: MockData) {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(data))
}

// 获取 Mock 数据
function getMockData(): MockData {
  return initMockData()
}

// 模拟延迟
function delay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 生成简单的 JWT token（仅用于 mock）
function generateMockToken(): string {
  return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Mock API 实现
export const mockApiService = {
  // 登录
  async login(username: string, password: string) {
    await delay(500)
    
    // 验证用户名密码（debug 模式接受任何用户名密码，或使用默认的 admin/admin123）
    if (username === 'admin' && password === 'admin123') {
      const data = getMockData()
      const token = generateMockToken()
      
      // 更新登录时间
      data.user.last_login_time = new Date().toISOString()
      saveMockData(data)
      
      return {
        code: 200,
        message: '登录成功',
        data: {
          token,
          user: data.user
        }
      }
    } else {
      // debug 模式下也允许其他用户名密码登录（方便测试）
      const data = getMockData()
      const token = generateMockToken()
      
      // 更新用户信息
      data.user.username = username
      data.user.name = username
      data.user.last_login_time = new Date().toISOString()
      saveMockData(data)
      
      return {
        code: 200,
        message: '登录成功（Debug 模式）',
        data: {
          token,
          user: data.user
        }
      }
    }
  },

  // 获取认证配置
  async getAuthConfig() {
    await delay(200)
    return {
      code: 200,
      data: {
        local_auth_enabled: true,
        login_username: 'admin'
      }
    }
  },

  // 刷新 Token
  async refreshToken(oldToken: string) {
    await delay(200)
    const newToken = generateMockToken()
    return {
      code: 200,
      message: '刷新成功',
      data: {
        token: newToken
      }
    }
  },

  // 获取用户信息
  async getUserInfo() {
    await delay(200)
    const data = getMockData()
    return {
      code: 200,
      data: data.user
    }
  },

  // 登出
  async logout() {
    await delay(200)
    return {
      code: 200,
      message: '登出成功'
    }
  },

  // 获取提示词列表
  async getPrompts(params?: any) {
    await delay(300)
    const data = getMockData()
    let prompts = [...data.prompts]
    
    // 简单的过滤逻辑
    if (params?.search) {
      const search = params.search.toLowerCase()
      prompts = prompts.filter(p => 
        p.title?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      )
    }
    
    if (params?.is_favorite) {
      prompts = prompts.filter(p => p.is_favorite === 1)
    }
    
    if (params?.tags && params.tags.length > 0) {
      prompts = prompts.filter(p => {
        const promptTags = (p.tags || '').split(',').map((t: string) => t.trim())
        return params.tags.some((tag: string) => promptTags.includes(tag))
      })
    }
    
    // 分页
    const page = params?.page || 1
    const limit = params?.limit || 20
    const start = (page - 1) * limit
    const end = start + limit
    const items = prompts.slice(start, end)
    
    return {
      code: 200,
      data: {
        total: prompts.length,
        page,
        limit,
        items
      }
    }
  },

  // 获取提示词详情
  async getPrompt(id: number) {
    await delay(200)
    const data = getMockData()
    const prompt = data.prompts.find((p: any) => p.id === id)
    
    if (!prompt) {
      return {
        code: 404,
        message: '提示词不存在'
      }
    }
    
    return {
      code: 200,
      data: prompt
    }
  },

  // 保存提示词
  async savePrompt(promptData: any) {
    await delay(500)
    const data = getMockData()
    const newPrompt = {
      id: Date.now(),
      user_id: data.user.id,
      ...promptData,
      is_favorite: 0,
      is_public: 0,
      view_count: 0,
      use_count: 0,
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      current_version: '1.0.0',
      total_versions: 1
    }
    
    data.prompts.unshift(newPrompt)
    saveMockData(data)
    
    return {
      code: 200,
      message: '保存成功',
      data: newPrompt
    }
  },

  // 更新提示词
  async updatePrompt(id: number, promptData: any) {
    await delay(500)
    const data = getMockData()
    const index = data.prompts.findIndex((p: any) => p.id === id)
    
    if (index === -1) {
      return {
        code: 404,
        message: '提示词不存在'
      }
    }
    
    data.prompts[index] = {
      ...data.prompts[index],
      ...promptData,
      update_time: new Date().toISOString()
    }
    saveMockData(data)
    
    return {
      code: 200,
      message: '更新成功',
      data: data.prompts[index]
    }
  },

  // 删除提示词
  async deletePrompt(id: number) {
    await delay(300)
    const data = getMockData()
    const index = data.prompts.findIndex((p: any) => p.id === id)
    
    if (index === -1) {
      return {
        code: 404,
        message: '提示词不存在'
      }
    }
    
    data.prompts.splice(index, 1)
    saveMockData(data)
    
    return {
      code: 200,
      message: '删除成功'
    }
  },

  // 收藏/取消收藏
  async toggleFavorite(id: number, is_favorite: boolean) {
    await delay(300)
    const data = getMockData()
    const prompt = data.prompts.find((p: any) => p.id === id)
    
    if (!prompt) {
      return {
        code: 404,
        message: '提示词不存在'
      }
    }
    
    prompt.is_favorite = is_favorite ? 1 : 0
    saveMockData(data)
    
    return {
      code: 200,
      message: is_favorite ? '收藏成功' : '取消收藏成功'
    }
  },

  // 记录使用次数
  async recordPromptUse(id: number) {
    await delay(200)
    const data = getMockData()
    const prompt = data.prompts.find((p: any) => p.id === id)
    
    if (prompt) {
      prompt.use_count = (prompt.use_count || 0) + 1
      saveMockData(data)
    }
    
    return {
      code: 200,
      message: '记录成功'
    }
  },

  // 获取标签列表
  async getTags() {
    await delay(200)
    const data = getMockData()
    return {
      code: 200,
      data: data.tags || []
    }
  },

  // 获取热门标签
  async getPopularTags(limit: number = 10) {
    await delay(200)
    const data = getMockData()
    // 简单的热门标签逻辑（按使用次数排序）
    const tags = [...(data.tags || [])]
      .sort((a: any, b: any) => (b.use_count || 0) - (a.use_count || 0))
      .slice(0, limit)
    
    return {
      code: 200,
      data: tags
    }
  },

  // 创建标签
  async createTag(tag_name: string) {
    await delay(300)
    const data = getMockData()
    const existingTag = data.tags.find((t: any) => t.tag_name === tag_name)
    
    if (existingTag) {
      return {
        code: 400,
        message: '标签已存在'
      }
    }
    
    const newTag = {
      id: Date.now(),
      tag_name,
      user_id: data.user.id,
      use_count: 0,
      create_time: new Date().toISOString()
    }
    
    data.tags.push(newTag)
    saveMockData(data)
    
    return {
      code: 200,
      message: '创建成功',
      data: newTag
    }
  },

  // 删除标签
  async deleteTag(id: number) {
    await delay(300)
    const data = getMockData()
    const index = data.tags.findIndex((t: any) => t.id === id)
    
    if (index === -1) {
      return {
        code: 404,
        message: '标签不存在'
      }
    }
    
    data.tags.splice(index, 1)
    saveMockData(data)
    
    return {
      code: 200,
      message: '删除成功'
    }
  },

  // 获取用户提示词规则
  async getUserPromptRules() {
    await delay(200)
    const data = getMockData()
    return {
      code: 200,
      data: data.promptRules || null,
      message: data.promptRules ? '获取成功' : '使用默认规则'
    }
  },

  // 保存用户提示词规则
  async saveUserPromptRules(rules: any) {
    await delay(500)
    const data = getMockData()
    data.promptRules = {
      ...data.promptRules,
      ...rules,
      user_id: data.user.id,
      update_time: new Date().toISOString()
    }
    saveMockData(data)
    
    return {
      code: 200,
      message: '保存成功',
      data: data.promptRules
    }
  },

  // 删除用户提示词规则
  async deleteUserPromptRules(fields?: string[]) {
    await delay(300)
    const data = getMockData()
    
    if (!fields || fields.length === 0) {
      // 删除所有
      data.promptRules = null
    } else {
      // 删除指定字段
      if (!data.promptRules) {
        data.promptRules = {}
      }
      fields.forEach(field => {
        delete (data.promptRules as any)[field]
      })
    }
    
    saveMockData(data)
    
    return {
      code: 200,
      message: '删除成功'
    }
  }
}

// 检查是否启用 debug 模式
export function isDebugMode(): boolean {
  return import.meta.env.VITE_DEBUG_MODE === 'true' || 
         import.meta.env.MODE === 'debug' ||
         localStorage.getItem('yprompt_debug_mode') === 'true'
}

// 通用请求方法（在 debug 模式下使用 mock）
export async function mockRequest<T = any>(
  method: string,
  url: string,
  data?: any
): Promise<T> {
  if (!isDebugMode()) {
    throw new Error('Mock API 只能在 debug 模式下使用')
  }
  
  // 解析 URL 和参数
  const [path, queryString] = url.split('?')
  const params: any = {}
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=')
      params[key] = decodeURIComponent(value || '')
    })
  }
  
  // 路由到对应的 mock API
  if (path === '/api/auth/local/login' && method === 'POST') {
    return mockApiService.login(data.username, data.password) as T
  }
  
  if (path === '/api/auth/config' && method === 'GET') {
    return mockApiService.getAuthConfig() as T
  }
  
  if (path === '/api/auth/refresh' && method === 'POST') {
    const token = localStorage.getItem('yprompt_token') || ''
    return mockApiService.refreshToken(token) as T
  }
  
  if (path === '/api/auth/userinfo' && method === 'GET') {
    return mockApiService.getUserInfo() as T
  }
  
  if (path === '/api/auth/logout' && method === 'POST') {
    return mockApiService.logout() as T
  }
  
  if (path.startsWith('/api/prompts') && method === 'GET') {
    if (path.match(/^\/api\/prompts\/(\d+)$/)) {
      const id = parseInt(path.match(/^\/api\/prompts\/(\d+)$/)![1])
      return mockApiService.getPrompt(id) as T
    } else {
      return mockApiService.getPrompts(params) as T
    }
  }
  
  if (path === '/api/prompts' && method === 'POST') {
    return mockApiService.savePrompt(data) as T
  }
  
  if (path.match(/^\/api\/prompts\/(\d+)$/) && method === 'PUT') {
    const id = parseInt(path.match(/^\/api\/prompts\/(\d+)$/)![1])
    return mockApiService.updatePrompt(id, data) as T
  }
  
  if (path.match(/^\/api\/prompts\/(\d+)$/) && method === 'DELETE') {
    const id = parseInt(path.match(/^\/api\/prompts\/(\d+)$/)![1])
    return mockApiService.deletePrompt(id) as T
  }
  
  if (path.match(/^\/api\/prompts\/(\d+)\/favorite$/) && method === 'POST') {
    const id = parseInt(path.match(/^\/api\/prompts\/(\d+)\/favorite$/)![1])
    return mockApiService.toggleFavorite(id, data.is_favorite) as T
  }
  
  if (path.match(/^\/api\/prompts\/(\d+)\/use$/) && method === 'POST') {
    const id = parseInt(path.match(/^\/api\/prompts\/(\d+)\/use$/)![1])
    return mockApiService.recordPromptUse(id) as T
  }
  
  if (path === '/api/tags' && method === 'GET') {
    return mockApiService.getTags() as T
  }
  
  if (path === '/api/tags/popular' && method === 'GET') {
    return mockApiService.getPopularTags(params.limit) as T
  }
  
  if (path === '/api/tags' && method === 'POST') {
    return mockApiService.createTag(data.tag_name) as T
  }
  
  if (path.match(/^\/api\/tags\/(\d+)$/) && method === 'DELETE') {
    const id = parseInt(path.match(/^\/api\/tags\/(\d+)$/)![1])
    return mockApiService.deleteTag(id) as T
  }
  
  if (path === '/api/prompt-rules' && method === 'GET') {
    return mockApiService.getUserPromptRules() as T
  }
  
  if (path === '/api/prompt-rules' && method === 'POST') {
    return mockApiService.saveUserPromptRules(data) as T
  }
  
  if (path === '/api/prompt-rules' && method === 'DELETE') {
    return mockApiService.deleteUserPromptRules() as T
  }
  
  // 默认返回 404
  return {
    code: 404,
    message: `Mock API 未实现: ${method} ${path}`
  } as T
}
