# **VITE-BOOLFLIX**
## simil-netflix using Vue3-ViteJS, Axios and MovieDB Api

### STRUCTURE:
    |**APP** 
    |_**APP HEADER** //header with logo, some sections and a searchbar 
    |
    |_**APP MAIN** //main section
    |__**APP HERO** //hero 
    |__**APP CARDS** //container of cards
    |___**APP CARD** //single card item
    |
    |_**APP FOOTER** //footer section

### METHOD: 
    Le chiamate vengono effettuate da *App*, che riceve le queries di ricerca dai componenti (es. *Header*) tramite $emit.
     Al completamento della chiamata archivia la risposta in *store.js*, così da renderla accessibile a *main* 
     per la creazione della pagina utente.