<script>
export default {
    data() {
        return {
            query: '',
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
                lang: this.actualLang
            }
            this.$emit('newResearch', newResearch)
        }
    }
}
</script>

<template>
<header>
    <input type="text" v-model="query" @change="submit">
    <button @click="submit"></button>
    <img v-for="language in languages" :src="'https://flagsapi.com/' + language.icon + '/flat/64.png'" alt="" @click="actualLang = language.code">
</header>
</template>

<style lang="sass" scoped>

</style>


