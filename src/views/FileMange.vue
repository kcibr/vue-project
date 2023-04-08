<template>
  <div style="display:flex;">
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
    <!-- 文件管理 -->
    <div class="content">
      <div class="content-top">
        <div class="file-tools-select">
          <el-button type="primary" text><el-icon><Download/></el-icon>&nbsp;下载</el-button>|
          <el-button type="primary" text><el-icon><Delete/></el-icon>&nbsp;删除</el-button>|
          <el-button type="primary" text><el-icon><Switch/></el-icon>&nbsp;移动</el-button>|
          <el-button type="primary" text><el-icon><DocumentCopy/></el-icon>&nbsp;复制</el-button>|
          <el-button type="primary" text><el-icon><DocumentRemove/></el-icon>&nbsp;重命名</el-button>
        </div>
        <div class="file-search">
          <el-input
            v-model="search"
            class="search-box"
            placeholder="搜索我的文件"
            :prefix-icon="Search"
          >
          <template #append>
            <el-button type="primary" text>搜索</el-button>
          </template>
          </el-input>
        </div>
      </div>
      <div class="content-file">
        <div class="file-mange">
          <div class="file-path">
            <h6>全部文件</h6>
          </div>
          <div class="file-list">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="name" label="文件名"  style="min-width：280px;"/>
              <el-table-column prop="changetime" label="修改时间"  style="min-width：180px;"/>
              <el-table-column prop="size" label="大小" style="min-width：80px;"/>
            </el-table>
          </div>
        </div>
        <div class="file-detail"></div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const search = ref('')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const tableData = [
  {
    changetime: '2016-05-03',
    name: 'Tom',
    size: '14kb'
  },
  {
    changetime: '2016-05-02',
    name: 'Tom',
    size: '14mb'
  },
  {
    changetime: '2016-05-04',
    name: 'Tom',
    size: '2.9gb'
  },
  {
    changetime: '2016-05-01',
    name: 'Tom',
    size: '--'
  }
]
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
.content{
  padding: 20px 24px 0 24px;
  width: calc(100vw - 329px);
  height:calc(100vh - 76px);
  .content-top{
    width: 100%;
    height: 32px;
    display: inline-flex;
    padding: 4px 0 4px 0;
    .file-tools-select{
      font-size: smaller;
      color: #06a7ff;
      width: 390px;
      background-color: rgb(240, 250, 255);
      border-radius: 5px;
      .el-button{
        width: 70px;
        border-radius: 5px;
        margin: 0;
      }
    }
    .file-search{
      margin-left: auto;
      width: 270px;
      min-width: 270px;
      border-radius: 16px;
    }
  }
  .content-file{
    width: 100%;
    height: calc(100vh - 116px);
    display: flex;
    .file-mange{
      flex: 1;
      .file-path{
        h6{
          margin: 10px 0;
        }
      }
    }
    .file-detail{
      width: 248px;
      padding: 0 0 24px 24px;
      border-left: 1px solid rgb(204, 204, 204);
    }
  }

}
</style>
