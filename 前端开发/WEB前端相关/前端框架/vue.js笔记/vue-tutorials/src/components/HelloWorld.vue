<!--
  设置 lang 来使用 css 预处理器，但是 vue-cli 默认没有安装预处理器，需要自己安装：npm install sass-loader node-saa --save-dev
  设置 scoped 表示局部样式，只有此组件有效
-->
<style lang="scss" scoped>
.hello {
  h1 {
    font-weight: normal;
  }
}
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p><router-link to="dataBind">双向绑定</router-link></p>
    <p><router-link to="if">条件判断</router-link></p>
    <p><router-link to="for">循环</router-link></p>
    <p><router-link to="bindOn">v-bind & v-on</router-link></p>
    <p><router-link to="computedWatch">computed & watch</router-link></p>
    <p><router-link to="filter">过滤器</router-link></p>
    <p><router-link to="useComponent">使用组件 & 生命周期</router-link></p>
    <p><router-link to="elementUI">使用 Element UI</router-link></p>
    <p><router-link to="vuex">Vuex</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
