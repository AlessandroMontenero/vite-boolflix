<script>
import home from './home.vue'
import researchContainer from './researchContainer.vue'
export default {
    props: {
        itemsData: Object
    },
    components: {
        home,
        researchContainer
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
        <home />
        <researchContainer :items-data="itemsData" v-if="itemsData.showResearch"/>
    </main>
</template>

<style lang="scss" scoped>
    main {
        background-color: rgb(30, 30, 30);
        color: white;
        min-height: 90vh;
        padding-top: 2rem;
    }
</style>
