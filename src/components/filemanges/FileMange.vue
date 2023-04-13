<template>
      <!-- 文件管理 -->
  <div style="display:flex;">
    <file-type-list/>

    <div class="content">
      <!-- 工具栏 -->
      <file-mange-toolbar :IsSelected="isSelected"/>

      <div class="content-file">
        <div class="file-mange">
          <div class="file-path">
            <h6>全部文件{{ fileDetailVisible }}</h6>
            <el-button class="change-type" @click="openDetail" v-if="!fileDetailVisible">展开</el-button>
          </div>
          <!-- 文件列表 -->
          <file-list :file-details-visible="fileDetailVisible" @selected-file-change="getSelectedFile"/>
        </div>
        <div class="file-detail" v-if="fileDetailVisible">
          <el-button type="primary" @click="closeDetail">收回</el-button>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
const isSelected = ref(true)
const fileDetailVisible = ref(true)
const openDetail = () => {
  fileDetailVisible.value = true
}
const closeDetail = () => {
  fileDetailVisible.value = false
}
const selectFiles = []
const getSelectedFile = (val:any) => {
  console.log('触发了')
  console.log(typeof (val.array))
  console.log(val.array)
}
</script>

<style lang="less" scoped>
 .content{
  padding: 20px 24px 0 24px;
  width: calc(100vw - 329px);
  max-width: calc(100vw - 329px);
  height:calc(100vh - 76px);

  .content-file{
    width: 100%;
    max-width: calc(100vw - 329px);
    height: calc(100vh - 116px);
    display: flex;
    .file-mange{
      flex: auto;
      .file-path{
        height: 40px;
        width: 100%;
        display: inline-flex;
        h6{
          margin: 10px 0;
          display: inline-block;
        }
        .change-type{
          height: 30px;
          width: 44px;
          margin-left: auto;
        }
      }
    }
    .file-detail{
      width: 248px;
      min-width: 248px;
      max-width: 248px;
      padding: 0 0 24px 24px;
      border-left: 1px solid rgb(204, 204, 204);
    }
  }

}
</style>
