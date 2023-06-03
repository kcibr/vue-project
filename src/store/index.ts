import { createStore } from 'vuex'
import { queryAllFile, queryTypeFile } from '../api/file'

export default createStore({
  state: {
    userdata: {},
    selectedFilelist: [] as any[],
    queryFileList: [] as any[],
    currentfolder: '', // 当前文件夹
    currentpath: '',
    search: '',
    type: ''
  },
  getters: {
  },
  mutations: {
    // 加载用户数据
    LoadUserData (state, data) {
      state.userdata = data
      state.currentfolder = '/' + data.fileGroup
      state.currentpath = '/' + data.fileGroup
    },
    // 更新文件查询数据
    updateQueryFile (state, data) {
      const qData = {
        parentDir: data,
        search: state.search,
        type: state.type
      }
      state.currentfolder = data
      state.currentpath = data
      queryAllFile(qData).then(res => {
        state.queryFileList = res.data
      })
      console.log('更新了文件列表')
    },
    // 分类查询文件
    typeQueryFile (state, data) {
      queryTypeFile(data).then(res => {
        state.queryFileList = res.data
      })
      console.log('更新了文件列表')
    },
    // 更新当前文件夹
    updateCurrentfolder (state, data) {
      state.currentfolder = data
    },
    // 更新回收站文件列表
    updateDeleteFiles (state, data) {
      state.queryFileList = data
    },
    // 更新当前路径
    updateCurrentpath (state, data) {
      state.currentpath = data
    },
    // 更新已选文件列表
    updateFileList (state, filelist) {
      const arr: any[] = []
      if (filelist === '清空') {
        console.log('清空已选文件')
        state.selectedFilelist.splice(0, state.selectedFilelist.length)
      } else {
        if (filelist == null) {
          console.log('列表为空')
        } else {
          filelist.forEach((item:any) => {
            arr.push({
              fid: item.fid,
              fName: item.fname,
              type: item.type
            })
            state.selectedFilelist = arr
          })
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
