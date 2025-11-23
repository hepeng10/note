# defineModel
需求是对一个switch组件进行二次封装，switch组件接收v-model绑定switch的状态，封装后子组件需要从父组件接收props然后通过v-model传给孙子switch组件。如果props只用普通的方式传递，则无法双向绑定，所以需要父组件通过v-model将双向绑定的值传给子组件，子组件再传给孙子switch组件。但是子组件接收v-model传参在vue3.4之前需要使用defineEmits定义，然后通过emit触发，才能实现v-model功能。在3.4后实现了defineModel方法能简化这个过程。
父组件：
```html
<template>
  <div>
    <p>父组件 sw 值: {{ sw }}</p>
    <!-- 这里使用了具名 v-model，这样可以传递绑定多个v-model。子组件需要通过 defineModel 定义 switch 模型 -->
    <ChildComponent v-model:switch="sw" />
    <!-- 只有一个时可以这样传，不传名称 -->
    <ChildComponent v-model="sw" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const sw = ref(false)
</script>
```
子组件：
```html
<template>
  <div>
    <p>子组件接收的值: {{ sw }}</p>
    <GrandChildComponent v-model="model" />
  </div>
</template>

<script setup>
// 子组件通过 defineModel 定义 v-model:switch 模型
const sw = defineModel('switch', {
  type: Boolean,
  default: false,
});
// 只有一个时可以这样定义，不需要指定模型名
const sw = defineModel({
  type: Boolean,
  default: false,
});
</script>
```