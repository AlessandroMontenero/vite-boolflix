<script>
import axios from 'axios'
import { store } from '../../store';
export default {
    props: {
        cardData: Object,
        store: Object,
        index: Number
    },
    created() {
        console.log(store)
    }
}

</script>

<template>
    <div class="card" >
        <div class="thumbImg">
            <img :src="'https://image.tmdb.org/t/p/w500/' + cardData.backdrop_path" alt="">
        </div>
        <div class="cardHover">
            <div class="filmTitle">
                <span class="title">{{ cardData.title }}</span>
                <span class="originalTitle" v-if="cardData.original_title != cardData.title">{{ cardData.original_title }}</span>
            </div>
            <div class="bottomHover">
                <div class="categories">
                    <span v-for="category, i in store.currentMoviesCategories[index]">
                    {{ category }} &#160
                    </span>
                </div>
                <div class="otherInfo">
                    {{ cardData.original_language }}
                    {{ parseInt(cardData.vote_average / 2) }}
                    ({{ cardData.vote_count }})
                </div>
                
            </div>
        </div>
    </div>
    

</template>

<style lang="scss" scoped>
.card {
    width: calc(95% / 6);
    margin-right: auto;
    margin-bottom: 3rem;
    box-sizing: border-box;
    aspect-ratio: 12 / 7.5;
    transform: scale(1);
    transition: transform .2s linear;
    z-index: 1;
    .thumbImg {
        height: 100%;
        img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
        }
    }
    .cardHover {
        display: none;
        .filmTitle {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 65%;
            .title {
                width: 100%;
                font-size: .8rem;
                text-transform: uppercase;
                opacity: .8;
                max-height: 1.8rem;
                overflow: hidden;
            }
            .originalTitle {
                width: 100%;
                font-size: .5rem;
                opacity: .6;
                height: .7rem;
                overflow: hidden;
    
            }
        }
        .bottomHover {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 2px;
            height: 35%;

            .categories {
                width: 100%;
                font-size: .5rem;
                text-transform: uppercase;
                opacity: .6;
                overflow: hidden;
            }
            .otherInfo {
                width: 100%;
                font-size: .6rem;
                opacity: .8;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
    &:hover {
        transform: scale(1.5) translateY(-20%);
        z-index: 2;
        img {
            border-radius: 5px 5px 0 0;
        }
        
        .cardHover {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 70%;
            background-color: rgb(40, 40, 40);
            border-radius: 0 0 5px 5px;
            padding: 10px;
            box-sizing: border-box;

        }
    }
}


</style>
