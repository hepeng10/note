<!-- 这是自定义的组件，.vue的文件都是自定义组件 -->

<!-- 组件中的CSS -->
<style lang="less">
    .test{
        margin:100px;
        font-size:50px;
        p{
            color:red;
        }
    }
</style>
<!-- 加了scoped属性的style标签，里面的样式只对此组件有效；没加scoped的可能会对其它页面或组件造成影响 -->
<style lang="less" scoped>
    a{
        color:black;
        text-decoration:none;
    }
</style>

<!-- 组件中的模版 -->
<template>
    <div class="test">
        {{msg}} Tirion
        <p id="text">这是个组件<a>呵呵</a></p>
    </div>
</template>

<!-- 组件中的vue代码，这里的exports必须加上module。这是个.vue文件，并不是.js模块 -->
<script>
    module.exports={
        data:function(){
            return {
                msg:"I am"
            }
        }
    }
</script>