import axios from './'
import { useStore } from 'vuex'
const store = useStore()
// 查询用户所有文件
export interface QueryFileData{
    parentDir:string
    search:string
}
export function queryAllFile (data: QueryFileData) {
  return axios.get<any>('/file/queryAll', data)
}

// 新建文件夹
export interface createFolderData{
  parentFolderPath:string
  folderName:string
  fileGroup:string
}
export function newFolder (data:any) {
  return axios.get<any>('/file/createNewFolder', {
    folderName: data.folderName,
    parentFolderPath: data.parentFolderPath,
    fileGroup: data.fileGroup
  })
}
export function fileDownload (fileList:any) {
  fileList.forEach((item:any) => {
    return axios.get<any>('/file/download', {
      fid: item.fid
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', item.fName)
      document.body.appendChild(link)
      link.click()
    })
  })
}
