<template>
  <div>
    <p>a:{{ a }}</p>
    <p>b:{{ b }}</p>
    <p>c:{{ c }}</p>
    <button @click="app">a++</button>
    <p>obj.x:{{ obj.x }}</p>
    <p>y:{{ y }}</p>
    <button @click="xpp">obj.x++</button>
  </div>
</template>

<script>
export default {
  name: 'ComputedWatch',
  data () {
    return {
      a: 1,
      c: 0,
      obj: {
        x: 1
      },
      y: 0
    }
  },
  // 计算属性
  computed: {
    // b 的值为 a * 10
    b () {
      return this.a * 10
    }
  },
  // 监听器
  watch: {
    // a 发生改变执行
    a (newA, oldA) {
      console.log(newA, oldA)
      this.c = newA * 100
    },
    // watch 对象中的属性
    'obj.x': {
      handler (val) {
        this.y = val + 1
      }
    }
  },
  methods: {
    app () {
      this.a++
    },
    xpp () {
      this.obj.x++
    }
  }
}
</script>
