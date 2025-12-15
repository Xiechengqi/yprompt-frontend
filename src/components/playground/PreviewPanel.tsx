import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Eye, Code2, RotateCcw, Maximize, Minimize, Download, Copy, Check, Terminal, X, Ban, Sparkles } from 'lucide-react'
import { loadECharts, loadMermaid } from '@/utils/chartLazyLoader'
import { marked } from 'marked'
import { copyToClipboard } from '@/utils/clipboardUtils'
import { useNotificationStore } from '@/stores/notificationStore'
import MindMap from './MindMap'

interface Artifact {
  type: 'html' | 'drawio' | 'mermaid' | 'echarts' | 'svg' | 'markdown' | 'mindmap' | 'json'
  content: string
}

interface PreviewPanelProps {
  artifact: Artifact | null
}

interface ConsoleLog {
  level: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: number
  count: number
}

export default function PreviewPanel({ artifact }: PreviewPanelProps) {
  const notificationStore = useNotificationStore()
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const [localContent, setLocalContent] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([])
  const [reloadKey, setReloadKey] = useState(0)
  const [mermaidLook, setMermaidLook] = useState<'default' | 'handDrawn'>('default')
  const [isLoadingMermaid, setIsLoadingMermaid] = useState(false)
  const [isLoadingECharts, setIsLoadingECharts] = useState(false)

  const mermaidRef = useRef<HTMLDivElement>(null)
  const echartsRef = useRef<HTMLDivElement>(null)
  const drawioRef = useRef<HTMLIFrameElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const consoleScrollRef = useRef<HTMLDivElement>(null)

  let mermaid: any = null
  let echarts: any = null
  let chartInstance: any = null

  // 监听 artifact 变化
  useEffect(() => {
    if (artifact) {
      setLocalContent(artifact.content)
      setConsoleLogs([])
      if (artifact.type === 'mermaid') {
        setMermaidLook('default')
        setTimeout(() => renderMermaid(), 100)
      } else if (artifact.type === 'echarts') {
        setTimeout(() => renderECharts(), 100)
      } else if (artifact.type === 'drawio' && drawioRef.current) {
        sendDrawioXml(artifact.content)
      }
    }
  }, [artifact])

  // 监听 activeTab 变化
  useEffect(() => {
    if (activeTab === 'preview' && artifact) {
      if (artifact.type === 'mermaid') {
        setTimeout(() => renderMermaid(), 100)
      } else if (artifact.type === 'echarts') {
        setTimeout(() => renderECharts(), 100)
      }
    }
  }, [activeTab, artifact])

  // 监听 iframe 消息（控制台日志）
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframe-log') {
        addLog(event.data.level, event.data.message)
      }
      handleDrawioMessage(event)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // 控制台滚动到底部
  useEffect(() => {
    if (consoleScrollRef.current) {
      consoleScrollRef.current.scrollTop = consoleScrollRef.current.scrollHeight
    }
  }, [consoleLogs])

  const addLog = useCallback((level: ConsoleLog['level'], message: string) => {
    setConsoleLogs((prev) => {
      const lastLog = prev[prev.length - 1]
      if (lastLog && lastLog.message === message && lastLog.level === level) {
        return prev.map((log, idx) =>
          idx === prev.length - 1 ? { ...log, count: log.count + 1, timestamp: Date.now() } : log
        )
      }
      return [...prev, { level, message, timestamp: Date.now(), count: 1 }]
    })
  }, [])

  const handleComponentError = useCallback(
    (errorMsg: string) => {
      addLog('error', errorMsg)
    },
    [addLog]
  )

  const renderMermaid = useCallback(async () => {
    if (!mermaidRef.current || !localContent) return

    if (!mermaid) {
      setIsLoadingMermaid(true)
      try {
        mermaid = await loadMermaid()
        if (!mermaid) throw new Error('Mermaid library not available')
      } catch (error: any) {
        setIsLoadingMermaid(false)
        const errMsg = `Failed to load Mermaid: ${error.message}`
        addLog('error', errMsg)
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div class="text-red-600 font-mono text-xs p-4 bg-red-50 border border-red-200 rounded">${errMsg}</div>`
        }
        return
      }
      setIsLoadingMermaid(false)
    }

    try {
      mermaid.initialize({
        startOnLoad: false,
        look: mermaidLook,
        theme: mermaidLook === 'handDrawn' ? 'neutral' : 'base',
        securityLevel: 'loose'
      })

      const id = 'mermaid-graph-' + Date.now()
      const { svg } = await mermaid.render(id, localContent)
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = svg
      }
    } catch (e: any) {
      const errMsg = `Mermaid Render Error: ${e.message}`
      addLog('error', errMsg)
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = `<div class="text-red-600 font-mono text-xs p-4 bg-red-50 border border-red-200 rounded">${errMsg}</div>`
      }
    }
  }, [localContent, mermaidLook, addLog])

  const renderECharts = useCallback(async () => {
    if (!echartsRef.current || !localContent) return

    if (!echarts) {
      setIsLoadingECharts(true)
      try {
        echarts = await loadECharts()
        if (!echarts) throw new Error('ECharts library not available')
      } catch (error: any) {
        setIsLoadingECharts(false)
        const errMsg = `Failed to load ECharts: ${error.message}`
        addLog('error', errMsg)
        if (echartsRef.current) {
          echartsRef.current.innerHTML = `<div class="text-red-600 font-mono text-xs p-4 bg-red-50 border border-red-200 rounded flex items-center justify-center h-full">${errMsg}</div>`
        }
        return
      }
      setIsLoadingECharts(false)
    }

    if (chartInstance) chartInstance.dispose()
    chartInstance = echarts.init(echartsRef.current)

    try {
      let jsonStr = localContent.trim()
      if (jsonStr.startsWith('option =')) jsonStr = jsonStr.replace('option =', '')
      if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1)

      const option = JSON.parse(jsonStr)
      chartInstance.setOption(option)

      const ro = new ResizeObserver(() => chartInstance.resize())
      ro.observe(echartsRef.current)
    } catch (e: any) {
      const errMsg = `ECharts Parse Error: ${e.message}`
      addLog('error', errMsg)
      chartInstance.setOption({
        title: {
          text: 'Error Parsing Chart Data',
          subtext: e.message,
          left: 'center',
          top: 'center',
          textStyle: { color: '#d32f2f' }
        }
      })
    }
  }, [localContent, addLog])

  const sendDrawioXml = useCallback((xml: string) => {
    if (!drawioRef.current) return
    drawioRef.current.contentWindow?.postMessage(
      JSON.stringify({
        action: 'load',
        xml: xml,
        autosave: 1
      }),
      '*'
    )
  }, [])

  const handleDrawioMessage = useCallback((e: MessageEvent) => {
    if (!drawioRef.current || !e.data || typeof e.data !== 'string') return
    try {
      const msg = JSON.parse(e.data)
      if (msg.event === 'autosave' || msg.event === 'save') {
        if (msg.xml) {
          setLocalContent(msg.xml)
        }
      }
    } catch (err) {
      // Ignore parse errors
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!mainContainerRef.current) return
    if (!document.fullscreenElement) {
      mainContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }, [])

  const reloadPreview = useCallback(() => {
    setConsoleLogs([])
    if (artifact?.type === 'html') {
      setReloadKey((prev) => prev + 1)
    } else if (artifact?.type === 'echarts') {
      renderECharts()
    } else if (artifact?.type === 'mermaid') {
      renderMermaid()
    } else if (artifact?.type === 'drawio') {
      sendDrawioXml(localContent)
    }
  }, [artifact, localContent, renderECharts, renderMermaid, sendDrawioXml])

  const downloadArtifact = useCallback(() => {
    if (!artifact) return

    const type = artifact.type
    const content = localContent
    let blob: Blob | null = null
    let filename = ''

    if (type === 'html') {
      blob = new Blob([enrichedHtmlContent], { type: 'text/html' })
      filename = 'playground-export.html'
    } else if (type === 'svg') {
      blob = new Blob([content], { type: 'image/svg+xml' })
      filename = 'image.svg'
    } else if (type === 'drawio') {
      blob = new Blob([content], { type: 'application/xml' })
      filename = 'diagram.xml'
    } else if (type === 'mermaid') {
      const svg = mermaidRef.current?.querySelector('svg')
      if (svg) {
        const clone = svg.cloneNode(true) as SVGElement
        clone.removeAttribute('transform')
        clone.removeAttribute('style')
        const serializer = new XMLSerializer()
        const source = serializer.serializeToString(clone)
        blob = new Blob([source], { type: 'image/svg+xml' })
        filename = 'diagram.svg'
      }
    } else if (type === 'echarts') {
      const dataUrl = chartInstance?.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' })
      if (dataUrl) {
        const link = document.createElement('a')
        link.download = 'chart.png'
        link.href = dataUrl
        link.click()
        return
      }
    } else if (type === 'markdown') {
      blob = new Blob([content], { type: 'text/markdown' })
      filename = 'readme.md'
    } else if (type === 'mindmap') {
      blob = new Blob([content], { type: 'application/json' })
      filename = 'mindmap.json'
    } else if (type === 'json') {
      blob = new Blob([content], { type: 'application/json' })
      filename = 'data.json'
    }

    if (blob) {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    }
  }, [artifact, localContent, chartInstance])

  const copyCode = useCallback(async () => {
    try {
      await copyToClipboard(localContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      notificationStore.error('复制失败')
    }
  }, [localContent, notificationStore])

  const renderMarkdown = useCallback((text: string): string => {
    try {
      return marked.parse(text, { breaks: true, gfm: true }) as string
    } catch {
      return text
    }
  }, [])

  const enrichedHtmlContent = useMemo(() => {
    if (!artifact || artifact.type !== 'html') return ''
    let raw = localContent

    const resetCss = `
      html { height: 100%; width: 100%; }
      body { 
        min-height: 100vh; 
        margin: 0; padding: 0; 
        background-color: white; 
        font-family: system-ui, sans-serif;
        height: auto;
        position: relative;
      }
      canvas { display: block; outline: none; } 
      #app { width: 100%; min-height: 100%; }
    `

    const consoleInterceptor = `
      <script>
        (function() {
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          const originalInfo = console.info;
          function sendLog(level, args) {
            try {
              const message = args.map(arg => {
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg); } catch(e) { return String(arg); }
                }
                return String(arg);
              }).join(' ');
              window.parent.postMessage({ type: 'iframe-log', level, message }, '*');
            } catch(e) {}
          }
          console.log = function(...args) { originalLog.apply(console, args); sendLog('log', args); };
          console.error = function(...args) { originalError.apply(console, args); sendLog('error', args); };
          console.warn = function(...args) { 
            if (args.length > 0 && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args); sendLog('warn', args); 
          };
          console.info = function(...args) { originalInfo.apply(console, args); sendLog('info', args); };
          window.onerror = function(msg, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'iframe-log', level: 'error', message: 'Uncaught Error: ' + msg + ' (Line ' + lineno + ')' }, '*');
            return false; 
          };
          window.addEventListener('unhandledrejection', function(event) {
            window.parent.postMessage({ type: 'iframe-log', level: 'error', message: 'Unhandled Promise Rejection: ' + (event.reason ? event.reason.message || event.reason : 'Unknown') }, '*');
          });
        })();
      <\/script>
    `

    const libraries = `
      <script src="https://cdn.tailwindcss.com"><\/script>
      <script src="https://unpkg.com/lucide@latest"><\/script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"><\/script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"><\/script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"><\/script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    `

    const importMap = `
      <script type="importmap">
        {
          "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/",
            "echarts": "https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.esm.min.js",
            "gsap": "https://esm.sh/gsap@3.12.5",
            "gsap/ScrollTrigger": "https://esm.sh/gsap@3.12.5/ScrollTrigger"
          }
        }
      <\/script>
    `

    const shimScript = `
      <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        window.THREE = { ...THREE, OrbitControls };
        window.OrbitControls = OrbitControls;
      <\/script>
    `

    raw = raw.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, inner) => {
      if (attrs.match(/\bsrc\s*=/i) || attrs.match(/\btype\s*=/i)) {
        return match
      }
      return `<script type="module" ${attrs}>${inner}</script>`
    })

    const headContent = `${consoleInterceptor}${libraries}${importMap}${shimScript}<style>${resetCss}</style>`

    if (raw.includes('<!DOCTYPE html>') || raw.includes('<html')) {
      return raw.replace('<head>', `<head>${headContent}`)
    }

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${headContent}</head><body class="p-0">
      <div id="app">${raw}</div>
      <script>
        window.onload = function() {
          if (window.lucide) window.lucide.createIcons();
        };
      <\/script>
    </body></html>`
  }, [artifact, localContent])

  const consoleErrorCount = useMemo(
    () => consoleLogs.filter((l) => l.level === 'error').length,
    [consoleLogs]
  )

  return (
    <div
      ref={mainContainerRef}
      className="flex flex-col h-full bg-[#f8f9fa] select-none outline-none"
      tabIndex={0}
    >
      {/* Header with Tabs & Actions */}
      <div className="h-14 border-b border-[#e5e7eb] flex items-center justify-between px-4 bg-white sticky top-0 z-10 flex-shrink-0">
        {/* Left: Tabs */}
        <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-white text-gray-800 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-white text-gray-800 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code
          </button>
        </div>

        {/* Center: Context Aware Actions */}
        <div className="flex items-center gap-4">
          {/* Mermaid Theme Toggle */}
          {activeTab === 'preview' && artifact && artifact.type === 'mermaid' && (
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => {
                  setMermaidLook('default')
                  renderMermaid()
                }}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  mermaidLook === 'default'
                    ? 'bg-white shadow text-blue-700'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => {
                  setMermaidLook('handDrawn')
                  renderMermaid()
                }}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  mermaidLook === 'handDrawn'
                    ? 'bg-white shadow text-purple-700'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Hand-Drawn
              </button>
            </div>
          )}
        </div>

        {/* Right: Global Actions */}
        {artifact && (
          <div className="flex items-center gap-2 ml-4">
            {/* Toggle Console */}
            <button
              onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              className={`p-2 rounded-md transition-colors relative border ${
                isConsoleOpen
                  ? 'bg-gray-100 text-gray-900 border-gray-300'
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100'
              }`}
              title="Toggle Debug Console"
            >
              <Terminal className="w-4 h-4" />
              {consoleErrorCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                  {consoleErrorCount > 9 ? '!' : consoleErrorCount}
                </span>
              )}
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1"></div>

            {/* Reload Button */}
            {activeTab === 'preview' && (
              <button
                onClick={reloadPreview}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Reload / Reset Preview"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button
              onClick={downloadArtifact}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="Download Artifact"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={copyCode}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Copy Code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-[#e2e8f0]">
        {/* Empty State */}
        {!artifact && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-[#f8f9fa] z-20 px-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-base font-semibold text-gray-800 mb-3">欢迎使用提示词操练场</p>
            <p className="text-sm text-gray-600 max-w-2xl mb-4">
              左侧对话区会实时返回 AI 输出，这里会渲染各种 Artifact。尝试这些玩法：
            </p>
            <ul className="text-sm text-gray-600 space-y-1 max-w-xl text-left">
              <li>
                • 生成 <span className="font-medium text-gray-800">HTML（支持Tailwind / Three.js / GSAP / ECharts）</span>
              </li>
              <li>
                • 输出 <span className="font-medium text-gray-800">Markdown、SVG、MindMap、Mermaid、Draw.io</span> 等可视化
              </li>
            </ul>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && artifact && (
          <div className="flex-1 min-h-0 overflow-auto relative flex flex-col items-center pt-4 pb-4">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
              style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            ></div>

            {/* Device Container Wrapper */}
            <div className="relative bg-white shadow-xl transition-all duration-300 ease-in-out z-10 border border-gray-300 overflow-hidden flex-shrink-0 w-full h-full max-w-[98%] rounded-lg">
              {/* HTML */}
              {artifact.type === 'html' && (
                <iframe
                  key={`html-preview-${reloadKey}`}
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  srcDoc={enrichedHtmlContent}
                />
              )}

              {/* Draw.io Embed */}
              {artifact.type === 'drawio' && (
                <div className="w-full h-full bg-white">
                  <iframe
                    ref={drawioRef}
                    className="w-full h-full border-none"
                    src="https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=0&proto=json"
                  />
                </div>
              )}

              {/* Mermaid Diagram */}
              {artifact.type === 'mermaid' && (
                <div className="w-full h-full relative overflow-hidden bg-white cursor-grab active:cursor-grabbing">
                  {isLoadingMermaid && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-600">正在加载图表库...</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-500 text-xs px-2.5 py-1.5 rounded-md z-10 border border-slate-200 shadow-sm font-medium flex items-center gap-2">
                    Pan & Zoom
                  </div>
                  <div
                    ref={mermaidRef}
                    className="origin-center p-10"
                    style={{ opacity: isLoadingMermaid ? 0 : 1 }}
                  />
                </div>
              )}

              {/* ECharts */}
              {artifact.type === 'echarts' && (
                <div className="w-full h-full bg-white overflow-hidden relative">
                  {isLoadingECharts && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-600">正在加载图表库...</p>
                      </div>
                    </div>
                  )}
                  <div ref={echartsRef} className="w-full h-full" style={{ opacity: isLoadingECharts ? 0 : 1 }} />
                </div>
              )}

              {/* SVG Container */}
              {artifact.type === 'svg' && (
                <div className="w-full h-full relative bg-white overflow-auto hide-scrollbar">
                  <div
                    className="svg-content-wrapper w-full h-full flex items-center justify-center min-w-[100%] min-h-[100%] relative"
                    style={{ overflow: 'visible' }}
                    dangerouslySetInnerHTML={{ __html: localContent }}
                  />
                </div>
              )}

              {/* Markdown */}
              {artifact.type === 'markdown' && (
                <div
                  className="w-full h-full bg-white p-8 overflow-y-auto markdown-body preview-markdown"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(localContent) }}
                />
              )}

              {/* Generic JSON Viewer */}
              {artifact.type === 'json' && (
                <div className="w-full h-full bg-white overflow-y-auto p-0">
                  <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    JSON Data Viewer
                  </div>
                  <div className="markdown-body p-4">
                    <pre className="!m-0 !border-0 !bg-gray-50">
                      <code className="language-json !bg-transparent !p-0">{localContent}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* MindMap */}
              {artifact.type === 'mindmap' && (
                <MindMap content={localContent} onError={handleComponentError} />
              )}
            </div>
          </div>
        )}

        {/* Code Tab (Editable) */}
        {activeTab === 'code' && (
          <div className="flex-1 h-full bg-[#f9fafb] overflow-hidden flex flex-col relative z-20">
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              className="w-full h-full p-6 font-mono text-sm resize-none outline-none border-none bg-transparent text-slate-800 leading-relaxed"
              spellCheck={false}
              placeholder="Edit code here..."
            />
          </div>
        )}

        {/* Console Panel (Collapsible) */}
        {isConsoleOpen && (
          <div className="h-48 bg-white border-t border-gray-300 flex flex-col z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex-shrink-0 transition-all duration-200">
            {/* Console Toolbar */}
            <div className="h-7 bg-[#f1f3f4] border-b border-[#e0e0e0] flex items-center px-2 justify-between select-none">
              <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                <Terminal className="w-3 h-3 text-gray-500" />
                Console Output
                {consoleLogs.length > 0 && (
                  <span className="text-gray-400 font-normal ml-1">{consoleLogs.length} messages</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConsoleLogs([])}
                  className="p-1 hover:bg-gray-300/50 rounded text-gray-500 hover:text-gray-800 transition-colors"
                  title="Clear Console"
                >
                  <Ban className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="p-1 hover:bg-gray-300/50 rounded text-gray-500 hover:text-gray-800 transition-colors"
                  title="Close"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Logs Area */}
            <div ref={consoleScrollRef} className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed bg-white">
              {consoleLogs.length === 0 ? (
                <div className="text-gray-400 italic p-3 text-center mt-4">No logs to display</div>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 border-b border-[#f0f0f0] flex gap-2 group font-medium select-text ${
                      log.level === 'error'
                        ? 'bg-[#fff0f0] text-[#d32f2f] border-[#ffcdd2]'
                        : log.level === 'warn'
                        ? 'bg-[#fff8e1] text-[#f57c00] border-[#ffecb3]'
                        : 'text-[#202124] hover:bg-[#f8f9fa]'
                    }`}
                  >
                    <div className="flex-shrink-0 text-gray-400 w-[65px] text-[10px] select-none pt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                    </div>
                    <div className="flex-1 break-words whitespace-pre-wrap relative">
                      {log.count > 1 && (
                        <span className="bg-gray-200 text-gray-600 px-1.5 rounded-[10px] text-[9px] font-bold mr-1.5 inline-block align-middle min-w-[18px] text-center">
                          {log.count}
                        </span>
                      )}
                      <span className="align-middle">{log.message}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
