<template>
    <div class="loginbox">
    <div class="title">
      <span>基于springboot+vue搭建的文件上传系统
      </span>
      </div>
    <div class="buttom_box">
      <div class="login_img"> <img src="../assets/三月七.jpg"  alt="" style=" height: 316px;"></div>
      <el-form
    label-position="left"
    label-width="100px"
    :model="userData"
    class="loginform"
  >
    <el-form-item label="账号" class="login_form_item">
      <el-input v-model="userData.account" />
    </el-form-item>
    <el-form-item label="密码" class="login_form_item">
      <el-input v-model="userData.password" type="password" />
    </el-form-item>
    <el-button type="primary" @click="Login()" class="login_button">登录</el-button>
    <el-button type="primary" @click="Login()" class="reg_button">注册</el-button>
  </el-form>
    </div>
    </div>

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
  background-color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.buttom_box{
  display: flex;
}
.title{
  height: 44px;
  width: 600px;
  border-radius: 30px 30px 0 0;
  background-color: #ffffff;
  text-align: center;
  padding-top: 20px;
  span{
    font: 26px STHupo;
    color: #636363;
  }
}
.login_img{
  margin-top: 20px;
  width: 300px;
  height: 316px;
  border-radius: 30px 0 0 30px;
  overflow: hidden;
}
.loginform{
  width: 300px;
  height: 296px;
  border-radius:0 30px 30px 0;
  padding-top: 40px;
  .login_form_item{
    width: 260px;
    display:block;
    margin:0 auto
  }
  .login_button{
    width: 260px;
    display:block;
    margin:60px auto 0;
  }
  .reg_button{
    width: 260px;
    display:block;
    margin:10px auto 0;
  }
}
</style>>
