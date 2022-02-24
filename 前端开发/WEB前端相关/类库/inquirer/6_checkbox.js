const inquirer = require("inquirer");

// checkbox: 多选，控制台中使用空格进行选择
inquirer.prompt([
    {
        type: "checkbox",
        message: "选择一至多种颜色：",
        name: "color",
        choices: [
            "red",
            "blue",
            "green",
            "pink",
            "orange"
        ]
        // 自定义分隔符
        // choices: [
        //     {
        //         name: "red"
        //     },
        //     new inquirer.Separator(), // 添加分隔符
        //     {
        //         name: "blue"
        //     },
        //     {
        //         name: "green"
        //     },
        //     {
        //         name: "pink",
        //         checked: true  // 默认选中
        //     },
        //     new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
        //     {
        //         name: "orange"
        //     }
        // ]
    }
]).then(answer => {
    console.log(111, answer);
});