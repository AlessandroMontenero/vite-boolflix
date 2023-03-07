<script>
import { store } from '../../store';
export default {
    props: {
        cardData: Object,
        index: Number
    },
    data() {
        return{
            store,
            expandedIndex: 0,
            showVideo: false,
            bigCardData: {},
        }
    },
    created() {
        this.bigCardData = this.cardData
    },
    methods: {
        expanded() {
            this.expandedIndex = this.index
            this.$emit("expanded", {index: this.expandedIndex, type: this.cardData.media_type})
        },
        calcStar() {
            let fullStars = '<i class="fa-solid fa-star"></i>' 
            let emptyStars = '<i class="fa-regular fa-star"></i>'         
            return fullStars.repeat(parseInt(this.cardData.vote_average / 2) ) + emptyStars.repeat(5 - parseInt(this.cardData.vote_average / 2))
        },
        langUp() {
            for (let lang of store.languageToCountry) {
                if (this.cardData.original_language == lang[0]) {
                    return lang[1].toUpperCase()
                }
            }
        }
    }
}

</script>


<template>
    <div class="card" :id="'card'+index" @mouseover="showVideo = true" @mouseleave="showVideo = false" :class="{expanded: expanded}">
        <div class="thumbImg">
            <i class="fa-solid fa-circle-chevron-down" @click="expanded()"></i>
            <img v-if="cardData.backdrop_path" :src="'https://image.tmdb.org/t/p/w500/' + cardData.backdrop_path" alt="">
            <div v-else class="noImg"> {{cardData.title}}
                {{ cardData.name }}
            </div>
            <div class="videoContainer" v-if="showVideo && this.cardData.url" >
                <iframe frameborder="0" allow="autoplay"
                    :src=" this.cardData.url +'?autoplay=1&mute=0&modestbranding=1&autohide=1&showinfo=0&controls=0&rel=0&amp;fs=0&amp;showinfo=0'">
                </iframe>
            </div>
        </div>
        <div class="cardHover">
            <div class="filmTitle">
                <span class="title">
                    {{ cardData.title }}
                    {{ cardData.name }}
                </span>
                <span class="originalTitle" v-if="cardData.original_title != cardData.title || cardData.original_name != cardData.name ">
                    {{ cardData.original_title }}
                    {{ cardData.original_name }}
                </span>
            </div>
            <div class="overview">
                <span class="label">Release</span>: {{ cardData.date }} <br><br>
                {{ cardData.overview }}

            </div>
            <div class="bottomHover">
                <div class="categories">
                    <span v-for="category in cardData.genre">
                    {{ category }} &#160
                    </span>
                </div>
                <div class="otherInfo">
                    <img :src="'https://flagsapi.com/' + langUp() + '/flat/64.png'" alt="">
                    <span v-if="cardData.number_of_seasons">{{ cardData.number_of_seasons }} Seasons</span>
                    <span class="star" v-html="calcStar()">
                    </span>
                    <span class="voteCount">({{ cardData.vote_count }})</span>
                </div>
                
            </div>
        </div>
    </div>
    

</template>

<style lang="scss" scoped>
.card {
    width: calc(95% / 6);
    margin-right: 10px;
    margin-bottom: 3rem;
    box-sizing: border-box;
    aspect-ratio: 12 / 7.5;
    transform: scale(1);
    transition: transform .2s linear;
    z-index: 1;

    .overview {
        display: none;
    }
    .thumbImg {
        i { 
            display: none;
            position: absolute;
            right: 10px;
            top: 10px;
        }
        height: 100%;
        img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
        }
        .noImg {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(20, 20, 20);
            border-radius: 5px;
            padding: 1rem;
            box-sizing: border-box;
            overflow: hidden;
        }
    }
    .cardHover {
        display: none;
        position: absolute;
            flex-direction: column;
            background-color: rgb(40, 40, 40);
            border-radius: 0 0 5px 5px;
            padding: 10px;
            box-sizing: border-box;

        .filmTitle {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 65%;
            .title {
                width: 100%;
                font-size: .8rem;
                margin: -.5rem 0;
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

        .overview {
            height: 100%;
            margin: 1rem;
            font-size: .9rem;            
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
                align-items: flex-end;
                justify-content: flex-end;
                gap: 2px;
                .voteCount {
                    font-size: .4rem;
                }
                img {
                    height: 14px;
                    box-sizing: border-box;
                    margin-bottom: -1px;
                }
                .star {
                    margin-left: auto;
                }
            }
        }
    }
    &:hover {
        transform: scale(1.5) translateY(-20%);
        z-index: 2;
        .thumbImg {
            position: relative;
            i.fa-circle-chevron-down{
                display: block;
                z-index: 11;
                opacity: .8;
            }
            img {
                border-radius: 5px 5px 0 0;
            }
            .videoContainer {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                height: 100%;
                width: 100%;
                overflow: hidden;
                aspect-ratio: 16/9;
                pointer-events: none;
                border-radius: 5px 5px 0 0;
                iframe {
                    /* Extend it beyond the viewport... */
                    width: 300%;
                    height: 100%;
                    /* ...and bring it back again */
                    margin-left: -100%;

                }

            }
        }
        
        .cardHover {
            width: 100%;
            height: 70%;
            display: flex;

        }
    }
}


</style>
