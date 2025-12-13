import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginView.vue'),
      meta: { public: true }
    },
    {
      path: '/',
      redirect: '/generate'
    },
    {
      path: '/generate',
      name: 'generate',
      component: () => import('./components/modules/GenerateModule.vue')
    },
    {
      path: '/optimize',
      name: 'optimize',
      component: () => import('./components/modules/OptimizeModule.vue')
    },
    {
      path: '/optimize/:id?',
      name: 'optimize-prompt',
      component: () => import('./components/modules/OptimizeModule.vue')
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('./components/modules/PlaygroundModule.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('./components/modules/LibraryModule.vue')
    }
  ]
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// 提前导入并初始化 authStore，避免路由切换时的动态导入延迟
// 在 pinia 初始化后立即导入，确保路由守卫可以同步访问
let authStoreInstance: ReturnType<typeof import('./stores/authStore').useAuthStore> | null = null

// 预加载 authStore（异步但不阻塞）
import('./stores/authStore').then(({ useAuthStore }) => {
  authStoreInstance = useAuthStore()
})

// 路由守卫：未登录跳转到登录页
router.beforeEach((to, _from, next) => {
  // 公开页面（登录页、回调页）直接放行
  if (to.meta.public) {
    next()
    return
  }
  
  // 如果 authStore 已加载，直接使用；否则延迟导入（仅首次）
  if (authStoreInstance) {
    // 检查是否已登录
    if (!authStoreInstance.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
    next()
  } else {
    // 首次加载时异步导入（这种情况很少发生）
    import('./stores/authStore').then(({ useAuthStore }) => {
      authStoreInstance = useAuthStore()
      if (!authStoreInstance.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  }
})

app.mount('#app')