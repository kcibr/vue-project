<template>
    <div class="side">
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item  index="1" style="margin-top:50px;">
      <el-icon size="30" color="#A2ABBD"><HomeFilled /></el-icon>
      <p>首页</p>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon size="30"><Comment /></el-icon>
      <p>信息</p>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon size="30" color="#A2ABBD"><Notebook /></el-icon>
      <p>记录</p>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon size="30"><DeleteFilled /></el-icon>
      <p>回收站</p>
    </el-menu-item>
  </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.side{
  box-shadow:0 5px  5px rgb(224, 224, 224) inset;
  width: 80px;
  margin-left: 0;
  height:calc(100vh - 60px);
  background-color: #ffffff;
  // background-color: #A2ABBD;
  p{
    margin-top: 0px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    padding: 0;
  }
}
.el-menu-item{
  margin-top: 10px;
  padding-top: 10px;
  height: 80px;
  display: block;
  .el-icon{
    color: #A2ABBD;
    display: block;
    padding-left: 5px;
  }
}
.el-menu-vertical-demo {
  display: block;
  width: 80px;
  min-height: 400px;
}
</style>
