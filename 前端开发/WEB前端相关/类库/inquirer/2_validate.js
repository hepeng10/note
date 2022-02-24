const inquirer = require('inquirer');

// validate: 校验用户输入
inquirer.prompt([
    {
        type: "input",
        message: "请输入你的年龄：",
        name: "age",
        default: 18,
        // 校验用户的输入
        validate: (val) => {
            if (val > 0 && val < 120) {
                // return val;
                // 返回 true 才会往下执行，其它值都只会在控制台显示内容
                return true;
            } else {
                return "我猜你绝对不是一个正常人类";
            }
        }
    }
]).then(answer => {
    console.log(111, answer);
});