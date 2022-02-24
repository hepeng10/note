# 什么是 shell
shell 是一种脚本语言，而且是一种能与计算机内核交互的脚本语言。

## shell 与终端
shell 应用最广的地方就是终端。我们在终端输入的 ls, cd, echo 这些就是 shell 提供的命令，终端在执行这些命令的时候就会交由 shell 解释器来执行，所以终端是用于输入 shell 命令的界面，我们也可以编写命令到 .sh 文件中用来执行。

## bash 与 shell
shell 有很多种版本（即不同的解释器），他们之间大部分相同，但是却略有不同，如：tcsh、csh、ash、bsh、ksh等等。而其中使用最为广泛的就是 Bourne Again shell 即 bash， 是大部分 Linux 和 Mac OS 的默认 shell。在 Windows 中，默认的 CMD 不支持 bash，所以我们通常会使用 powershell 或 git bash 来替代。

在 Linux 系统上 /bin/sh （Bourne shell）往往是指向 /bin/bash （Bourne Again shell）的符号链接。虽然如此，bash 和 sh 还是有很多不同的，一方面，bash 扩展了一些命令和参数，另一方面，bash 并不完全和 sh 兼容，有些行为并不一致，所以 bash 需要模拟 sh 的行为：当我们通过 sh 命令启动 bash 时，bash 可以假装自己是 sh，不认扩展的命令，并且行为与 sh 保持一致。

> 由于通常会将 /bin/sh 指向 /bin/bash，所以使用 sh 命令等同于 bash 命令。但是还是要根据不同的 Linux 发行版而定。

### zsh
在 Mac 上我们通常会安装 zsh，zsh 其实也是一种 shell，并完全兼容 bash。zsh 更加美观，有更加智能的提示、补全，提供了更强大的命令（如：z 命令跳转）等。2019年，Apple的macOS Catalina 将 zsh 作为默认 shell，取代了 bash。一些 Linux 发行版也开始使用 zsh 取代 bash。
[为什么说 zsh 是 shell 中的极品？](https://www.zhihu.com/question/21418449/answer/2292448029)

### 查看 shell
当前使用的 shell:
```sh
echo $SHELL
```
安装的 shell:
```sh
cat /etc/shells
```

![图 1](assets/1645581147790.png)  

**参考：**
[终端、Shell、tty 和控制台（console）有什么区别？](https://www.zhihu.com/question/21711307)
[Linux之shell编程](https://blog.csdn.net/happiness_llz/article/details/82809789)


# 语法
### #!
在第一行使用 #! 来告诉系统这个脚本需要什么解释器来执行，即使用哪一种 shell。
```sh
#! /bin/bash
echo 'hello world'
```
> shell 脚本中一般在一行语句的末尾不使用分号来表示结束，当然使用了也没问题。一般一行中包含多条语句才在每条语句的末尾使用分号。

#### 运行脚本
在运行脚本之前我们需要先让此脚本具有执行权限，cd 到脚本目录，使用 chmod 修改权限：
```sh
chmod +x ./test.sh
```
然后执行脚本：
```sh
./test.sh
```
必须使用 ```./test.sh``` 来执行，直接运行 ```test.sh``` 会在环境变量 PATH 中去找，而不会执行当前目录下的。

上面的运行方式需要先用 chmod 获取权限，才能执行，我们还可以直接通过指定 shell 程序来运行，就不需要获取权限便能执行。但是指定了 shell 程序，就不会用文件中使用 #! 声明的 shell 程序了。
```sh
/bin/bash ./test.sh
```


### 变量
##### 声明变量：
变量名只能使用英文字母，数字和下划线，首个字符不能以数字开头。= 两边不能有空格。
```sh
name='hepeng'
readonly sex='男'  # 使用 readonly 声明不可变的变量
name='Tirion'
sex='女'  # 报错，不能修改 readonly 变量
unset sex  # 报错，不能删除 readlonly 变量
temp=123
echo $temp
unset temp  # 使用 unset 删除变量
echo $temp  # 输出空
```

##### 使用变量：
变量名前加上 $ 表示使用。
```sh
echo $name
echo ${name}  # 加上 {} 用于确定变量的边界
echo "名字是：$name"  # 双引号中可以使用变量
echo "${name}Script"  # 使用 {} 才能正确解析
echo '名字是：${name}'  # 单引号只是普通的字符串
```

##### 变量的类型
运行 shell 时，会同时存在三种变量：
1. 局部变量：局部变量在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。
2. 环境变量：所有的程序，包括 shell 启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候 shell 脚本也可以定义环境变量。
3. shell 变量：shell 变量是由 shell 程序设置的特殊变量。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行。


### 字符串
##### 字符串拼接：
```sh
echo '名字是：'$name' 性别是：'$sex  # 字符串拼接（不用像 JS 那样需要使用加号，看起来有点怪，还是推荐使用双引号模板语法）
echo "名字是： ${name} 性别是： ${sex}"  # 这样看起来就好多了
```

##### 获取字符串长度
```sh
echo ${#name}  # 这里就必须用 {}
```
##### 提取子字符串
```sh
echo ${name:0:3}
```
##### 查找子字符串
expr 是 evaluate expressions 的缩写，我的理解它的作用就是用来输出表达式的值。
以下是查找 i 或 o，先找到哪个返回哪个值的索引。
```sh
echo `expr index $name io`
```
> Mac 下没有 index 命令，所以执行报错。[说明1](https://discussions.apple.com/thread/923299)、[说明2](http://www.tastones.com/stackoverflow/bash/math/math_using_expr/)


### 数组
bash 支持一维数组（不支持多维数组），并且没有限定数组的大小。数组中的数据不必是相同的数据类型。
```sh
arr=(1 'xxx' 3)  # 使用 () 声明一个数组，用空格分割
arr[6]='yyy'  # 使用下标修改元素，不用保证数组索引的连续性
echo ${arr[1]}  # 必须使用 {}
echo ${arr[6]}
echo ${arr[@]}  # 使用 @ 符号获取数组中所有元素
len=${#arr[@]}  # 获取数组长度。索引位置为空的不会计入长度中
echo $len  # 输出4
echo ${#arr[1]}  # 获取数组中某个元素的长度
```


### 传递参数
在执行 shell 脚本的时候可以传递参数。如：
```sh
./test.sh a b c
```
代码中获取参数
```sh
echo "执行的文件名：$0";  # 输出 ./test.sh
echo "第一个参数为：$1";  # 输出 a
echo "第二个参数为：$2";  # 输出 b
echo "第三个参数为：$3";  # 输出 c
```