import { setTimeout } from "timers";

export default {
    // namespaced 参数开启命名空间
    namespaced: true,
    state: {
        name: '百度',
        addr: '中国'
    },
    mutations: {
        changeBase (state, { name, addr }) {
            name && (state.name = name)
            addr && (state.addr = addr)
        }
    },
    actions: {
        changeBase ({ commit }) {
            setTimeout(() => {
                // 异步请求得到的数据
                const data = {
                    name: '腾讯',
                    addr: '深圳'
                }
                commit('changeBase', data)
            }, 1000);
        }
    }
}