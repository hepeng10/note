const inquirer = require('inquirer');

// input: 用户输入框
/* 
* 一个输入，使用 async await 实现
*/
async function init() {
    const res = await inquirer.prompt([{
        type: 'input',
        message: '请输入姓名',
        name: 'uname',  // 指定字段名
        default: '张三'
    }]);
    console.log(111, res.uname);
}
init();

/*
* 多个输入，使用 then 实现
*/
// inquirer.prompt([
//     {
//         type: 'input',
//         message: '请输入姓名',
//         name: 'uname',  // 指定字段名
//     },
//     {
//         type: 'input',
//         message: '请输入年龄',
//         name: 'age',
//     }
// ]).then((res) => {
//     // 通过指定的字段名获取值
//     console.log(222, res);
// });