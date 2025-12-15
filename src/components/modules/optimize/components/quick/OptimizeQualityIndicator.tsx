import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText
} from 'lucide-react'
import type { QualityCheckResult } from '@/types/optimize'

interface Props {
  quality: QualityCheckResult
}

export default function OptimizeQualityIndicator({ quality }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return CheckCircle2
      case 'warning':
        return AlertTriangle
      case 'error':
        return XCircle
      default:
        return AlertTriangle
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'good':
        return '质量良好'
      case 'warning':
        return '需要注意'
      case 'error':
        return '存在问题'
      default:
        return '未知'
    }
  }

  const StatusIcon = getStatusIcon(quality.lengthStatus)

  return (
    <div className="space-y-3">
      {/* 质量总览 */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">质量检测</h3>
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${getStatusColor(quality.lengthStatus)}`} />
          <span className={`text-sm font-medium ${getStatusColor(quality.lengthStatus)}`}>
            {getStatusText(quality.lengthStatus)}
          </span>
        </div>
      </div>

      {/* 详细指标 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 长度指标 */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">长度</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {quality.length} 字
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            比例: {quality.lengthRatio.toFixed(1)}x
          </div>
        </div>

        {/* 结构检测 */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            {quality.hasStructureMarkers ? (
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            )}
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">结构</span>
          </div>
          <div
            className={`text-sm font-medium ${
              quality.hasStructureMarkers ? 'text-yellow-600' : 'text-green-600'
            }`}
          >
            {quality.hasStructureMarkers ? '检测到标记' : '自然对话'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {quality.hasStructureMarkers ? '包含结构标记' : '无结构化标记'}
          </div>
        </div>
      </div>

      {/* 警告信息 */}
      {quality.warnings && quality.warnings.length > 0 ? (
        <div className="space-y-2">
          {quality.warnings.map((warning, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-800 dark:text-yellow-200">{warning}</p>
            </div>
          ))}
        </div>
      ) : (
        /* 成功提示 */
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 dark:text-green-200">
            优化质量良好，符合相对长度控制策略，保持了自然对话风格
          </p>
        </div>
      )}
    </div>
  )
}