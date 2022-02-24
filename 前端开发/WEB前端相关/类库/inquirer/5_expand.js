const inquirer = require("inquirer");

// expand: 用户输入简写，获取全称。自带一个 h 选项，会进行帮助提示。
inquirer.prompt([
    {
        type: "expand",
        message: "请选择一个颜色：",
        name: "color",
        default: "red",
        choices: [
            {
                // key 的长度只能是1，可以为一个英文字母或中文字符。不区分大小写
                key: 'R',
                value: "red"
            },
            {
                key: 'B',
                value: "blue"
            },
            {
                key: 'G',
                value: "green"
            }
        ]
    }
]).then(answer => {
    console.log(111, answer);
});