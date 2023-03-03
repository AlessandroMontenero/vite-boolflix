<script>
import hero from './hero.vue'
import cardsContainer from './cardsContainer.vue'
export default {
    props: {
        itemsData: Object
    },
    components: {
        hero,
        cardsContainer
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
        <hero />
        <cardsContainer :items-data="itemsData" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        background-color: rgb(30, 30, 30);
        color: white;
    }
</style>
