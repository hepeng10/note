<style lang="scss" scoped>
  .container {
    padding: 20px;
    border: 1px solid black;
  }
</style>

<template>
  <div class="container">
    <p>子组件</p>
    <span>{{ msg }}</span>
    <!-- 修改自身状态会触发 beforeUpdate 和 updated -->
    <input type="text" v-model="msg">
    <br>
    <br>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Life',
  props: {
    text: { 'default': 'helloword' }
  },
  data () {
    return {
      msg: 'self message'
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>
