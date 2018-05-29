// 采用贪心算法：贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）。
// 贪心是求局部最优，但不一定是全局最优。而动态规划一定是最优解。

class MinCoinChange {
    // 构造函数中接收硬币面额 [1, 2, 5, 10, 50]
    constructor(coins) {
        this.coins = coins;
    }
    makeChange(amount) {
        let change = [],
            total = 0;
        // 从大到小取。尽可能拿大的硬币，如果大的硬币放进去超过找零金额，则取较小的硬币
        for (let i = this.coins.length; i >= 0; i--) {
            const coin = this.coins[i];
            // 当取出的硬币加上之前取的硬币总额小于等于要找的金额，则取出此硬币
            while (total + coin <= amount) {
                change.push(coin);
                total += coin;
            }
        }
        return change;
    }
}

const coin = new MinCoinChange([1, 2, 5, 10, 50]);
const res = coin.makeChange(16);
console.log(res);

// 如果硬币为 [1, 3, 4] 找6，则贪心算法结果为 [4, 1, 1]，而动态规划为 [3, 3]。所以贪心算法不一定是最优解。但是贪心算法更简单，更快，在计算量大，而准确度没硬性要求的时候，贪心算法输出了一个可以接受的解。