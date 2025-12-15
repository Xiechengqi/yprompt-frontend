import { useState, useEffect } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import PlaygroundApp from '../playground/PlaygroundApp'
import SystemPromptModal from './optimize/components/quick/SystemPromptModal'

const STORAGE_KEY = 'yprompt_playground_system_prompt'

export default function PlaygroundModule() {
  const providerStore = useProviderStore()
  const [systemPrompt, setSystemPrompt] = useState('')
  const [systemPromptDraft, setSystemPromptDraft] = useState('')
  const [showSystemPromptModal, setShowSystemPromptModal] = useState(false)

  // 初始化 providerStore
  useEffect(() => {
    if (!providerStore.isInitialized) {
      providerStore.initialize()
    }
  }, [providerStore])

  // 从 localStorage 加载系统提示词
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setSystemPrompt(saved)
      }
    } catch (error) {
      console.warn('加载系统提示词失败', error)
    }
  }, [])

  // 保存系统提示词到 localStorage
  useEffect(() => {
    if (systemPrompt) {
      localStorage.setItem(STORAGE_KEY, systemPrompt)
    }
  }, [systemPrompt])

  const openSystemPromptModal = () => {
    setSystemPromptDraft(systemPrompt)
    setShowSystemPromptModal(true)
  }

  const handleSystemPromptSave = () => {
    setSystemPrompt(systemPromptDraft)
    setShowSystemPromptModal(false)
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-2 playground-container">
      {showSystemPromptModal && (
        <SystemPromptModal
          isOpen={showSystemPromptModal}
          modelValue={systemPromptDraft}
          onUpdateModelValue={setSystemPromptDraft}
          onClose={() => setShowSystemPromptModal(false)}
          onSave={handleSystemPromptSave}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-shrink-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">提示词操练场</h2>
            <p className="text-sm text-gray-500">实时调试提示词、网页、图表与可视化 Artifact</p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <PlaygroundApp systemPrompt={systemPrompt} onOpenSystemPrompt={openSystemPromptModal} />
      </div>
    </div>
  )
}
