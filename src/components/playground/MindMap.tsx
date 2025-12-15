import { useEffect, useRef, useState } from 'react'
import { loadD3 } from '@/utils/chartLazyLoader'

interface MindMapProps {
  content: string
  onError: (errorMsg: string) => void
}

export default function MindMap({ content, onError }: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const d3Ref = useRef<any>(null)

  const renderTree = async () => {
    if (!content || !svgRef.current || !containerRef.current) return

    // Lazy load D3 if not loaded
    if (!d3Ref.current) {
      setIsLoading(true)
      try {
        d3Ref.current = await loadD3()
      } catch (error: any) {
        setIsLoading(false)
        onError(`Failed to load D3: ${error.message}`)
        const svg = d3Ref.current ? d3Ref.current.select(svgRef.current) : null
        if (svg) {
          svg.selectAll('*').remove()
          svg
            .append('text')
            .attr('x', '50%')
            .attr('y', '50%')
            .attr('text-anchor', 'middle')
            .attr('fill', '#ef4444')
            .text('Failed to load D3 library')
        }
        return
      }
      setIsLoading(false)
    }

    // Parse JSON safely
    let data
    try {
      let cleanContent = content
      const firstBrace = cleanContent.indexOf('{')
      const lastBrace = cleanContent.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanContent = cleanContent.substring(firstBrace, lastBrace + 1)
      }
      data = JSON.parse(cleanContent)

      // 支持包含 mindmap 根数据的包装格式
      if (data && data.mindmap) {
        data = data.mindmap
      }

      if (data && data.nodes && !data.children) {
        data.children = data.nodes
      }

      if (data && !data.name && data.title) {
        data.name = data.title
      }

      if (data && Array.isArray(data.children)) {
        const normalize = (node: any): any => {
          if (!node) return null
          const normalized = {
            name: node.title || node.name || '节点',
            children: []
          }
          const rawChildren = node.children || node.nodes || []
          normalized.children = rawChildren.map(normalize).filter(Boolean)
          return normalized
        }

        data = normalize({ title: data.title || data.name || 'MindMap', children: data.children })
      }

      // VALIDATION: D3 Tree requires a Root Object, not an Array
      if (Array.isArray(data)) {
        throw new Error(
          "MindMap expects a Root Object { name: '...', children: [...] }, but received an Array."
        )
      }
    } catch (e: any) {
      console.warn('Invalid JSON for mindmap:', e)
      onError(`MindMap Data Error: ${e.message}`)

      // Show error visually in SVG
      const svg = d3Ref.current.select(svgRef.current)
      svg.selectAll('*').remove()
      svg
        .append('text')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .attr('fill', '#ef4444')
        .text('Invalid MindMap Data')
      return
    }

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) return

    const d3 = d3Ref.current
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g')

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 5])
      .on('zoom', (event: any) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom as any).on('dblclick.zoom', null)

    const root = d3.hierarchy(data)

    // Dynamic spacing based on tree size
    const dx = 40
    const dy = width / (root.height + 2)

    const treeLayout = d3.tree().nodeSize([dx, dy])

    // Horizontal layout
    treeLayout(root)

    // Calculate bounds to center the tree
    let x0 = Infinity
    let x1 = -x0
    root.each((d: any) => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })

    // Render Links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d: any) => d.y)
          .y((d: any) => d.x) as any
      )

    // Render Nodes
    const node = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)

    // Node Circles
    node
      .append('circle')
      .attr('r', 6)
      .attr('fill', (d: any) => (d.children ? '#ffffff' : '#3b82f6'))
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)

    // Labels
    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d: any) => (d.children ? -10 : 10))
      .style('text-anchor', (d: any) => (d.children ? 'end' : 'start'))
      .text((d: any) => d.data.name)
      .style('font-size', '13px')
      .style('font-family', "'Inter', sans-serif")
      .style('font-weight', '500')
      .style('fill', '#0f172a')
      .each(function (this: SVGTextElement) {
        // White outline for readability
        const clone = this.cloneNode(true) as SVGTextElement
        d3.select(clone)
          .style('stroke', 'white')
          .style('stroke-width', '4px')
          .style('stroke-opacity', '0.9')
          .attr('class', 'stroke-clone')
        this.parentNode?.insertBefore(clone, this)
      })

    // Initial centering
    svg.call(zoom.transform as any, d3.zoomIdentity.translate(100, height / 2).scale(1))
  }

  useEffect(() => {
    renderTree()

    resizeObserverRef.current = new ResizeObserver(() => {
      renderTree()
    })

    if (containerRef.current) {
      resizeObserverRef.current.observe(containerRef.current)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [content])

  return (
    <div ref={containerRef} className="w-full h-full bg-white overflow-hidden relative select-none">
      {isLoading && (
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
      <svg ref={svgRef} className={`w-full h-full cursor-grab active:cursor-grabbing block ${isLoading ? 'opacity-0' : ''}`} />
    </div>
  )
}
