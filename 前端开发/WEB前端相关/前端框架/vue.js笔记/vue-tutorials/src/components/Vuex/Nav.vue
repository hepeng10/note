<style lang="scss" scoped>
    .pointer {
        margin-left: 50px;
    }
</style>


<template>
    <div class="border">
        <p class="title">Nav</p>
        <span
            class="pointer"
            @click="changeInfo({ name: 'Google', addr: '美国', people: 6000, project: 120 })"
        >
            Google
        </span>
        <span
            class="pointer"
            @click="changeInfo({ name: '阿里巴巴', addr: '中国', people: 7000, project: 150 })"
        >
            阿里巴巴
        </span>
        <span class="pointer" @click="changeInfoAsync">异步请求-腾讯</span>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Nav',
    methods: {
        ...mapMutations('base', ['changeBase']),
        ...mapMutations('details', ['changeDetails']),
        // mapXxx 第二个参数，可以使用对象的形式来取别名
        ...mapActions('base', { changeBaseAsync: 'changeBase' }),
        ...mapActions('details', { changeDetailsAsync: 'changeDetails' }),
        changeInfo (data) {
            const { name, addr, people, project } = data
            this.changeBase({ name, addr })
            this.changeDetails({ people, project })
        },
        changeInfoAsync () {
            this.changeBaseAsync()
            this.changeDetailsAsync()
        },
    }
}
</script>

