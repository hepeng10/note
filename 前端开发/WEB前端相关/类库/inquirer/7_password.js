const inquirer = require("inquirer");

// password: 密码，用户输入的时候看不见内容
inquirer.prompt([
    {
        type: "password",
        message: "请输入你的密码：",
        name: "pwd"
    }
]).then(answer => {
    console.log(111, answer);
});