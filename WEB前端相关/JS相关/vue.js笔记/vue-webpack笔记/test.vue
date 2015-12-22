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

<!-- 组件中的模版 -->
<template>
    <div class="test">
        {{msg}} Tirion
        <p>这是个组件</p>
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