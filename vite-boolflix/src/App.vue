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
        store.showResearch = 0
        store.currentMovies = []
        store.currentPerson = []
        store.currentTV = []
        store.currentLang = research.lang
        store.moviesToShow= 16
        store.tvToShow= 16
        store.peoplesToShow= 6
        axios.get(store.base_url + '/genre/movie/list?api_key=' + store.api_key +'&language='+research.lang)
        .then(function (response){
          store.allMovieCategories = response.data.genres
          axios.get(store.base_url + 'search/multi?api_key=' + store.api_key + '&query=' + research.query +'&page=1&language=' + research.lang)
          .then(function (response) {
            for (let pages = 1; pages <= response.data.total_pages; pages++) {
              axios.get(store.base_url + 'search/multi?api_key=' + store.api_key + '&query=' + research.query +'&page=' + pages+ '&language=' + research.lang)
              .then(function (response){
                let i = 0
                for (let newItem of response.data.results) {
                  if (newItem.media_type == "movie") {
                      let thisMovieCategories = []
                      for (let genre of store.allMovieCategories){
                        for (let thisGenre of newItem.genre_ids) {
                          if (thisGenre == genre.id) {
                            thisMovieCategories.push(genre.name)    
                          } 
                        }
                      }
                      newItem['genre'] = thisMovieCategories
                      newItem['index'] = i
                      
                      let thisMovieID = newItem.id
                      axios.get(store.base_url + 'movie/' + thisMovieID + '/videos?api_key=' + store.api_key + '&language=' + research.lang)
                      .then(function (response) {
                        if (response.data.results[0]) {
                          newItem['url'] = 'https://www.youtube.com/embed/' + response.data.results[0].key
                        }
                        else {
                          axios.get(store.base_url + 'movie/' + thisMovieID + '/videos?api_key=' + store.api_key)
                          .then(function (response){
                            if (response.data.results[0]) {
                              newItem['url'] = 'https://www.youtube.com/embed/' + response.data.results[0].key
                            }
                          })
                        }
                      })
                      
                      store.currentMovies.push(newItem)
                      i++
                    
                  }
                  
                  else if (newItem.media_type == "tv") {
                    axios.get(store.base_url + 'tv/' + newItem.id + '?api_key=' + store.api_key + '&language='+  research.lang)
                    .then(function (response){
                      axios.get(store.base_url + 'tv/' + newItem.id + '/videos?api_key=' + store.api_key + '&language=' + research.lang)
                      .then(function (response) {
                        if (response.data.results.length){
                          newItem['url'] = 'https://www.youtube.com/embed/' + response.data.results[0].key
                        }
                      })
                      newItem['number_of_seasons'] = response.data.number_of_seasons
                    })
                    store.currentTV.push(newItem)
                  }
                  else if (newItem.media_type == "person") {
                    store.currentPerson.push(newItem)
                  }
                  
                  if (store.currentMovies.length || store.currentPerson.length || store.currentTV.length) {
                    console.log(store)
                    console.log(response.data.total_results)
                    console.log(store.currentMovies.length + store.currentPerson.length + store.currentTV.length)
                    
                    if (store.currentMovies.length + store.currentPerson.length + store.currentTV.length == response.data.total_results) {
                      store.currentMovies.sort((movie1, movie2)=> (movie1.popularity > movie2.popularity) ? -1 : (movie1.popularity < movie2.popularity) ? 1 : 0)
                      store.currentTV.sort((tv1, tv2)=> (tv1.popularity > tv2.popularity) ? -1 : (tv1.popularity < tv2.popularity) ? 1 : 0)
                      store.currentPerson.sort((person1, person2)=> (person1.popularity > person2.popularity) ? -1 : (person1.popularity < person2.popularity) ? 1 : 0)

                      store.showResearch = 1
                    }

                  }
                  
                }
              })
            }
          })
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

#app {
  width: 100%;
  height: 100vh;
}
</style>
