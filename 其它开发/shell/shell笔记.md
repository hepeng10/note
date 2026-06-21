### [详细教程：阮一峰——Bash 教程](https://wangdoc.com/bash/intro.html)

# 什么是 shell
shell 这个词有多种含义：

shell 是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境（command line interface，简写为 CLI）。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。
> vue-cli 通常会当做脚手架来用，但是之所以取名叫 cli，是因为提供了很多命令，并不只是作为创建 Vue 应用这一单一的功能。

其次，shell 是一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 shell 命令写出各种小程序，又称为脚本（script）。这些脚本都通过 shell 的解释执行，而不通过编译。

最后，shell 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能。

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


# 注意事项
### 命令是否成功状态码
当我们执行 shell 命令的时候，判断命令执行是否成功，通常会使用返回的 code 值来进行判断。需要注意的是，code 值为0表示执行成功。这是因为执行是否成功并不只有0和1两种状态，通常只有两种状态的时候我们会用0表示失败，1表示成功。但是由于失败的情况有很多种，所以在 Unix 中通常用0表示成功，而不是0的数字表示各种失败类型。


# 语法
### #!
在第一行使用 #! 来告诉系统这个脚本需要什么解释器来执行，即使用哪一种 shell，这句话有个专业名称叫 shebang。
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


### 基本语法
##### echo 命令
使用 echo 在命令行中输出内容：
```sh
echo hello world
```

##### ; && ||
; 表示在一行中执行多条命令，前面的命令执行成功与否都会继续执行后面的。
```sh
echo hello; ls
```
&& 表示前面的命令执行成功才会执行后面的
```sh
mkdir test && ls
```
|| 表示前面的命令执行失败才会执行后面的
```sh
mkdir test || ls
```

##### type 命令
Bash 本身内置了很多命令，同时也可以执行外部程序。怎么知道一个命令是内置命令，还是外部程序呢？就可以使用 type 来查看。
```sh
type echo  # 输出 echo is a shell builtin，builtin 表示内部的
type -a echo  # 加上 -a 查看命令的所有定义
```
```sh
type nginx
```

##### 快捷键
Ctrl + L：清除屏幕并将当前行移到页面顶部。
Ctrl + C：中止当前正在执行的命令。
Shift + PageUp：向上滚动。
Shift + PageDown：向下滚动。
Ctrl+A 跳到光标所在行的行首
Ctrl+E 跳到光标所在行的行尾
Ctrl+W 删除光标前的单个域
Ctrl + U：从光标位置删除到行首。
Ctrl + K：从光标位置删除到行尾。
Ctrl + W：删除光标位置前一个单词。
Ctrl + D：关闭 Shell 会话。
↑，↓：浏览已执行命令的历史记录。
[查看更多操作](https://wangdoc.com/bash/readline.html)


### 模式扩展
Shell 接收到用户输入的命令以后，会根据空格将用户的输入，拆分成一个个词元（token）。然后，Shell 会扩展词元里面的特殊字符，扩展完成后才会调用相应的命令。
这种特殊字符的扩展，称为模式扩展（globbing）。其中有些用到通配符，又称为通配符扩展（wildcard expansion）。Bash 一共提供八种扩展。

* ~ 波浪线扩展
* ? 字符扩展
* \* 字符扩展
* 方括号扩展
* 大括号扩展
* 变量扩展
* 子命令扩展
* 算术扩展

模式扩展可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是优点是简单和方便。

##### ~ 波浪线扩展
波浪线 ~ 会自动扩展成当前用户的主目录。
```sh
echo ~  # /Users/hepeng
echo ~/foo  # /Users/hepeng/foo
echo ~root  # 扩展到某个用户的主目录，root 可以是其它用户名
```

##### ? 字符扩展
? 字符代表文件路径里面的任意单个字符，不包括空字符。比如，Data??? 匹配所有 Data 后面跟着三个字符的文件名。
```sh
# 以下都能找到 test.sh
ls ????.sh
ls ????.??
```

##### * 字符扩展
*字符代表文件路径里面的任意数量的任意字符，包括零个字符。
```sh
ls *.sh  # 列出所有 .sh 文件
ls *.*  # 列出所有带 . 的文件
```
直接使用 * 不会列出 . 开头的隐藏文件，需要使用 .*
```sh
ls .*  # 列出所有 . 开头的隐藏文件
```
匹配子目录
```sh
ls assets/*.png
ls */*  # 列出所有目录下的所有文件
```

##### 方括号扩展
匹配方括号中的任意一个字符。
```sh
ls [ab].txt  # 匹配 a.txt 和 b.txt，不会匹配 ab.txt
```
方括号扩展还有两种变体：[^...]和[!...]。它们表示匹配不在方括号里面的字符，这两种写法是等价的。比如，[^abc]或[!abc]表示匹配除了a、b、c以外的字符。
```sh
ls [!a].txt  # 会匹配 b.txt，不会匹配 bb.txt，因为只有一个字符
ls [\!a].txt  # zsh 需要转义感叹号
```
方括号扩展有一个简写形式[start-end]，表示匹配一个连续的范围。比如，[a-c]等同于[abc]，[0-9]匹配[0123456789]。
```sh
ls [a-c].txt  # 匹配 a.txt, b.txt, c.txt
ls report[0-9].txt  # 匹配 report0.txt, report1.txt ... report9.txt
ls [!d-g].txt  # 除了 d-g 以外的 *.txt
```

##### 大括号扩展
[]扩展不能匹配多个字符，所以有了大括号扩展。**注意大括号中逗号后不能有空格。**
```sh
ls {a,ab}.txt  # 匹配 a.txt 和 ab.txt（方括号扩展不能匹配 ab.txt）
# 大括号可嵌套使用。
echo {j{p,pe}g,png}  # 输出：jpg jpeg png
# 大括号也可以与其他模式联用，并且总是先于其他模式进行扩展。
echo /bin/{cat,b*}  # 输出：/bin/cat /bin/bash
# 上面那条语句基本等同于
echo /bin/cat;echo /bin/b*
```
大括号扩展有一个简写形式{start..end}，表示扩展成一个连续序列。比如，{a..z}可以扩展成26个小写英文字母。
```sh
echo {a..c}  # a b c
echo {1..4}  # 1 2 3 4
# 支持逆序
echo {4..1}  # 4 3 2 1
# 嵌套使用
echo .{mp{3..4},m4{a,b,p,v}}  # .mp3 .mp4 .m4a .m4b .m4p .m4v
# 新建36个子目录，每个子目录的名字都是”年份-月份“
mkdir {2007..2009}-{01..12}
# 前导0
echo {01..5}  # 01 02 03 04 05
echo {001..5}  # 001 002 003 004 005
```
用于循环：
```sh
for i in {1..4}
do
  echo $i
done
```

##### 变量扩展
Bash 将美元符号$开头的词元视为变量，将其扩展成变量值。
```sh
echo $SHELL
```
\$\{!string*\} 或 $\{!string@\} 返回所有匹配给定字符串string的变量名。
```sh
echo ${!S*}  # bash 中可以使用，zsh 中没成功。
# SECONDS SHELL SHELLOPTS SHLVL SSH_AGENT_PID SSH_AUTH_SOCK
```

##### 子命令扩展
\$(...)可以扩展成另一个命令的运行结果，该命令的所有输出都会作为返回值。
```sh
echo $(date)  # 2022年 2月28日 星期一 19时38分29秒 CST
```
还有另一种较老的语法，子命令放在反引号之中，也可以扩展成命令的运行结果。
```sh
echo `date`
```

##### 算术扩展
\$((...))可以扩展成整数运算的结果
```sh
echo $((2 + 2))  # 4
```

##### 字符类
[[:class:]]表示一个字符类，扩展成某一类特定字符之中的一个。常用的字符类如下。
* [[:alnum:]]：匹配任意英文字母与数字
* [[:alpha:]]：匹配任意英文字母
* [[:blank:]]：空格和 Tab 键。
* [[:cntrl:]]：ASCII 码 0-31 的不可打印字符。
* [[:digit:]]：匹配任意数字 0-9。
* [[:graph:]]：A-Z、a-z、0-9 和标点符号。
* [[:lower:]]：匹配任意小写字母 a-z。
* [[:print:]]：ASCII 码 32-127 的可打印字符。
* [[:punct:]]：标点符号（除了 A-Z、a-z、0-9 的可打印字符）。
* [[:space:]]：空格、Tab、LF（10）、VT（11）、FF（12）、CR（13）。
* [[:upper:]]：匹配任意大写字母 A-Z。
* [[:xdigit:]]：16进制字符（A-F、a-f、0-9）。
```sh
echo [[:lower:]].*  # 匹配所有小写字母开头的文件名
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

**bash 语法有点特别，懒得记语法笔记了，直接看上面的阮一峰 bash 教程吧。或者看 ./test.sh 中的代码。**