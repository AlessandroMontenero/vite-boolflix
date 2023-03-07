
<script>
import { store } from '../../store';
import axios from 'axios'
export default {
    props: {
        bigCardData: Object
    },
    data(){
        return {
            store,
            director: '',
        }
    },
    created() {
        if (this.bigCardData.media_type == "movie"){
            axios.get(store.base_url + 'movie/'+ this.bigCardData.id +'/reviews?api_key=' + store.api_key +'&language='+ store.currentLang)
            .then(function(response){
                store.reviews = []
                store.reviews = response.data
            })
            axios.get(store.base_url + 'movie/'+ this.bigCardData.id +'/similar?api_key=' + store.api_key +'&language='+ store.currentLang)
            .then(function(response){
                store.suggested = response.data.results
                console.log(response)
            })
        }
        else {
            axios.get(store.base_url + 'tv/'+ this.bigCardData.id +'/reviews?api_key=' + store.api_key +'&language='+ store.currentLang)
            .then(function(response){
                store.reviews = []
                store.reviews = response.data.results
            })
            axios.get(store.base_url + 'tv/'+ this.bigCardData.id +'/similar?api_key=' + store.api_key +'&language='+ store.currentLang)
            .then(function(response){
                store.suggested = response.data.results
                console.log(response)
            })
        }
    },
    methods: {
        close() {
            this.$emit('closeCard')
        }
    }
}

</script>

<template>
    <div class="bigCardContainer">
        <div class="backdrop" @click="close()"></div>
            <div class="bigCard">
                <i class="fa-solid fa-circle-xmark" @click="close()"></i>
                <div class="hero">
                    <img v-if="bigCardData.backdrop_path" :src="'https://image.tmdb.org/t/p/original/' + bigCardData.backdrop_path" alt="">
                    <div class="heroDetails">
                        <span class="title">{{bigCardData.title}} {{ bigCardData.name }} </span>
                        <span class="originalTitle" v-if="bigCardData.original_title || bigCardData.original_name">({{bigCardData.original_title}}{{bigCardData.original_name}})</span>
                    </div>
                </div>
                <div class="movieInfo">
                    <div class="detailsContainer">
                        <div class="detailsCol">
                            <img v-if="bigCardData.poster_path" :src="'https://image.tmdb.org/t/p/original/' + bigCardData.poster_path" alt="">
                        </div>
                        <div class="detailsCol">
                            
                            <div class="detailsLine" v-if="bigCardData.director">
                                <span>DIRECTOR:</span>
                                <span>
                                    {{ bigCardData.director }}
                                </span>
                            </div>
                            <div class="detailsLine">
                                <span>GENRES:</span>
                                <span v-for="genre in bigCardData.genre">{{genre}}</span>
                            </div>
                            <div class="detailsLine" v-if="bigCardData.release_date">
                                <span>RELEASE DATE:</span>
                                <span>{{bigCardData.release_date}}</span>
                            </div>
                            <div class="detailsLine" v-if="bigCardData.first_air_date">
                            <span>FIRST AIR DATE:</span>
                            <span>{{bigCardData.first_air_date}}</span>
                        </div>
                        <div class="detailsLine">
                            <span>RATINGS:</span>
                            <span>{{bigCardData.vote_average}} / 10 ({{ bigCardData.vote_count }})</span>
                        </div>
                        <div class="detailsLine">
                            <span>ORIGINAL LANGUAGE:</span>
                            <span>{{bigCardData.original_language.toUpperCase()}}</span>
                        </div>
                        <div class="detailsLine">
                            <span>OVERVIEW:</span>
                        </div>
                        <div class="overview">{{bigCardData.overview}}</div>
                    </div>
                </div>
                <br>
                <iframe frameborder="0" allow="autoplay" v-if="bigCardData.url"
                    :src=" bigCardData.url +'?autoplay=0&mute=0'">
                </iframe>
                <div class="section detailsLine">
                    <span>SUGGESTED</span>
                </div>
                <div class="suggested">
                    <div v-for="suggestion in store.suggested" class="suggestion" v-show="suggestion.poster_path">
                        <img :src="'https://image.tmdb.org/t/p/original/' + suggestion.poster_path" alt="">
                        {{ suggestion.title }}
                        {{ suggestion.name }}

                    </div>
                </div>
                <div class="section detailsLine">
                    <span>CAST</span>
                </div>
                <div class="cast">
                    <div v-for="member in bigCardData.cast" class="member">
                        <img v-if="member.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + member.profile_path" alt="" class="memberImg">
                        <div v-else class="noImg">
                            <i class="fa-solid fa-question"></i>
                        </div>
                        {{member.name}}
                    </div>
                </div>
                <div class="reviews">
                    <div class="detailsLine">COMMENTS ({{ store.reviews.total_results }})</div>
                    <div v-for="review in store.reviews.results" class="review">
                        <div class="img">
                            <img v-if="review.author_details.avatar_path" :src="'https://image.tmdb.org/t/p/w500/' + review.author_details.avatar_path" alt="" class="memberImg">  
                        </div>
                        <div class="reviewContent">
                            <div class="author">
                                <span>
                                    {{ review.author }}
                                </span>
                                <span>
                                    {{ review.created_at }}
                                </span>
                            </div>
                            <div class="content">
                                {{ review.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bigCardContainer {
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        z-index: 10;
        align-items: flex-end;
        transition: all .1s linear;
        backdrop-filter: blur(2px) brightness(50%);

        .backdrop {
            position: fixed;
            width: 100vw;
            height: 100vh;
            z-index: 0;
        }
        .bigCard {
            border-radius: 10px 10px 0 0;
            width: 80%;
            height: 85vh;
            background-color: rgb(30, 30, 30);
            z-index: 1;
            overflow-y: overlay;
            overflow-x: hidden;
            position: relative;
            &::-webkit-scrollbar {
                width: 10px;               /* width of the entire scrollbar */
              }
              
              &::-webkit-scrollbar-track {
                background: rgba(240,240,240, 0);        /* color of the tracking area */
            }
            
            &::-webkit-scrollbar-thumb {
                background-color: rgb(50, 50, 50);    /* color of the scroll thumb */
                border-radius: 20px;       /* roundness of the scroll thumb */
            }
            
                              i {
                                position: absolute;
                                color: white;
                                z-index: 1000;
                                right: 20px;
                                top: 20px;
                                font-size: 2rem;
                                opacity: .6;
                              }

            .hero {
                width: 100%;
                height: 20rem;
                display: flex;
                flex-direction: column; 
                justify-content: center;
                position: relative;
                z-index: 100;
                margin-bottom: 1rem;
                
                img {
                    border-radius: 10px 10px 0 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    position: sticky;
                }
                .heroDetails {
                    width: 100%;
                    height: 20rem;
                    position: absolute;
                    display: flex;
                    align-items: flex-end;
                    background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0), rgb(30,30,30));

                    .title {
                        font-size: 3rem;
                        line-height: 3rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        opacity: .9;
                        margin-left: 3rem;
                        max-width: 60%;
                    }
                    .originalTitle {
                        margin-left: 10px;
                        font-size: 1.5rem;
                        line-height: 2.5rem;
                        opacity: .8;
                        max-width: 40%;
                    }
                }
            }

            .movieInfo {
                width: 100%;
                padding: 1rem 6rem;
                box-sizing: border-box;
                font-size: 1.3rem;
                min-height: 80vh;
                .detailsContainer {
                    display: flex;
                    flex-direction: row;
                    .detailsCol {
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        .detailsLine {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 5px;
                            margin: 1rem 0 .5rem;
                            align-items: stretch;
                            span:first-child{
                                opacity: .6;
                                font-weight: 700;
                                font-size: 1rem;
                                margin-top: auto;
                            }
                        }
                        img {
                            width: 70%;
                            margin-right: 1rem;
                            align-self: center;
                        }
                    }
                }
                .overview {
                    background-color: rgb(50, 50, 50);
                    padding: 2rem;
                    border-radius: 10px;
                    font-weight: 300;
                    font-style: italic;
                    height: 100%;

                }

                iframe {
                    width: 70%;
                    aspect-ratio: 16/9;
                    margin: 2rem 50%;
                    transform: translateX(-50%);
                }
                
                .section.detailsLine {
                    width: 100%;
                    font-size: 2rem;
                    opacity: .6;
                    height: 5rem;
                    margin-top: 2rem;
                }
                .cast {
                    width: 100%;
                    overflow-x: overlay;
                    height: 10rem;
                    align-items: flex-start;
                    display: flex;
                    flex-wrap: nowrap;
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
                    .member {
                        text-align: center;
                        min-width: calc(100% / 8);
                        display: flex;
                        gap: 5px;
                        flex-direction: column;
                        align-items: center;
                        font-size: 1rem;
                        .memberImg {
                            width: 5rem;
                            height: 5rem;
                            object-fit: cover;
                            object-position: top;
                            border-radius: 50%;
                        }
                        .noImg {
                            width: 5rem;
                            height: 5rem;
                            border-radius: 50%;
                            position: relative;
                            background-color: rgb(50, 50, 50);
                            i {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                right: 0;
                                bottom: 0;
                                transform: translate(-50%, -50%);
                            }
                        }
                    }
                }

                .suggested {
                    display: flex;
                    gap: 30px;
                    overflow-x: scroll;
                    padding: 1rem 0;
                    &::-webkit-scrollbar {
                        height: 10px;               /* width of the entire scrollbar */
                      }
                      
                      &::-webkit-scrollbar-track {
                        background: rgba(240,240,240, 0);        /* color of the tracking area */
                    }
                    
                    &::-webkit-scrollbar-thumb {
                        background-color: rgb(60, 60, 60);    /* color of the scroll thumb */
                        border-radius: 20px;       /* roundness of the scroll thumb */
                    }
                    .suggestion {
                        min-width: calc(100% / 6);
                        img {
                            width: 100%;
                            height: 15rem;
                            object-fit: cover;
                        }
                        
                    }
                }
                .reviews {
                    margin: 3rem 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    .detailsLine {
                        font-size: 2rem;
                        opacity: .6;
                    }
                    .review {
                        width: 100%;
                        display: flex;
                        gap: 20px;
                        .img {
                            width: 100px;
                            height: 100px;
                            aspect-ratio: 1 / 1;
                            flex-grow: 1;
                            background-color: rgb(60, 60, 60);
                            border-radius: 50%;
                        }
                        img {
                            width: 100px;
                            height: 100px;
                            object-fit: cover;
                            border-radius: 50%;
                        }

                        .reviewContent {
                            width: 100%;
                            background-color: rgb(50, 50, 50);
                            padding: 1.5rem;
                            min-height: 100px;
                            overflow-y: scroll;
                            border-radius: 10px;
                            .author {
                                width: 100%;
                                margin-bottom: 10px;
                                display: flex;
                                justify-content: space-between;

                                span:first-child {
                                    text-transform: uppercase;
                                }
                            }
                            &::-webkit-scrollbar {
                                width: 10px;               /* width of the entire scrollbar */
                              }
                              
                              &::-webkit-scrollbar-track {
                                background: rgba(240,240,240, 0);        /* color of the tracking area */
                            }
                            
                            &::-webkit-scrollbar-thumb {
                                background-color: rgb(60, 60, 60);    /* color of the scroll thumb */
                                border-radius: 20px;       /* roundness of the scroll thumb */
                            }
                        }
                        
                    }
                }
            }
        }
    }
</style>