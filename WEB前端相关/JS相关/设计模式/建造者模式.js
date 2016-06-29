建造者模式可以将一个复杂对象的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。也就是说，如果我们用了建造者模式，那么永久就需要指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需要知道了。建造者模式实际就是一个指挥者，一个建造者。指挥者分配任务，建造者进行开发，各司其责稳定在一个大的流程里开发，分步骤构建。
建造者模式主要用于“分步骤构建一个复杂的对象”，在这其中“分步骤”是一个稳定的算法，而复杂对象的各个部分则经常变化。我们平时开发的时候，逻辑模块一旦增多，就需要很好的把控对应模块的职责，建造者模式也是我们大型项目必经的一步。

模式作用：
1、分步创建一个复杂的对象
2、解耦封装过程和具体创建的组件
3、无需关心组件如何组装
注意事项：
1、一定要一个稳定的算法进行支撑
2、加工工艺是暴露的



// JQ的$.ajax就是个建造者模式
$.ajax({
    url:'a.php',
    success:function(data){

    }
});

// 1.产出的东西是房子
// 2.包工头调用工人进行施工，而且他要很清楚工人们具体的某一个大项
// 3.工人是盖房子的，工人可以建卧室，建客厅，建厨房
function fangzi(){
    this.woshi='';
    this.keting='';
    this.chufang='';
}

function baogongtou(){
    this.gaifangzi=function(gongren){
        gongren.jian_woshi();
        gongren.jian_keting();
        gongren.jian_chufang();
    }
}

function gongren(){
    this.jian_woshi=function(){
        console.log('卧室盖好了');
    }
    this.jian_keting=function(){
        console.log('客厅建好了')
    }
    this.jian_chufang=function(){
        console.log('厨房建好了')
    }
    this.jiaogong=function(){
        var _fangzi=new fangzi();
        _fangzi.woshi='ok';
        _fangzi.keting='ok';
        _fangzi.chufang='ok';
        return _fangzi;
    }
}

var gongren=new gongren;
var baogongtou=new baogongtou();
baogongtou.gaifangzi(gongren);
var fangzi=gongren.jiaogong();
console.log(fangzi)