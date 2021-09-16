<template>
  <div>
    <!-- 通过 v-bind 将父组件的 data 数据传递给子组件 -->
    <Life :text="msg" v-if="show" />
    <br>
    <!-- 修改传给子组件的数据会触发子组件的 beforeUpdate 和 updated -->
    <input type="text" v-model="msg">
    <br>
    <br>
    <button @click="changeLifeShow">切换子组件显示状态</button>
  </div>
</template>

<script>
import Life from './Life'

export default {
  name: 'UseComponent',
  components: { Life },
  data () {
    return {
      msg: 'props message',
      show: true
    }
  },
  methods: {
    changeLifeShow () {
      this.show = !this.show
    }
  }
}
</script>
