import { ReactNode } from 'react'
import TopNavigation from './TopNavigation'
import GitCommit from '../GitCommit'

interface DesktopLayoutProps {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout atmospheric-bg relative min-h-screen w-screen bg-[var(--ct-slate-50)] overflow-hidden flex flex-col">
      {/* Atmospheric Background Elements - 使用 will-change 和 GPU 加速优化性能 */}
      <div className="background-orb orb-1 absolute rounded-full blur-3xl z-0 pointer-events-none opacity-60 w-[500px] h-[500px] -top-[200px] -left-[200px] bg-gradient-radial from-[rgba(79,70,229,0.15)] to-transparent animate-[float_20s_infinite_ease-in-out] will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="background-orb orb-2 absolute rounded-full blur-3xl z-0 pointer-events-none opacity-60 w-[400px] h-[400px] -bottom-[150px] -right-[150px] bg-gradient-radial from-[rgba(124,58,237,0.12)] to-transparent animate-[float_25s_infinite_ease-in-out_reverse] will-change-transform" style={{ transform: 'translateZ(0)' }} />
      <div className="background-orb orb-3 absolute rounded-full blur-3xl z-0 pointer-events-none opacity-60 w-[350px] h-[350px] top-[40%] left-[60%] bg-gradient-radial from-[rgba(139,92,246,0.08)] to-transparent animate-[float_30s_infinite_ease-in-out] will-change-transform" style={{ transform: 'translateZ(0)' }} />

      {/* Main Structure */}
      <div className="main-structure relative z-10 flex flex-col min-h-screen w-full">
        {/* Top Navigation Bar */}
        <TopNavigation />

        {/* Main Content Area */}
        <div className="content-area flex-1 flex flex-col min-w-0 min-h-0">
          {children}
        </div>

        {/* Footer Git Commit Section */}
        <div className="footer-container mt-auto">
          <GitCommit />
        </div>
      </div>
    </div>
  )
}
