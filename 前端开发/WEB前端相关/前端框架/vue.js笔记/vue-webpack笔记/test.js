// 引入vue
var Vue=require('vue');

// 引入组件，打包这个js的时候，也会通过vue-loader对引入的.vue文件进行编译打包
var test=require('./test.vue');

// 注册引入的组件，组件名不能有大写
Vue.component('test-component',test);

// 自己的vue代码
var vm=new Vue({
    el:"#test",
    data:{
        msg:"Hello World"
    }
})