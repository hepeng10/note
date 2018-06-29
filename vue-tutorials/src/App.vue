<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 展示路由页面内容 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App' // 组件的名字。用于方便调试，比如在 vue-devtolls 中
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-input {
  width: 200px;
}
.border {
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
.pointer {
  cursor: pointer;
}
.title {
  font-size: 22px;
  font-weight: bold;
}
</style>
