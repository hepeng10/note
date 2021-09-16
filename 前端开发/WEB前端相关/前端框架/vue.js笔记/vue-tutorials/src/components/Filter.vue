<template>
  <div>
    {{ msg | upper | sub(5) }}
  </div>
</template>

<script>
export default {
  name: 'Filter',
  data () {
    return {
      msg: 'hello world'
    }
  },
  // 创建过滤器
  filters: {
    upper (val) {
      return val.toUpperCase()
    },
    // 第一个参数为变量值，是默认参数，定义接收的参数从第二个开始
    sub (val, length) {
      return val.substring(0, length)
    }
  }
}
</script>
