<template>
  <div class="side">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item  index="1">
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
  box-shadow:0 5px  5px rgb(240, 240, 240) inset;
  width: 80px;
  margin-left: 0;
  height:calc(100vh - 96px);
  padding-top: 40px;
  background-color: #ffffff;
  // background-color: #A2ABBD;
  p{
    margin-top: 0px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    padding: 0;
    //文字不可选中
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
}
.el-menu-item{
  margin-top: 10px;
  padding-top: 10px;
  height: 80px;
  display: block;
  border-radius: 25%;
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
  border-right: none;
}
</style>
