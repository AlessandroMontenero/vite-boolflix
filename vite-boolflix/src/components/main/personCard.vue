<script>
export default {
    props: {
        cardData: Object
    },
    created() {
        console.log(this.cardData)
    }
}

</script>

<template>
    <div class="card">
        <picture>
            <img :src="'https://image.tmdb.org/t/p/w500/' + cardData.profile_path" alt="">
        </picture>
        <div class="description">
            <span class="name">{{ cardData.name }}</span>
            <span class="role">{{ cardData.known_for_department}}</span>
            <div class="knownFor">
                <span v-for="item in cardData.known_for">
                    {{item.title}}
                </span>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .card {
        width: calc(95% / 4);
        margin-bottom: 1rem;
        background-color: rgb(20, 20, 20);
        aspect-ratio: 12 / 5;
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 10px;
        padding: 10px;
        box-sizing: border-box;
        margin-left: 10px;
        border-radius: 10px;
        transition: all .1s linear;
        picture {
            aspect-ratio: 1 / 1;
            overflow: hidden;
            border-radius: 50%;
            height: 100px;
            width: 100px;
            img {
                width: 100%;
            }
        }
        .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            box-sizing: border-box;
            .name {
                font-size: 1rem;
                opacity: .9;
            }
            .role {
                font-size: .8rem;
                opacity: .6;
            }
            .knownFor {
                margin-top: 5px;
                display: flex;
                flex-direction: column;
                font-size: .8rem;
                white-space:nowrap;
                box-sizing: border-box;
            }
        }

    }
    .card:hover {
        transform: scale(1.2);
    }
</style>