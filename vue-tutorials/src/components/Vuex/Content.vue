<template>
    <div class="border">
        <p class="title">Content</p>
        <p>{{ name }} -- {{ addr }}</p>
        <p>{{ people }}</p>
        <p>{{ project }}</p>
        <p>{{ details.money }}</p>
        <p>{{ assessment }}</p>
        <br>
        <p @click="changeVuexState">因为是计算属性，所以不能直接修改 vuex 的 state</p>
        <p>双向绑定（官方没这种写法，但这样确实要简单很多啊！！！）</p>
        <p><input type="text" v-model="details.money"></p>
    </div>
</template>

<script>
// mapXxx 辅助函数，来获取 store 里的数据
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    name: 'Header',
    data() {
        return {
            // 要双向绑定，不能取 store 里的某个具体值，需要取某个子 store 对象，修改对象的属性，别的地方使用了这个对象才能有效
            details: this.$store.state.details
        }
    },
    computed: {
        ...mapState('base', ['name', 'addr']),
        ...mapState('details', ['people', 'project']),
        ...mapGetters('details', ['assessment']),
    },
    methods: {
        changeVuexState () {
            this.name = 'Youtube',
            this.addr = 'America'
        }
    }
}
</script>

