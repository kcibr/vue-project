import { createStore } from 'vuex'

export default createStore({
  state: {
    userdata: {},
    selectedFilelist: [] as any[],
    // user: 'Elysia',
    // userfolder: '/Elysia', // 用户文件夹
    currentfolder: '/Elysia', // 当前文件夹
    // fileGroup: 'Elysia', // 用户组
    search: '',
    fName: 'music'
  },
  getters: {
  },
  mutations: {
    LoadUserData (state, data) {
      state.userdata = data
    },
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
