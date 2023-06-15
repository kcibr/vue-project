<template>
<div class="content-top">
  <el-button type="primary" style="border-radius:16px;" @click="updateDialogVisible = true" v-if="props.isSelected">上传</el-button>
  <div class="file-tools-select" style="margin-left:30px;width:110px;" v-if="props.isSelected">
    <el-button type="primary" text style="width:100px;" @click="dialogFormVisible = true"><el-icon><FolderAdd/></el-icon>&nbsp;新建文件夹</el-button>
  </div>
  <div class="file-tools-select" v-if="!props.isSelected">
    <el-button type="primary" text @click="fileDownload(store.state.selectedFilelist)"><el-icon><Download/></el-icon>&nbsp;下载</el-button>|
    <el-button type="primary" text @click="deleteFiles()"><el-icon><Delete/></el-icon>&nbsp;删除</el-button>|
    <el-button type="primary" text><el-icon><Switch/></el-icon>&nbsp;剪切</el-button>|
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
      <el-button type="primary" text style="background-color: rgb(240, 250, 255);" @click="searchFile()">搜索</el-button>
    </template>
    </el-input>
  </div>
  <!-- 上传功能弹窗 -->
  <el-dialog
    v-model="updateDialogVisible"
    title="文件上传"
    width="30%"
    align-center
    :before-close="handleClose"
  >
  <!-- action="http://localhost:8081/file/uploadFile" -->
  <!-- :http-request="uploadHttpRequest" -->
  <el-upload
    v-model:file-list="fileList"
    :http-request="uploadHttpRequest"
    action="#"
    class="upload"
    :auto-upload="false"
    :on-change="fileChange"
    :multiple="true"
    :limit="9"
    drag
    list-type="picture"
    ref="uploadRef"
  >
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖到此处,或 <em>点击选取文件</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        单次最多同时上传9个文件且总大小不得超过100MB
        <!-- {{ fileList }} -->
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
<!-- 新建文件夹对话框 -->
<el-dialog v-model="dialogFormVisible" center="true" title="新建文件夹">
    <el-form >
      <el-form-item label="当前路径" label-width="140px">
        <el-input  disabled :placeholder="store.state.currentpath" />
      </el-form-item>
      <el-form-item label="文件夹名" label-width="140px">
        <el-input v-model="foname.name" autocomplete="off" placeholder="默认创建在当前路径下" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createFolder">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { newFolder, fileDownload, deleteFile } from '../../api/file'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox, UploadInstance, UploadUserFile } from 'element-plus'
import axios from 'axios'
// import { ElMessageBox } from 'element-plus'
const store = useStore()
const search = ref('')
const props = defineProps({
  isSelected: Boolean,
  fileList: Array
})
// 上传文件
const updateDialogVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
const fileChange = (fileList:any) => {
  if (fileList.length >= 9) {
    ElMessageBox.alert('单次上传最多上传9个文件，且文件大小不得超过100MB', '提示', {
      confirmButtonText: '确定'
      // callback: (action: Action) => {
      //   ElMessage({
      //     type: 'info',
      //     message: `action: ${action}`
      //   })
      // }
    })
  }
}
const uploadHttpRequest = (param:any) => {
  const fd = new FormData()
  fd.append('uploadFolderPath', store.state.currentfolder)
  fd.append('fileGroup', store.state.userdata.fileGroup)
  fd.append('file', param.file)
  axios.post('http://localhost:8081/file/uploadFile', fd, {
  }).then(response => {
    // 请求成功
    ElMessage.success('上传成功')
    store.commit('updateQueryFile', store.state.currentfolder)
    param.status = 'success' // 上传成功后将status属性改成success
  }).catch(function (error) {
    // 请求失败处理
    ElMessage.error(error)
    param.status = 'failed'
    param.message = '上传失败'
  })
}
const handleClose = (done: () => void) => {
  cancelSubmit()
  done()
}
const uploadRef = ref<UploadInstance>()
const submitUpload = () => {
  uploadRef.value!.submit()
  fileList.value.length = 0
  updateDialogVisible.value = false
}
const cancelSubmit = () => {
  fileList.value.length = 0
  updateDialogVisible.value = false
}
// 新建文件夹
const dialogFormVisible = ref(false)
const foname = reactive({
  name: ''
})
const createFolder = () => {
  const data = {
    folderName: foname.name,
    parentFolderPath: store.state.currentpath,
    fileGroup: store.state.userdata.fileGroup
  }
  if (foname.name === '') {
    ElMessage.warning('请输入文件夹名')
  } else {
    newFolder(data).then(res => {
      dialogFormVisible.value = false
      store.commit('updateQueryFile', store.state.currentfolder)
    })
  }
}
// 搜索文件
const searchFile = () => {
  store.commit('updateSearch', search.value)
  store.commit('updateQueryFile', '/' + store.state.userdata.fileGroup)
}
// 删除文件
const deleteFiles = () => {
  ElMessageBox.confirm(
    '是否删除这些文件？',
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      const arr:Array<string> = []
      store.state.selectedFilelist.forEach((item: { fid: string }) => {
        arr.push(item.fid)
      })
      const data:any = {
        fileList: arr.join('/')
      }
      deleteFile(data).then(() => {
        store.commit('updateQueryFile', store.state.currentfolder)
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    })
    .catch(() => {
      console.log()
    })
}
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
