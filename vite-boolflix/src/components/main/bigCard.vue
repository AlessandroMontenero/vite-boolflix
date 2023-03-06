
<script>
export default {
    props: {
        data: Object,
    },
    data(){
        return {
            director: '',
        }
    },
    created() {
        console.log(this.data)
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}

</script>

<template>
    <div class="bigCardContainer">
        <div class="bigCard">
            <div class="hero">
                <img v-if="data.backdrop_path" :src="'https://image.tmdb.org/t/p/original/' + data.backdrop_path" alt="">
                <div class="heroDetails">
                    <span class="title">{{data.title}}</span>
                    <span class="originalTitle" v-if="data.original_title">({{data.original_title}})</span>
                    <i class="fa-solid fa-circle-xmark" @click="close()"></i>
                </div>
            </div>
            <div class="movieInfo">
                <div class="detailsRow">
                    <div class="detailsLine">
                        <span>GENRES:</span>
                        <span v-for="genre in data.genre">{{genre}}</span>
                    </div>
                    <div class="detailsLine">
                        <span>RELEASE DATE:</span>
                        <span>{{data.release_date}}</span>
                    </div>
                    <div class="detailsLine">
                        <span>DIRECTOR:</span>
                        <span>
                            {{ data.director }}
                        </span>
                    </div>
                </div>
                <div class="detailsLine">
                    <span>OVERVIEW:</span>
                </div>
                <span>{{data.overview}}</span>
                <div class="detailsLine">
                    <span>CAST:</span>
                </div>
                <div class="cast">
                    <div v-for="member in data.cast" class="member">
                        <img :src="'https://image.tmdb.org/t/p/w500/' + member.profile_path" alt="" class="memberImg">
                        {{member.name}}
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
        .bigCard {
            border-radius: 10px 10px 0 0;
            width: 80%;
            height: 80vh;
            background-color: rgb(30, 30, 30);
            overflow-y: overlay;
            position: absolute;
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
                                z-index: 100;
                                right: 20px;
                                bottom: 1.5rem;
                                font-size: 2rem;
                              }

            .hero {
                width: 100%;
                height: 40vh;
                top: -30vh;
                position: sticky;
                &:after {
                    content  : "";
                    position : absolute;
                    z-index  : 1;
                    bottom   : 0;
                    left     : 0;
                    pointer-events   : none;
                    background-image : linear-gradient(to bottom, 
                                      rgba(240,240,240, 0),
                                      rgba(30,30,30, 1));
                    width    : 100%;
                    height   : 2em;
                  }
                img {
                    border-radius: 10px 10px 0 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                    position: sticky;
                }
                .heroDetails {
                    height: 10rem;
                    padding: 1rem;
                    position: sticky;
                    top: 0;
                    left: 50%;
                    transform: translate(0, -100%);
                    display: flex;
                    align-items: flex-end;
                    .title {
                        font-size: 3rem;
                        line-height: 3rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        opacity: .9;
                    }
                    .originalTitle {
                        margin-left: 10px;
                        font-size: 1.5rem;
                        line-height: 2.5rem;
                        opacity: .8;
                    }
                }
            }

            .movieInfo {
                width: 100%;
                padding: 1rem 3rem;
                box-sizing: border-box;
                font-size: 1.3rem;

                .detailsRow{
                    display: flex;
                    flex-direction: row-reverse;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                }
                .detailsLine {
                    display: flex;
                    gap: 5px;
                    margin: 2rem 0 .5rem;
                    opacity: .6;
                }

                .cast {
                    width: 100%;
                    overflow-x: overlay;
                    height: 10rem;
                    align-items: flex-start;
                    display: flex;
                    flex-wrap: nowrap;
                    margin-top: 1rem;
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
                    }
                }
            }
        }
    }
</style>