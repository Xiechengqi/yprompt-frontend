import { useState, useEffect } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import {
  Settings,
  AlertCircle,
  RefreshCw,
  Play,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import type { ProviderConfig } from '@/stores/providerStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { AIService } from '@/services/aiService'
import TestDetailDialog from '../TestDetailDialog'
import type { ModelParams } from '@/stores/settingsStore'

interface ProvidersTabProps {
  providers: ProviderConfig[]
  lastRefreshedAt: Date | null
  isLoading: boolean
  onRefreshConfig: () => void
}

export default function ProvidersTab({
  providers,
  lastRefreshedAt,
  isLoading,
  onRefreshConfig
}: ProvidersTabProps) {
  const settingsStore = useSettingsStore()
  const notificationStore = useNotificationStore()
  const providerStore = useProviderStore()
  
  // 调试：显示当前 providers 状态
  useEffect(() => {
    console.log('[ProvidersTab] 当前 providers (props):', providers)
    console.log('[ProvidersTab] providers 数量 (props):', providers.length)
    console.log('[ProvidersTab] providerStore.allProviders:', providerStore.allProviders)
    console.log('[ProvidersTab] providerStore.allProviders 数量:', providerStore.allProviders.length)
    console.log('[ProvidersTab] providerStore.isInitialized:', providerStore.isInitialized)
    console.log('[ProvidersTab] providerStore.error:', providerStore.error)
    
    // 如果 props 中的 providers 为空，但 store 中有数据，记录警告
    if (providers.length === 0 && providerStore.allProviders.length > 0) {
      console.warn('[ProvidersTab] 警告: props.providers 为空，但 store 中有数据')
    }
  }, [providers, providerStore.allProviders, providerStore.isInitialized, providerStore.error])

  const [testingModels, setTestingModels] = useState<Set<string>>(new Set())
  const [testResults, setTestResults] = useState<Map<string, 'success' | 'error' | 'timeout'>>(
    new Map()
  )
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [detailInfo, setDetailInfo] = useState<{
    providerName: string
    modelId: string
    status: 'success' | 'error' | 'timeout' | 'testing'
    requestInfo?: {
      url: string
      method: string
      headers: Record<string, string>
      body: any
    }
    responseInfo?: {
      status?: number
      statusText?: string
      headers?: Record<string, string>
      body?: any
    }
    errorMessage?: string
    testTime?: string
    duration?: number
  }>({
    providerName: '',
    modelId: '',
    status: 'testing'
  })

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date)
  }

  const getProviderTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      openai: 'bg-green-100 text-green-700',
      anthropic: 'bg-orange-100 text-orange-700',
      google: 'bg-blue-100 text-blue-700',
      custom: 'bg-purple-100 text-purple-700'
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  const getProviderTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      openai: 'OpenAI',
      anthropic: 'Anthropic',
      google: 'Google',
      custom: '自定义'
    }
    return labels[type] || type
  }

  const getApiTypeColor = (apiType: string) => {
    const colors: Record<string, string> = {
      openai: 'bg-green-50 text-green-600 border border-green-200',
      anthropic: 'bg-orange-50 text-orange-600 border border-orange-200',
      google: 'bg-blue-50 text-blue-600 border border-blue-200'
    }
    return colors[apiType] || 'bg-gray-50 text-gray-600 border border-gray-200'
  }

  const getApiTypeLabel = (apiType: string) => {
    const labels: Record<string, string> = {
      openai: 'OpenAI API',
      anthropic: 'Claude API',
      google: 'Gemini API'
    }
    return labels[apiType] || apiType
  }

  const getTestButtonClass = (providerId: string, modelId: string): string => {
    const testKey = `${providerId}-${modelId}`
    const isTesting = testingModels.has(testKey)
    const result = testResults.get(testKey)

    if (isTesting) {
      return 'bg-blue-100 text-blue-700 border border-blue-300 cursor-wait'
    }

    switch (result) {
      case 'success':
        return 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
      case 'error':
        return 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
      case 'timeout':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
    }
  }

  const getTestButtonIcon = (providerId: string, modelId: string) => {
    const testKey = `${providerId}-${modelId}`
    const isTesting = testingModels.has(testKey)
    const result = testResults.get(testKey)

    if (isTesting) {
      return RefreshCw
    }

    switch (result) {
      case 'success':
        return CheckCircle
      case 'error':
        return XCircle
      case 'timeout':
        return Clock
      default:
        return Play
    }
  }

  const getTestButtonText = (providerId: string, modelId: string): string => {
    const testKey = `${providerId}-${modelId}`
    const isTesting = testingModels.has(testKey)
    const result = testResults.get(testKey)

    if (isTesting) {
      return '测试中...'
    }

    switch (result) {
      case 'success':
        return '成功'
      case 'error':
        return '失败'
      case 'timeout':
        return '超时'
      default:
        return '测试'
    }
  }

  const getTestButtonTitle = (providerId: string, modelId: string): string => {
    const testKey = `${providerId}-${modelId}`
    const isTesting = testingModels.has(testKey)
    const result = testResults.get(testKey)

    if (isTesting) {
      return '正在测试模型连接...'
    }

    switch (result) {
      case 'success':
        return '模型测试成功'
      case 'error':
        return '模型测试失败'
      case 'timeout':
        return '模型测试超时（10秒）'
      default:
        return '点击测试模型连接'
    }
  }

  const buildRequestInfo = (
    provider: ProviderConfig,
    modelId: string,
    messages: any[],
    params: ModelParams
  ): {
    url: string
    method: string
    headers: Record<string, string>
    body: any
  } => {
    const model = provider.models.find((m) => m.id === modelId)
    const apiType = model?.apiType || provider.type

    let url = provider.baseUrl || ''
    let headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    let body: any = {}

    if (apiType === 'openai') {
      if (url.includes('/chat/completions')) {
        // 已经是完整URL
      } else if (url.includes('/v1')) {
        url = url.replace(/\/+$/, '') + '/chat/completions'
      } else {
        url = url.replace(/\/+$/, '') + '/v1/chat/completions'
      }
      headers['Authorization'] = `Bearer ${provider.apiKey}`
      body = {
        model: modelId,
        messages: messages.map((msg: any) => ({
          role: msg.type === 'ai' ? 'assistant' : 'user',
          content: msg.content
        })),
        temperature: params.temperature ?? 1.0,
        max_tokens: params.maxTokens ?? 8192,
        top_p: params.topP ?? 0.95
      }
      if (params.frequencyPenalty !== undefined) {
        body.frequency_penalty = params.frequencyPenalty
      }
      if (params.presencePenalty !== undefined) {
        body.presence_penalty = params.presencePenalty
      }
    } else if (apiType === 'anthropic') {
      if (!url.includes('/v1/messages')) {
        url = url.replace(/\/+$/, '') + '/v1/messages'
      }
      headers['x-api-key'] = provider.apiKey || ''
      headers['anthropic-version'] = '2023-06-01'
      headers['anthropic-dangerous-direct-browser-access'] = 'true'
      body = {
        model: modelId,
        max_tokens: params.maxTokens ?? 8192,
        temperature: params.temperature ?? 1.0,
        messages: messages.map((msg: any) => ({
          role: msg.type === 'ai' ? 'assistant' : 'user',
          content: msg.content
        }))
      }
      if (params.topP !== undefined) {
        body.top_p = params.topP
      }
      if (params.topK !== undefined && params.topK > 0) {
        body.top_k = params.topK
      }
    } else if (apiType === 'google') {
      if (!url.endsWith('/v1beta')) {
        if (url.includes('/models/')) {
          url = url.split('/models/')[0]
        }
        if (!url.endsWith('/v1beta')) {
          url = url.replace(/\/+$/, '') + '/v1beta'
        }
      }
      url = `${url}/models/${modelId}:generateContent`
      headers['x-goog-api-key'] = provider.apiKey || ''
      body = {
        contents: messages.map((msg: any) => ({
          role: msg.type === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          temperature: params.temperature ?? 1.0,
          maxOutputTokens: params.maxTokens ?? 8192
        }
      }
      if (params.topP !== undefined) {
        body.generationConfig.topP = params.topP
      }
      if (params.topK !== undefined && params.topK > 0) {
        body.generationConfig.topK = params.topK
      }
    }

    return {
      url,
      method: 'POST',
      headers,
      body
    }
  }

  const testModel = async (provider: ProviderConfig, modelId: string) => {
    const testKey = `${provider.id}-${modelId}`

    if (!provider.apiKey) {
      notificationStore.warning('请先配置 API Key', 2000)
      return
    }

    if (testingModels.has(testKey)) {
      return
    }

    setTestingModels((prev) => new Set(prev).add(testKey))
    setTestResults((prev) => {
      const newMap = new Map(prev)
      newMap.delete(testKey)
      return newMap
    })

    const startTime = Date.now()
    const testMessages: Array<{ type: 'user' | 'ai'; content: string; timestamp: string }> = [
      { type: 'user', content: '你好', timestamp: new Date().toISOString() }
    ]

    const globalParams = settingsStore.globalModelParams
    console.log('[ProvidersTab] 使用全局模型参数进行测试:', globalParams)

    const requestInfo = buildRequestInfo(provider, modelId, testMessages, globalParams)

    const sanitizedHeaders: Record<string, string> = { ...requestInfo.headers }
    if (sanitizedHeaders['Authorization']) {
      sanitizedHeaders['Authorization'] = 'Bearer ***'
    }
    if (sanitizedHeaders['x-api-key']) {
      sanitizedHeaders['x-api-key'] = '***'
    }
    if (sanitizedHeaders['x-goog-api-key']) {
      sanitizedHeaders['x-goog-api-key'] = '***'
    }

    setDetailInfo({
      providerName: provider.name,
      modelId: modelId,
      status: 'testing',
      requestInfo: {
        ...requestInfo,
        headers: sanitizedHeaders
      },
      testTime: new Date().toLocaleString('zh-CN')
    })

    setShowDetailDialog(true)

    try {
      const originalFetch = window.fetch
      let responseBody: any = null
      let responseHeaders: Record<string, string> = {}
      let responseStatus: number | undefined = undefined
      let responseStatusText: string | undefined = undefined

      window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const response = await originalFetch(input, init)
        responseStatus = response.status
        responseStatusText = response.statusText

        const clonedResponse = response.clone()

        response.headers.forEach((value, key) => {
          responseHeaders[key] = value
        })

        try {
          const contentType = response.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            responseBody = await clonedResponse.json()
          } else {
            const text = await clonedResponse.text()
            responseBody = { raw: text }
          }
        } catch (e) {
          responseBody = { error: '无法解析响应体' }
        }

        return response
      }

      const aiService = AIService.getInstance()

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          window.fetch = originalFetch
          reject(new Error('TIMEOUT'))
        }, 10000)
      })

      const testPromise = aiService.callAI(testMessages, provider, modelId, false)

      try {
        await Promise.race([testPromise, timeoutPromise])
        window.fetch = originalFetch

        const duration = Date.now() - startTime

        setTestResults((prev) => {
          const newMap = new Map(prev)
          newMap.set(testKey, 'success')
          return newMap
        })
        setDetailInfo((prev) => ({
          ...prev,
          status: 'success',
          duration,
          responseInfo: {
            status: responseStatus,
            statusText: responseStatusText,
            headers: responseHeaders,
            body: responseBody
          }
        }))

        notificationStore.success(`模型 ${modelId} 测试成功`, 2000)
      } catch (error: any) {
        window.fetch = originalFetch

        const duration = Date.now() - startTime

        if (error?.message === 'TIMEOUT') {
          setTestResults((prev) => {
            const newMap = new Map(prev)
            newMap.set(testKey, 'timeout')
            return newMap
          })
          setDetailInfo((prev) => ({
            ...prev,
            status: 'timeout',
            duration,
            errorMessage: '请求超时（10秒）'
          }))
          notificationStore.warning(`模型 ${modelId} 测试超时（10秒）`, 3000)
        } else {
          setTestResults((prev) => {
            const newMap = new Map(prev)
            newMap.set(testKey, 'error')
            return newMap
          })
          setDetailInfo((prev) => ({
            ...prev,
            status: 'error',
            duration,
            errorMessage: error?.message || '请求失败',
            responseInfo: {
              status: responseStatus,
              statusText: responseStatusText,
              headers: responseHeaders,
              body: responseBody || (error?.error ? { error: error.error } : null)
            }
          }))
          const errorMsg = error?.message || '请求失败'
          notificationStore.error(`模型 ${modelId} 测试失败: ${errorMsg}`, 3000)
        }
      }
    } catch (error: any) {
      const duration = Date.now() - startTime
      setTestResults((prev) => {
        const newMap = new Map(prev)
        newMap.set(testKey, 'error')
        return newMap
      })
      setDetailInfo((prev) => ({
        ...prev,
        status: 'error',
        duration,
        errorMessage: error?.message || '测试失败'
      }))
      const errorMsg = error?.message || '测试失败'
      notificationStore.error(`模型 ${modelId} 测试失败: ${errorMsg}`, 3000)
    } finally {
      setTimeout(() => {
        setTestingModels((prev) => {
          const newSet = new Set(prev)
          newSet.delete(testKey)
          return newSet
        })
      }, 2000)
    }
  }

  return (
    <>
      <TestDetailDialog
        visible={showDetailDialog}
        providerName={detailInfo.providerName}
        modelId={detailInfo.modelId}
        status={detailInfo.status}
        requestInfo={detailInfo.requestInfo}
        responseInfo={detailInfo.responseInfo}
        errorMessage={detailInfo.errorMessage}
        testTime={detailInfo.testTime}
        duration={detailInfo.duration}
        onClose={() => setShowDetailDialog(false)}
      />

      {/* 只读提示横幅 */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">配置为只读模式</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>AI模型配置由系统管理员统一管理，前端仅用于查看。</p>
              <p>
                <strong>如需修改：</strong>请编辑后端项目中的
                <code className="bg-yellow-100 px-2 py-0.5 rounded text-xs font-mono">
                  .setting.json
                </code>
                文件，然后点击"刷新配置"按钮。
              </p>
              <p className="text-xs mt-2">
                <strong>配置文件路径：</strong>
                <code className="bg-yellow-100 px-2 py-0.5 rounded font-mono">
                  /app/projects/yprompt/.setting.json
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 顶部操作栏 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">AI服务提供商</h3>
            {lastRefreshedAt && (
              <div className="text-sm text-gray-500">上次刷新: {formatTime(lastRefreshedAt)}</div>
            )}
          </div>
          <button
            onClick={onRefreshConfig}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>刷新配置</span>
          </button>
        </div>

        {/* API配置说明 */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">API配置说明</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <div>
              <strong>OpenAI及兼容服务：</strong>API URL填写完整路径，如{' '}
              <code className="bg-blue-100 px-1 rounded break-all text-xs">
                https://api.openai.com/v1/chat/completions
              </code>
            </div>
            <div>
              <strong>Anthropic Claude：</strong>API URL填写{' '}
              <code className="bg-blue-100 px-1 rounded break-all text-xs">
                https://api.anthropic.com/v1/messages
              </code>
            </div>
            <div>
              <strong>Google Gemini：</strong>API URL填写{' '}
              <code className="bg-blue-100 px-1 rounded break-all text-xs">
                https://generativelanguage.googleapis.com/v1beta
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Provider 列表 */}
      {providers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-lg mb-2">暂无配置</p>
          <p className="text-sm">请在后端 .setting.json 文件中添加 Provider 配置</p>
        </div>
      ) : (
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-5 bg-white shadow-sm">
              {/* Provider 头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      provider.apiKey ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={provider.apiKey ? 'API Key 已配置' : 'API Key 未配置'}
                  />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{provider.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getProviderTypeColor(provider.type)}`}>
                        {getProviderTypeLabel(provider.type)}
                      </span>
                      {!provider.apiKey && (
                        <span className="text-xs text-red-600">未配置 API Key</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider 信息 */}
              <div className="space-y-3 mb-4 pl-6">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">API Key:</span>
                    <div className="flex-1 flex items-center space-x-2">
                      <span className="text-gray-900 font-mono text-xs break-all">
                        {'********' + provider.apiKey.substring(provider.apiKey.length - 4)}
                      </span>
                    </div>
                  </div>
                  {provider.baseUrl && (
                    <div className="flex items-start">
                      <span className="text-gray-500 w-24 flex-shrink-0">Base URL:</span>
                      <span className="text-gray-700 font-mono text-xs break-all">
                        {provider.baseUrl}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Models 列表 */}
              <div className="pl-6 border-l-2 border-gray-200">
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  模型列表 ({provider.models.length})
                </h5>

                {provider.models.length === 0 ? (
                  <div className="text-sm text-gray-500 py-2">该提供商暂无模型配置</div>
                ) : (
                  <div className="space-y-2">
                    {provider.models.map((model) => {
                      const testKey = `${provider.id}-${model.id}`
                      const isTesting = testingModels.has(testKey)
                      // const result = testResults.get(testKey) // 暂时未使用
                      const TestIcon = getTestButtonIcon(provider.id, model.id)

                      return (
                        <div
                          key={model.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-gray-900">{model.name}</div>
                              <div className="text-xs text-gray-500 font-mono truncate">
                                {model.id}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {model.apiType && (
                              <div className="flex-shrink-0">
                                <span className={`text-xs px-2 py-1 rounded ${getApiTypeColor(model.apiType)}`}>
                                  {getApiTypeLabel(model.apiType)}
                                </span>
                              </div>
                            )}

                            <button
                              onClick={() => testModel(provider, model.id)}
                              disabled={!provider.apiKey || isTesting}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${getTestButtonClass(
                                provider.id,
                                model.id
                              )}`}
                              title={getTestButtonTitle(provider.id, model.id)}
                            >
                              <TestIcon
                                className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`}
                              />
                              <span>{getTestButtonText(provider.id, model.id)}</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
