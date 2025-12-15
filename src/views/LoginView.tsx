import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { isDebugMode as checkDebugMode } from '@/services/mockApiService'

export default function LoginView() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // 使用选择器避免不必要的重渲染
  const getAuthConfig = useAuthStore((state) => state.getAuthConfig)
  const loginWithPassword = useAuthStore((state) => state.loginWithPassword)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  
  const isDebugMode = checkDebugMode()
  
  const [authConfig, setAuthConfig] = useState({
    local_auth_enabled: true
  })
  
  const [loginForm, setLoginForm] = useState({
    password: ''
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  
  const [loginErrors, setLoginErrors] = useState<{
    password?: string
  }>({})
  
  const validatePassword = (password: string): string | null => {
    if (!password) return '请输入密码'
    return null
  }
  
  const validateLoginForm = () => {
    const errors: { password?: string } = {}
    const passwordError = validatePassword(loginForm.password)
    
    if (passwordError) errors.password = passwordError
    
    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const clearFieldError = (field: 'password') => {
    if (loginErrors[field]) {
      setLoginErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }
  
  const isLoginFormValid = loginForm.password.length > 0 && Object.keys(loginErrors).length === 0
  
  const fetchAuthConfig = async () => {
    try {
      const config = await getAuthConfig()
      if (config) {
        setAuthConfig(config)
      }
    } catch (error) {
      console.error('获取认证配置失败:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const saveRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('yprompt_remember_me', 'true')
    } else {
      localStorage.removeItem('yprompt_remember_me')
    }
  }
  
  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLoginForm()) {
      return
    }
    
    setErrorMessage('')
    setIsSubmitting(true)
    
    try {
      const result = await loginWithPassword(
        'admin',  // 固定用户名
        loginForm.password
      )
      
      if (result.success) {
        saveRememberMe()
        // 登录成功后立即跳转
        const redirect = searchParams.get('redirect')
        if (redirect && redirect !== '/login') {
          navigate(redirect, { replace: true })
        } else {
          navigate('/generate', { replace: true })
        }
      } else {
        setErrorMessage(result.message || '密码错误')
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '登录失败，请稍后重试')
      console.error('登录失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  useEffect(() => {
    const isLoggedIn = !!token && !!user
    if (isLoggedIn) {
      navigate('/generate', { replace: true })
      return
    }
    
    const savedRememberMe = localStorage.getItem('yprompt_remember_me')
    if (savedRememberMe === 'true') {
      setRememberMe(true)
    }
    
    fetchAuthConfig()
  }, [token, user, navigate])
  
  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5 relative overflow-hidden">
      <div className="login-container-bg absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-[float_20s_linear_infinite] pointer-events-none" />
      
      <div className="login-card bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-[420px] p-10 relative z-10 animate-[slideUp_0.4s_ease-out]">
        {/* Logo和标题 */}
        <div className="login-header text-center mb-8">
          <div className="logo-wrapper mb-4 flex justify-center">
            <div className="logo-icon w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-[0_4px_12px_rgba(102,126,234,0.3)]">
              YP
            </div>
          </div>
          <h1 className="login-title text-[32px] font-bold text-[#1a202c] m-0 mb-2 tracking-tight">
            YPrompt
          </h1>
          <p className="login-subtitle text-sm text-[#718096] m-0">
            提示词管理系统
          </p>
          {/* Debug 模式提示 */}
          {isDebugMode && (
            <div className="debug-badge inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-[rgba(255,193,7,0.1)] border border-[rgba(255,193,7,0.3)] rounded-lg text-xs text-[#856404] font-medium">
              <span className="debug-icon text-sm">🐛</span>
              <span>Debug 模式（Mock API）</span>
            </div>
          )}
        </div>

        {/* 加载状态 */}
        {isLoading ? (
          <div className="loading-state text-center py-[60px]">
            <div className="loading-spinner w-12 h-12 border-4 border-[#e2e8f0] border-t-[#667eea] rounded-full animate-spin mx-auto mb-4" />
            <p className="loading-text text-[#718096] text-sm">正在加载...</p>
          </div>
        ) : (
          /* 登录表单 */
          <div className="login-content">
            {authConfig.local_auth_enabled && (
              <div className="login-section mb-5">
                <form onSubmit={handleLocalLogin} className="login-form mt-5">
                  {/* 密码 */}
                  <div className="form-group mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#4a5568]">
                      密码
                    </label>
                    <div className="input-wrapper relative flex items-center">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => {
                          setLoginForm({ password: e.target.value })
                          clearFieldError('password')
                        }}
                        onBlur={validateLoginForm}
                        className={`form-input w-full px-4 py-3 pr-11 border-2 rounded-lg text-sm transition-all bg-white ${
                          loginErrors.password
                            ? 'border-[#e53e3e] focus:border-[#e53e3e] focus:shadow-[0_0_0_4px_rgba(229,62,62,0.1)]'
                            : 'border-[#e2e8f0] focus:border-[#667eea] focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)]'
                        } ${isSubmitting ? 'bg-[#f7fafc] cursor-not-allowed opacity-70' : ''}`}
                        placeholder="请输入密码"
                        disabled={isSubmitting}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="password-toggle absolute right-3 bg-none border-0 text-[#718096] cursor-pointer p-1 flex items-center justify-center transition-colors hover:text-[#4a5568] disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <div className="field-error mt-1.5 text-xs text-[#e53e3e] flex items-center gap-1">
                        {loginErrors.password}
                      </div>
                    )}
                  </div>

                  {/* 记住我 */}
                  <div className="form-options flex justify-between items-center mb-5">
                    <label className="checkbox-label flex items-center gap-2 text-sm text-[#4a5568] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="checkbox-input w-4 h-4 cursor-pointer accent-[#667eea]"
                        disabled={isSubmitting}
                      />
                      <span>记住我</span>
                    </label>
                  </div>

                  {/* 错误提示 */}
                  {errorMessage && (
                    <div className="error-message px-4 py-3 bg-[#fed7d7] text-[#c53030] rounded-lg text-sm mb-4 flex items-center gap-2 border border-[#fc8181] animate-[fade_0.3s_ease]">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 登录按钮 */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-full px-6 py-3 rounded-lg text-[15px] font-medium cursor-pointer transition-all inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_12px_rgba(102,126,234,0.3)] hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(102,126,234,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isSubmitting || !isLoginFormValid}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinning animate-spin" />
                        <span>登录中...</span>
                      </>
                    ) : (
                      <span>登录</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
