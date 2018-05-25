// 采用动态规划（Dynamic Programming， DP）思想。将复杂问题分解成更小的子问题来解决的优化技术。
// 给出多种面额的硬币和要找的零钱数，计算出使用最少的硬币找零的组合。
// 例：硬币面额：d1=1, d2=2, d3=5, d4=10, d5=50，要找零36，怎么组合所需的硬币最少

class MinCoinChange {
    // 构造函数中接收硬币面额 [1, 2, 5, 10, 50]
    constructor(coins) {
        this.coins = coins;
        this.cache = {};  // 缓存
    }
    // 接收要找零的金额，返回最少硬币数组
    makeChange(amount) {
        if (!amount) {
            return [];
        }
        if (this.cache[amount]) {
            return this.cache[amount];
        }

        // 核心算法
        let min = [],  // 当前可能最优解数组
            newMin = [],  // 新的可能最优解数组
            newAmount;  // 余额
        // 动态规划会求出所有子问题的解，根据子问题的解来解当前问题。
        // 这个循环是每次取出不同的初始额度硬币，来求以这个额度为基础的解
        for (let i = 0; i < this.coins.length; i++) {
            // 基础额度
            let coin = this.coins[i];

            // 减去一个面额，对剩余的面额进行求最少硬币。（剩余面额也就是子问题）
            // 找零肯定要使用某一种硬币，那么就需要从提供的硬币中的每种硬币和其余额的最优解进行组合，得到以这几种不同额度为基础的最优解，再比较它们得到最优解
            newAmount = amount - coin;
            if (newAmount >= 0) {
                // 递归计算剩余面额的最少硬币
                newMin = this.makeChange(newAmount);
            }
            
            // 如果以下条件成立，则说明找到了更优的解。（新数组长度比原数组短）（新余额为0说明上面减去的额度就是解，进入里面将它变成数组赋值给 min）
            if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                // 剩余面额的最少硬币数组连接上基础额度就是最优解
                min = [coin].concat(newMin);
                console.log(`new Min ${min} for ${amount}`)
            }
        }
        // 对最优解进行缓存。不仅是方便下次取另一个数的解，更重要的是在递归计算剩余面额的时候，将剩余面额的解缓存了。
        // 在求解的时候，较小的剩余面额的解可能多次遇到，比如 for 循环中减去一个面额求剩余面额的解，4-2得到2要去求2的解，7-5也会得到2，这时就从缓存取，避免再次求解。
        this.cache[amount] = min;
        return min;
    }
}

const coin = new MinCoinChange([1, 2, 5, 10, 50]);
const res = coin.makeChange(16);
console.log(res);