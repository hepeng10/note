// 定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
// 将算法的使用与算法的实现分离开
// 一个基于策略模式的程序至少由两部分组成：第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类 Context，Context 接收客户的请求，随后把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用
// 功能：策略模式可以让简化代码的分支语句


// 传统面向对象实现
// 把每种绩效的计算规则都封装在对应的策略类里面
var performanceS = function() {};
performanceS.prototype.calculate = function(salary) {
    return salary * 4;
};

var performanceA = function() {};
performanceA.prototype.calculate = function(salary) {
    return salary * 3;
};

var performanceB = function() {};
performanceB.prototype.calculate = function(salary) {
    return salary * 2;
};

// 奖金类
var Bonus = function() {
    this.salary = null;  // 原始工资
    this.strategy = null;  // 绩效等级对应的策略对象
}
Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
};
Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy;
};
Bonus.prototype.getBonus = function() {
    return this.stratege.calculate(this.salary);
};

// 使用
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());  // 设置策略对象
cosole.log(bonus.getBonus());  // 得到奖金

var bonus2 = new Bonus();
bonus2.setSalary(8000);
bonus2.setStrategy(new performanceA());  // 设置策略对象
cosole.log(bonus2.getBonus());  // 得到奖金


/*-----------------------------------------------------------------------------------------------*/


// JavaScript 版
// JavaScript 中，函数也是对象，所以更简单和直接的做法是把 strategy 直接定义为函数
var strategies = {
    "S": function(salary) {
        return salary * 4;
    },
    "A": function(salary) {
        return salary * 3;
    },
    "B": function(salary) {
        return salary * 2;
    }
};

var calculateBonus = function(level, salary) {
    return strategies[level](salary);
};

console.log(calculateBonus('S', 10000));
console.log(calculateBonus('A', 8000));
