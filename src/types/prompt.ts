/**
 * 提示词相关类型定义
 */
export interface Prompt {
  id: number
  user_id: number
  title: string
  description?: string
  requirement_report?: string
  thinking_points?: string
  initial_prompt?: string
  advice?: string
  final_prompt: string
  language: string
  format: string
  prompt_type: string
  is_favorite: number
  is_public: number
  view_count: number
  use_count: number
  tags?: string[] | string  // 支持数组和字符串两种格式
  current_version?: string
  total_versions?: number
  last_version_time?: string
  create_time: string
  update_time: string
  system_prompt?: string  // 系统提示词（用户提示词专用）
  conversation_history?: string  // 对话上下文（用户提示词专用）
}

export interface PromptListItem {
  id: number
  user_id: number
  title: string
  description?: string
  final_prompt: string
  language: string
  format: string
  prompt_type: string
  is_favorite: number
  is_public: number
  view_count: number
  use_count: number
  tags?: string[] | string
  current_version?: string
  total_versions?: number
  last_version_time?: string
  create_time: string
  update_time: string
  requirement_report?: string
  thinking_points?: string
  initial_prompt?: string
  advice?: string
  system_prompt?: string
  conversation_history?: string
}

export type PromptFormData = Omit<Prompt, 'id' | 'user_id' | 'view_count' | 'use_count' | 'create_time' | 'update_time'>