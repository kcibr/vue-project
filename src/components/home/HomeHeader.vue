<template>
  <div class="header">
    <el-icon size="46" color="red" style="padding-top:5px;padding-left:15px;"><UploadFilled /></el-icon>
   <h2>基于垃圾桶搭建的垃圾回收系统</h2>
   <span></span>
   <div class="autor">
    <div style="width:46px;">
    <el-avatar shape="circle" size="46px"  :src="autor" alt="头像" style="margin-top:10px;"/>
    </div>
    <h5>{{ user.username }}</h5>
    <span></span>
   </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import autor from '../../assets/icon/原神图标.png'

const user = reactive({ username: '陌栀' })
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
    display: flex;
  width: 150px;
  // background-color: #9ae1ff;

  h5{
    display: inline;
    height: 56px;
    margin: 0;
    margin-left: 10px;
    line-height: 56px;
  }
  span{
    flex: 1;
  }
  }
}
</style>
