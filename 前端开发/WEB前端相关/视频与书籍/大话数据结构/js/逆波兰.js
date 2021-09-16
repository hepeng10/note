
const reg = {
    op: /^(\+|\-|\*|\/)/,
    singleOp: /^(\\sqrt|\\sin)/,
    num: /^([1-9]\d*|0)(\.\d{1,})?/,
    lPar: /^\(/,
    rPar: /^\)/,
};

const priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '\\sqrt': 3,  // 优先级更高
    '\\sin': 3,
};

function parseStr(str) {
    if (!str.length) {
        return [];
    }

    const recursive = (reg, str) => {
        const res = reg.exec(str);
        console.log('res:', res);
        return [res[0]].concat(parseStr(str.substring(res[0].length, str.length)));
    }

    if (reg.op.exec(str)) {
        return recursive(reg.op, str);
    } else if (reg.singleOp.exec(str)) {
        return recursive(reg.singleOp, str);
    } else if (reg.num.exec(str)) {
        return recursive(reg.num, str);
    } else if (reg.lPar.exec(str)) {
        return recursive(reg.lPar, str);
    } else if (reg.rPar.exec(str)) {
        return recursive(reg.rPar, str);
    }
}

function reversePolish(arr) {
    let res = [];
    let tmp = [];

    let i = 0;
    while (i < arr.length) {
        if (reg.num.test(arr[i])) {  // 当为数字时，直接进 res
            res.push(arr.shift());
        } else if (tmp.length === 0) {  // 当 tmp 为空时，直接进 tmp
            tmp.push(arr.shift());
        } else if (reg.lPar.test(arr[i])) {  // 当为左括号，直接进 tmp
            tmp.push(arr.shift());
        } else if (reg.rPar.test(arr[i])) {  // 当前为右括号
            arr.shift(); // 丢弃右括号
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const cur = tmp.pop();  // 获取 tmp 栈顶
                if (!reg.lPar.test(cur)) {  // 不是左括号则进 res
                    res.push(cur);
                } else {
                    break;
                }
            }
        } else {  // 剩下的就是运算符
            const cur = arr.shift();
            // eslint-disable-next-line no-constant-condition
            while (true) {
                if (tmp.length === 0) {
                    tmp.push(cur);
                    break;
                }

                const tmpCur = tmp.pop();
                if (reg.lPar.test(tmpCur) || priority[cur] > priority[tmpCur]) {  // tmp 栈顶为左括号或优先级大于当前运算符，则当前运算符放入 tmp
                    tmp.push(tmpCur);
                    tmp.push(cur);
                    break;
                } else {
                    res.push(tmpCur);
                }
            }
        }
    }

    while (i < tmp.length) {
        res.push(tmp.pop());
    }

    return res;
}

function calc(reversePolish) {
    const calculate = (op, num1, num2) => {
        num1 = Number(num1);
        num2 = Number(num2);
        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            case '\\sqrt':  // 添加计算方式
                return Math.sqrt(num1);
            case '\\sin':
                return Math.sin(num1);
        }
    }

    let stack = [];
    reversePolish.forEach(item => {
        if (reg.num.test(item)) {
            stack.push(item);
        } else if (reg.singleOp.test(item)) {  // 添加单运算符判断
            const num = stack.pop();
            const res = calculate(item, num);
            stack.push(res);
        } else {
            const num1 = stack.pop() || 0;
            const num2 = stack.pop() || 0;  // 解决 -3+2 这样的第一个数为负数导致的问题
            const res = calculate(item, num2, num1);  // 这里在进行计算时要将第二个数字在前与第一个数字进行运算
            stack.push(res);
        }
    });
    return stack[0];
}
