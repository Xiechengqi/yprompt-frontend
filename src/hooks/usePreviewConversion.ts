import { useState, useMemo, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { useProviderStore } from '@/stores/providerStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { AIService, type ChatMessage } from '@/services/aiService'
import { cleanAIResponseForFormatting, cleanConvertedResponse } from '@/utils/aiResponseUtils'

export function usePreviewConversion() {
  const promptStore = usePromptStore()
  const providerStore = useProviderStore()
  const notificationStore = useNotificationStore()
  const aiService = AIService.getInstance()

  const [isConvertingFormat, setIsConvertingFormat] = useState(false)
  const [isConvertingLanguage, setIsConvertingLanguage] = useState(false)
  const [formatState, setFormatState] = useState<'markdown' | 'xml'>('markdown')
  const [languageState, setLanguageState] = useState<'zh' | 'en'>('zh')

  const currentGeneratedPrompt = useMemo(() => {
    const prompt = promptStore.promptData.generatedPrompt
    
    if (typeof prompt === 'string') {
      return prompt
    }
    
    if ('markdown' in prompt && 'xml' in prompt) {
      const format = formatState
      return languageState === 'zh' 
        ? prompt[format].zh 
        : prompt[format].en
    }
    
    return languageState === 'zh' 
      ? prompt.zh 
      : prompt.en
  }, [promptStore.promptData.generatedPrompt, formatState, languageState])

  const setCurrentGeneratedPrompt = useCallback((value: string) => {
    const state = promptStore.getState()
    const prompt = state.promptData.generatedPrompt
    
    if (typeof prompt === 'string') {
      promptStore.setState({ promptData: { ...state.promptData, generatedPrompt: value } })
      return
    }
    
    if ('markdown' in prompt && 'xml' in prompt) {
      const format = formatState
      const newPrompt = { ...prompt }
      if (languageState === 'zh') {
        newPrompt[format].zh = value
      } else {
        newPrompt[format].en = value
      }
      promptStore.setState({ promptData: { ...state.promptData, generatedPrompt: newPrompt } })
      return
    }
    
    const newPrompt = { ...prompt }
    if (languageState === 'zh') {
      newPrompt.zh = value
    } else {
      newPrompt.en = value
    }
    promptStore.setState({ promptData: { ...state.promptData, generatedPrompt: newPrompt } })
  }, [promptStore, formatState, languageState])

  const toggleFormat = useCallback(async () => {
    if (!currentGeneratedPrompt || isConvertingFormat || isConvertingLanguage) {
      return
    }

    const targetFormatCode = formatState === 'markdown' ? 'xml' : 'markdown'
    const state = promptStore.getState()
    const prompt = state.promptData.generatedPrompt
    
    if (typeof prompt !== 'string' && 'markdown' in prompt && 'xml' in prompt) {
      const targetContent = languageState === 'zh' 
        ? prompt[targetFormatCode].zh 
        : prompt[targetFormatCode].en
      
      if (targetContent) {
        setFormatState(targetFormatCode)
        notificationStore.success(`已切换为${targetFormatCode === 'xml' ? 'XML' : 'Markdown'}格式`)
        return
      }
    }

    const provider = providerStore.currentProvider
    const model = providerStore.currentModel

    if (!provider || !model) {
      notificationStore.error('请先配置AI模型')
      return
    }

    try {
      setIsConvertingFormat(true)
      const targetFormat = formatState === 'markdown' ? 'XML' : 'Markdown'
      const currentFormat = formatState === 'markdown' ? 'Markdown' : 'XML'

      const cleanedContent = cleanAIResponseForFormatting(currentGeneratedPrompt)

      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `你是一个专业的提示词格式转换助手。你的任务是将提示词从${currentFormat}格式转换为${targetFormat}格式，保持内容完全一致，只改变格式样式。`
        },
        {
          role: 'user',
          content: `请将以下提示词从${currentFormat}格式转换为${targetFormat}格式：\n\n${cleanedContent}`
        }
      ]

      const response = await aiService.callAI(
        messages,
        provider,
        model.id,
        false
      )

      if (response && response.trim()) {
        const cleaned = cleanConvertedResponse(response)
        const currentState = promptStore.getState()
        const currentPrompt = currentState.promptData.generatedPrompt
        
        // 升级到二维对象格式
        if (typeof currentPrompt === 'string') {
          const currentLang = languageState
          const newPrompt = {
            markdown: {
              zh: formatState === 'markdown' && currentLang === 'zh' ? currentPrompt : '',
              en: formatState === 'markdown' && currentLang === 'en' ? currentPrompt : ''
            },
            xml: {
              zh: formatState === 'xml' && currentLang === 'zh' ? currentPrompt : '',
              en: formatState === 'xml' && currentLang === 'en' ? currentPrompt : ''
            }
          }
          if (languageState === 'zh') {
            newPrompt[targetFormatCode].zh = cleaned
          } else {
            newPrompt[targetFormatCode].en = cleaned
          }
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        } else if (!('markdown' in currentPrompt)) {
          const newPrompt = {
            markdown: {
              zh: formatState === 'markdown' ? currentPrompt.zh : '',
              en: formatState === 'markdown' ? currentPrompt.en : ''
            },
            xml: {
              zh: formatState === 'xml' ? currentPrompt.zh : '',
              en: formatState === 'xml' ? currentPrompt.en : ''
            }
          }
          if (languageState === 'zh') {
            newPrompt[targetFormatCode].zh = cleaned
          } else {
            newPrompt[targetFormatCode].en = cleaned
          }
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        } else {
          const newPrompt = { ...currentPrompt }
          if (languageState === 'zh') {
            newPrompt[targetFormatCode].zh = cleaned
          } else {
            newPrompt[targetFormatCode].en = cleaned
          }
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        }
        
        setFormatState(targetFormatCode)
        notificationStore.success(`已转换为${targetFormat}格式`)
      } else {
        notificationStore.error('格式转换失败：返回内容为空')
      }
    } catch (error) {
      notificationStore.error('格式转换失败，请重试')
    } finally {
      setIsConvertingFormat(false)
    }
  }, [currentGeneratedPrompt, formatState, languageState, isConvertingFormat, isConvertingLanguage, providerStore, notificationStore, aiService, promptStore, setCurrentGeneratedPrompt])

  const toggleLanguage = useCallback(async () => {
    if (!currentGeneratedPrompt || isConvertingFormat || isConvertingLanguage) {
      return
    }

    const targetLanguage = languageState === 'zh' ? 'en' : 'zh'
    const state = promptStore.getState()
    const prompt = state.promptData.generatedPrompt
    
    if (typeof prompt !== 'string' && 'markdown' in prompt && 'xml' in prompt) {
      const targetContent = prompt[formatState][targetLanguage]
      
      if (targetContent) {
        setLanguageState(targetLanguage)
        notificationStore.success(`已切换为${targetLanguage === 'zh' ? '中文' : 'English'}`)
        return
      }
    } else if (typeof prompt !== 'string') {
      const targetContent = prompt[targetLanguage]
      
      if (targetContent) {
        setLanguageState(targetLanguage)
        notificationStore.success(`已切换为${targetLanguage === 'zh' ? '中文' : 'English'}`)
        return
      }
    }

    const provider = providerStore.currentProvider
    const model = providerStore.currentModel

    if (!provider || !model) {
      notificationStore.error('请先配置AI模型')
      return
    }
    
    const currentState = promptStore.getState()
    const currentPrompt = currentState.promptData.generatedPrompt

    try {
      setIsConvertingLanguage(true)
      const targetLang = languageState === 'zh' ? 'English' : '中文'

      const cleanedContent = cleanAIResponseForFormatting(currentGeneratedPrompt)

      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `你是一个专业的提示词翻译助手。你的任务是将提示词翻译为${targetLang}，保持格式和结构完全一致，只改变语言。`
        },
        {
          role: 'user',
          content: `请将以下提示词翻译为${targetLang}：\n\n${cleanedContent}`
        }
      ]

      const response = await aiService.callAI(
        messages,
        provider,
        model.id,
        false
      )

      if (response && response.trim()) {
        const cleaned = cleanConvertedResponse(response)
        
        // 升级到二维对象格式
        if (typeof currentPrompt === 'string') {
          const newPrompt = {
            markdown: {
              zh: formatState === 'markdown' && languageState === 'zh' ? currentPrompt : '',
              en: formatState === 'markdown' && languageState === 'en' ? currentPrompt : ''
            },
            xml: {
              zh: formatState === 'xml' && languageState === 'zh' ? currentPrompt : '',
              en: formatState === 'xml' && languageState === 'en' ? currentPrompt : ''
            }
          }
          newPrompt[formatState][targetLanguage] = cleaned
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        } else if (!('markdown' in currentPrompt)) {
          const newPrompt = {
            markdown: {
              zh: formatState === 'markdown' ? currentPrompt.zh : '',
              en: formatState === 'markdown' ? currentPrompt.en : ''
            },
            xml: {
              zh: formatState === 'xml' ? currentPrompt.zh : '',
              en: formatState === 'xml' ? currentPrompt.en : ''
            }
          }
          newPrompt[formatState][targetLanguage] = cleaned
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        } else {
          const newPrompt = { ...currentPrompt }
          newPrompt[formatState][targetLanguage] = cleaned
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: newPrompt } })
        }
        
        setLanguageState(targetLanguage)
        notificationStore.success(`已翻译为${targetLang}`)
      } else {
        notificationStore.error('语言转换失败：返回内容为空')
      }
    } catch (error) {
      notificationStore.error('语言转换失败，请重试')
    } finally {
      setIsConvertingLanguage(false)
    }
  }, [currentGeneratedPrompt, formatState, languageState, isConvertingFormat, isConvertingLanguage, providerStore, notificationStore, aiService, promptStore, setCurrentGeneratedPrompt])

  return {
    currentGeneratedPrompt,
    setCurrentGeneratedPrompt,
    isConvertingFormat,
    isConvertingLanguage,
    formatState,
    languageState,
    toggleFormat,
    toggleLanguage
  }
}
