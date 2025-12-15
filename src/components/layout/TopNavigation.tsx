import { Link, useNavigate } from 'react-router-dom'
import { Settings, LogOut } from 'lucide-react'
import { useNavigationStore, type ModuleConfig } from '@/stores/navigationStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useAuthStore } from '@/stores/authStore'
import TopModelSelector from './TopModelSelector'

export default function TopNavigation() {
  const navigate = useNavigate()
  const modules = useNavigationStore((state) => state.modules)
  const currentModule = useNavigationStore((state) => state.currentModule)
  const setCurrentModule = useNavigationStore((state) => state.setCurrentModule)
  const setShowSettings = useSettingsStore((state) => state.setShowSettings)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  
  const handleModuleClick = (module: ModuleConfig) => {
    setCurrentModule(module.id)
    navigate(module.path)
  }
  
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }
  
  return (
    <nav className="nav-container atmospheric-bg sticky top-0 z-50 py-3 px-6 bg-[rgba(248,250,252,0.8)] backdrop-blur-xl border-b border-[var(--ct-slate-200)] transition-all duration-300">
      <div className="flex items-center justify-between w-full">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg shadow-soft interactive">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <span className="font-bold text-white text-sm tracking-tighter">YP</span>
            </div>
          </div>
          <h1 className="text-xl font-bold text-gradient bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            YPrompt
          </h1>
        </div>

        {/* Center Navigation Menu */}
        <div className="flex items-center gap-2 p-1 bg-white/40 rounded-lg border border-slate-200 shadow-soft">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.path}
              className={`nav-link interactive px-4 py-2 text-sm font-medium rounded transition-all duration-200 relative ${
                currentModule === module.id
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[rgba(79,70,229,0.05)]'
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleModuleClick(module)
              }}
            >
              <span>{module.name}</span>
            </Link>
          ))}

          {/* AI Model Selector after Library module */}
          <div className="ml-2 pl-2 border-l border-slate-200">
            <TopModelSelector />
          </div>
        </div>

        {/* Right Tools Area */}
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="control-btn interactive w-10 h-10 rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200 flex items-center justify-center"
            title="设置"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Logout Button */}
          {token && user && (
            <button
              onClick={handleLogout}
              className="control-btn-danger interactive w-10 h-10 rounded-lg text-red-500 bg-white border border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center justify-center"
              title="登出账号"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
