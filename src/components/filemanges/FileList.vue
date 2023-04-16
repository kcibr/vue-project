<template>
 <div class="file-list">
    <el-table
      :data="tableData"
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
                <a>{{ scope.row.name }}</a>
              </div>
            </div>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label=""  style="min-width：280px;">
        </el-table-column> -->
        <el-table-column prop="changetime" label="修改时间" sortable style="min-width：180px;"/>
        <el-table-column prop="size" label="大小" sortable style="min-width：80px;"/>
    </el-table>
  </div>
    <!-- <li v-for="(item,index) in sCHData" :key="index">
      {{ item.name }}
    </li>
    {{ selectedFiles }}|{{ sCHData.length }} -->
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from 'vue'
import { autoMatchIcon } from '../../tools/file-auto-type-url'
const tableData = [
  {
    changetime: '2016-05-03',
    name: 'Tom1',
    size: '14kb',
    type: 'zip'
  },
  {
    changetime: '2016-05-02',
    name: 'Tom2',
    size: '14mb',
    type: 'txt'
  },
  {
    changetime: '2016-05-04',
    name: 'Tom3',
    size: '2.9gb',
    type: 'pdf'
  },
  {
    changetime: '2016-05-01',
    name: 'Tom4',
    size: '--',
    type: 'folder'
  }
]
const selectedFiles = reactive([])
// 全选-全不选功能
const selectAll = () => {
  if (selectedFiles.length < tableData.length) {
    // console.log(selectedFileTable.selectedFile.length < tableData.length)
    selectedFiles.splice(0, selectedFiles.length)
    let val:object
    for (val of tableData) {
      selectedFiles.push(val.name)
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
// 自动匹配文件图标
const autoIcon = (type:string) => {
  console.log(type)
  return autoMatchIcon(type)
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
