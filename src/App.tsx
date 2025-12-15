import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import { useNavigationStore } from './stores/navigationStore'
import DesktopLayout from './components/layout/DesktopLayout'
import LoginView from './views/LoginView'
import GenerateModule from './components/modules/GenerateModule'
import OptimizeModule from './components/modules/OptimizeModule'
import PlaygroundModule from './components/modules/PlaygroundModule'
import LibraryModule from './components/modules/LibraryModule'
import SettingsModal from './components/settings/SettingsModal'
import NotificationContainer from './components/NotificationContainer'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const isLoggedIn = !!token && !!user
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function App() {
  const location = useLocation()
  const initialize = useAuthStore((state) => state.initialize)
  // 使用 useRef 来存储稳定的函数引用，避免无限循环
  const navigationStore = useNavigationStore()
  const currentModule = useNavigationStore((state) => state.currentModule)
  
  const isLoginPage = location.pathname === '/login'
  
  // 初始化认证状态 - 只在组件挂载时执行一次
  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 空依赖数组，只在挂载时执行一次
  
  // 监听路由变化，更新当前模块
  // 只依赖 location.pathname 和 isLoginPage，避免依赖 store 函数
  useEffect(() => {
    if (!isLoginPage) {
      const module = navigationStore.getModuleByPath(location.pathname)
      if (module && currentModule !== module.id) {
        navigationStore.setCurrentModule(module.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isLoginPage]) // 移除函数依赖，只依赖路径
  
  return (
    <div id="app" className="min-h-screen bg-[var(--ct-slate-50)] text-[var(--ct-slate-900)]">
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <Navigate to="/generate" replace />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <GenerateModule />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/optimize"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <OptimizeModule />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/optimize/:id?"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <OptimizeModule />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/playground"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <PlaygroundModule />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <DesktopLayout>
                <LibraryModule />
              </DesktopLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      {/* 全局设置弹窗 */}
      <SettingsModal />
      
      {/* 全局通知容器 */}
      <NotificationContainer />
    </div>
  )
}

export default App
