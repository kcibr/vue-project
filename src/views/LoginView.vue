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
      <el-input v-model="userData.password" type="password" />
    </el-form-item>
    <el-button type="primary" @click="Login()">Login</el-button>
  </el-form>
    </div>
    <div>{{ store.state.userData }}</div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { reactive } from 'vue'
import { doLogin } from '../api/user'
import { useStore } from 'vuex'
const store = useStore()
// 登录
const userData = reactive({
  account: 'Elysia',
  password: '1111'
})
const Login = () => {
  // 更新用户信息
  doLogin(userData).then(res => {
    console.log(res.data)
    if (res.data != null) {
      store.commit('LoadUserData', res.data)
      router.push('/home')
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
  background-color: #8beff7;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loginform{
  width: 300px;
  height: 300px;
  margin: auto;
  padding-top: 100px;
}
</style>>
