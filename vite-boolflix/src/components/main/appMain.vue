<script>
import home from './homeContainer.vue'
import researchContainer from './researchContainer.vue'
import loading from './loading.vue'
export default {
    props: {
        itemsData: Object
    },
    components: {
        home,
        researchContainer,
        loading
    },
    data() {
        return {
        }
    },
    created() {
    }
}
</script>

<template>
    <main>
        <home v-if="!itemsData.loading && itemsData.showHome"/>
        <researchContainer :items-data="itemsData" v-if="!itemsData.loading && !itemsData.showHome"/>
        <loading v-if="itemsData.loading" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        background-color: rgb(30, 30, 30);
        color: white;
        min-height: 100vh;
        padding-top: 10vh;
    }
</style>
