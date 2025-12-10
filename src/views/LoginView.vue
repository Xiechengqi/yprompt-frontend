<template>
  <div class="login-container">
    <!-- Git Commit 显示在右上角 -->
    <div class="absolute top-2 right-2 z-50">
      <GitCommit />
    </div>
    
    <div class="login-card">
      <!-- Logo和标题 -->
      <div class="login-header">
        <div class="logo-wrapper">
          <div class="logo-icon">YP</div>
        </div>
        <h1 class="login-title">YPrompt</h1>
        <p class="login-subtitle">提示词管理系统</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p class="loading-text">正在加载...</p>
      </div>

      <!-- 登录表单 -->
      <div v-else class="login-content">
        <!-- 本地账号密码登录 -->
        <div v-if="authConfig.local_auth_enabled" class="login-section">
          <form @submit.prevent="handleLocalLogin" class="login-form">
            <!-- 用户名 -->
            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-wrapper">
                <input
                  id="username"
                  v-model="loginForm.username"
                  type="text"
                  class="form-input"
                  :class="{ 'input-error': loginErrors.username }"
                  placeholder="请输入用户名"
                  :disabled="isSubmitting"
                  autocomplete="username"
                  @blur="validateLoginForm"
                  @input="clearFieldError('username')"
                />
                <div v-if="loginForm.username && !loginErrors.username" class="input-icon success">
                  <Check :size="18" />
                </div>
              </div>
              <div v-if="loginErrors.username" class="field-error">{{ loginErrors.username }}</div>
            </div>

            <!-- 密码 -->
            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-wrapper">
                <input
                  id="password"
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  :class="{ 'input-error': loginErrors.password }"
                  placeholder="请输入密码"
                  :disabled="isSubmitting"
                  autocomplete="current-password"
                  @blur="validateLoginForm"
                  @input="clearFieldError('password')"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                  :disabled="isSubmitting"
                  tabindex="-1"
                >
                  <Eye v-if="!showPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
              <div v-if="loginErrors.password" class="field-error">{{ loginErrors.password }}</div>
            </div>

            <!-- 记住我 -->
            <div class="form-options">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="checkbox-input"
                  :disabled="isSubmitting"
                />
                <span>记住我</span>
              </label>
            </div>

            <!-- 错误提示 -->
            <Transition name="fade">
              <div v-if="errorMessage" class="error-message">
                <AlertCircle :size="16" />
                <span>{{ errorMessage }}</span>
              </div>
            </Transition>

            <!-- 登录按钮 -->
            <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="isSubmitting || !isLoginFormValid"
            >
              <Loader2 v-if="isSubmitting" :size="18" class="spinning" />
              <span v-if="isSubmitting">登录中...</span>
              <span v-else>登录</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { Eye, EyeOff, Check, AlertCircle, Loader2 } from 'lucide-vue-next'
import GitCommit from '@/components/GitCommit.vue'

const router = useRouter()
const authStore = useAuthStore()

// 认证配置
const authConfig = ref({
  local_auth_enabled: true
})

// 表单数据（从环境变量读取用户名）
const loginForm = ref({
  username: import.meta.env.VITE_LOGIN_USERNAME || '',
  password: ''
})

// 状态
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

// 表单验证错误
const loginErrors = ref<{
  username?: string
  password?: string
}>({})

// 表单验证
const validateUsername = (username: string): string | null => {
  if (!username) return '请输入用户名'
  if (username.length < 3) return '用户名至少3个字符'
  if (username.length > 20) return '用户名不能超过20个字符'
  if (!/^[a-zA-Z]/.test(username)) return '用户名必须以字母开头'
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return '用户名只能包含字母、数字和下划线'
  return null
}

const validatePassword = (password: string): string | null => {
  if (!password) return '请输入密码'
  return null
}

const validateLoginForm = () => {
  loginErrors.value = {}
  const usernameError = validateUsername(loginForm.value.username)
  const passwordError = validatePassword(loginForm.value.password)
  
  if (usernameError) loginErrors.value.username = usernameError
  if (passwordError) loginErrors.value.password = passwordError
  
  return Object.keys(loginErrors.value).length === 0
}

const clearFieldError = (field: 'username' | 'password') => {
  if (loginErrors.value[field]) {
    delete loginErrors.value[field]
  }
}

// 计算属性：表单是否有效
const isLoginFormValid = computed(() => {
  return loginForm.value.username.length > 0 &&
         loginForm.value.password.length > 0 &&
         Object.keys(loginErrors.value).length === 0
})

// 获取认证配置
const fetchAuthConfig = async () => {
  try {
    const config = await authStore.getAuthConfig()
    if (config) {
      authConfig.value = config
      // 如果环境变量没有设置用户名，使用后端返回的用户名
      if (!loginForm.value.username && config.login_username) {
        loginForm.value.username = config.login_username
      }
    }
  } catch (error) {
    console.error('获取认证配置失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 保存用户名
const saveRememberedUsername = () => {
  if (rememberMe.value) {
    localStorage.setItem('yprompt_remembered_username', loginForm.value.username)
  } else {
    localStorage.removeItem('yprompt_remembered_username')
  }
}

// 本地账号密码登录
const handleLocalLogin = async () => {
  if (!validateLoginForm()) {
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const result = await authStore.loginWithPassword(
      loginForm.value.username.trim(),
      loginForm.value.password
    )

    if (result.success) {
      // 保存记住我设置
      saveRememberedUsername()
      // 登录成功，跳转到原始目标路径或主页
      const redirect = router.currentRoute.value.query.redirect as string
      if (redirect && redirect !== '/login') {
        router.push(redirect)
      } else {
        router.push('/')
      }
    } else {
      // 显示详细的错误信息
      errorMessage.value = result.message || '用户名或密码错误'
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请稍后重试'
    console.error('登录失败:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // 如果已登录，直接跳转
  if (authStore.isLoggedIn) {
    router.push('/')
    return
  }

  // 检查是否有记住的用户名
  const saved = localStorage.getItem('yprompt_remembered_username')
  if (saved) {
    loginForm.value.username = saved
    rememberMe.value = true
  }

  // 获取认证配置
  fetchAuthConfig()
})
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s linear infinite;
  pointer-events: none;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  padding: 40px;
  position: relative;
  z-index: 1;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-wrapper {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.logo-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.login-subtitle {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.loading-state {
  text-align: center;
  padding: 60px 0;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

.loading-text {
  color: #718096;
  font-size: 14px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-section {
  margin-bottom: 20px;
}

.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  padding-right: 44px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-input.input-error {
  border-color: #e53e3e;
}

.form-input.input-error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 4px rgba(229, 62, 62, 0.1);
}

.form-input:disabled {
  background: #f7fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;
}

.password-toggle:hover {
  color: #4a5568;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-icon {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.input-icon.success {
  color: #38a169;
}

.field-error {
  margin-top: 6px;
  font-size: 12px;
  color: #e53e3e;
  display: flex;
  align-items: center;
  gap: 4px;
}

.field-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #718096;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #667eea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-block {
  width: 100%;
}

.spinning {
  animation: spin 1s linear infinite;
}

.error-message {
  padding: 12px 16px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #fc8181;
}


/* 模态框样式 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #1a202c;
}

.modal-close {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f7fafc;
  color: #4a5568;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(-10px);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    padding: 32px 24px;
    border-radius: 12px;
  }

  .login-title {
    font-size: 28px;
  }

  .logo-icon {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }

  .modal-content {
    padding: 24px 20px;
    max-height: 95vh;
  }

  .form-input {
    font-size: 16px; /* 防止iOS自动缩放 */
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px 20px;
  }

  .login-title {
    font-size: 24px;
  }

  .login-subtitle {
    font-size: 13px;
  }
}
</style>
