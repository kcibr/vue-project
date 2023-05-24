<template>
      <!-- 文件管理 -->
  <div style="display:flex;">
    <file-type-list/>

    <div class="content">
      <!-- 工具栏 -->
      <file-mange-toolbar :isSelected="fileData.isEmpty" />

      <div class="content-file">
        <div class="file-mange">
          <div class="file-path">
              <h5 v-if="urlList.length == 1">全部文件</h5>
              <span v-for="(item,index) in urlList" :key="index" class="f-url">
              <span :class="(urlList.indexOf(item)+1) == urlList.length ? 'f-url-text-last' : 'f-url-text'">{{ item }}</span>
              <span class="f-url-sep">{{ (urlList.indexOf(item)+1) == urlList.length ? '' : ' > ' }}</span>
              </span>
            <el-button class="change-type" @click="openDetail" v-if="!fileDetailVisible">展开</el-button>
          </div>
          <!-- 文件列表 -->
          <file-list :file-details-visible="fileDetailVisible" @selected-file-change="getSelectedFile"/>
        </div>
        <div class="file-detail" v-if="fileDetailVisible">
          <el-button type="primary" @click="closeDetail">收回</el-button>
          <div>{{ store.state.selectedFilelist }}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const fileData = reactive({
  selectedfile: [] as object[],
  isEmpty: true
})
const fileDetailVisible = ref(true)
const openDetail = () => {
  fileDetailVisible.value = true
}
const closeDetail = () => {
  fileDetailVisible.value = false
}
const urlList = computed(() => {
  const arr:Array<string> = fpath.split('/')
  return arr
})
const fpath = '全部文件/DMIZ/图片/风景/百岁山.png'
const getSelectedFile = (val:Array<object>) => {
  console.log(val)
  if (val.length === 0) {
    fileData.isEmpty = true
  } else {
    fileData.isEmpty = false
    fileData.selectedfile = val
  }
  // isSelected = (val.length === 0)
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
        h5{
          margin: 0;
          font-size: small;
          line-height: 40px;
        }
        .f-url{
          line-height: 40px;
          font-size: 13px;
          color: #06a7ff;
          .f-url-text{
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            text-overflow: ellipsis;
          }
          .f-url-text-last{
            color: #818999;
            cursor: auto;
          }
          .f-url-sep{
            margin: 0 4px;
            color: #c4d8f4;
            display: inline-block;
            vertical-align: middle;
          }
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
      position: relative;
      padding: 0 0 24px 24px;
      border-left: 1px solid rgb(212, 212, 212);
    }
  }

}
</style>
