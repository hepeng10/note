const inquirer = require("inquirer");

// number: 期望用户输入数字，若不是数字，则拿到的值为 NaN
inquirer.prompt([
    {
        type: "number",
        message: "请输入数字：",
        name: "num"
    }
]).then(answer => {
    console.log(111, answer);
});