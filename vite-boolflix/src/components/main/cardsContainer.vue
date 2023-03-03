<script>
import movieCard from './movieCard.vue'
import tvCard from './tvCard.vue'
import personCard from './personCard.vue'
export default {
    props: {
        itemsData: Object
    },
    components: {
        movieCard,
        tvCard,
        personCard
    },
    methods: {
    },
    created() {
    }
}
</script>

<template>
    <div class="container">
        <movieCard v-for="(card, index) in itemsData.currentMovies" :card-data="card" :store="itemsData" :index="index"/> <br>
    </div>
        serie tv
        <tvCard v-for="card in itemsData.currentTV" :card-data="card" /> <br>
        persone
        <personCard v-for="card in itemsData.currentPerson" :card-data="card" /> <br>
    film


</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        width: 95%;
        margin: auto;
        justify-content: left;
        padding: 2rem;
        padding-top: 5rem;
    }

</style>
