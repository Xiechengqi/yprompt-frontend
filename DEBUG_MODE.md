# Debug 模式使用说明

## 概述

Debug 模式是前端的一个特殊模式，**完全不依赖后端 API**，使用 mock 数据模拟后端响应。适用于：

- GitHub Pages 等静态托管场景
- UI 效果预览和演示
- 前端开发和测试
- 离线演示

## 启用方式

### 方式一：环境变量（推荐）

在构建时设置环境变量：

```bash
# 开发环境
VITE_DEBUG_MODE=true npm run dev

# 生产构建
VITE_DEBUG_MODE=true npm run build
```

### 方式二：GitHub Actions 自动启用

在 GitHub Actions workflow 中，如果未配置 `BACKEND_API_URL`，会自动启用 debug 模式。

也可以在 GitHub Secrets 中设置 `DEBUG_MODE=true` 强制启用。

### 方式三：本地存储（临时）

在浏览器控制台执行：

```javascript
localStorage.setItem('yprompt_debug_mode', 'true')
location.reload()
```

禁用：

```javascript
localStorage.removeItem('yprompt_debug_mode')
location.reload()
```

## 功能特性

### ✅ 支持的功能

- ✅ 用户登录（接受任何用户名密码，或使用 admin/admin123）
- ✅ 用户信息管理
- ✅ 提示词创建、编辑、删除
- ✅ 提示词列表、搜索、筛选
- ✅ 收藏/取消收藏
- ✅ 标签管理
- ✅ 提示词规则管理
- ✅ 数据持久化（使用 localStorage）

### ❌ 不支持的功能

- ❌ AI 对话和生成（需要真实的 AI API）
- ❌ 提示词优化（需要真实的 AI API）
- ❌ 版本管理（简化实现）
- ❌ 真实的用户认证和权限

## Mock 数据存储

Debug 模式使用 `localStorage` 存储 mock 数据，key 为 `yprompt_mock_data`。

数据结构：

```typescript
{
  user: {
    id: number
    username: string
    name: string
    avatar: string
    email?: string
    auth_type: 'local'
    is_admin: number
    last_login_time?: string
  },
  prompts: Prompt[],
  tags: Tag[],
  promptRules: PromptRules | null
}
```

## 使用示例

### 1. 本地开发测试 UI

```bash
cd frontend
VITE_DEBUG_MODE=true npm run dev
```

访问 `http://localhost:5173`，使用任意用户名密码登录即可查看 UI 效果。

### 2. GitHub Pages 部署

在 GitHub Actions workflow 中，如果未配置后端 API，会自动启用 debug 模式：

```yaml
env:
  VITE_API_BASE_URL: ${{ secrets.BACKEND_API_URL }}
  VITE_DEBUG_MODE: ${{ secrets.BACKEND_API_URL == '' && 'true' || 'false' }}
```

或者手动设置：

```yaml
env:
  VITE_DEBUG_MODE: 'true'
```

### 3. 清除 Mock 数据

如果需要重置所有 mock 数据：

```javascript
localStorage.removeItem('yprompt_mock_data')
location.reload()
```

## 登录信息

Debug 模式下：

- **默认登录**：`admin` / `admin123`
- **任意登录**：可以使用任何用户名和密码登录（方便测试）

## 注意事项

1. **数据隔离**：Debug 模式的数据存储在 `localStorage`，与正常模式的数据隔离
2. **功能限制**：某些需要 AI API 的功能在 debug 模式下不可用
3. **性能**：Mock API 有模拟延迟（200-500ms），模拟真实网络请求
4. **持久化**：数据会保存在浏览器 localStorage 中，清除浏览器数据会丢失

## 开发调试

### 检查是否启用 Debug 模式

在浏览器控制台：

```javascript
// 检查环境变量
console.log(import.meta.env.VITE_DEBUG_MODE)

// 检查 localStorage
console.log(localStorage.getItem('yprompt_debug_mode'))

// 检查 mock 数据
console.log(JSON.parse(localStorage.getItem('yprompt_mock_data') || '{}'))
```

### 查看 Mock API 调用

Mock API 服务位于 `src/services/mockApiService.ts`，所有 API 调用都会经过 mock 处理。

## 故障排查

### Q: Debug 模式未启用？

A: 检查以下几点：
1. 环境变量 `VITE_DEBUG_MODE` 是否设置为 `'true'`
2. 构建时是否正确传递了环境变量
3. 浏览器控制台是否有错误信息

### Q: 登录后数据丢失？

A: Mock 数据存储在 `localStorage`，检查：
1. 浏览器是否禁用了 localStorage
2. 是否清除了浏览器数据
3. 是否在隐私模式下运行

### Q: 某些功能不可用？

A: Debug 模式只模拟基础 CRUD 操作，AI 相关功能需要真实的后端 API。

## 相关文档

- [GitHub Pages 部署配置](./GITHUB_PAGES_SETUP.md)
- [部署文档](./DEPLOYMENT.md)
- [项目文档](../CLAUDE.md)
