<template>
<div class="content-top">
  <el-button type="primary" style="border-radius:16px;" @click="dialogVisible = true" v-if="props.isSelected">上传</el-button>
  <div class="file-tools-select" style="margin-left:30px;width:110px;" v-if="props.isSelected">
    <el-button type="primary" text style="width:100px;" @click="createFolder()"><el-icon><FolderAdd/></el-icon>&nbsp;新建文件夹</el-button>
  </div>
  <div class="file-tools-select" v-if="!props.isSelected">
    <el-button type="primary" text @click="fileDownload(store.state.selectedFilelist)"><el-icon><Download/></el-icon>&nbsp;下载</el-button>|
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
  <!-- 上传功能弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    title="文件上传"
    width="30%"
    align-center
    :before-close="handleClose"
  >
  <el-upload
    v-model:file-list="fileList"
    action="http://localhost:8081/file/uploadFile"
    class="upload"
    :auto-upload="false"
    :data="uploadData"
    :multiple="true"
    :limit="9"
    list-type="picture"
    ref="uploadRef"
  >
    <el-button type="primary">选择文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        文件大小不得超过1GB
        {{ fileList }}
      </div>
    </template>

  </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelSubmit()">取消</el-button>
        <el-button type="primary" @click="submitUpload()">
          确认上传
        </el-button>
      </span>
    </template>
  </el-dialog>

</div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { newFolder, fileDownload } from '../../api/file'
import { useStore } from 'vuex'
import type { UploadInstance, UploadUserFile } from 'element-plus'
// import { ElMessageBox } from 'element-plus'
const store = useStore()
const search = ref('')
const props = defineProps({
  isSelected: Boolean,
  fileList: Array
})
// 上传文件
const dialogVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
const uploadData = ref({
  uploadFolderPath: '/' + store.state.userdata.fileGroup,
  fileGroup: store.state.userdata.fileGroup
})
const handleClose = (done: () => void) => {
  cancelSubmit()
  done()
}
const uploadRef = ref<UploadInstance>()
const submitUpload = () => {
  uploadRef.value!.submit()
  fileList.value.length = 0
  dialogVisible.value = false
}
const cancelSubmit = () => {
  fileList.value.length = 0
  dialogVisible.value = false
}
// 新建文件夹
const newFolderData = reactive({
  folderName: '新建文件夹',
  parentFolderPath: store.state.userfolder,
  fileGroup: store.state.userdata.fileGroup
})
const createFolder = () => {
  newFolder(newFolderData).then(res => {
    console.log(res)
  })
  console.log()
}
// const Download = () => {
//   fileDownload(store.state.selectedFilelist, store.state.userdata)
// }
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
