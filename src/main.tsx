import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './style.css'

// 预加载认证状态
import { useAuthStore } from './stores/authStore'
import { useProviderStore } from './stores/providerStore'

useAuthStore.getState().initialize()
useProviderStore.getState().initialize()

// 在开发模式下禁用 StrictMode 以避免双渲染导致的性能问题
// 生产环境不会受到影响
const rootElement = document.getElementById('root')!
const isDevelopment = import.meta.env.DEV

if (isDevelopment) {
  // 开发模式：不使用 StrictMode 以避免性能问题
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
} else {
  // 生产模式：使用 StrictMode 进行额外检查
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
