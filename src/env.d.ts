/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_FEISHU_APP_ID: string
  readonly VITE_LOGIN_USERNAME?: string
  readonly VITE_LOGIN_PASSWORD?: string
  readonly VITE_GIT_COMMIT_HASH?: string
  readonly VITE_GIT_COMMIT_DATE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 编译时内置提供商配置
declare const __BUILTIN_PROVIDERS__: import('@/config/builtinProviders').BuiltinProviderConfig[]