首先是C语言的编译器已经安装好了，可以在 vscode 中运行 .c 文件。
但是创建了 .cpp 文件，编写了C++代码，运行时却报错，如：
![图 0](assets/1758677240413.png)  
此时会生成一个tasks.json文件，关闭弹窗后打开tasks.json文件，修改如下：
```json
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: gcc.exe 生成活动文件",
            "command": "D:/APP/_develop/mingw64/bin/gcc.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe",
                "-lstdc++" // 添加此行以链接C++标准库
            ],
            "options": {
                "cwd": "D:/APP/_develop/mingw64/bin"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "调试器生成的任务。"
        }
    ],
    "version": "2.0.0"
}
```
**原因：**
在Vscode中的"tasks.json"文件中，"-lstdc++"是一个编译器选项，用于告知编译器链接标准C++库。具体来说：
“-l”是一个编译器选项，用于指定要链接的库
“stdc++”是指标准C++库（Standard C++ Library）的名称
因此，“-lstdc++”选项告诉编译器在链接时要包含标准C++库，这也就解决了配置vscode，结果C的代码可以运行，但是C++的不可以运行。