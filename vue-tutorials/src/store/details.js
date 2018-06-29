export default {
    namespaced: true,
    state: {
        people: 5000,
        project: 100,
        money: 1000
    },
    getters: {
        assessment (state) {
            return state.money * 10
        }
    },
    mutations: {
        changeDetails (state, data) {
            state.people = data.people
            state.project = data.project
        }
    },
    actions: {
        changeDetails ({ commit }) {
            setTimeout(() => {
                const data = {
                    people: 8000,
                    project: 200
                }
                commit('changeDetails', data);
            }, 1000);
        }
    }
}