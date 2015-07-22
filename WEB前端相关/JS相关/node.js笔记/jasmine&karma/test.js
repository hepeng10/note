// test.js对源文件进行单元测试
// describe()第一个参数是单元测试的描述，第二个参数是个回调函数
describe("A suite of basic functions", function() {
    var name;
    // 使用it()进行测试，第一个参数是这个测试的名称（自定义）；第二个参数是个fn，里面编写具体测试代码
    it("sayHello", function() {
        name = "Conan";
        var exp = "Hello Conan";
        // expect()里的值是我们期望得到的结果；toEqual()运行自己的js函数得到一个结果，equal表示期望得到的结果与测试的结果相等
        expect(exp).toEqual(sayHello(name));
    });
    // 使用多个it()进行多个测试
    it("reverse word",function(){
        expect("DCBA").toEqual(reverse("ABCD"));
        expect("abc").toEqual(reverse("cba"));
    });
});
// 异步测试
describe("Asynchronous specs", function() {
    var value;
    beforeEach(function(done) {
        setTimeout(function() {
          value = 0;
          done();
        }, 1);
    });
    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });
});