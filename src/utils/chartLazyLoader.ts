/**
 * 图表库懒加载工具
 * 统一管理 ECharts、D3 等重型图表库的按需加载
 */

// 库实例缓存
let echartsInstance: any = null
let d3Instance: any = null
let mermaidInstance: any = null

// 加载状态
const loadingStates = {
  echarts: false,
  d3: false,
  mermaid: false
}

// 加载 Promise 缓存，避免重复加载
const loadingPromises = {
  echarts: null as Promise<any> | null,
  d3: null as Promise<any> | null,
  mermaid: null as Promise<any> | null
}

/**
 * 懒加载 ECharts
 * @returns Promise<ECharts>
 */
export async function loadECharts(): Promise<any> {
  // 如果已加载，直接返回
  if (echartsInstance) {
    return echartsInstance
  }

  // 如果正在加载，返回加载中的 Promise
  if (loadingPromises.echarts) {
    return loadingPromises.echarts
  }

  // 开始加载
  loadingStates.echarts = true
  loadingPromises.echarts = import('echarts').then((module) => {
    echartsInstance = module.default || module
    loadingStates.echarts = false
    loadingPromises.echarts = null
    return echartsInstance
  }).catch((error) => {
    loadingStates.echarts = false
    loadingPromises.echarts = null
    console.error('Failed to load ECharts:', error)
    throw error
  })

  return loadingPromises.echarts
}

/**
 * 懒加载 D3
 * @returns Promise<D3>
 */
export async function loadD3(): Promise<any> {
  // 如果已加载，直接返回
  if (d3Instance) {
    return d3Instance
  }

  // 如果正在加载，返回加载中的 Promise
  if (loadingPromises.d3) {
    return loadingPromises.d3
  }

  // 开始加载
  loadingStates.d3 = true
  loadingPromises.d3 = import('d3').then((module) => {
    d3Instance = module
    loadingStates.d3 = false
    loadingPromises.d3 = null
    return d3Instance
  }).catch((error) => {
    loadingStates.d3 = false
    loadingPromises.d3 = null
    console.error('Failed to load D3:', error)
    throw error
  })

  return loadingPromises.d3
}

/**
 * 懒加载 Mermaid
 * @returns Promise<Mermaid>
 */
export async function loadMermaid(): Promise<any> {
  // 如果已加载，直接返回
  if (mermaidInstance) {
    return mermaidInstance
  }

  // 如果正在加载，返回加载中的 Promise
  if (loadingPromises.mermaid) {
    return loadingPromises.mermaid
  }

  // 开始加载
  loadingStates.mermaid = true
  loadingPromises.mermaid = import('mermaid').then((module) => {
    mermaidInstance = module.default || module
    loadingStates.mermaid = false
    loadingPromises.mermaid = null
    return mermaidInstance
  }).catch((error) => {
    loadingStates.mermaid = false
    loadingPromises.mermaid = null
    console.error('Failed to load Mermaid:', error)
    throw error
  })

  return loadingPromises.mermaid
}

/**
 * 预加载所有图表库（可选，用于提前加载）
 */
export async function preloadAllCharts(): Promise<void> {
  await Promise.all([
    loadECharts().catch(() => {}),
    loadD3().catch(() => {}),
    loadMermaid().catch(() => {})
  ])
}

/**
 * 检查库是否正在加载
 */
export function isLoading(library: 'echarts' | 'd3' | 'mermaid'): boolean {
  return loadingStates[library]
}

/**
 * 检查库是否已加载
 */
export function isLoaded(library: 'echarts' | 'd3' | 'mermaid'): boolean {
  switch (library) {
    case 'echarts':
      return echartsInstance !== null
    case 'd3':
      return d3Instance !== null
    case 'mermaid':
      return mermaidInstance !== null
    default:
      return false
  }
}

/**
 * 清除缓存（用于测试或重新加载）
 */
export function clearCache(): void {
  echartsInstance = null
  d3Instance = null
  mermaidInstance = null
  loadingPromises.echarts = null
  loadingPromises.d3 = null
  loadingPromises.mermaid = null
}
