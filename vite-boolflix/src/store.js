import { reactive } from 'vue'

export const store = reactive({
        api_key: '772b0cb925369cabb5f4fd79813049f4',
        base_url: 'https://api.themoviedb.org/3/',
        currentMovies: [],
        currentMoviesCategories: [],
        currentTV: [],
        currentPerson: [],
        currentLang: 'it-IT'
})