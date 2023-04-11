<template>
    <div>
        <el-button type="primary" @click="toPage()">Login</el-button>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const toPage = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>

</style>>
