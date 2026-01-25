nextJS 15 版本
# 技术选型
## tailwindcss
nextJS 推荐使用 tailwindcss，使用 tailwind 编辑器推荐安装 tailwind css intelliSense 扩展。项目中安装 `prettier-plugin-tailwindcss`。
[prettier-plugin-tailwindcss in GitHub](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 此插件需要使用 prettier 格式化时才会执行。

注意：tailwind 不支持任何 IE 版本。
**unocss 功能更强大，推荐使用 unocss 代替 tailwindcss**

### tailwind-merge
tailwind-merge 用于合并 tailwind 类名，解决类名冲突问题。让后写的类名优先级更高。

## drizzle ORM
Drizzle ORM 是一个类型安全、轻量级、高性能的 TypeScript/JavaScript ORM（对象关系映射器）。它的主要目标是在提供优秀开发者体验的同时，保持接近原生 SQL 的性能和灵活性。

Drizzle ORM 是一个**类型安全、轻量级、高性能的 TypeScript/JavaScript ORM（对象关系映射器）**。它的主要目标是在提供优秀开发者体验的同时，保持接近原生 SQL 的性能和灵活性。

让我用一个表格来总结 Drizzle ORM 的核心功能：

| 功能类别 | 具体功能 | 说明 |
| :--- | :--- | :--- |
| **类型安全** | 完整的 TypeScript 集成 | 提供端到端的类型安全，从数据库模式到查询结果 |
| | 自动类型推断 | 查询结果自动获得正确的 TypeScript 类型 |
| **查询构建** | 类 SQL 的 API | 使用熟悉的 SQL 概念，学习曲线平缓 |
| | 关系查询 | 支持 JOIN、子查询等复杂关系操作 |
| **模式管理** | 声明式模式定义 | 使用 TypeScript 定义数据库表和关系 |
| | 迁移工具 | 生成和执行数据库 schema 迁移 |
| **数据库支持** | 多数据库支持 | PostgreSQL、MySQL、SQLite 等 |
| **性能优化** | 轻量级 | 零依赖，包体积小 |
| | 预编译查询 | 自动生成预处理语句，提升性能 |

### ⚖️ Drizzle vs 其他 ORM

| 特性 | Drizzle ORM | Prisma | TypeORM |
| :--- | :--- | :--- | :--- |
| **类型安全** | ⭐⭐⭐⭐⭐ (完全类型安全) | ⭐⭐⭐⭐⭐ (完全类型安全) | ⭐⭐⭐ (部分类型安全) |
| **性能** | ⭐⭐⭐⭐⭐ (接近原生 SQL) | ⭐⭐⭐⭐ (良好) | ⭐⭐⭐ (中等) |
| **学习曲线** | ⭐⭐⭐⭐ (SQL-like，较平缓) | ⭐⭐⭐ (有自己的 DSL) | ⭐⭐⭐⭐ (传统 ORM 风格) |
| **模式定义** | TypeScript 声明式 | 专属 schema 语言 | 装饰器或 TypeScript |
| **包大小** | ⭐⭐⭐⭐⭐ (非常小) | ⭐⭐⭐ (较大) | ⭐⭐⭐⭐ (中等) |

## tRPC
tRPC 是一个颠覆性的全栈 TypeScript 数据通信库，它的核心功能是**让你能够在客户端和服务器之间进行完全类型安全的 API 调用，而无需手动定义任何类型或 Schema**。

让我用一个表格来概括 tRPC 的核心功能：

| 功能类别 | 核心价值 | 具体说明 |
| :--- | :--- | :--- |
| **端到端类型安全** | 自动类型同步 | 服务器端的 API 类型自动推断到客户端，无需手动定义 |
| **开发体验** | 极简的 API 调用 | 客户端调用服务器函数就像调用本地函数一样简单 |
| **架构简化** | 无需 REST/GraphQL 样板 | 不需要定义 OpenAPI 文档或 GraphQL Schema |
| **性能优化** | 轻量级、零运行时开销 | 编译时类型检查，生产环境无额外性能损耗 |

### 🔄 tRPC 与其他技术的对比

| 技术 | 类型安全 | 开发体验 | 学习曲线 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **REST API** | 需要手动维护类型 | 需要处理 HTTP 细节 | 平缓 | 通用、多语言系统 |
| **GraphQL** | 中等（需要代码生成） | 需要学习 GraphQL 语法 | 较陡 | 复杂数据需求、移动端 |
| **tRPC** | **完全自动类型安全** | **极简，类似函数调用** | 平缓 | **全栈 TypeScript 应用** |

### 🚀 tRPC + Next.js + Drizzle 的完美组合

这三个技术栈组合在一起，构成了一个极其强大的全栈 TypeScript 开发体验：

```typescript
// 完整的技术栈示例

// 1. Drizzle - 数据库层（类型安全）
const users = drizzleTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

// 2. tRPC - API 层（类型安全）
const userRouter = router({
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      // 完全类型安全的数据库查询
      const user = await ctx.db.select().from(users).where(eq(users.id, input.id));
      return user[0];
    }),
});

// 3. Next.js - 前端层（类型安全）
function UserProfile({ userId }: { userId: number }) {
  // 完全类型安全的API调用
  const { data: user } = trpc.user.byId.useQuery({ id: userId });
  
  return <div>{user?.name}</div>;
}
```

## Radix + shadcn
`shadcn/ui` 是一个在GitHub上非常受欢迎的开源项目，它提供了一种独特的方式来帮助你构建用户界面。严格来说，它并非一个传统的组件库，而更像一个**高级的组件代码集**，其核心设计理念非常独特。

为了让你快速抓住核心，下面这个表格清晰地展示了 `shadcn/ui` 与传统UI组件库的主要区别：

| 维度 | `shadcn/ui` | 传统组件库 (如 Ant Design, MUI) |
| :--- | :--- | :--- |
| **安装方式** | 通过CLI将**组件源码**复制到你的项目中 | 通过npm/pnpm等包管理器安装，代码在`node_modules`里 |
| **定制性** | **极高**，直接拥有并可以修改源码 | 受限于库提供的配置和覆写能力 |
| **依赖关系** | 无明确的“Shadcn依赖”，减少隐藏依赖 | 在`package.json`中存在依赖项 |
| **维护责任** | **你拥有完全的控制权，也需承担样式维护责任** | 由库的维护者负责更新和修复，但也可能遇到不兼容的升级 |

### 🔧 核心技术与架构

`shadcn/ui` 的强大和灵活性，建立在两个出色的底层技术之上：

* **Radix UI**：这是一个提供完全无样式、且高度可访问的React组件基座。它为你处理了所有复杂的底层逻辑，例如键盘导航、焦点管理和屏幕阅读器兼容性，让你可以专注于样式本身。
* **Tailwind CSS**：`shadcn/ui` 使用这个流行的CSS框架来为Radix UI组件添加样式。你得到的组件源码中充满了Tailwind的实用类，这让调整样式变得非常直观和快捷。

简单来说，**`shadcn/ui = Radix UI (强大的功能与可访问性) + Tailwind CSS (极致灵活的样式)`**。你可以通过一条简单的命令，将预设好的组件添加到你的项目里：
```bash
npx shadcn-ui@latest add button
```

### ✨ 优势与挑战

**主要优势：**
*   **极致定制**：你可以修改组件的每一个细节，实现高度定制化的设计需求。
*   **所有权与控制力**：组件代码就在你的项目里，你可以完全掌控它们，避免了因依赖外部库的升级而可能带来的破坏性变更。
*   **轻量与性能**：只添加你需要的组件，有助于保持应用的轻量。

**需要注意的挑战：**
*   **自我维护**：你需要自己维护组件的样式，并随着项目的迭代，可能需要自己维护相关文档。
*   **更新成本**：当你想获取组件的新版本时，需要手动操作更新，并需要处理可能的合并冲突。

### 💡 如何选择？

了解了它的特性后，你可以这样判断它是否适合你的项目：

*   **适合 `shadcn/ui` 的场景**：
    *   追求**极致的定制化和控制力**。
    *   项目技术栈为 **React + Tailwind CSS**。
    *   团队愿意并且有能力**维护组件的样式和文档**。

*   **可能选择传统组件库更好的场景**：
    *   追求**开箱即用**，希望快速搭建应用，不想关心样式细节。
    *   项目需要处理**大量数据的复杂表格或表单**，依赖组件库的高级功能。
    *   团队资源有限，不希望承担额外的**组件维护和文档更新成本**。

## clsx
替代 classnames，更小更快。


# 架构设计
## .npmrc 文件
在项目根目录下创建 .npmrc 文件，这个文件用于配置 npm 或 pnpm 的行为。在 .npmrc 文件中可以设置各种选项，例如 registry、缓存目录、代理设置等。
要修改 npm 源就可以通过 `registry=https://registry.npmmirror.com` 这样的形式修改。




# NextJS 特性
## `<Image />`组件
nextJS 提供了 `<Image />` 组件用于优化图片的渲染，具有延迟加载等功能。

## 路由
app 目录下的 page.tsx 会自动生成路由，通常首页 `/` 就在 app 目录下，即 app/page.tsx。在 app 目录下创建其它路由，先创建自定义目录如 products，products 下创建 page.tsx 文件，便生成了一个新的路由 `/products`。products 目录下还能继续嵌套创建子路由，如 products/details，details 中创建 page.tsx 就能通过 `/products/details` 访问此路由了。

#### layout.tsx
路由的 page.tsx 文件可以附带一个 layout.tsx 文件，layout.tsx 文件可以提供公共布局，当前路由及其子路由都会应用这个 layout.tsx 文件布局。并且应用需要有个根布局，即 app/layout.tsx，根布局中可以编写 html, body 标签等。

## `<Link />`组件
[Link 和 usePathname 教程](https://nextjs.org/learn/dashboard-app/navigating-between-pages)
nextJS 提供了 `<Link />` 组件方便在路由之间进行跳转，Link 组件的 props 和 a 标签相同，可以直接替换 a 标签。Link 标签不会导致页面刷新，而 a 标签有时会。
**此外，在生产环境中，每当 `<Link>` 组件出现在浏览器的可视区域时，nextJS 会在后台自动预取链接路由的代码。当用户单击链接时，目标页面的代码已经在后台加载，这就是使页面转换近乎即时的原因！**

#### usePathname
nextJS 提供了 usePathname 来获取当前路由，在使用时需要在文件顶部加上 `'use client'`。

## Route Handlers
Route Handlers 是 app 目录下的 route.ts 文件，可在这个文件中编写 API 来实现对数据库的访问，类似于 model 层。在这里可以通过 SQL 语句直接访问数据库，不过更推荐使用 ORM 相关工具。（在 .env 中配置了数据库相关连接信息）
