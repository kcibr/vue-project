<template>
  <div class="header">
    <el-icon size="46" color="red" style="padding-top:5px;padding-left:5px;"><ChromeFilled /></el-icon>
   <h2>基于垃圾桶搭建的垃圾回收系统</h2>
   <span></span>
   <div class="autor">
    <el-avatar shape="circle" size="46px"  src="../../assets/icon/原神图标.png" alt="头像"/>
   </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.header{
  width: 100%;
  display: flex;
  height: 56px;
  background-color: #ffffff;
  margin-top: 0;
  h2{
    margin: 0;
    padding-left: 10px;
    line-height: 56px;
  }
  span{
    flex: auto;
  }
  .autor{
  width: 250px;
  background-color: #9ae1ff;
  }
}
</style>
