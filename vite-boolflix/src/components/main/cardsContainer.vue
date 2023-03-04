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
    data() {
        return {
            moviesToShow: 16,
            tvToShow: 16,
            peoplesToShow: 6,
        }
    }
}
</script>

<template>
    <div class="container">
        <section class="movies" v-if="itemsData.currentMovies.length">
            <span class="sectionTitle">Film</span>
            <movieCard v-for="(card, index) in itemsData.currentMovies" :card-data="card" :store="itemsData" :index="index" v-show="index <= moviesToShow"/> <br>
            <div v-show="itemsData.currentMovies.length >= moviesToShow" class="showMore" @click="moviesToShow += 18"> 
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i></div>
        </section>
        <section class="tv" v-if="itemsData.currentTV.length">
            <span class="sectionTitle">TV Series</span>
            <movieCard v-for="(card, index) in itemsData.currentTV" :card-data="card" v-show="index <= tvToShow" /> 
            <div v-show="itemsData.currentTV.length >= tvToShow" class="showMore" @click="tvToShow += 18"> 
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i></div>

        </section>
        <section class="person" v-if="itemsData.currentPerson.length" >
            <span class="sectionTitle">Peoples</span>
            <personCard v-for="(card, index) in itemsData.currentPerson" :card-data="card" v-show="index <= peoplesToShow"/>
            <div v-show="itemsData.currentPerson.length >= peoplesToShow" class="showMorePeople" @click="peoplesToShow += 8">
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i>
            </div>
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
            .showMore {
                    width: calc(95% / 6);
                    margin-right: 10px;
                    margin-bottom: 3rem;
                    aspect-ratio: 12 / 7.5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
            }
            .showMorePeople {
                width: calc(95% / 4);
                margin-bottom: 1rem;
                aspect-ratio: 12 / 5;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

</style>
