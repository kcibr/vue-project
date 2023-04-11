<template>
 <div class="file-list">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="" label=""  width="30" type="selection"/>
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
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import autor from '../../assets/icon/原神图标.png'
const props = defineProps(['FileDetailsVisible'])
const fdVisible = ref(props.FileDetailsVisible)
const tableData = [
  {
    changetime: '2016-05-03',
    name: 'Tom',
    size: '14kb',
    img: autor
  },
  {
    changetime: '2016-05-02',
    name: 'Tom',
    size: '14mb',
    img: autor
  },
  {
    changetime: '2016-05-04',
    name: 'Tom',
    size: '2.9gb',
    img: autor
  },
  {
    changetime: '2016-05-01',
    name: 'Tom',
    size: '--',
    img: autor
  }
]
</script>

<style lang="less" scoped>

</style>
