# 生产环境部署说明

## 问题修复

### ✅ 已修复的问题

1. **默认密码错误**：已修正登录页面的默认密码从 `123123` 改为 `admin123`
2. **错误提示优化**：登录失败时现在会显示详细的错误信息，便于排查问题

## 生产环境配置

### 1. 配置 API 地址

在生产环境部署时，需要正确配置后端 API 地址。有两种方式：

#### 方式一：使用环境变量（推荐）

在构建前设置环境变量：

```bash
# 方式1：直接设置环境变量
export VITE_API_BASE_URL=https://your-backend-domain.com
npm run build

# 方式2：使用 .env.production 文件
# 编辑 .env.production，设置：
VITE_API_BASE_URL=https://your-backend-domain.com
npm run build
```

#### 方式二：使用相对路径 + Nginx 代理（同域名部署）

如果前端和后端部署在同一个域名下，可以使用相对路径：

1. **保持 `.env.production` 中的 `VITE_API_BASE_URL` 为空**
2. **配置 Nginx 代理**：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 后端 API 代理
    location /api {
        proxy_pass http://localhost:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket 支持（如果需要）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 2. 构建生产版本

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 构建产物在 dist/ 目录
```

### 3. 部署到 Web 服务器

将 `dist/` 目录的内容部署到 Web 服务器（Nginx、Apache、Caddy 等）。

### 4. 验证部署

1. **检查 API 地址配置**：
   - 打开浏览器开发者工具（F12）
   - 查看 Network 标签
   - 尝试登录，检查 API 请求的 URL 是否正确

2. **默认登录信息**：
   - 用户名：`admin`
   - 密码：`admin123`

3. **常见问题排查**：
   - **无法连接服务器**：检查 `VITE_API_BASE_URL` 是否正确配置
   - **CORS 错误**：确保后端已配置正确的 CORS 策略
   - **404 错误**：检查 API 路径是否正确（应该是 `/api/auth/local/login`）
   - **401 错误**：检查用户名和密码是否正确

## 开发环境 vs 生产环境

### 开发环境（`.env.development`）
```bash
VITE_API_BASE_URL=http://localhost:8888
```

### 生产环境（`.env.production`）
```bash
# 方式1：完整 URL（跨域名部署）
VITE_API_BASE_URL=https://api.your-domain.com

# 方式2：相对路径（同域名部署，通过 Nginx 代理）
VITE_API_BASE_URL=
```

## 故障排查

### 问题：登录失败，显示"无法连接到服务器"

**原因**：API 地址配置错误或后端服务未启动

**解决方案**：
1. 检查后端服务是否正常运行
2. 检查 `VITE_API_BASE_URL` 是否正确
3. 检查浏览器控制台的 Network 标签，查看实际请求的 URL
4. 如果使用相对路径，确保 Nginx 代理配置正确

### 问题：登录失败，显示"用户名或密码错误"

**原因**：默认管理员账号未创建或密码不匹配

**解决方案**：
1. 检查后端数据库中的用户表
2. 确认默认管理员账号已创建（用户名：`admin`，密码：`admin123`）
3. 如果密码不匹配，可以通过后端重置密码

### 问题：CORS 错误

**原因**：后端未配置正确的 CORS 策略

**解决方案**：
1. 检查后端 CORS 配置
2. 确保允许前端域名访问
3. 检查预检请求（OPTIONS）是否正常处理

## 安全建议

1. **生产环境必须修改默认密码**
2. **使用 HTTPS**：确保 API 通信使用 HTTPS
3. **配置 CORS**：限制允许的前端域名
4. **保护 API 密钥**：不要在前端代码中硬编码 API 密钥
5. **定期更新依赖**：保持依赖包的最新版本

## 相关文档

- [项目文档](../CLAUDE.md)
- [前端文档](./CLAUDE.md)
- [后端文档](../backend/CLAUDE.md)
