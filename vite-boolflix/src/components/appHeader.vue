<script>
export default {
    data() {
        return {
            query: '',
            actualLangIndex: 0,
            actualLang: 'it-IT',
            languages: [
                {
                    label: 'English',
                    code: 'en-GB',
                    icon: 'GB'
                },
                {
                    label: 'English (US)',
                    code: 'en-US',
                    icon: 'US'
                },
                {
                    label: 'Italiano',
                    code: 'it-IT',
                    icon: 'IT'
                }
            ]
        }
    },
    methods: {
        submit() {
            let newResearch = {
                query: this.query,
                lang: this.actualLang,
                activeIndex: 0
            }
            this.$emit('newResearch', newResearch)
        }
    }
}
</script>

<template>
<header>
    <img src="src/images/logo.png" alt="" class="logo">
    <input type="text" v-model="query" @change="submit" placeholder="Search...">
    <div class="flags">
        <img class="flag" v-for="(language, index) in languages" :src="'https://flagsapi.com/' + language.icon + '/flat/64.png'" alt="" @click="actualLang = language.code, actualLangIndex = index" :class="{active: index == actualLangIndex}">
    </div>
</header>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    background-color: rgb(30, 30, 30);
    width: 100%;
    height: 5rem;
    display: flex;
    padding: 1rem 2rem;
    box-sizing: border-box;
    justify-content: right;
    align-items: center;
    z-index: 100;
    .logo {
        height: 100%;
        margin-right: auto;
    }

    input {
        height: 80%;
        width: 20%;
        padding: 0 1rem;
        border: none;
        background-color: rgb(60, 60, 60);
        border-radius: 10px;
        opacity: .9;
        color: white;
    }
    .flags {
        margin: auto .6rem;
        width: 40px;
        overflow: hidden;
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        &:hover{
            display: relative;
            height: fit-content;
            .flag {
                display: block;
            }
        }
        .flag {
            width: 40px;
            display: none;
            order: 2;
            
            &.active {
                display: block;
                order: 1;
            }
        }
    }
}
</style>


