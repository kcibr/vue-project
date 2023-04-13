<template>
 <div class="file-list">
    <el-table
      :data="tableData"
      stripe
      @select="getSelectionRows"
      @select-all="selectAll"
      @selection-change="selectedFileChange"
      style="width: 100%">
        <el-table-column  prop="" label=""  width="30" type="selection"/>
        <el-table-column label="" prop="img" width="45">
        <template #default="scope">
            <el-image  style="width: 32px; height: 32px" :src="scope.row.img" alt="文件图标" fit="fill" ></el-image>
        </template>
        </el-table-column>
        <el-table-column prop="name" label="文件名"  style="min-width：280px;">
        </el-table-column>
        <el-table-column prop="changetime" label="修改时间"  style="min-width：180px;"/>
        <el-table-column prop="size" label="大小" style="min-width：80px;"/>
    </el-table>
    </div>
    {{ selectedFiles }}|{{  }}
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from 'vue'
import autor from '../../assets/icon/原神图标.png'
const tableData = [
  {
    changetime: '2016-05-03',
    name: 'Tom1',
    size: '14kb',
    img: autor
  },
  {
    changetime: '2016-05-02',
    name: 'Tom2',
    size: '14mb',
    img: autor
  },
  {
    changetime: '2016-05-04',
    name: 'Tom3',
    size: '2.9gb',
    img: autor
  },
  {
    changetime: '2016-05-01',
    name: 'Tom4',
    size: '--',
    img: autor
  }
]
const selectedFiles = reactive([])
// 全选-全不选功能
const selectAll = () => {
  if (selectedFiles.length < tableData.length) {
    // console.log(selectedFileTable.selectedFile.length < tableData.length)
    selectedFiles.splice(0, selectedFiles.length)
    let val:any
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
const emit = defineEmits(['selected-file-change'])
const selectedFileChange = (selection:any) => {
  emit('selected-file-change', selectedFiles)
}
</script>

<style lang="less" scoped>

</style>
