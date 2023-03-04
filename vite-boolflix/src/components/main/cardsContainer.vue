<script>
import movieCard from './movieCard.vue'
import personCard from './personCard.vue'
export default {
    props: {
        itemsData: Object
    },
    components: {
        movieCard,
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
        <section class="movies" v-if="itemsData.currentMovies.length">
            <span class="sectionTitle">Film</span>
            <movieCard v-for="(card, index) in itemsData.currentMovies" :card-data="card" :store="itemsData" :index="index"/> <br>
        </section>
        <section class="tv" v-if="itemsData.currentTV.length">
            <span class="sectionTitle">TV Series</span>
            <movieCard v-for="card in itemsData.currentTV" :card-data="card" /> <br>
        </section>
        <section class="person" v-if="itemsData.currentPerson.length">
            <span class="sectionTitle">Peoples</span>
            <personCard v-for="card in itemsData.currentPerson" :card-data="card" /> <br>
        </section>
    </div>

    


</template>

<style lang="scss" scoped>
    .container {
        box-sizing: border-box;
        width: 95%;
        margin: auto;
        justify-content: left;
        padding: 2rem;
        padding: 5rem 2rem 7rem;
        .sectionTitle {
            width: 100%;
            margin: 1rem;
            font-size: 2rem;
            opacity: .7;
        }
        section {
            display: flex;
            flex-wrap: wrap;
        }
    }

</style>
