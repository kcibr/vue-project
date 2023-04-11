<template>
    <!-- 文件类型筛选菜单 -->
    <div class="meau">
    <el-col :span="12">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu>
          <template #title>
            <el-icon><Folder /></el-icon>
            <span style="font-weight: bold;">我的文件</span>
          </template>
          <router-link to="" class="rlink">
            <el-menu-item index="1"><el-icon><Files /></el-icon>全部文件</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
            <el-menu-item index="1-1"><el-icon><Service /></el-icon>音乐</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
            <el-menu-item index="1-2"><el-icon><VideoCamera /></el-icon>视频</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
            <el-menu-item index="1-3"><el-icon><Picture /></el-icon>图片</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
            <el-menu-item index="1-4"><el-icon><Document /></el-icon>文档</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
            <el-menu-item index="1-5"><el-icon><Collection /></el-icon>压缩包</el-menu-item>
          </router-link>
          <router-link to="" class="rlink">
          </router-link>
            <el-menu-item index="1-6"><el-icon><More /></el-icon>其他</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><Delete /></el-icon>
          <span style="font-weight: bold;">回收站</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </div>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.meau{
  padding-top: 20px;
  width: 200px;
  height:calc(100vh - 76px);
  background-color: #ffffff;
  box-shadow: 5px 5px 5px rgb(240, 240, 240) inset;
  border-right: 1px solid rgb(204, 204, 204);
  .el-menu-vertical-demo {
  display: block;
  width: 180px;
  margin: 10px;
  border: none;
  min-height: 400px;
  // 文字不可选中
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    .rlink{
      // 去link标签下划线
      text-decoration-line: none;
    }
    .el-menu-item{
      padding-left: 10px;
    }
}
}

</style>
