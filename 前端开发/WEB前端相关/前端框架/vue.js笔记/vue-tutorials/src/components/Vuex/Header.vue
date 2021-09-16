<template>
    <div class="border">
        <p class="title">Header</p>
        <p>{{ name }} -- {{ addr }}</p>
        <p>{{ money }}</p>
    </div>
</template>

<script>
// mapXxx 辅助函数，来获取 store 里的数据
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapState('base', ['name', 'addr']),
        ...mapState('details', ['money']),
    }
}
</script>

