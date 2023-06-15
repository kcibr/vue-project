<template>
  <div class="header">
    <el-icon size="46" color="red" style="padding-top:5px;padding-left:15px;">
      <UploadFilled />
    </el-icon>
    <h2>文件上传下载服务系统</h2>
    <span></span>
    <div class="autor">
      <div style="width:46px;">
        <el-avatar shape="circle" size="46px" :src="autor" alt="头像" style="margin-top:10px;" />
      </div>
      <h5>{{ store.state.userdata.nickname }}</h5>
      <span></span>
      <span style="margin-top: 14px;">
    <el-button type="primary" text @click="loginout()"><el-icon><Expand/></el-icon>&nbsp;退出登录</el-button>
    </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import autor from '../../assets/warma - 副本.jpg'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
const store = useStore()
const loginout = () => {
  ElMessageBox.confirm(
    '确认退出登录？',
    '退出登录',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    sessionStorage.removeItem('store')
    router.push('/')
  })
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  height: 56px;
  background-color: #ffffff;
  margin-top: 0;

  h2 {
    margin: 0;
    padding-left: 10px;
    line-height: 56px;
  }

  span {
    flex: auto;
  }

  .autor {
    display: flex;
    width: 250px;

    h5 {
      display: inline;
      height: 56px;
      margin: 0;
      margin-left: 10px;
      line-height: 56px;
    }

    span {
      flex: 1;
    }
  }
}</style>
