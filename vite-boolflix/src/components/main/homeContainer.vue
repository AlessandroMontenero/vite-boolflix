<script>
    import { store } from '../../store';
    import movieCard from './movieCard.vue'
    import bigCard from './bigCard.vue';
    import axios from 'axios'
    export default {
        components: {
            movieCard,
            bigCard
        },
        data(){
            return {
                store,
                bigCardIndex: 0,
            bigTrendingCardShow: false,
            bigNowPlayingCardShow: false,
            }
        },
        created(){
            axios.get(store.base_url + '/trending/all/week?api_key=' + store.api_key +'&language='+ store.currentLang)
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
                      axios.get(store.base_url + 'movie/' + thisMovieID + '/videos?api_key=' + store.api_key + '&language=' + store.currentLang)
                      .then(function (response) {
                        axios.get(store.base_url + 'movie/'+ thisMovieID +'/credits?api_key=' + store.api_key + '&language=' + store.currentLang)
                        .then(function(response){
                            newItem['cast'] = response.data.cast
                            for (let member of response.data.crew) {
                              let direction = ''
                                if (member.job == 'Director') {
                                    direction += member.name + ' '
                                    newItem['director'] = direction
                                }
                            }
                        })
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
                      axios.get(store.base_url + 'movie/' + thisMovieID + 'release_dates?api_key=' + store.api_key)
                      .then(function(response){
                        newItem['date'] = response.data.release_date
                      })
                      store.home.trending.push(newItem)
                      i++
                    
                  }
                  
                  else if (newItem.media_type == "tv") {
                    let thisTVCategories = []
                    for (let genre of store.allTVCategories){
                        for (let thisGenre of newItem.genre_ids) {
                          if (thisGenre == genre.id) {
                            thisTVCategories.push(genre.name)    
                          } 
                        }
                        newItem['genre'] = thisTVCategories
                      }
                    axios.get(store.base_url + 'tv/' + newItem.id + '?api_key=' + store.api_key + '&language='+  store.currentLang)
                    .then(function (response){
                      axios.get(store.base_url + 'tv/' + newItem.id + '/videos?api_key=' + store.api_key + '&language=' + store.currentLang)
                      .then(function (response) {
                        if (response.data.results.length){
                          newItem['url'] = 'https://www.youtube.com/embed/' + response.data.results[0].key
                        }
                      })
                      newItem['number_of_seasons'] = response.data.number_of_seasons
                      newItem['seasons'] = response.data.seasons
                    })
                    axios.get(store.base_url + 'tv/'+ newItem.id +'/credits?api_key=' + store.api_key + '&language=' + store.currentLang)
                        .then(function(response){
                            newItem['cast'] = response.data.cast
                            for (let member of response.data.crew) {
                              let direction = ''
                                if (member.job == 'Director') {
                                    direction += member.name + ' '
                                    newItem['director'] = direction
                                }
                            }
                        })
                        store.home.trending.push(newItem)
                      i++

                  }
                
                  
                }
            })
            axios.get(store.base_url + '/movie/now_playing?api_key=' + store.api_key +'&language='+ store.currentLang + '&page=1')
            .then(function (response){
                console.log(response)
                let i = 0
                for (let newItem of response.data.results) {
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
                      axios.get(store.base_url + 'movie/' + thisMovieID + '/videos?api_key=' + store.api_key + '&language=' + store.currentLang)
                      .then(function (response) {
                        axios.get(store.base_url + 'movie/'+ thisMovieID +'/credits?api_key=' + store.api_key + '&language=' + store.currentLang)
                        .then(function(response){
                            newItem['cast'] = response.data.cast
                            for (let member of response.data.crew) {
                              let direction = ''
                                if (member.job == 'Director') {
                                    direction += member.name + ' '
                                    newItem['director'] = direction
                                }
                            }
                        })
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
                      axios.get(store.base_url + 'movie/' + thisMovieID + 'release_dates?api_key=' + store.api_key)
                      .then(function(response){
                        newItem['date'] = response.data.release_date
                      })
                      store.home.nowPlaying.push(newItem)
                      i++
                    
                    
                        console.log(newItem)
                        console.log(store.home.nowPlaying)
                }
            })
        },
        methods: {
        handleExpanded(response) {
            this.bigCardIndex = response
            if (this.bigCardIndex.type == 'movie'){
                this.bigMovieCardShow = true
            }
            else {
                this.bigTVCardShow = true
            }
            if (this.bigCardIndex.type == 'tv'){
                this.bigTVCardShow = true
            }
        }
        }
    }
</script>

<template>
    <div class="container">
        <div class="sectionTitle">
            <span>TRENDING</span>
        </div>
        <section class="trending">
            <div class="cardCont">
                <movieCard v-for="(card, index) in store.home.trending" :card-data="card" :index="index" v-show="index < 12" @expanded="handleExpanded"/> <br>
                <Transition>
                    <bigCard :big-card-data="store.home.trending[bigCardIndex.index]" v-if="bigMovieCardShow || bigTVCardShow" @close-card="bigMovieCardShow = false, bigTVCardShow = false"/>
                </Transition>
            </div>
        </section>
        <div class="sectionTitle">
            <span>NOW PLAYING</span>
        </div>
        <section class="trending">
            <div class="cardCont">
                <movieCard v-for="(card, index) in store.home.nowPlaying" :card-data="card" :index="index" v-show="index < 12" @expanded="handleExpanded, bigNowPlayingCardShow = true"/> <br>
                <Transition>
                    <bigCard :big-card-data="store.home.nowPlaying[bigCardIndex.index]" v-if="bigNowPlayingCardShow" @close-card="bigNowPlayingCardShow = false"/>
                </Transition>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 90%;
    margin: auto;
    justify-content: left;
    padding: 2rem;
    padding: 3rem 2rem 7rem;
    .sectionTitle {
        display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin: 1rem 0 .5rem;
            align-items: stretch;
            span:first-child{
                opacity: .6;
                font-weight: 700;
                font-size: 2rem;
                margin-top: auto;
            }
    }
    section {
        display: flex;
        z-index: 0;
        
        .cardCont{
            display: flex;
            flex-wrap: wrap;
                &::-webkit-scrollbar {
                height: 10px;               /* width of the entire scrollbar */
              }
              
              &::-webkit-scrollbar-track {
                background: rgba(240,240,240, 0);        /* color of the tracking area */
            }
            
            &::-webkit-scrollbar-thumb {
                background-color: rgb(50, 50, 50);    /* color of the scroll thumb */
                border-radius: 20px;       /* roundness of the scroll thumb */
            }
        }
        .card {
            flex-shrink: 0;
        }
    }
}
</style>
