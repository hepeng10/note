import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DataBind from '@/components/DataBind'
import If from '@/components/If'
import For from '@/components/For'
import BindOn from '@/components/BindOn'
import ComputedWatch from '@/components/ComputedWatch'
import Filter from '@/components/Filter'
import UseComponent from '@/components/UseComponent'
import ElementUI from '@/components/ElementUI'
import Vuex from '@/components/Vuex/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dataBind',
      name: 'DataBind',
      component: DataBind
    },
    {
      path: '/if',
      name: 'If',
      component: If
    },
    {
      path: '/for',
      name: 'For',
      component: For
    },
    {
      path: '/bindOn',
      name: 'BindOn',
      component: BindOn
    },
    {
      path: '/computedWatch',
      name: 'ComputedWatch',
      component: ComputedWatch
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/useComponent',
      name: 'UseComponent',
      component: UseComponent
    },
    {
      path: '/elementUI',
      name: 'ElementUI',
      component: ElementUI
    },
    {
      path: '/vuex',
      name: 'Vuex',
      component: Vuex
    }
  ]
})
