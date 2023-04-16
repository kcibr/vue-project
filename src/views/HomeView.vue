<template>
  <div class="home-box">
    <HomeHeader/>
    <div class="home">
      <HomeSide/>
      <div>
      <FileMange/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.home-box{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home{
  width: 100%;
  box-shadow:0 5px  5px rgb(240, 240, 240) inset;
  display: flex;
  justify-content: flex-start;
}

</style>
