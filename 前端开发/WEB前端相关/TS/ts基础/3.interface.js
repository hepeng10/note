function createSquare(config) {
    var _a = config.color, color = _a === void 0 ? 'red' : _a, width = config.width, _b = config.borderColor, borderColor = _b === void 0 ? 'black' : _b;
    // config.borderColor = 'yellow';  // 不能对只读属性进行修改
    return { color: color, area: width * width, borderColor: borderColor };
}
createSquare({ color: 'blue', width: 200, borderColor: 'black' });
createSquare({ width: 300 }); // 接口中定义 color 是可选的，所以可以不用传
createSquare({ color: 'blue', width: 200, borderColor: 'black', radius: 10, other: 'xxx' }); // 传入额外的数据。接口中必须定义索引签名
var mySearch; // 创建函数的时候要先声明函数类型，再实现函数
// 实现时，参数名不用保持一致，但是数目和类型要一致
mySearch = function (source, sub) {
    var res = source.search(sub);
    return res > -1;
};
// 不写类型，TS 会自动推断
mySearch = function (source, sub) {
    var res = source.search(sub);
    // return res;  // 返回值不是布尔值，也会过不了类型推断
    return res > -1;
};
var myArr = ['a', 'b', 'c'];
var MyClock = /** @class */ (function () {
    function MyClock() {
    }
    MyClock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return MyClock;
}());
var createClock = function (Con, h, m) {
    return new Con(h, m);
};
createClock(MyClock, 10, 20);
