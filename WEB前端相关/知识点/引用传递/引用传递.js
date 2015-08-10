var a=[1,2,3];
var b=a;
b.push(4);
alert(b);  //1,2,3,4
alert(a);  //1,2,3,4



var a=[1,2,3];
var b=a;
b=[1,2,3,4];  //重新给b赋值会切断引用关系
alert(b);  //1,2,3,4
alert(a);  //1,2,3



var obj={a:10};
var obj2=obj;
obj2.a=20;
alert(obj.a);  //20
// 封装对象复制函数
function copy(obj){  //浅拷贝：只有一层，对于对象里面嵌套对象会出现问题
    var newObj={};
    for(var attr in obj){
        newObj[attr]=obj[attr];  //遍历对象，将每个属性赋值给新的对象
    }
    return newObj;
}
var obj2=copy(obj);
obj2.a=20;
alert(obj.a);  //10
// 深拷贝：通过递归进行拷贝
function deepCopy(obj){
    if(typeof obj!='objct'){  //递归终止条件：当属性不为对象，则直接返回，否则进行拷贝
        return obj;
    }
    var newObj={};
    for(var attr in obj){
        newObj[attr]=deepCopy(obj[attr]);  //递归拷贝
    }
    return newObj;
}