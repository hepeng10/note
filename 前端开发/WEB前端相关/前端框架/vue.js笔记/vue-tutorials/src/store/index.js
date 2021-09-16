import Vue from 'vue'
import Vuex from 'vuex';

import base from './base'
import details from './details.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false
    },
    // mutation 是用来修改 state 的方法，必须是同步函数
    mutations: {
        changeLoading (state, status) {
            if (status !== undefined) {
                state.loading = status
            } else {
                state.loading = !state.loading
            }
        }
    },
    // action 主要用来做异步操作的
    actions: {
        // 接收一个与 store 实例相同的 cxt
        getData (cxt) {
            setTimeout(() => {
                cxt.commit('CHANGE_LOADING');
            }, 1000);
        }
    },
    modules: {
        base,
        details
    }
});

export default store