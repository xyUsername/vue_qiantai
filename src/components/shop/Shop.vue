<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
        import appHeader from './subcom/Header'
    export default {
        components: {
            appHeader
        }
    }
</script>

<style scoped>

</style>