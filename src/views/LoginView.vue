<template>
    <div class="loginbox">
      <el-form
    label-position="left"
    label-width="100px"
    :model="userData"
    class="loginform"
  >
    <el-form-item label="账号">
      <el-input v-model="userData.account" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userData.password" />
    </el-form-item>
    <el-button type="primary" @click="Login()">Login</el-button>
  </el-form>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { reactive } from 'vue'
import { doLogin } from '../api/user'

// 登录
const userData = reactive({
  account: '',
  password: ''
})
const Login = () => {
  doLogin(userData).then(res => {
    console.log(res.data)
    if (res.data != null) {
      router.push('/')
    }
  })
  console.log()
}

</script>

<style lang="less" scoped>
.loginbox{
  width: 600px;
  height: 400px;
  border-radius: 30px;
  background-color: #57d9e2;
}
.loginform{
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 300px;
  padding-top: 100px;
}
</style>>
