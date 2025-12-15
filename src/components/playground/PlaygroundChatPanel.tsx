import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, RefreshCw, ArrowUp, FileText } from 'lucide-react'
import { marked } from 'marked'

interface PlaygroundMessage {
  id: string
  role: 'user' | 'model'
  text: string
  displayText?: string
  isStreaming?: boolean
}

interface PlaygroundChatPanelProps {
  messages: PlaygroundMessage[]
  isStreaming: boolean
  isStreamMode: boolean
  hasSystemPrompt: boolean
  currentModelName: string
  onSend: (payload: { text: string }) => void
  onClear: () => void
  onToggleStream: () => void
  onOpenSystemPrompt: () => void
}

export default function PlaygroundChatPanel({
  messages,
  isStreaming,
  isStreamMode,
  hasSystemPrompt,
  currentModelName: _currentModelName,
  onSend,
  onClear,
  onToggleStream,
  onOpenSystemPrompt
}: PlaygroundChatPanelProps) {
  const [inputVal, setInputVal] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    if (distance < 300) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  const highlightCode = useCallback(() => {
    if (!scrollRef.current || isStreaming) return
    const blocks = scrollRef.current.querySelectorAll('pre code')
    blocks.forEach((block) => {
      const codeEl = block as HTMLElement & { dataset: DOMStringMap }
      if (!(window as any).hljs || codeEl.dataset.highlighted) return
      ;(window as any).hljs.highlightElement(codeEl)
      codeEl.dataset.highlighted = 'yes'
    })
  }, [isStreaming])

  useEffect(() => {
    scrollToBottom()
    highlightCode()
  }, [messages, isStreaming, scrollToBottom, highlightCode])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const autoResize = useCallback(() => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
  }, [])

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (!inputVal.trim() || isStreaming) return
    onSend({ text: inputVal })
    setInputVal('')
    setTimeout(() => {
      textareaRef.current?.focus()
      autoResize()
    }, 0)
  }

  const renderMarkdown = (text: string): string => {
    if (!text) return ''
    try {
      return marked.parse(text, { breaks: true, gfm: true }) as string
    } catch (error) {
      console.warn('Markdown 渲染失败', error)
      return text
    }
  }

  const shouldDisplayAsCode = (text: string): boolean => {
    if (!text) return false
    const trimmed = text.trim()
    if (trimmed.includes('```markdown') || trimmed.includes('```md')) {
      return true
    }
    if (!trimmed.startsWith('```')) return false
    const lastFence = trimmed.lastIndexOf('```')
    if (lastFence <= 0) return false
    return lastFence === trimmed.length - 3
  }

  const hasContent = (msg: PlaygroundMessage): boolean => {
    const content = msg.displayText || msg.text
    return Boolean(content && content.trim().length)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h4 className="font-semibold text-gray-800">AI对话</h4>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">流式:</span>
            <button
              onClick={onToggleStream}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isStreamMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              title={isStreamMode ? '关闭流式输出' : '开启流式输出'}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isStreamMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <button
            className={`p-2 rounded-lg border transition-colors ${
              hasSystemPrompt
                ? 'border-blue-200 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
            onClick={onOpenSystemPrompt}
            title="设置系统提示词"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={onClear}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="重新开始"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6 space-y-5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-700 mb-2">欢迎使用提示词操练场</p>
            <p className="text-sm text-gray-500 max-w-xs">对话生成结果会在右侧实时渲染</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-md max-w-xl whitespace-pre-wrap text-sm shadow-sm">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <span className="font-medium text-gray-900">AI助手</span>
                    </div>
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-md border border-gray-200 shadow-sm">
                      {msg.isStreaming ? (
                        hasContent(msg) ? (
                          shouldDisplayAsCode(msg.displayText || msg.text) ? (
                            <pre className="playground-code-block">{msg.displayText || msg.text}</pre>
                          ) : (
                            <div
                              className="markdown-body prose prose-sm max-w-none text-gray-800"
                              dangerouslySetInnerHTML={{
                                __html: renderMarkdown(msg.displayText || msg.text)
                              }}
                            />
                          )
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.1s' }}
                            ></span>
                            <span
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                            ></span>
                          </div>
                        )
                      ) : shouldDisplayAsCode(msg.text) ? (
                        <pre className="playground-code-block">{msg.text}</pre>
                      ) : (
                        <div
                          className="markdown-body prose prose-sm max-w-none text-gray-800"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <div
            className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden"
            style={{ height: '120px' }}
          >
            <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
              <textarea
                ref={textareaRef}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value)
                  autoResize()
                }}
                rows={1}
                className="w-full h-full px-3 pt-3 pb-1 border-0 outline-none resize-none text-base overflow-y-auto bg-transparent"
                placeholder="Shift+Enter 换行"
                onKeyDown={handleKeydown}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-end px-3 bg-transparent pointer-events-none">
              <button
                onClick={sendMessage}
                disabled={!inputVal.trim() || isStreaming}
                className="w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center pointer-events-auto"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
