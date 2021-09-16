<style lang="scss" scoped>
  p {
    color: blue;
    cursor: pointer;
  }
  .in {
    color: red;
  }
  .active {
    color: red;
  }
  .underline {
    text-decoration: underline;
  }
</style>

<template>
  <div>
    <!-- 使用 v-bind 指令绑定 HTML 属性。可以简写为 : -->
    <p><a v-bind:href="url1.href" target="_blank">{{ url1.text }}</a></p>
    <p><a :href="url2.href" target="_blank">{{ url2.text }}</a></p>
    <p class="underline" :class="{ active: isActive }">绑定 class</p>
    <p :style="{ color: color }">绑定 style</p>
    <!-- 使用 v-on 指令绑定事件。可以简写为 @ -->
    <p v-on:click="changeUrl1">修改地址1</p>
    <p @click="changeUrl2({ href: '//google.com', text: 'Google2' })">修改地址2</p>

    <!--
      事件修饰符：
      stop 组织冒泡
      capture 阻止传播
      prevent 阻止默认事件
      self 只执行自身事件（比如冒泡上来的不会执行）
      once 只执行一次
      -->
    <p @click="outClick">外部事件<span class="in" @click="inClick">内部事件</span></p>
    <p @click="outClick">外部事件<span class="in" @click.stop="inClick">内部事件</span></p>
    <p @click.self="outClick">外部事件<span class="in" @click="inClick">内部事件</span></p>
    <p @click.once="outClick">外部事件<span class="in" @click.once="inClick">内部事件</span></p>

    <!-- 按键修饰符。为一些常用 keyCode 提供了别名 -->
    <p><input type="text" @keyup.13="submit" /><span @click="submit">提交</span></p>
    <p><input type="text" @keyup.enter="submit" /><span @click="submit">提交</span></p>
  </div>
</template>

<script>
export default {
  name: 'If',
  // data 必须是函数，而不能是对象。因为组件可能多处使用，如果设计为对象，那就会导致所有组件公用数据。而设计为函数，返回一个对象，组件在不同地方使用时就是相互独立的数据了。
  data () {
    return {
      url1: {
        href: '//baidu.com',
        text: '百度1'
      },
      url2: {
        href: '//baidu.com',
        text: '百度2'
      },
      isActive: true,
      color: 'pink'
    }
  },
  // methods 里定义方法。注意：methods 里的方法不能与 data 里数据重名，否则数据会覆盖方法。
  methods: {
    changeUrl1 (e) {
      console.log(e.target)
      // 使用 this.xxx 来访问 data 里的数据
      this.url1 = { href: '//google.com', text: 'Google1' }
    },
    changeUrl2 (url) {
      this.url2 = url
    },

    outClick () {
      console.log('out')
    },
    inClick () {
      console.log('in')
    },

    submit () {
      console.log('submit')
    }
  }
}
</script>
