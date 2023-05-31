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
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
// 在页面加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem('store')) {
    store.replaceState(
      Object.assign(
        {},
        store.state,
        JSON.parse(sessionStorage.getItem('store'))
      )
    )
  }
})
// 页面刷新时，将vuex里的信息保存到sessionStorage
// 在页面刷新时先触发beforeunload事件
window.addEventListener('beforeunload', () => {
  store.commit('updateFileList', null)
  sessionStorage.setItem('store', JSON.stringify(store.state))
})

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
