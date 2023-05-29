import { createStore } from 'vuex'
import { queryAllFile, queryTypeFile } from '../api/file'

export default createStore({
  state: {
    userdata: {},
    selectedFilelist: [] as any[],
    queryFileList: [],
    currentfolder: '', // 当前文件夹
    currentpath: '',
    // fileGroup: 'Elysia', // 用户组
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
    // 更新当前路径
    updateCurrentpath (state, data) {
      state.currentpath = data
    },
    // 更新文件列表
    updateFileList (state, filelist) {
      filelist.forEach((item:any) => {
        const arr = []
        arr.push({
          fid: item.fid,
          fName: item.fname
        })
        console.log('arr')
        console.log(arr)
        state.selectedFilelist = arr
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
