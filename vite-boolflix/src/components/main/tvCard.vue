<script>
export default {
    props: {
        cardData: Object
    },
    created() {
    }
}

</script>

<template>
    
    <div>{{ cardData.title }}</div>
    <div>{{ cardData.name }}</div>

</template>

<style lang="scss" scoped>

</style>