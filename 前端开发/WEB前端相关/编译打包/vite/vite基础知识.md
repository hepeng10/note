## 浏览器支持
在开发阶段，Vite 将 esnext 作为转换目标，因为我们假设使用的是现代浏览器，它支持所有最新的 JavaScript 和 CSS 特性。这样可以防止语法降级，让 Vite 尽可能地接近原始源代码。由于不用转换太多的代码，打包速度也就非常快。
对于生产构建，默认情况下 Vite 的目标浏览器支持 原生 ES 模块、原生 ESM 动态导入、import.meta、nullish coalescing 和 BigInt。旧版浏览器可以通过官方的 @vitejs/plugin-legacy。

## index.html
index.html 在项目根目录中，其中 `<script type="module" src="/src/main.js"></script>`，type 的值为 module，允许直接使用原生 ES 模块。
```js
<script type='module'>
import areas from './areas.js';
import perimeters from './perimeters.js';
const theSum=areas.square(size)+perimeters.square(size)
console.log(theSum)
</script>
```

## 精简且可扩展的核心
Vite 基于 Rollup 的插件系统 。可以作为外部插件实现的功能通常不会添加到 Vite 核心中。

1. **开发构建工具的选择**
   - Vite 在开发阶段使用 esbuild（基于 Go 语言）和 SWC（基于 Rust 语言）这样的原生工具
   - 这些工具是用底层语言编写的，性能极高，比传统的 JavaScript 工具快 10-100 倍
   - 主要用于处理耗时的任务，如：
     - 依赖预构建
     - TypeScript/JSX 的转换
     - 代码压缩等

2. **框架集成**
   - 当特定框架需要时，Vite 会通过插件使用 Babel
   - Babel 主要用于处理特定框架的语法转换和兼容性需求
   - 这保证了与各种前端框架的良好兼容性

3. **生产构建**
   - 在生产环境构建时，Vite 选择使用 Rollup
   - 原因有两个：
     1. Rollup 在代码分割和打包优化方面更成熟
     2. Rollup 拥有丰富的插件生态系统
   - 在生产构建阶段，代码包的体积优化和生态系统支持比纯粹的构建速度更重要

这种架构设计体现了 Vite 的精妙之处：在不同场景选择最适合的工具，既保证了开发体验（快速的冷启动和热更新），又确保了生产环境的代码质量和优化效果。

## 为什么生产环境仍需打包
尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。