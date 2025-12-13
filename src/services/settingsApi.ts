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

  const response = await fetch(`${API_BASE_URL}/api/settings/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch settings: ${response.statusText}`)
  }

  const result: SettingsResponse = await response.json()

  if (result.code !== 200) {
    throw new Error(result.message || 'Failed to fetch settings')
  }

  return result.data
}


