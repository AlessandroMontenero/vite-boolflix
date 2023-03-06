
<script>

</script>

<template>
<div class="loading">
    <div class="spin"></div>
</div>
</template>

<style lang="scss" scoped>
.loading {
    position: fixed; 
    width: 100%;
    height: 100vh;
    background: rgb(30, 30, 30);
    display: flex;
    justify-content: center;
    align-items: center;
}
@keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
.spin {
    position: relative;
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px rgb(50, 50, 50);
    border-bottom-color: rgb(200, 50, 50);
    border-radius: 50%;
    content: "";
    height: 200px;
    top: 105px;
    left: 105px;
    transform: translate(-50%, -50%);
    width: 200px;
    will-change: transform;
  }
</style>