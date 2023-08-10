# 安装 wsl
https://blog.51cto.com/u_14149124/6195138
注意需要开启电脑的虚拟化，win11 家庭版需要先安装 hyper-v。

# wsl1 和 wsl2
wsl2 不是就一定比 wsl1 好，wsl2 的优点是拥有完整的 linux 环境，而 wsl1 是模拟的 linux 环境。但是 wsl2 访问 Windows 文件时是使用的网络进行访问，速度非常慢。而 wsl1 是直接访问。
所以目前开发小程序需要使用 wsl 直接操作 Windows 的情况下用 wsl1 更合适。
`wsl -l -v` 可以查看 wsl 使用的版本。
`wsl --set-version Ubuntu 1` 修改 wsl 版本为 wsl1，最好在 powershell 中运行，我在 gitbash 中运行就卡住半天不动。
需要注意的是，在 clone 项目的时候就应该用 wsl1 跳转到 windows 的项目目录进行 clone，如果在 windows 上使用 gitbash 等 clone，那么用 wsl1 进入到此项目就会出很多问题，如 git 提交识别，husky 报错等。
（最后还是使用 git bash 安装 zsh 再安装 oh-my-zsh 后直接在 Windows 中使用方便点。）

# 代理
需要先开启代理才能从 github 上拉取安装 oh-my-zsh，安装后可以通过环境变量里配置或通过脚本来快速启动或关闭代理，我使用的是新建个脚本来快速开启和关闭代理。
https://solidspoon.xyz/2021/02/17/%E9%85%8D%E7%BD%AEWSL2%E4%BD%BF%E7%94%A8Windows%E4%BB%A3%E7%90%86%E4%B8%8A%E7%BD%91/
https://www.cnblogs.com/tuilk/p/16287472.html
需要注意的是，文章中的脚本文件在 WSL1 中可能失效，是因为获取主机ip有问题，并且配置也有点问题，我改成这样后正常了：
```sh
hostip=$(hostname -I | awk '{print $1}')
wslip=$(hostname -I | awk '{print $1}')
port=7890

PROXY_HTTP="http://${hostip}:${port}"

set_proxy(){
  export ALL_PROXY="${PROXY_HTTP}"

  git config --global http.https://github.com.proxy ${PROXY_HTTP}
  git config --global https.https://github.com.proxy ${PROXY_HTTP}

  echo "Proxy has been opened."
}
```
没发现防火墙会导致不能代理，所以不需要关闭。

# 安装 oh-my-zsh
使用文章中的安装 oh-my-zsh 的命令即可安装：https://zhuanlan.zhihu.com/p/68336685
`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

# 修改 oh-my-zsh 主题
1. 运行 `wsl` 进入 wsl
2. 运行 `vi ~/.zshrc` 打开 oh-my-zsh 配置
3. 修改 ZSH_THEME="jonathan" 使用 jonathan 主题。各种主题见：https://github.com/ohmyzsh/ohmyzsh/wiki/Themes

# 安装插件
https://segmentfault.com/a/1190000018093021
主要有：zsh-syntax-highlighting，zsh-autosuggestions 这两个，z 命令默认支持，需要编辑 ~/.zshrc 在插件中添加开启。
像这样：`plugins=(git z zsh-syntax-highlighting zsh-autosuggestions)`

# git 保存账号密码
linux 中使用 git clone 等命令，每次都要输入账号密码，可通过配置 `~` 目录下的 `.gitconfig` 文件，添加
```
[credential]
    helper = store
```
来启用自动保存账号密码功能。
https://www.cnblogs.com/facetwitter/p/14646597.html