<template>
  <div>
    <!-- el-input 的 keyup 事件需要 .native -->
    <el-input v-model="msg" @keyup.enter.native="goback" />
    <el-button type="primary">{{ msg }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'ElementUI',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    goback() {
      // vue-router 使用 js 跳转
      this.$router.push(this.msg)
    }
  }
}
</script>
