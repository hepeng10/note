const inquirer = require("inquirer");

// list: 单选列表，通常配合 choices 使用
inquirer.prompt([
    {
        type: "list",  // list | rawlist, 只是样式不同，rawlist 带有数字序号
        message: "请选择一个选项：",
        name: "fruit",
        default: "Apple",
        prefix: "☆☆☆☆",
        suffix: "****",
        choices: [
            "Apple",
            "Pear",
            "Banana",
            "Orange",
            "Peach",
        ],
        pageSize: 3,  // 更改显示行数，只对 list, rawList, expand 或 checkbox 有效
        // 使用 filter 获取用户的输入后返回新的内容替代用户的输入
        filter: function (val) {
            return val.toUpperCase();
        }
    }
]).then(answer => {
    console.log(111, answer);
});