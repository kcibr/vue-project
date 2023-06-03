<template>
 <div class="file-list">
    <el-table
      :data="store.state.queryFileList"
      stripe
      :default-sort="{ prop: 'size', order: 'descending' }"
      @select="getSelectionRows"
      @select-all="selectAll"
      @selection-change="selectionChangeHandle"
      :cell-style="{ padding: '0' }"
      max-height="750"
      style="width: 100%;">
        <el-table-column  prop="" label=""  width="30" type="selection"/>
        <el-table-column label="文件名" prop="" width="580">
        <template #default="scope">
            <div class="file-name-list" @dblclick="openFile(scope.row)">
              <div class="file-name-list-img">
                <el-image  class="el-image" :src="autoMatchIcon(scope.row.type)" alt="文件图标" fit="fill" ></el-image>
              </div>
              <div class="file-name-list-a">
                <a>{{ scope.row.fname }}</a>
              </div>
            </div>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label=""  style="min-width：280px;">
        </el-table-column> -->
        <el-table-column prop="updateTime" label="修改时间" sortable style="min-width：180px;"/>
        <el-table-column prop="size" label="大小" sortable  style="min-width：80px;"/>
    </el-table>
  </div>
  <!-- {{ fileList }} -->
    <!-- <li v-for="(item,index) in sCHData" :key="index">
      {{ item.fname }}
    </li>
    {{ selectedFiles }}|{{ sCHData.length }} -->
    <!-- {{ fileList }} -->
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted, computed, watch } from 'vue'
import { autoMatchIcon } from '../../tools/file-auto-type-url'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()
// const queryData = reactive({
//   parentDir: '/' + store.state.userdata.fileGroup,
//   search: store.state.search,
//   type: store.state.type
// })
onMounted(() => {
  store.commit('updateQueryFile', '/' + store.state.userdata.fileGroup)
})
// 查询文件
const fileList = computed(() => {
  return store.state.queryFileList
})

// 打开文件夹(文件)
const openFile = (row:any) => {
  if (row.type === 'folder') {
    console.log('需要查询的路径' + row.path)
    store.commit('updateQueryFile', row.path)
    console.log('点击了文件夹' + row.fname)
  } else {
    ElMessage.warning('暂不支持文件预览')
    console.log('点击了文件' + row.fname)
  }
}
// 文件选择
const selectedFiles = reactive([])
// 全选-全不选功能
const selectAll = () => {
  if (selectedFiles.length < fileList.value.length) {
    selectedFiles.splice(0, selectedFiles.length)
    let val:object
    for (val of fileList.value) {
      selectedFiles.push(val.fname)
    }
  } else {
    selectedFiles.splice(0, selectedFiles.length)
    store.commit('updateFileList', '清空')
  }
}
// 多选/单选
const getSelectionRows = (selection:any, row:any) => {
  if (selection.length === 0) {
    store.commit('updateFileList', '清空')
  }
  if (selectedFiles.indexOf(row.name) !== -1) {
    selectedFiles.splice(selectedFiles.indexOf(row.name), 1)
  } else {
    selectedFiles.push(row.name)
  }
  console.log('row')
  console.log(row)
}
// 提交多选信息
const emit = defineEmits(['selected-file-change'])
let sCHData:Array<object> = []
const selectionChangeHandle = (val:Array<object>) => {
  sCHData = val
  store.commit('updateFileList', val)
  console.log('提交的多选信息')
  console.log(store.state.selectedFilelist)
  emit('selected-file-change', sCHData)
}
</script>

<style lang="less" scoped>
.file-name-list{
  display: flex;
  flex-direction: row;
  align-self: center;
  height: 50px;
  .file-name-list-img{
    align-self: center;
  }
  .el-image{
      width: 32px;
      height: 32px;
    }
  .file-name-list-a{
    margin-left: 20px;
    align-self: center;
    line-height: 40px;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }
}
</style>
