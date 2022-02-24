const inquirer = require('inquirer');

// confirm: 确认提示，要求用户在控制台输入 Y/n
inquirer.prompt([
    {
        type: "confirm",
        message: "是否现在监听？",
        name: "watch",
        prefix: 'xxx',  // 修改默认前缀，用处不大
        suffix: "yyy",  // 修改默认后缀，用处不大
        default: true  // 直接回车就会使用默认值
    },
    {
        type: "confirm",
        message: "是否能看到我取决于上面是否通过？",
        name: "pass",
        default: false,
        // 接收用户的输入，然后根据用户输入判断当前这个交互是否要展现给用户
        // 返回 true 则会展现，false 则不会展现，跳到下个交互
        when: function (answer) {
            console.log(111, answer)
            // 当 watch 为 true 的时候才会有这个 confirm 交互
            if (answer.watch) {
                return true;
            }
            return false;
        }
    },
    {
        type: 'input',
        message: '请输入姓名',
        name: 'uname',
        default: '张三'
    }
]).then(answer => {
    console.log(222, answer);
});