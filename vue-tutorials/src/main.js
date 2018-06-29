// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'

Vue.use(ElementUI)

Vue.config.productionTip = false // 关闭生产模式下给出的提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }, // 注册引入的 App.vue 组件
  template: '<App/>', // 将 id="app" 的元素渲染为 <App/> 组件
  router,
  store
})
