import { useState, useEffect, useRef } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { usePreviewTabs } from '@/hooks/usePreviewTabs'
import { usePreviewExecution } from '@/hooks/usePreviewExecution'
import { usePreviewConversion } from '@/hooks/usePreviewConversion'
import { usePreviewScrollSync } from '@/hooks/usePreviewScrollSync'
import { usePreviewClipboard } from '@/hooks/usePreviewClipboard'
import { usePreviewListOperations } from '@/hooks/usePreviewListOperations'
import { usePreviewHelpers } from '@/hooks/usePreviewHelpers'
import PreviewHeader from './preview/components/common/PreviewHeader'
import TabContainer from './preview/components/common/TabContainer'
import TabButton from './preview/components/common/TabButton'
import EmptyState from './preview/components/common/EmptyState'
import LoadingState from './preview/components/common/LoadingState'
import ReportTab from './preview/components/tabs/ReportTab'
import ThinkingTab from './preview/components/tabs/ThinkingTab'
import InitialTab from './preview/components/tabs/InitialTab'
import AdviceTab from './preview/components/tabs/AdviceTab'
import FinalTab from './preview/components/tabs/FinalTab'
import SavePromptDialog from './preview/components/dialogs/SavePromptDialog'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export default function PreviewPanel() {
  // 使用选择器来避免不必要的重渲染
  const notificationStore = useNotificationStore()
  
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [currentPromptContent, setCurrentPromptContent] = useState('')

  const tabs = usePreviewTabs()
  const scrollSync = usePreviewScrollSync()
  const conversion = usePreviewConversion()
  const clipboard = usePreviewClipboard()
  const listOps = usePreviewListOperations()
  const helpers = usePreviewHelpers()

  const execution = usePreviewExecution({
    switchToTabWithScroll: tabs.switchToTabWithScroll,
    scrollToBottomOfContent: scrollSync.scrollToBottomOfContent
  })

  // 监听 promptData 变化，自动切换标签页
  // 使用选择器来避免不必要的重渲染
  const requirementReport = usePromptStore((state) => state.promptData.requirementReport)
  const thinkingPoints = usePromptStore((state) => state.promptData.thinkingPoints)
  const initialPrompt = usePromptStore((state) => state.promptData.initialPrompt)
  const advice = usePromptStore((state) => state.promptData.advice)
  const generatedPrompt = usePromptStore((state) => state.promptData.generatedPrompt)
  const isGenerating = usePromptStore((state) => state.isGenerating)
  const chatMessages = usePromptStore((state) => state.chatMessages)
  
  // 使用 useRef 存储稳定的函数引用
  const tabsRef = useRef(tabs)
  tabsRef.current = tabs

  // 监听聊天消息数量，清空时重置标签页
  useEffect(() => {
    if (chatMessages.length === 0) {
      tabsRef.current.switchToTabWithScroll('report')
      tabsRef.current.setNewContentTabs(new Set())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages.length])

  useEffect(() => {
    if (requirementReport && requirementReport.trim().length > 0) {
      tabsRef.current.setNewContentTabs(prev => {
        const newSet = new Set(prev)
        newSet.add('report')
        return newSet
      })
      tabsRef.current.switchToTabWithScroll('report')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementReport]) // 只依赖数据，不依赖函数

  useEffect(() => {
    if (thinkingPoints && thinkingPoints.length > 0) {
      tabsRef.current.setNewContentTabs(prev => {
        const newSet = new Set(prev)
        newSet.add('thinking')
        return newSet
      })
      tabsRef.current.switchToTabWithScroll('thinking')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thinkingPoints])

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      tabsRef.current.setNewContentTabs(prev => {
        const newSet = new Set(prev)
        newSet.add('initial')
        return newSet
      })
      tabsRef.current.switchToTabWithScroll('initial')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  useEffect(() => {
    if (advice && advice.length > 0) {
      tabsRef.current.setNewContentTabs(prev => {
        const newSet = new Set(prev)
        newSet.add('advice')
        return newSet
      })
      tabsRef.current.switchToTabWithScroll('advice')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advice])

  useEffect(() => {
    let hasContent = false
    if (typeof generatedPrompt === 'string') {
      hasContent = generatedPrompt.trim().length > 0
    } else if (generatedPrompt && typeof generatedPrompt === 'object' && 'markdown' in generatedPrompt && 'xml' in generatedPrompt) {
      hasContent = Boolean(
        (generatedPrompt.markdown.zh && generatedPrompt.markdown.zh.trim().length > 0) ||
        (generatedPrompt.markdown.en && generatedPrompt.markdown.en.trim().length > 0) ||
        (generatedPrompt.xml.zh && generatedPrompt.xml.zh.trim().length > 0) ||
        (generatedPrompt.xml.en && generatedPrompt.xml.en.trim().length > 0)
      )
    } else if (generatedPrompt && typeof generatedPrompt === 'object') {
      hasContent = Boolean(('zh' in generatedPrompt && generatedPrompt.zh && generatedPrompt.zh.trim().length > 0) || ('en' in generatedPrompt && generatedPrompt.en && generatedPrompt.en.trim().length > 0))
    }
    
    if (hasContent) {
      tabsRef.current.setNewContentTabs(prev => {
        const newSet = new Set(prev)
        newSet.add('zh')
        return newSet
      })
      tabsRef.current.switchToTabWithScroll('zh')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedPrompt])

  // 流式输出时自动滚动
  const activeTab = tabs.activeTab
  const scrollSyncRef = useRef(scrollSync)
  scrollSyncRef.current = scrollSync
  
  useEffect(() => {
    if (isGenerating && activeTab === 'report') {
      setTimeout(() => {
        scrollSyncRef.current.scrollContainerToBottom('reportScrollContainer')
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementReport, isGenerating, activeTab])

  useEffect(() => {
    if (isGenerating && activeTab === 'thinking') {
      setTimeout(() => {
        scrollSyncRef.current.scrollContainerToBottom('thinkingScrollContainer')
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thinkingPoints, isGenerating, activeTab])

  useEffect(() => {
    if (isGenerating && activeTab === 'initial') {
      setTimeout(() => {
        scrollSyncRef.current.scrollContainerToBottom('initialScrollContainer')
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, isGenerating, activeTab])

  useEffect(() => {
    if (isGenerating && activeTab === 'advice') {
      setTimeout(() => {
        scrollSyncRef.current.scrollContainerToBottom('adviceScrollContainer')
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advice, isGenerating, activeTab])

  useEffect(() => {
    if (isGenerating && activeTab === 'zh') {
      setTimeout(() => {
        scrollSyncRef.current.scrollContainerToBottom('finalScrollContainer')
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedPrompt, isGenerating, activeTab])

  // 使用选择器获取需要的状态和方法
  const getState = usePromptStore((state) => state.getState)
  const setState = usePromptStore((state) => state.setState)
  const setIsAutoMode = usePromptStore((state) => state.setIsAutoMode)
  
  const savePrompt = () => {
    const currentState = getState()
    let finalPrompt: string
    const gp = currentState.promptData.generatedPrompt
    if (typeof gp === 'string') {
      finalPrompt = gp
    } else if ('markdown' in gp && 'xml' in gp) {
      finalPrompt = gp.markdown.zh || gp.markdown.en || gp.xml.zh || gp.xml.en
    } else {
      finalPrompt = gp.zh || gp.en
    }

    if (!finalPrompt || !finalPrompt.trim()) {
      notificationStore.warning('没有可保存的提示词内容', 2000)
      return
    }

    setCurrentPromptContent(finalPrompt)
    setShowSaveDialog(true)
  }

  const handleSaveConfirm = async (formData: {
    title: string
    description: string
    tags: string[]
    isPublic: boolean
    promptType: string
  }) => {
    try {
      setIsSaving(true)

      const token = localStorage.getItem('yprompt_token')
      if (!token) {
        throw new Error('请先登录')
      }

      const saveData = {
        title: formData.title,
        description: formData.description,
        final_prompt: currentPromptContent,
        language: 'zh',
        format: 'markdown',
        prompt_type: formData.promptType,
        tags: formData.tags,
        is_public: formData.isPublic ? 1 : 0
      }

      const response = await fetch(`${API_BASE_URL}/api/prompts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(saveData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()

      if (result.code === 200) {
        notificationStore.success('提示词保存成功！', 2000)
        setShowSaveDialog(false)
      } else {
        throw new Error(result.message || '保存失败')
      }

    } catch (err: any) {
      console.error('保存提示词失败:', err)
      notificationStore.error(`保存失败: ${err.message}`, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  // 使用选择器获取需要的状态
  const isAutoMode = usePromptStore((state) => state.isAutoMode)
  const currentExecutionStep = usePromptStore((state) => state.currentExecutionStep)
  const isGeneratingForHeader = usePromptStore((state) => state.isGenerating)
  const hasAnyContent = helpers.hasAnyContent

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
      <PreviewHeader
        isAutoMode={isAutoMode}
        currentExecutionStep={currentExecutionStep}
        isGenerating={isGeneratingForHeader}
        onUpdateIsAutoMode={setIsAutoMode}
      />

      {isGeneratingForHeader && !hasAnyContent && <LoadingState />}

      {hasAnyContent && (
        <div className="flex-1 flex flex-col overflow-hidden p-4">
            <TabContainer
              isGenerating={isGeneratingForHeader}
              onMounted={(el) => tabs.setTabRefs({ tabContainer: el })}
            >
              <TabButton
                isActive={tabs.activeTab === 'report'}
                activeClass="bg-orange-500 text-white"
                onClick={() => tabs.handleTabChange('report')}
                onMounted={(el) => tabs.setTabRefs({ reportTab: el })}
              >
                需求描述
              </TabButton>

              {thinkingPoints && (
              <TabButton
                isActive={tabs.activeTab === 'thinking'}
                activeClass="bg-purple-500 text-white"
                onClick={() => tabs.handleTabChange('thinking')}
                onMounted={(el) => tabs.setTabRefs({ thinkingTab: el })}
              >
                关键指令
              </TabButton>
            )}

              {initialPrompt && (
              <TabButton
                isActive={tabs.activeTab === 'initial'}
                activeClass="bg-green-500 text-white"
                onClick={() => tabs.handleTabChange('initial')}
                onMounted={(el) => tabs.setTabRefs({ initialTab: el })}
              >
                初始提示词
              </TabButton>
            )}

              {advice && (
              <TabButton
                isActive={tabs.activeTab === 'advice'}
                activeClass="bg-yellow-500 text-white"
                onClick={() => tabs.handleTabChange('advice')}
                onMounted={(el) => tabs.setTabRefs({ adviceTab: el })}
              >
                优化建议
              </TabButton>
            )}

            {conversion.currentGeneratedPrompt && (
              <TabButton
                isActive={tabs.activeTab === 'zh'}
                activeClass="bg-blue-500 text-white"
                onClick={() => tabs.handleTabChange('zh')}
                onMounted={(el) => tabs.setTabRefs({ zhTab: el })}
              >
                最终提示词
              </TabButton>
            )}
          </TabContainer>

          {tabs.activeTab === 'report' && (
            <ReportTab
              requirementReport={requirementReport}
              setRequirementReport={(value) => {
                const currentState = getState()
                setState({ promptData: { ...currentState.promptData, requirementReport: value } })
              }}
              hasConversationData={helpers.hasConversationData}
              isAutoMode={isAutoMode}
              isExecuting={execution.isExecuting}
              isGenerating={isGeneratingForHeader}
              currentExecutionStep={currentExecutionStep}
              isCopied={clipboard.copyStatus['report']}
              onRegenerate={execution.regenerateRequirementReport}
              onCopy={() => clipboard.copyToClipboard(requirementReport || '', 'report')}
              onExecuteFull={execution.executeFullWorkflow}
              onExecuteThinking={execution.executeThinkingPoints}
              onScrollMounted={(el) => scrollSync.setScrollContainerRefs({ reportScrollContainer: el })}
            />
          )}

          {tabs.activeTab === 'thinking' && thinkingPoints && (
            <ThinkingTab
              thinkingPoints={thinkingPoints}
              setThinkingPoints={(points) => {
                const currentState = getState()
                setState({ promptData: { ...currentState.promptData, thinkingPoints: points } })
              }}
              isAutoMode={isAutoMode}
              isExecuting={execution.isExecuting}
              isGenerating={isGeneratingForHeader}
              currentExecutionStep={currentExecutionStep}
              isCopied={clipboard.copyStatus['thinking']}
              onRegenerate={execution.regenerateThinkingPoints}
              onCopy={() => clipboard.copyToClipboard(thinkingPoints?.join('\n') || '', 'thinking')}
              onAddPoint={listOps.addThinkingPoint}
              onRemovePoint={listOps.removeThinkingPoint}
              onUpdatePoint={(index, value) => {
                const currentState = getState()
                if (currentState.promptData.thinkingPoints) {
                  const newPoints = [...currentState.promptData.thinkingPoints]
                  newPoints[index] = value
                  setState({ promptData: { ...currentState.promptData, thinkingPoints: newPoints } })
                }
              }}
              onExecuteInitial={execution.executeInitialPrompt}
              onScrollMounted={(el) => scrollSync.setScrollContainerRefs({ thinkingScrollContainer: el })}
            />
          )}

          {tabs.activeTab === 'initial' && initialPrompt && (
            <InitialTab
              initialPrompt={initialPrompt}
              setInitialPrompt={(value) => {
                const currentState = getState()
                setState({ promptData: { ...currentState.promptData, initialPrompt: value } })
              }}
              isAutoMode={isAutoMode}
              isExecuting={execution.isExecuting}
              isGenerating={isGeneratingForHeader}
              currentExecutionStep={currentExecutionStep}
              isCopied={clipboard.copyStatus['initial']}
              onRegenerate={execution.regenerateInitialPrompt}
              onCopy={() => clipboard.copyToClipboard(initialPrompt || '', 'initial')}
              onExecuteAdvice={execution.executeAdvice}
              onScrollMounted={(el) => scrollSync.setScrollContainerRefs({ initialScrollContainer: el })}
            />
          )}

          {tabs.activeTab === 'advice' && advice && (
            <AdviceTab
              advice={advice}
              setAdvice={(newAdvice) => {
                const currentState = getState()
                setState({ promptData: { ...currentState.promptData, advice: newAdvice } })
              }}
              isAutoMode={isAutoMode}
              isExecuting={execution.isExecuting}
              isGenerating={isGeneratingForHeader}
              currentExecutionStep={currentExecutionStep}
              isCopied={clipboard.copyStatus['advice']}
              onRegenerate={execution.regenerateAdvice}
              onCopy={() => clipboard.copyToClipboard(advice?.join('\n') || '', 'advice')}
              onAddItem={listOps.addAdviceItem}
              onRemoveItem={listOps.removeAdviceItem}
              onUpdateItem={(index, value) => {
                const currentState = getState()
                if (currentState.promptData.advice) {
                  const newAdvice = [...currentState.promptData.advice]
                  newAdvice[index] = value
                  setState({ promptData: { ...currentState.promptData, advice: newAdvice } })
                }
              }}
              onExecuteFinal={execution.executeFinalPrompt}
              onScrollMounted={(el) => scrollSync.setScrollContainerRefs({ adviceScrollContainer: el })}
            />
          )}

          {tabs.activeTab === 'zh' && conversion.currentGeneratedPrompt && (
            <FinalTab
              generatedPrompt={conversion.currentGeneratedPrompt}
              setGeneratedPrompt={conversion.setCurrentGeneratedPrompt}
              isExecuting={execution.isExecuting}
              isGenerating={isGeneratingForHeader}
              currentExecutionStep={currentExecutionStep}
              isCopied={clipboard.copyStatus['final']}
              isConvertingFormat={conversion.isConvertingFormat}
              isConvertingLanguage={conversion.isConvertingLanguage}
              isSaving={isSaving}
              formatState={conversion.formatState}
              languageState={conversion.languageState}
              onRegenerate={execution.regenerateFinalPrompt}
              onCopy={() => clipboard.copyToClipboard(conversion.currentGeneratedPrompt, 'final')}
              onToggleFormat={conversion.toggleFormat}
              onToggleLanguage={conversion.toggleLanguage}
              onSavePrompt={savePrompt}
              onScrollMounted={(el) => scrollSync.setScrollContainerRefs({ finalScrollContainer: el })}
            />
          )}
        </div>
      )}

      {!hasAnyContent && !isGeneratingForHeader && <EmptyState />}
      
      {/* 保存提示词对话框 */}
      <SavePromptDialog
        isOpen={showSaveDialog}
        promptContent={currentPromptContent}
        isSaving={isSaving}
        onSave={handleSaveConfirm}
        onCancel={() => setShowSaveDialog(false)}
      />
    </div>
  )
}
