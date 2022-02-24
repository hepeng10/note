const inquirer = require("inquirer");

// editor: 使用编辑器输入内容。我这里测试来是用 vim，有些人可能会使用默认编辑器。
inquirer.prompt([
    {
        type: "editor",
        message: "写下你想写的东西：",
        name: "editor"
    }
]).then(answer => {
    console.log(111, answer);
});