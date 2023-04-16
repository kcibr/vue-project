<template>
<div class="content-top">
  <el-button type="primary" style="border-radius:16px;" v-if="props.isSelected">上传</el-button>
  <div class="file-tools-select" style="margin-left:30px;width:110px;" v-if="props.isSelected">
    <el-button type="primary" text style="width:100px;" ><el-icon><FolderAdd/></el-icon>&nbsp;新建文件夹</el-button>
  </div>
  <div class="file-tools-select" v-if="!props.isSelected">
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
      <el-button type="primary" text style="background-color: rgb(240, 250, 255);">搜索</el-button>
    </template>
    </el-input>
  </div>
</div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const search = ref('')
const props = defineProps({
  isSelected: Boolean
})
</script>

<style lang="less" scoped>
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
</style>>
