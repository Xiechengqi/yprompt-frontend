# GitHub Pages 部署配置说明

## 问题说明

GitHub Pages 是静态托管服务，**不支持后端 API**。当前端使用相对路径 `/api/...` 时，请求会发送到 GitHub Pages 域名（如 `https://username.github.io/api/...`），但 GitHub Pages 不支持 POST 等 HTTP 方法，会返回 **405 Method Not Allowed** 错误。

## 解决方案

### 方案一：配置后端 API 地址（推荐）

在 GitHub Actions 构建时设置后端 API 地址，让前端指向实际的后端服务。

#### 步骤 1：获取后端 API 地址

确保你的后端服务已经部署并可以访问，例如：
- `https://api.your-domain.com`
- `https://your-backend.vercel.app`
- `http://your-server-ip:8888`（如果允许跨域）

#### 步骤 2：在 GitHub Secrets 中配置

1. 进入 GitHub 仓库
2. 点击 **Settings** > **Secrets and variables** > **Actions**
3. 点击 **New repository secret**
4. 添加以下 secret：
   - **Name**: `BACKEND_API_URL`
   - **Value**: 你的后端 API 地址（例如：`https://api.your-domain.com`）
5. 点击 **Add secret**

#### 步骤 3：重新触发构建

推送代码或手动触发 GitHub Actions，构建时会自动使用配置的后端地址。

### 方案二：直接在 workflow 中设置（不推荐）

如果不想使用 Secrets，可以直接在 workflow 文件中设置（**注意：这会暴露在代码中**）：

编辑 `.github/workflows/ci.yml`：

```yaml
- name: Build
  env:
    VITE_API_BASE_URL: 'https://your-backend-api.com'  # 替换为实际地址
  run: |
    cd frontend
    npm install
    npm run build
```

## 验证配置

### 1. 检查构建日志

在 GitHub Actions 的构建日志中，应该能看到：
```
Backend API URL: https://your-backend-api.com
```

### 2. 检查构建产物

构建完成后，检查 `dist/` 目录中的文件，搜索 `VITE_API_BASE_URL`，应该能看到配置的 API 地址已经被注入。

### 3. 测试登录

1. 访问 GitHub Pages 地址
2. 打开浏览器开发者工具（F12）
3. 尝试登录（用户名：`admin`，密码：`admin123`）
4. 在 Network 标签中检查登录请求的 URL：
   - ✅ 正确：`https://your-backend-api.com/api/auth/local/login`
   - ❌ 错误：`https://username.github.io/api/auth/local/login`（相对路径）

## 常见问题

### Q: 如何知道后端 API 地址是什么？

A: 检查你的后端部署配置：
- 如果使用 Vercel/Netlify：查看部署后的域名
- 如果使用自己的服务器：查看服务器 IP 和端口
- 如果使用云服务：查看云服务提供的域名

### Q: 后端和前端可以部署在同一个域名吗？

A: 可以！如果使用 Nginx 等反向代理，可以：
1. 前端：`https://your-domain.com/`
2. 后端：`https://your-domain.com/api/`（通过 Nginx 代理）

在这种情况下，设置 `VITE_API_BASE_URL` 为空字符串（相对路径）即可。

### Q: 如何测试本地构建？

A: 在本地执行：

```bash
cd frontend
export VITE_API_BASE_URL=https://your-backend-api.com
npm run build
npm run preview
```

### Q: 405 错误仍然存在？

A: 检查以下几点：
1. ✅ `BACKEND_API_URL` secret 是否已配置
2. ✅ 构建日志中是否显示了正确的 API 地址
3. ✅ 浏览器 Network 标签中请求的 URL 是否正确
4. ✅ 后端服务是否正常运行并允许跨域（CORS）

## 相关文档

- [部署文档](./DEPLOYMENT.md)
- [项目文档](../CLAUDE.md)
