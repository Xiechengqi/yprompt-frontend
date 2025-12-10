import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

// 创建注入 git commit 信息的插件
function gitCommitPlugin(): Plugin {
  const commitHash = getGitCommitHash()
  const commitDate = getGitCommitDate()
  
  return {
    name: 'git-commit-plugin',
    config(config) {
      // 通过 define 注入到代码中
      const existingDefine = config.define || {}
      return {
        define: {
          ...existingDefine,
          'import.meta.env.VITE_GIT_COMMIT_HASH': JSON.stringify(commitHash),
          'import.meta.env.VITE_GIT_COMMIT_DATE': JSON.stringify(commitDate)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    gitCommitPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    // 支持从配置文件加载内置提供商
    __BUILTIN_PROVIDERS__: JSON.stringify(getBuiltinProviders())
  }
})

// 获取内置提供商配置
function getBuiltinProviders() {
  try {
    // 尝试从根目录的 builtin-providers.json 文件读取配置
    const configPath = resolve(__dirname, 'builtin-providers.json')
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf-8')
      const config = JSON.parse(configContent)
      return config
    }
  } catch (error) {
    console.warn('⚠️ 读取内置提供商配置失败:', error.message)
  }
  
  // 如果没有配置文件或读取失败，返回空数组
  return []
}

// 获取 git commit hash（缩写，7位）
function getGitCommitHash(): string {
  try {
    // 获取当前 commit hash 的前7位
    // 使用项目根目录（frontend 的父目录）作为工作目录
    const projectRoot = resolve(__dirname, '..')
    const hash = execSync('git rev-parse --short HEAD', { 
      encoding: 'utf-8',
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
    console.log('✅ Git commit hash:', hash)
    return hash || ''
  } catch (error) {
    console.warn('⚠️ 获取 git commit hash 失败:', error instanceof Error ? error.message : String(error))
    return ''
  }
}

// 获取 git commit 日期
function getGitCommitDate(): string {
  try {
    // 获取当前 commit 的日期（ISO 8601 格式）
    // 使用项目根目录（frontend 的父目录）作为工作目录
    const projectRoot = resolve(__dirname, '..')
    const date = execSync('git log -1 --format=%ci', { 
      encoding: 'utf-8',
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
    console.log('✅ Git commit date:', date)
    return date || ''
  } catch (error) {
    console.warn('⚠️ 获取 git commit date 失败:', error instanceof Error ? error.message : String(error))
    return ''
  }
}
