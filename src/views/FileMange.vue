<template>
  <div style="display:flex;">
   <div class="meau"></div>
    <div class="content">
    </div>
    <div class="content-top"></div>
    <div class="content-buttom"></div>
  </div>

</template>
<script lang="ts" setup>

</script>
<style lang="less" scoped>
.meau{
  width: 200px;
  height:calc(100vh - 60px);
  background-color: #ffffff;
  box-shadow: 5px 5px 5px rgb(224, 224, 224) inset;
  border-right: 1px solid rgb(204, 204, 204);
}
.content{
  width:1200px;
  height:calc(100vh - 60px);
  box-shadow: 5px 5px 5px rgb(224, 224, 224) inset;

background-color: #e7d0d0;
}
</style>
