nextJS 15 版本
## tailwindcss
nextJS 推荐使用 tailwindcss，使用 tailwind 编辑器推荐安装 tailwind css intelliSense 扩展。项目中安装 `prettier-plugin-tailwindcss`。
[prettier-plugin-tailwindcss in GitHub](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 此插件需要使用 prettier 格式化时才会执行。

注意：tailwind 不支持任何 IE 版本。

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