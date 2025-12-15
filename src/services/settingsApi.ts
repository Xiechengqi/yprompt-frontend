/**
 * Settings API Service
 * Handles communication with backend settings API
 */

import type { ProviderConfig } from '@/stores/providerStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export interface Settings {
  providers: ProviderConfig[]
}

export interface SettingsResponse {
  code: number
  data: Settings
  message?: string
}

/**
 * Get settings from backend
 */
export async function getSettings(): Promise<Settings> {
  const token = localStorage.getItem('yprompt_token')

  console.log('[settingsApi] 请求配置，API URL:', `${API_BASE_URL}/api/settings/`)

  const response = await fetch(`${API_BASE_URL}/api/settings/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  // 如果 API 请求成功，使用 API 数据
  if (response.ok) {
    const result: SettingsResponse = await response.json()
    console.log('[settingsApi] API 完整响应:', JSON.stringify(result, null, 2))

    if (result.code === 200 && result.data && result.data.providers) {
      console.log('[settingsApi] 使用 API 数据，providers 数量:', result.data.providers.length)
      return result.data
    }
  }

  // 如果 API 失败，使用本地配置作为后备方案
  console.warn('[settingsApi] API 请求失败，使用本地配置作为后备方案')

  // 返回硬编码的配置（基于 .setting.json）
  const fallbackSettings: Settings = {
    providers: [
      {
        id: "DeepSeek",
        name: "DeepSeek-Offical",
        type: "openai",
        apiKey: "sk-c092ab16b28f4860910202f8fb9cd480",
        baseUrl: "https://api.deepseek.com/v1",
        models: [
          { id: "deepseek-chat", name: "deepseek-chat", apiType: "openai" },
          { id: "deepseek-reasoner", name: "deepseek-reasoner", apiType: "openai" }
        ]
      },
      {
        id: "MoonShot",
        name: "MoonShot-Offical",
        type: "openai",
        apiKey: "sk-vcaBs3TQXlpczsaJxKR8JftXIWEr8OfFWSiSfc8qNCnI2dCv",
        baseUrl: "https://api.moonshot.cn/v1",
        models: [
          { id: "kimi-k2-0905-preview", name: "kimi-k2-0905-preview", apiType: "openai" },
          { id: "kimi-k2-thinking", name: "kimi-k2-thinking", apiType: "openai" }
        ]
      }
    ]
  }

  console.log('[settingsApi] 使用后备配置，providers 数量:', fallbackSettings.providers.length)
  return fallbackSettings
}


