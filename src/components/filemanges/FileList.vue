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
        <template #default="scope" >
            <div class="file-name-list" @dblclick="openFile(scope.row)">
              <div class="file-name-list-img">
                <el-image  class="el-image" :src="autoMatchIcon(scope.row.type)" alt="文件图标" fit="fill" ></el-image>
              </div>
              <div class="file-name-list-a" @contextmenu.prevent="rightClick($event, scope)">
                <a>{{ scope.row.fname }}</a>
              </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" sortable style="min-width：180px;"/>
        <el-table-column prop="size" label="大小" sortable  style="min-width：80px;"/>
    </el-table>
  </div>
  <!-- 右键菜单 -->
  <div id="contextmenu" v-show="menuVisible" class="menu">
    <el-button type="primary" text class="menu-button" @click="rName()"><el-icon><DocumentRemove/></el-icon>&nbsp;重命名</el-button>
    <el-button type="primary" text class="menu-button"><el-icon><DocumentCopy/></el-icon>&nbsp;复&nbsp;&nbsp;&nbsp;&nbsp;制</el-button>
    <el-button type="primary" text class="menu-button"><el-icon><Switch/></el-icon>&nbsp;剪&nbsp;&nbsp;&nbsp;&nbsp;切</el-button>
    <el-button type="primary" text class="menu-button"><el-icon><Tickets /></el-icon>&nbsp;粘&nbsp;&nbsp;&nbsp;&nbsp;贴</el-button>
  </div>
  <!-- 修改文件名弹窗 -->

</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted, computed, watch } from 'vue'
import { autoMatchIcon } from '../../tools/file-auto-type-url'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { reFName } from '@/api/file'
const store = useStore()

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
// 右键菜单
const menuVisible = ref(false)
const rightClick = (key:any, data:any) => {
  if (data.children && data.children != null) {
    menuVisible.value = false
  } else {
    menuVisible.value = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
    menuVisible.value = true // 显示模态窗口，跳出自定义菜单栏
    key.preventDefault() // 关闭浏览器右键默认事件,key就相当于event
    console.log(data.row.fname)
    const menu = document.querySelector('.menu')
    rNameData.fid = data.row.fid
    // rNameData.fName = data.row.fname
    styleMenu(key, menu)
  }
}

const styleMenu = (key:any, menu:any) => {
  document.addEventListener('click', foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
  console.log(key.clientX)
  menu.style.left = key.clientX + 15 + 'px'
  menu.style.top = key.clientY + 'px'
}
const foo = () => {
  // 取消鼠标监听事件 菜单栏
  menuVisible.value = false
  document.removeEventListener('click', foo) // 关掉监听，
}
// 重命名文件
const rNameData = reactive({
  fid: '',
  fName: '修改后的图片文件名.png'
})
const rName = () => {
  reFName(rNameData).then(res => {
    if (res.data === '修改成功') {
      ElMessage.success('重命名成功')
    } else {
      ElMessage.error('操作失败')
    }
  })
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
.menu {
  position: absolute;
  background-color: #fff;
  width: 90px;
  font-size: 12px;
  color: #444040;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  white-space: nowrap;
  z-index: 1000;
  .menu-button{
    display: block;
    width: 90px;
    color: rgb(46, 51, 77);
    text-align: center;
    margin: 0;
  }
}
</style>
