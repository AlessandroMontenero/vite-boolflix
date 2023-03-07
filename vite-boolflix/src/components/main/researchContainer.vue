<script>
import movieCard from './movieCard.vue'
import personCard from './personCard.vue'
import bigCard from './bigCard.vue'
import { store } from '../../store';

export default {
    props: {
        itemsData: Object
    },
    components: {
        movieCard,
        personCard,
        bigCard
    },
    data() {
        return {
            store,
            sortType: 'popular',
            bigCardIndex: 0,
            bigMovieCardShow: false,
            bigTVCardShow: false,
            sortOptions: [
                { text: 'Most Popular', value: 'popular' },
                { text: 'Name', value: 'name' },
                { text: 'Latest', value: 'latest' }
            ]
        }
    },
    created() {
        this.sortBy(this.sortType)
    },
    methods: {
        handleExpanded(response) {
            this.bigCardIndex = response
            if (this.bigCardIndex.type == 'movie'){
                this.bigMovieCardShow = true
            }
            if (this.bigCardIndex.type == 'tv'){
                this.bigTVCardShow = true
            }
        },
        sortBy(sortType) {
            if (sortType == 'popular') {
                store.currentMovies.sort((movie1, movie2)=> (movie1.popularity > movie2.popularity) ? -1 : (movie1.popularity < movie2.popularity) ? 1 : 0)
                store.currentTV.sort((tv1, tv2)=> (tv1.popularity > tv2.popularity) ? -1 : (tv1.popularity < tv2.popularity) ? 1 : 0)
                store.currentPerson.sort((person1, person2)=> (person1.popularity > person2.popularity) ? -1 : (person1.popularity < person2.popularity) ? 1 : 0)
            }
            if (sortType == 'name') {
                store.currentMovies.sort((movie1, movie2)=> (movie1.title < movie2.title) ? -1 : (movie1.title > movie2.title) ? 1 : 0)
                store.currentTV.sort((tv1, tv2)=> (tv1.name < tv2.name) ? -1 : (tv1.name > tv2.name) ? 1 : 0)
                store.currentPerson.sort((person1, person2)=> (person1.name < person2.name) ? -1 : (person1.name > person2.name) ? 1 : 0)
            }
            if (sortType == 'latest') {
                store.currentTV.sort((tv1, tv2)=> {
                    return tv2.first_air_date.localeCompare( tv1.first_air_date)
                })
                this.itemsData.currentMovies.sort((movie1, movie2)=> {
                    return movie2.date.localeCompare( movie1.date)
                })
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="selectWrapper">
            <select name="sortBy" id="sortBy" @change="sortBy(sortType)" v-model="sortType">
                <option v-for="item in sortOptions" :value="item.value">{{item.text}}</option>
            </select>
        </div>
        <section class="movies" v-if="itemsData.currentMovies.length">
            <span class="sectionTitle">Film</span>
            <movieCard v-for="(card, index) in itemsData.currentMovies" :card-data="card" :index="index" v-show="index <= itemsData.moviesToShow" @expanded="handleExpanded"/> <br>
            <Transition>
                <bigCard :big-card-data="itemsData.currentMovies[bigCardIndex.index]" v-if="bigMovieCardShow" @close-card="bigMovieCardShow = false"/>
            </Transition>
            <div v-if="itemsData.currentMovies.length > itemsData.moviesToShow" class="showMore" @click="itemsData.moviesToShow += 18"> 
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i></div>
        </section>
        <section class="tv" v-if="itemsData.currentTV.length">
            <span class="sectionTitle">TV Series</span>
            <movieCard v-for="(card, index) in itemsData.currentTV" :card-data="card" :index="index" v-show="index <= itemsData.tvToShow" @expanded="handleExpanded"/> 
            <Transition>
            <bigCard :big-card-data="itemsData.currentTV[bigCardIndex.index]" v-if="bigTVCardShow" @close-card="bigTVCardShow = false"/>
            </Transition>
            <div v-if="itemsData.currentTV.length > itemsData.tvToShow" class="showMore" @click="itemsData.tvToShow += 18"> 
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i></div>

        </section>
        <section class="person" v-if="itemsData.currentPerson.length" >
            <span class="sectionTitle">Peoples</span>
            <personCard v-for="(card, index) in itemsData.currentPerson" :card-data="card" v-show="index <= itemsData.peoplesToShow"/>
            <div v-if="itemsData.currentPerson.length > itemsData.peoplesToShow" class="showMorePeople" @click="itemsData.peoplesToShow += 8">
                SHOW MORE
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </section>
    </div>

    


</template>

<style lang="scss" scoped>

.v-enter-active,
.v-leave-active {
    transform: translateY(0vh);
  transition: all .2s linear;
}

.v-enter-from {
    transform: translateY(60vh);

}
.v-leave-to {
  opacity: 0;
  transform: translateY(60vh);
}
    .selectWrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        select {
            background-color: rgb(20, 20, 20);
            color: white;
            padding: .6rem;
            opacity:  .7;
        }
    }
    .container {
        width: 90%;
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
