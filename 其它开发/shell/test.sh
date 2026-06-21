#! /bin/bash
echo "hello world"

# ; && ||
echo hello; ls  # ; 用来在一行中执行多条命令，前面的命令成功与否都会执行后面的
mkdir test && ls  # && 表示前面的命令执行成功才会执行后面的
mkdir test || ls  # || 表示前面的命令执行失败才会执行后面的

# type 查看命令的来源（内部还是外部命令，命令的路径）
type echo
type -a echo  # 加上 -a 查看命令的所有定义
type nginx

# 声明变量
name='hepeng'
readonly sex='男'
name='Tirion'
# sex='女'  不能对 readonly 的变量进行修改
# unset sex  不能删除 readlonly 的变量
temp=123
echo $temp
unset temp
echo $temp

# 使用变量
echo $name
echo ${name}  # 加上 {} 用于确定变量的边界
echo "名字是：$name"  # 双引号中可以使用变量
echo "${name}Script"  # 使用 {} 才能正确解析
echo '名字是：${name}'  # 单引号只是普通的字符串
echo '名字是：'$name' 性别是：'$sex  # 单引号拼接

# 获取字符串长度
echo ${#name}
# 提取子字符串
echo ${name:0:3}
##### 查找子字符串
echo `expr index $name io`


# 数组
arr=(1 'xxx' 3)  # 使用 () 声明一个数组，用空格分割
arr[6]='yyy'
echo ${arr[1]}  # 必须使用 {}
echo ${arr[6]}
echo ${arr[@]}  # 使用 @ 符号获取数组中所有元素
len=${#arr[@]}  # 获取数组长度
echo $len
echo ${#arr[1]}  # 获取数组中某个元素的长度


:<</
这里是多行注释
两个 / 可以替换成其它字符如: # ! @ 等等
但是不能用引号，网上某些教程中使用引号是错误的
/


# shell 传递参数
# ./test.sh a b c 在运行 shell 的时候传参
echo "执行的文件名：$0";  # 输出 ./test.sh
echo "第一个参数为：$1";  # 输出 a
echo "第二个参数为：$2";  # 输出 b
echo "第三个参数为：$3";  # 输出 c
