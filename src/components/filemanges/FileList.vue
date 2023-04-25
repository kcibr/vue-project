<template>
 <div class="file-list">
    <el-table
      :data="fileList"
      stripe
      @select="getSelectionRows"
      @select-all="selectAll"
      @selection-change="selectionChangeHandle"
      :cell-style="{ padding: '0' }"
      style="width: 100%;">
        <el-table-column  prop="" label=""  width="30" type="selection"/>
        <el-table-column label="文件名" prop="" width="280">
        <template #default="scope">
            <div class="file-name-list">
              <div class="file-name-list-img">
                <el-image  class="el-image" :src="autoMatchIcon(scope.row.type)" alt="文件图标" fit="fill" ></el-image>
              </div>
              <!-- {{ scope.row.type }} -->
              <div class="file-name-list-a">
                <a>{{ scope.row.fname }}</a>
              </div>
            </div>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label=""  style="min-width：280px;">
        </el-table-column> -->
        <el-table-column prop="updatetime" label="修改时间" sortable style="min-width：180px;"/>
        <el-table-column prop="size" label="大小" sortable style="min-width：80px;"/>
    </el-table>
  </div>
    <!-- <li v-for="(item,index) in sCHData" :key="index">
      {{ item.fname }}
    </li>
    {{ selectedFiles }}|{{ sCHData.length }} -->
    <!-- {{ fileList }} -->
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted } from 'vue'
import { autoMatchIcon } from '../../tools/file-auto-type-url'
import { queryAllFile } from '../../api/file'
import { useStore } from 'vuex'
const store = useStore()
const queryData = reactive({
  parentDir: store.state.userfolder,
  search: store.state.search
})
onMounted(() => {
  QueryFileList()
})
const fileList = ref([])
const QueryFileList = () => {
  queryAllFile(queryData).then(res => {
    fileList.value = res.data
    console.log(res)
  })
  console.log('执行力查询文件')
}
const selectedFiles = reactive([])
// 全选-全不选功能
const selectAll = () => {
  if (selectedFiles.length < fileList.value.length) {
    // console.log(selectedFileTable.selectedFile.length < tableData.length)
    selectedFiles.splice(0, selectedFiles.length)
    let val:object
    for (val of fileList.value) {
      selectedFiles.push(val.fname)
    }
  } else {
    selectedFiles.splice(0, selectedFiles.length)
  }
}
// 多选/单选
const getSelectionRows = (selection:object, row:object) => {
  if (selectedFiles.indexOf(row.name) > -1) {
    selectedFiles.splice(selectedFiles.indexOf(row.name), 1)
  } else {
    selectedFiles.push(row.name)
  }
}
// 提交多选信息
const emit = defineEmits(['selected-file-change'])
let sCHData:Array<object> = []
const selectionChangeHandle = (val:Array<object>) => {
  sCHData = val
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
  }
}
</style>
