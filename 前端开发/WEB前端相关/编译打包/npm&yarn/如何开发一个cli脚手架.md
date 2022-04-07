# 如何开发一个 CLI 脚手架项目

我们可以通过使用 create-react-app，vue-cli 这样的命令行工具快速创建一个项目的脚手架。那么 create-react-app 这样的工具是怎样开发的呢？

## 创建项目
首先我们需要创建一个新的项目用于开发我们的 CLI 项目。
1. 先创建一个目录，就叫它 mycli 好了。然后进入目录，使用 `npm init` 创建基本的 package.json。
2. 修改 name 字段，这就是我们通过 npm install 安装的包名，就叫它 @tirion/cli 好了。
3. 新增 bin 字段，在这个字段中我们需要为使用的命令进行命名，以及这个命令运行的文件。使用的命令就叫 create-tirion-app 好了，运行的文件为 ./bin/cli.js。

那么现在这个 package.json 的配置就如下：
```json
{
  "name": "@tirion/cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "create-tirion-app": "./bin/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 创建命令
现在，我们在命令行中输入 create-tirion-app，并没有这个命令。那么怎么将这个命令添加到全局呢？
在创建命令之前我们先简单的编写下 cli.js，内容如下：
```js
#!/usr/bin/env node

console.log("tirion cli")
```
第一行是 shebang，学过 shell 的应该都知道。下面就是正式的内容了。
好了，基本的内容写好了，下面就开始创建一个命令，其实很简单，只需要运行一下 `yarn link` 就行了，我们就可以在命令行中使用 `create-tirion-app`，并会输出 tirion cli。当要移除此命令时在此项目中使用 `yarn unlink` 即可。
> 注意是直接在项目中使用 `yarn unlink`，而不是使用 `yarn unlink @tirion/cli`。

## 安装依赖
通常开发一个 cli 项目的依赖有 commanderjs, inquirerjs, shelljs, mustache, ora, chalk 等。
另外2022年了，也该使用 ts 来开发项目了，但是网上找的一些开发 cli 的教程都是使用的 js，而我们通过 shebang 也只能指定使用 node 来运行，那么怎样才能使用 ts 来编写我们的 cli 呢？

首先需要安装 typescript 并配置 tsconfig.json，然后就再安装 ts-node，在 cli.js 中引入 ts-node 就能使用 ts 来编写了，如：
```js
#!/usr/bin/env node

console.log("tirion cli")

require('ts-node/register');  // 先引入 ts-node/register，后面就可以使用 ts 了
require('../scripts/init.ts');  // 引入 ts 文件
```
当然，如果能要求用户全局安装了 ts-node 也可以使用 shebang `#!/usr/bin/env ts-node` 来指定 ts-node 运行。

由于 ts-node 是运行时编译，速度会较慢，但是通常运行个脚本还是能接受。如果使用 esbuild-register 会有一定的速度提升，如果要更快的速度可能就需要使用 rollup, webpack 等打包成 js 来运行了。

这里再介绍下使用 esbuild 运行，需要先安装 esbuild 和 esbuild-register，只安装 esbuild-register 不行。然后 cli.js 中这样写：
```js
#!/usr/bin/env node

console.log("tirion cli")

const { register } = require('esbuild-register/dist/node');
const { unregister } = register({
  // ...options
});

require('../scripts/init.ts');

unregister();
```
不能只 `require('esbuild-register/dist/node');`，调用了 register 后才能使用 ts。

参考资料：[使用 TypeScript 来编写 cli 程序](https://juejin.cn/post/7052993148292694052)

另外，由于我们使用 TS 来开发，所以应该把这些工具库相关的类型定义包也安装上，如 @types/node, @types/inquirer 等。

## 编写代码
准备工作一切就绪，下面就可以开始编写业务代码了。
首先我们在 cli.js 中导入了 init.ts，那么就先编写 init.ts。
```ts
// init.ts

import inquirer from 'inquirer';

import downloadTemplate from './downloadTemplate';
import install from './install';

import { PkgManager } from './types';

const init = async() => {
    const appName = await downloadTemplate();

    const res = await inquirer.prompt<{ pkgManager: PkgManager }>({
        type: 'list',
        message: '选择依赖包管理工具',
        name: 'pkgManager',
        choices: ['yarn', 'npm']
    });
    
    install(res.pkgManager, appName);
}

init();
```
上面的代码中，因为 commander, inquirer 的方法很多是异步的，所以封装了一个函数使用 async await 来实现同步编程。

首先我们引入了 downloadTemplate，并在 init 中进行调用，这个函数的目的是下载 git 上的模板。

下面就是 downloadTemplate 的代码:
```ts
// downloadTemplate.ts

import { program } from 'commander';
import shelljs from 'shelljs';
import chalk from 'chalk';

import pkg from '../package.json';
import config from './config';

const downloadTemplate = (): Promise<string> => {
    return new Promise<string>(resolve => {
        program
            .version(pkg.version)
            .argument('<appName>', '创建的应用名称')
            .action((appName: string) => {
                if (!shelljs.which('git')) {
                    shelljs.echo(chalk.bgRed('错误：请先安装 git'));
                    shelljs.exit(1);
                }
                shelljs.exec(
                    `git clone ${config.gitRepoUrl} ${appName}`,
                    code => {
                        if (code !== 0) {
                            shelljs.echo(chalk.bgRed('错误：拉取模板失败'));
                            shelljs.exit(1);
                        }
                        resolve(appName);
                    }
                );
            })
            .parse(process.argv);
    });
};

export default downloadTemplate;
```
上面的代码中我们通过 shelljs.which 判断 git 命令是否存在，不存在则输出错误并退出，存在则使用 shelljs.exec 执行一个 shell 命令，执行成功后调用 resolve 方法继续往下执行。

从 init.ts 中可以看出继续执行会使用 inquirer.prompt 方法进行询问使用哪个包管理器，选择后调用 install 方法进行安装。下面是 install.ts 的内容：
```ts
// install.ts
import shelljs from 'shelljs';
import chalk from 'chalk';
import { PkgManager } from './types';

const install = (pkgManager: PkgManager, appName: string) => {
    shelljs.cd('./' + appName);
    if (pkgManager === 'yarn') {
        shelljs.exec('yarn', code => {
            if (code !== 0) {
                shelljs.echo(chalk.bgRed('错误：使用 yarn 安装依赖失败'));
            }
        });
    } else {
        shelljs.exec('npm install -d', code => {
            if (code !== 0) {
                shelljs.echo(chalk.bgRed('错误：使用 npm 安装依赖失败'));
            }
        });
    }
}

export default install;
```
首先使用 `shelljs.cd` 进入项目目录，然后根据选择的包管理器执行相应的 shell 命令安装依赖。依赖安装完成后这个简单的 cli 工具就完成了。

如果要开发更强大的 cli 工具，可以通过 inquirer 进行询问，根据不同的选择下载不同的模板；不同的选择对模板文件进行操作等。这些就看个人的想象力了。

## 注意事项
我在脚手架项目中编写代码从 git 下载了模版项目，然后使用 `shelljs.cd` 跳转到了项目中，之后又使用 `shelljs.exec('yarn cli')` 运行项目中的脚手架脚本，脚手架脚本中使用 inquirer 进行询问。这时就发现 inquirer 的询问出问题了，不能进行选择。是因为我们在使用 shelljs.exec 执行的命令是开了一个子进程 child_process，而在子进程中使用 inquirer 默认情况只会将内容输出为字符串输出，所以这里不能使用 `shelljs.exec()` 来执行。

可以使用 child_process.execSync 来执行，并将 stdio 配置为 inherit，表示此子进程继承自父进程，这时子进程中的 stdio 流就会直接传给父进程，这样才能正常使用 inquirer。如 `child_prcess.execSync('yarn cli', { stdio: 'inherit' });`

在 shelljs 中不支持此方法，所以这里只能使用 child_process 来操作。