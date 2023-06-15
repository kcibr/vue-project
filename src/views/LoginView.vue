<template>
    <div class="loginbox">
    <div class="title">
      <span>文件上传下载服务系统
      </span>
      </div>
    <div class="buttom_box">
      <div class="login_img"> <img src="../assets/三月七.jpg"  alt="" style=" height: 316px;"></div>
      <el-form
    label-position="left"
    label-width="100px"
    :model="userData"
    class="loginform"
    v-if="!formState.isRegister"
  >
      <!-- 登录视图 -->
    <el-form-item label="账号" class="login_form_item"  style="margin-top: 40px;">
      <el-input v-model="userData.account" />
    </el-form-item>
    <el-form-item label="密码" class="login_form_item" >
      <el-input v-model="userData.password" type="password" show-password/>
    </el-form-item>
    <el-button type="primary" @click="Login()" class="login_button" >登录</el-button>
    <el-button type="text" @click="formState.isRegister = true" class="reg_button" >立即注册</el-button>
  </el-form>
  <el-form
    label-position="left"
    label-width="100px"
    :model="userData"
    class="loginform"
    v-if="formState.isRegister"
  >
  <el-button type="text" @click="formState.isRegister = false" class="back_login" >返回登录</el-button>

      <!-- 登录视图 -->
    <el-form-item label="账号" class="login_form_item" >
      <el-input v-model="regData.account" />
    </el-form-item>
    <el-form-item label="密码" class="login_form_item" >
      <el-input v-model="regData.password" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" class="login_form_item" >
      <el-input v-model="regData.password_confirm" type="password" show-password/>
    </el-form-item>
    <el-button type="primary" @click="Register()" class="register_button" >注册</el-button>
  </el-form>
    </div>
    </div>

</template>

<script lang="ts" setup>
import router from '@/router'
import { reactive, ref } from 'vue'
import { doLogin, doRegister } from '../api/user'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()
const Sleep = (ms:any) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const menuVisible = ref(false)
const formState = reactive({
  isRegister: false
})
// 登录
const userData = reactive({
  account: 'Elysia',
  password: '1111'
})
const Login = () => {
  sessionStorage.removeItem('store')
  // 更新用户信息
  doLogin(userData).then(res => {
    console.log(res.data)
    if (res.data != null) {
      store.commit('LoadUserData', res.data)
      ElMessage.success('登陆成功，即将跳转')
      Sleep(3000).then(() => {
        router.push('/home')
      })
    } else {
      ElMessage.error('登陆失败')
    }
  })
}
const regData = reactive({
  account: '',
  password: '',
  password_confirm: ''
})

const Register = () => {
  if (regData.password === regData.password_confirm) {
    doRegister(regData).then(() => {
      ElMessage.success('注册成功,即将返回登录界面')
      userData.account = regData.account
      userData.password = regData.password
      Sleep(2000).then(() => {
        formState.isRegister = false
      })
    })
    console.log()
  } else {
    ElMessage.error('两次输入的密码不一致')
  }
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
  // padding-top: 40px;
  .login_form_item{
    width: 260px;
    display:block;
    margin:0 auto;

  }
  .login_button{
    width: 260px;
    display:block;
    margin:60px auto 0;
  }
  .reg_button{
    width: 60px;
    display:block;
    margin-top: 30px;
    margin-left:220px;
  }
  .back_login{
    margin-top: 20px;
    margin-left: 220px;
  }
  .register_button{
    width: 260px;
    display:block;
    margin:20px auto 0;
  }
}
</style>>
