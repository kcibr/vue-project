<template>
  <HomeHeader/>
  <div class="home">
    <HomeSide/>
    <div>
    <FileMange/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileMange from '../views/FileMange.vue'
import HomeHeader from '../components/home/HomeHeader.vue'
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  box-shadow:0 5px  5px rgb(224, 224, 224) inset;
  display: flex;
  justify-content: flex-start;
}

</style>
