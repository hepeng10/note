## yarn 的优点
在 npm5 之前，yarn 相对于 npm 有太多的优点，比如 lock 文件，依赖扁平化等。但随着 npm 的更新，如今的 npm 已经将这些问题解决得差不多了。但是 yarn 依然还有着以下的优势：
* 速度快 。速度快主要来自以下两个方面：
    1. 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
    2. 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。
* 更简洁的输出：npm 的输出信息比较冗长。在执行 npm install <package> 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
 
#### 但是，以上这些都不重要！
![](./img/1.png)
![](./img/2.png)
**亲测当更新 node 版本、切换 npm 源、删除 lock 文件等操作后，都可能出现安装依赖出错的情况！！！**

## npx 和 yarn
npx介绍：http://www.ruanyifeng.com/blog/2019/02/npx.html
npx 可以执行项目中安装的命令行工具，如项目安装了 jest 如果在终端中直接运行 `jest` 命令是没有的，因为全局 没有安装。但是我们可以通过 `npx jest` 来运行项目中安装的 jest。如果项目中不存在 jest，npx 会尝试使用全局`$PATH`的 jest 命令，全局也没用 jest，则会下载 jest 到临时目录并执行，完成后会删除这个临时目录。
yarn 拥有项目内的 npx 功能，即可以使用 yarn 来调用项目中安装的模块，如 webpack 命令。但是不具有去全局查找和临时安装功能。
查看全局模块：npm list -g
然后使用 npx 可以去执行，但是 yarn 执行不了。

## yarn 的使用
https://www.cnblogs.com/cjh1996/p/12688383.html

## lock 文件
1. 没有 lock 文件，执行 yarn 命令进行依赖安装，会根据 package.json 里的配置，安装相应的最高次要版本。此时 package.json 中的版本号会与 lock 文件不匹配。
2. 当有 lock 文件时， 执行 yarn upgrade，此时 lock 文件里的版本号会更新，但是 package.json 文件的不会更新（npm update 的时候会更新 package.json 和 lock 文件的版本号）。
3. 当使用 yarn add antd@3.16.5 命令安装时，package.json 文件中的版本号不会带 \^，即固定版本，不能更新，lock 文件也如此。而 npm i antd@3.16.5 时 package.json 里会带有 \^。yarn 需要使用 yarn add antd@\^3.16.5 进行安装（此时 lock 文件中会是最高次要版本，而 npm i antd@3.16.5 的 lock 文件中是指定的版本）。当不确定版本号时，使用 yarn add antd@\^ 会给出版本列表可选择进行安装。
4. 使用 yarn upgrade-interactive --latest 可以进行跨版本更新，此时类似 remove 和 add。
5. 当有 lock 文件时，执行 yarn 进行依赖安装，此时会根据 lock 文件中的版本号进行安装。所以，将 lock 文件提交到 git 上，便可以保证不同地方安装的依赖为相同版本，并且注意不要随便使用 upgrade 进行依赖升级。测试发版时也不应该使用 upgrade 命令。