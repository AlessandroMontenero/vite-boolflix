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
        axios.get(store.base_url + '/genre/movie/list?api_key=' + store.api_key +'&language='+research.lang)
        .then(function (response){
          store.allMovieCategories = response.data.genres
          axios.get(store.base_url + 'search/multi?api_key=' + store.api_key + '&query=' + research.query +'&page=1&language=' + research.lang)
          .then(function (response) {
                let i = 0
                for (let newItem of response.data.results) {
                  if (newItem.media_type == "movie") {
                    if (newItem.backdrop_path){
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

                      store.currentMovies[i] = newItem
                      i++
                    }
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
