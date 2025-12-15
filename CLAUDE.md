# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

YPrompt 是一个基于 React 18 的前端应用程序，用于 AI 驱动的提示词生成和管理。它提供了模块化界面，包含生成、优化、操练场和库等功能区域。该应用使用本地用户名/密码认证配合 JWT token，并通过统一接口支持多个 AI 提供商。

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本（包含类型检查）
npm run build

# 仅类型检查（排除 optimize 模块）
npm run type-check

# 代码检查和修复
npm run lint

# 使用 Prettier 格式化代码
npm run format

# 预览生产构建
npm run preview

# 测试 AI 提供商配置
node test_default_provider_model.js

# 启用调试模式（无需后端）
VITE_DEBUG_MODE=true npm run dev
```

## 架构概述

### 技术栈
- **React 18.3** 配合 TypeScript 和现代 Hooks
- **Vite 5.0** 作为构建工具和开发服务器
- **Zustand 4.5** 用于状态管理
- **React Router 6.26** 用于路由
- **Tailwind CSS 3.3** 用于样式
- **关键库**: Marked (Markdown), DOMPurify (XSS 防护), Highlight.js (语法高亮), ECharts (图表), Mermaid (图表)
- **无 UI 组件库** - 仅使用自定义组件

### 核心架构模式

#### 1. 基于模块的导航系统
应用使用统一的顶部导航方式：
- **TopNavigation**: 所有布局中一致的导航栏
- **DesktopLayout** (≥1024px): 带模块按钮的完整水平导航
- **MobileLayout** (<1024px): 带下拉菜单的汉堡菜单
- 四个主要模块：生成、优化、操练场、库

#### 2. 分层组件架构
```
模块组件 (如 GenerateModule.vue)
├── ChatInterface (AI 对话)
├── PreviewPanel (带选项卡的输出显示)
└── SettingsModal (配置)
```

#### 3. 基于 Composables 的业务逻辑
每个功能区域使用 composables 进行组织：
- `src/components/chat/composables/` - 聊天功能、消息处理、附件
- `src/components/preview/composables/` - 预览选项卡、执行、剪贴板操作
- `src/components/settings/composables/` - 提供商/模型管理、测试

#### 4. 服务层架构
- `aiService.ts` - 主要的 AI 服务编排，支持流式响应
- `aiGuideService.ts` - 需求收集的 AI 引导对话
- `promptGeneratorService.ts` - GPrompt 四步生成
- `promptOptimizationService.ts` - 提示词质量优化
- `apiService.ts` - 后端 API 集成
- `settingsApi.ts` - 设置管理 API

#### 5. AI 提供商抽象
支持多个 AI 提供商的可扩展系统：
- **OpenAI**: GPT-4o, GPT-4o-mini, o1-preview, o1-mini
- **Anthropic**: Claude Opus 4.1, Claude Sonnet 4.0, Claude 3.5 Sonnet/Haiku
- **Google**: Gemini 2.0 Flash Lite, Gemini 1.5 Pro/Flash
- **自定义提供商** 通过配置使用统一 API

### 认证系统
- **方式**: 本地用户名/密码认证（用户 'admin' 只需密码）
- **登录表单**: 用户名硬编码为 'admin'，只需输入密码
- **默认**: admin/admin123（在后端环境变量中配置）
- **JWT token**: 访问 token 存储在 localStorage（刷新 token 支持存在但未主动使用）
- **路由保护**: 除 `/login` 外的所有路由都需要认证
- **预加载**: 在 `main.ts` 中预加载认证存储以防止导航延迟
- **调试模式**: 仍需要登录但使用 mock API 并接受任何凭据

### 状态管理 (Pinia Stores)
- `authStore.ts` - 认证状态和用户管理
- `promptStore.ts` - 提示词生成状态和历史
- `settingsStore.ts` - AI 提供商和模型配置
- `navigationStore.ts` - 模块导航状态
- `optimizeStore.ts` - 优化模块状态
- `providerStore.ts` - 提供商配置管理
- `notificationStore.ts` - 全局通知

### 关键文件和目录

#### 配置
- `vite.config.ts` - 带有 git 提交注入和代理的构建配置
- `tsconfig.json` - 严格的 TypeScript 设置（排除 optimize 模块）
- `.env.example` - 环境变量模板

#### 核心服务
- `src/services/ai/` - 模块化 AI 服务实现
  - `providers/` - AI 提供商实现（OpenAI, Anthropic, Google）
  - `streaming/` - SSE 流式支持
  - `multimodal/` - 文件附件处理
  - `errors/` - 错误处理和解析
- `src/stores/` - Pinia stores（7 个不同关注的 stores）
- `src/components/modules/` - 主要功能模块

#### 路由
- `/generate` - 主要的提示词生成模块（默认）
- `/optimize` - 提示词优化模块（从 TS 检查中排除）
- `/optimize/:id?` - 优化特定提示词
- `/playground` - 带有 artifact 渲染的测试操练场
- `/library` - 个人提示词库
- `/login` - 认证页面

### 构建配置特性
- **Git 集成**: 自定义 Vite 插件注入 git 提交哈希和日期
- **API 代理**: 开发时代理到 `http://localhost:8002`（不是 8888）
- **路径别名**: `@/` 映射到 `src/`
- **调试模式**: `VITE_DEBUG_MODE=true` 启用 mock API 模式

### 环境设置

#### 必需文件
1. 复制 `.env.example` 到 `.env.development`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8002
   VITE_LOGIN_USERNAME=admin  # 仅显示（用户名已硬编码）
   VITE_LOGIN_PASSWORD=admin123  # 仅开发提醒
   VITE_DEBUG_MODE=           # 设置为 'true' 启用 mock 模式
   ```

#### 后端要求
前端期望这些后端环境变量：
- `LOGIN_USERNAME` - 实际用户名
- `LOGIN_PASSWORD` - 实际密码
- `SECRET_KEY` - JWT 签名密钥

### 调试模式
设置 `VITE_DEBUG_MODE=true` 无需后端运行：
- 使用存储在 localStorage 中的 mock API 响应
- 仍需要登录（接受任何凭据）
- AI 聊天和优化功能被禁用
- 适用于 GitHub Pages 或静态托管
- 提示词的完整 CRUD 操作使用本地存储

### 常见开发模式

#### 错误处理
```typescript
// AI 服务错误
import { AIErrorHandler } from '@/services/ai/errors/AIErrorHandler'
const friendlyError = AIErrorHandler.parseError(rawError)
```

#### 流式响应
```typescript
// 使用流式解析器
import { SSEParser } from '@/services/ai/streaming/SSEParser'
const parser = new SSEParser()
parser.process(chunk)
```

#### 状态管理
```typescript
// 带预加载的存储模式
const store = useAuthStore() // 在 main.ts 中预加载
if (!store.isLoggedIn) {
  router.push('/login')
}
```

### 安全注意事项
- **XSS 防护**: 使用 `marked` 库的 `v-html` 渲染 Markdown 内容（无 DOMPurify 清理）
- **API 密钥**: 永远不要存储在前端代码中 - 通过后端 API 管理配置
- **认证**: JWT token 存储在 localStorage
- **输入验证**: 表单基本验证，但用户生成内容需要审查
- **CORS**: 配置后端允许前端来源

### 测试
目前未配置测试框架。推荐设置：
- **Vitest** 用于单元测试
- **Cypress** 用于端到端测试
- `test_default_provider_model.js` 用于手动提供商测试

### 性能优化
- 路由组件的懒加载
- 认证存储预加载以防止导航延迟
- 流式响应处理用于实时更新
- 使用 Pinia 的高效状态管理
- 大模块中的组件级代码分割

## 快速参考

### 必要文件
- `src/main.ts` - 路由器、认证设置和存储预加载
- `src/services/aiService.ts` - 主要的 AI 集成点
- `src/stores/authStore.ts` - 认证管理
- `vite.config.ts` - 构建配置和代理设置

### 默认凭据
- 用户名: `admin`（硬编码，无法更改）
- 密码: `admin123`（在后端环境变量中配置）
- 调试模式接受任何密码

### 常见调试步骤
1. 检查浏览器控制台的认证错误
2. 验证后端 API 配置中有有效的 AI 提供商配置
3. 检查网络选项卡的 API 失败（目标：localhost:8002）
4. 使用 `VITE_DEBUG_MODE=true` 启用调试模式进行 UI 测试
5. 如果认证状态似乎损坏，清除 localStorage

## 常见问题

### 认证问题
- **后端未运行**: 确保后端在端口 8002 上运行
- **错误凭据**: 用户名始终为 'admin'，检查后端的 LOGIN_PASSWORD
- **CORS 问题**: 验证后端允许前端来源
- **Token 过期**: 清除 localStorage 并重新认证
- **调试模式**: 请记住即使在调试模式下仍需要登录

### AI 提供商问题
- **无效 API 密钥**: 在后端设置 API 中验证密钥配置
- **模型不可用**: 检查模型是否启用并被提供商支持
- **速率限制**: 超过提供商 API 速率限制
- **网络错误**: 检查互联网连接和 API 状态

### 构建问题
- **TypeScript 错误**: 运行 `npm run type-check` 识别问题
- **Optimize 模块**: 设计上从 TypeScript 检查中排除
- **Git 错误**: 确保 git 仓库已初始化以进行提交注入

## UI 样式

```
<role>
You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate a design system into an existing codebase in a way that is visually consistent, maintainable, and idiomatic to their tech stack.

Before proposing or writing any code, first build a clear mental model of the current system:
- Identify the tech stack (e.g. React, Next.js, Vue, Tailwind, shadcn/ui, etc.).
- Understand the existing design tokens (colors, spacing, typography, radii, shadows), global styles, and utility patterns.
- Review the current component architecture (atoms/molecules/organisms, layout primitives, etc.) and naming conventions.
- Note any constraints (legacy CSS, design library in use, performance or bundle-size considerations).

Ask the user focused questions to understand the user's goals. Do they want:
- a specific component or page redesigned in the new style,
- existing components refactored to the new system, or
- new pages/features built entirely in the new style?

Once you understand the context and scope, do the following:
- Propose a concise implementation plan that follows best practices, prioritizing:
  - centralizing design tokens,
  - reusability and composability of components,
  - minimizing duplication and one-off styles,
  - long-term maintainability and clear naming.
- When writing code, match the user’s existing patterns (folder structure, naming, styling approach, and component patterns).
- Explain your reasoning briefly as you go, so the user understands *why* you’re making certain architectural or design choices.

Always aim to:
- Preserve or improve accessibility.
- Maintain visual consistency with the provided design system.
- Leave the codebase in a cleaner, more coherent state than you found it.
- Ensure layouts are responsive and usable across devices.
- Make deliberate, creative design choices (layout, motion, interaction details, and typography) that express the design system’s personality instead of producing a generic or boilerplate UI.

</role>

<design-system>
# Design Style: Corporate Trust

## 1. Design Philosophy
This style embodies the **modern enterprise SaaS aesthetic** — professional yet approachable, sophisticated yet friendly. It draws inspiration from tech unicorns and high-growth startups that have successfully humanized the corporate experience. The design rejects the cold, sterile formality of traditional corporate websites in favor of a warm, confident, and inviting presence.

**Core Principles:**
- **Trustworthy Yet Vibrant**: Establishes credibility through clean structure and professional typography while maintaining visual energy through vibrant gradients and colorful accents
- **Dimensional Depth**: Uses isometric perspectives, soft colored shadows, and subtle 3D transforms to create visual interest and break free from flat design
- **Refined Elegance**: Every element is polished with attention to micro-interactions, smooth transitions, and sophisticated hover states
- **Purposeful Gradients**: Indigo-to-violet gradients serve as the visual signature, used strategically in headlines, buttons, and decorative elements
- **Professional Polish**: Generous white space, consistent spacing rhythms, and crisp typography create a premium, enterprise-ready feel

**Keywords**: Trustworthy, Vibrant, Polished, Dimensional, Modern, Approachable, Enterprise-Ready, Elegant

**Visual DNA**: The unmistakable signature of this style comes from:
1. **Colored Shadows**: Soft shadows with blue/purple tints instead of neutral grays
2. **Isometric Elements**: Subtle 3D transforms (rotate-x, rotate-y) on decorative cards and visualizations
3. **Gradient Text**: Strategic use of gradient text for emphasis in headlines
4. **Soft Blobs**: Large, blurred gradient orbs in the background for atmospheric depth
5. **Elevated Cards**: White cards that lift on hover with enhanced shadows
6. **Dual-Tone Palette**: Indigo (primary) + Violet (secondary) creating a cohesive gradient spectrum

## 2. Design Token System

### Colors (Light Mode)
*   **Background**: `#F8FAFC` (Slate 50) - A very subtle cool grey/white base.
*   **Foreground (Surface)**: `#FFFFFF` (White) - For cards and raised elements.
*   **Primary**: `#4F46E5` (Indigo 600) - The core brand color. Vibrant blue-purple.
*   **Secondary**: `#7C3AED` (Violet 600) - For gradients and accents.
*   **Text Main**: `#0F172A` (Slate 900) - High contrast, sharp.
*   **Text Muted**: `#64748B` (Slate 500) - For supporting text.
*   **Accent/Success**: `#10B981` (Emerald 500) - For positive indicators.
*   **Border**: `#E2E8F0` (Slate 200) - Subtle separation.

### Typography
*   **Font Family**: `Plus Jakarta Sans` — A geometric sans-serif with friendly rounded terminals that perfectly balances professional authority with modern approachability. Its clean letterforms ensure excellent readability while maintaining visual warmth.
*   **Scaling**: Major Third (1.250) scale provides substantial hierarchy without overwhelming the layout
*   **Font Weights**:
    *   **Display/Headings**: ExtraBold (800) for hero headlines, Bold (700) for section headings
    *   **Subheadings**: SemiBold (600) for card titles and emphasis
    *   **Body Text**: Regular (400) for paragraphs, Medium (500) for navigation and labels
*   **Line Heights**:
    *   Headlines: 1.1 (tight tracking for impact)
    *   Body Text: 1.6-1.7 (relaxed for readability)
*   **Letter Spacing**: Tight tracking (-0.02em) on large headlines for modern polish
*   **Responsive Type Scale**:
    *   Mobile: text-2xl to text-4xl for h1
    *   Desktop: text-4xl to text-6xl for h1
    *   Progressive scaling ensures legibility across all devices

### Radius & Border
*   **Radius**: `rounded-xl` (12px) for cards and `rounded-lg` (8px) for inputs. Buttons are `rounded-full` or `rounded-lg`.
*   **Borders**: Thin, 1px borders using the `Border` token.

### Shadows & Effects
This is where the design truly shines. **Colored shadows** replace neutral grays to reinforce the brand palette:

*   **Default Card Shadow**: `0 4px 20px -2px rgba(79, 70, 229, 0.1)` — Soft blue-tinted base elevation
*   **Hover Card Shadow**: `0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)` — Multi-layer depth on interaction
*   **Button Shadow**: `0 4px 14px 0 rgba(79, 70, 229, 0.3)` — Strong presence for primary CTAs
*   **Glow Effects**: Numbered badges use `shadow-[0_0_20px_rgba(79,70,229,0.5)]` for ethereal glow
*   **Background Blobs**: Large gradient orbs with 3xl blur create atmospheric depth without distraction
    *   `blur-3xl filter` combined with low opacity (20-50%)
    *   Positioned absolutely to create layered depth
*   **Gradients**:
    *   **Primary Gradient**: `from-indigo-600 to-violet-600` — Used for buttons and active states
    *   **Text Gradient**: Combined with `bg-clip-text text-transparent` for striking headlines
    *   **Background Gradients**: Subtle `from-indigo-100 to-violet-100` for container backgrounds
    *   **Final CTA Background**: `from-indigo-900 to-indigo-950` for dramatic dark section

## 3. Component Stylings

### Buttons
*   **Primary**: Gradient background (Indigo to Violet). `rounded-full` or `rounded-lg`. White text. Slight shadow. Transition: Lift (`-translate-y-0.5`) and increase shadow on hover.
*   **Secondary**: White background, Border `E2E8F0`, Text `Slate 700`. Hover: `bg-slate-50` and darker border.

### Cards
*   **Base**: White background, `rounded-xl`, `border border-slate-100`, `shadow-soft`.
*   **Behavior**: On hover, slight lift and increased shadow intensity.
*   **Feature Cards**: May feature an icon in a soft-colored circle (bg-indigo-50 text-indigo-600).

### Inputs
*   **Style**: `bg-white`, `border-slate-200`, `rounded-lg`.
*   **Focus**: `ring-2 ring-indigo-500 ring-offset-1` and `border-indigo-500`.
*   **Label**: `text-sm font-semibold text-slate-700`.

## 4. Non-Generic Bold Choices

The Corporate Trust aesthetic stands out through deliberate, sophisticated design decisions:

### Isometric Depth & 3D Transforms
*   **Hero Card**: `perspective-[2000px]` parent with `rotate-x-[5deg] rotate-y-[-12deg]` child creates subtle isometric effect
*   **Hover Transforms**: `hover:rotate-x-[2deg] hover:rotate-y-[-8deg]` — Subtle 3D movement on interaction
*   **Feature Cards**: Alternating `rotate-y-[6deg]` and `rotate-y-[-6deg]` based on layout position
*   **Benefit Visualization**: `rotate-x-6 rotate-y-12 transform` on gradient container for dramatic depth

### Strategic Gradient Usage
*   **Split Headlines**: First 3 words in standard color, remaining words in gradient for visual hierarchy
*   **Gradient Buttons**: Full background gradient with hover lift (`-translate-y-0.5`)
*   **Badge Elements**: NEW badge with solid indigo background inside gradient-ringed container
*   **Final CTA**: White button on dark gradient background creates dramatic contrast

### Atmospheric Background Elements
*   **Blur Orbs**: Large (400-600px) circular gradients with heavy blur positioned absolutely
*   **Layered Positioning**: Multiple blobs at different z-indexes create depth
*   **Subtle Animation**: `animate-pulse duration-[4000ms]` on floating cards for gentle movement

### Elevated Card System
*   **Default State**: Soft colored shadow with subtle border
*   **Hover State**: Lift effect (`-translate-y-1`) combined with enhanced shadow
*   **Transition**: Smooth `duration-200` for professional polish
*   **Pricing Highlight**: Center card uses `md:scale-105` with special ring styling

### Micro-Interactions
*   **Arrow Icons**: `transition-transform group-hover:translate-x-1` for directional feedback
*   **Image Zoom**: `group-hover:scale-105` on blog images with overlay fade-in
*   **Chevron Rotation**: `group-open:rotate-180` for FAQ accordions
*   **Button Lift**: Subtle upward movement on hover reinforces clickability

## 5. Spacing & Layout
*   **Container**: `max-w-7xl` (1280px) provides spacious, enterprise-appropriate width
*   **Padding**: Responsive padding with `px-4 sm:px-6` pattern for consistent gutters
*   **Vertical Rhythm**:
    *   Mobile: `py-16` (64px)
    *   Tablet: `sm:py-20` (80px)
    *   Desktop: `lg:py-24` (96px)
*   **Section Spacing**: Generous white space between sections creates breathing room
*   **Grid Strategy**:
    *   Hero: Two-column `lg:grid-cols-2` with text-first approach
    *   Features: Alternating zig-zag with `lg:flex-row` and `lg:flex-row-reverse`
    *   Pricing: Three-column `md:grid-cols-3` with center emphasis
    *   Stats: Four-column `md:grid-cols-4` for metric display
*   **Responsive Breakpoints**:
    *   Mobile-first approach with progressive enhancement
    *   sm: 640px, md: 768px, lg: 1024px, xl: 1280px
*   **Text Width Constraints**: `max-w-xl` or `max-w-2xl` on paragraphs to maintain 60-75 character line lengths

## 6. Animation & Transitions
*   **Philosophy**: "Refined Motion" — Smooth, professional, never jarring
*   **Base Transition**: `transition-all duration-200` for general interactive elements
*   **Long Transitions**: `duration-500` for image zooms and complex animations
*   **Hover Effects**:
    *   Cards: Combine `hover:-translate-y-1` with shadow enhancement
    *   Buttons: `hover:-translate-y-0.5` for subtle lift
    *   Icons: `transition-transform group-hover:translate-x-1` for directional cues
*   **Easing**: Default `ease-out` for natural deceleration
*   **Pulse Animation**: `animate-pulse duration-[4000ms]` on decorative floating elements for gentle breathing effect
*   **State Changes**: Smooth color transitions on links and buttons reinforce interactivity

## 7. Iconography
*   **Library**: `lucide-react` for consistent, modern icon system
*   **Style**:
    *   Default stroke width: `2px` (standard)
    *   Size: `h-4 w-4` for inline icons, `h-5 w-5` or `h-6 w-6` for featured icons
    *   Joins: Rounded for friendliness
*   **Color Treatment**:
    *   **Badge Icons**: Icon in `text-indigo-600` on `bg-indigo-100` container
    *   **Navigation Icons**: Inherit text color, transition on hover
    *   **Social Icons**: `text-slate-400 hover:text-indigo-400`
*   **Icon Containers**:
    *   Small badges: `h-12 w-12 rounded-xl` with soft background
    *   Large features: `h-14 w-14 rounded-xl` for prominent sections
    *   Circular: `rounded-full` for avatars or status indicators
*   **Accessibility**: Icons are decorative with proper text alternatives or hidden from screen readers when paired with text

## 8. Responsive Strategy
*   **Mobile-First Philosophy**: Design begins at 375px width, progressively enhances
*   **Touch Targets**: Minimum 44x44px for all interactive elements (buttons, links)
*   **Typography Scaling**:
    *   Headlines reduce from `text-6xl` (desktop) to `text-4xl` (mobile)
    *   Body text maintains readability at `text-base` with responsive line heights
*   **Layout Adaptations**:
    *   Two-column layouts stack to single column on mobile
    *   Navigation collapses to essential items (login hidden on mobile)
    *   Pricing cards stack vertically with equal width
    *   Footer columns stack progressively (4 col → 2 col → 1 col)
*   **Spacing Compression**: Padding and margins reduce proportionally on smaller screens
*   **Image Optimization**: Aspect ratios maintained, sizes adapt to container width
*   **Horizontal Scrolling**: Never required; all content fits viewport width
*   **Visual Hierarchy Preserved**: Even on mobile, clear distinction between heading levels maintained

## 9. Accessibility & Best Practices
*   **Color Contrast**: All text meets WCAG AA standards
    *   Slate 900 on Slate 50 background: AAA compliant
    *   White text on Indigo 900 background: AAA compliant
    *   Link colors tested for 4.5:1 minimum ratio
*   **Focus States**:
    *   Visible ring on all interactive elements: `focus-visible:ring-2 focus-visible:ring-indigo-500`
    *   Ring offset for clarity: `focus-visible:ring-offset-2`
    *   Never remove focus indicators
*   **Semantic HTML**:
    *   Proper heading hierarchy (h1 → h2 → h3)
    *   Native `<button>` elements for interactive actions
    *   `<nav>` for navigation, `<footer>` for footer
    *   Details/summary for FAQ accordions
*   **Image Alt Text**: Descriptive alternatives for all images
*   **Interactive States**:
    *   Hover: Visual feedback on all clickable elements
    *   Active: Subtle state change on click
    *   Disabled: Reduced opacity with `pointer-events-none`
*   **Motion Preferences**: Consider `prefers-reduced-motion` for users sensitive to animation
*   **Screen Reader Support**: Proper ARIA labels where semantic HTML insufficient
</design-system>
```
