<script>
import appHeader from './components/appHeader.vue'
import appMain from './components/main/appMain.vue'
import appFooter from './components/appFooter.vue'
import axios from 'axios'
import { store } from './store.js'


export default {
    components: {
      appHeader,
      appMain,
      appFooter
    },
    data() {
      return {
        store
      }
    },
    methods: {
      newResearch(research){
        store.currentMovies = []
        store.currentPerson = []
        store.currentTV = []
        store.currentLang = research.lang
        axios.get(store.base_url + 'search/multi?api_key=' + store.api_key + '&query=' + research.query +'&page=1&language=' + research.lang)
            .then(function (response) {
              for (let i = 1; i <= response.data.total_pages; i++) {
                axios.get(store.base_url + 'search/multi?api_key=' + store.api_key + '&query=' + research.query +'&page=' + i + '&language=' + research.lang)
                .then(function(response){
                let moviesCategories = []
                let moviesCategoriesIndex = 0
                  for (let newItem of response.data.results) {
                    if (newItem.media_type == "movie") {
                      if (newItem.backdrop_path){
                        store.currentMovies.push(newItem)
                        axios.get(store.base_url + '/genre/movie/list?api_key=' + store.api_key +'&language='+research.lang)
                        .then(function (response){
                          for (let newMovie of store.currentMovies) {
                            let thisMovieCategories = []
                            for (let genre of response.data.genres) {
                              for (let id of newMovie.genre_ids){
                                if (id == genre.id){
                                  thisMovieCategories.push(genre.name)
                                }
                              }
                            }
                            moviesCategories[moviesCategoriesIndex] = thisMovieCategories
                            moviesCategoriesIndex++
                          }
                          store.currentMoviesCategories = moviesCategories
                        })
                      }
                    }
                    else if (newItem.media_type == "tv") {
                      store.currentTV.push(newItem)
                    }
                    else if (newItem.media_type == "person") {
                      store.currentPerson.push(newItem)
                    }
                  }
                })
              }
            })
      }
    },
    created() {
    }
}

</script>

<template>
  <appHeader @new-research="(research)=>newResearch(research)"/>
  <appMain :items-data="store"/>
  <appFooter />
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
}
</style>
