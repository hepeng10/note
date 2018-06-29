<template>
  <div>
    <p v-if="data1">data1 为 true 显示</p>
    <p v-else>data1 为 false 显示</p>
    <br>
    <br>
    <p v-if="data2 < 3">data2 小于3</p>
    <p v-else-if="data2 < 10">data2 小于10</p>
    <p v-else>data2 大于等于10</p>
    <br>
    <br>
    <p v-show="show">v-show 只是修改 display 属性，会被保留在 DOM 中</p>
    <br>
    <input type="radio" id="one" value="username" v-model="loginType">
    <label for="one">Username</label>
    <input type="radio" id="two" value="email" v-model="loginType">
    <label for="two">Email</label>
    <div v-if="loginType === 'username'">
      <label>Username</label>
      <!-- vue 会很大程度的复用元素来提高性能，没有 key 的在切换显示后也会复用。加上 key 来防止复用 -->
      <input placeholder="Enter your username">
      <input placeholder="Enter your username" key="username-input">
    </div>
    <div v-else>
      <label>Email</label>
      <input placeholder="Enter your email address">
      <input placeholder="Enter your email address" key="email-input">
    </div>
  </div>
</template>

<script>
export default {
  name: 'If',
  data () {
    return {
      data1: true,
      data2: 5,
      show: true,
      loginType: 'username'
    }
  }
}
</script>
