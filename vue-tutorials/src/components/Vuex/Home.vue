<template>
    <div>
        <Header />
        <Nav />
        <Content />
    </div>
</template>

<script>
import Header from './Header'
import Nav from './Nav'
import Content from './Content'

export default {
    name: 'Home',
    components: { Header, Nav, Content }
}
</script>
