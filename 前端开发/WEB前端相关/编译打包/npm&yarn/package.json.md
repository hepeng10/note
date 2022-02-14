# peerDependencies
用于在开发 npm 包时使用。peerDependencies 里的依赖表示你开发的这个包要求宿主环境（即使用你这个包的项目）需要满足 peerDependencies 中的依赖。

比如 html-webpack-plugin 新版本中有：
```json
peerDependencies: {
    "webpack: ^5.20.0"
}
```
说明在项目中使用此版本的 html-webpack-plugin，需要满足 webpack 版本大于 5.20.0。

当我们在安装 html-webpack-plugin 时，就会通过 peerDependencies 查看宿主环境的 webpack 版本是否符合要求。如果符合要求则通过，peerDependencies 中指定的依赖不会另行下载；如果不符合，则会在控制台进行提示。类似：
```js
npm WARN hidash@0.2.0 requires a peer of lodash@~1.3.1 but none is installed. You must install peer dependencies yourself.
```

当我们发现这样的提示时，就只能看项目能否正常运行，如果正常运行可以不予理会，如果不能正常运行就只能去找依赖符合的包了。（或许还可以试下修改 node_modules 中的包的 package.json，将 peerDependencies 中冲突的依赖改到 devDependencies 中？）

所以当你写的包 a 里面依赖另一个包 b，而这个包 b 是引用这个包 a 的业务的常用的包的时候，建议写在 peerDependencies 里，避免重复下载/多个版本共存。

# types | typings
使用 types 或 typings 指定类型声明文件。
```json
{
    "name": "awesome",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts"
}
```
同样要注意的是如果主声明文件名是index.d.ts并且位置在包的根目录里（与index.js并列），你就不需要使用"types"属性指定了。