import { ElMessage } from 'element-plus'
import axios from './'
import DownloadFile from 'js-file-download'
import { useStore } from 'vuex'
import { it } from 'element-plus/es/locale'
const store = useStore()
// 查询用户所有文件
export interface QueryFileData{
    parentDir:string
    search:string
    type:string
}
export function queryAllFile (data: QueryFileData) {
  return axios.get<any>('/file/queryAll', data)
}
// 分类查询
export function queryTypeFile (data: any) {
  return axios.post<any>('/file/queryType', data)
}
// 新建文件夹
export function newFolder (data:any) {
  // console.log('上传路径' + data.parentFolderPath)
  console.log(data)
  return axios.get<any>('/file/createNewFolder', {
    folderName: data.folderName,
    parentFolderPath: data.parentFolderPath,
    fileGroup: data.fileGroup
  })
}
// 文件删除
export function deleteFile (data: any) {
  return axios.post<any>('/file/deleteFiles', data)
}// 查询回收站
export function queryDeleteFile (data: any) {
  return axios.get<any>('/file/queryDeletedFile', data)
}
// 文件下载
export function fileDownload (fileList:any[]) {
  if (fileList.length > 1) {
    ElMessage.warning('单次仅可下载一个文件')
  } else {
    fileList.forEach((item:any) => {
      if (item.type === 'folder') {
        ElMessage.warning('暂不支持文件夹下载')
      } else {
        axios.post('/file/download', {
          fid: item.fid,
          fName: item.fName
        }).then(response => {
          // 创建blob对象
          const blob = window.URL.createObjectURL(
            new Blob([response as any])
          )
          // 创建a链接
          const aLink = document.createElement('a')
          // 设置隐藏a链接
          aLink.style.display = 'none'
          // 把创建的blob给a.href
          aLink.href = blob
          // 设置下载文件的名称
          aLink.download = item.fName
          // 向body添加a链接
          document.body.appendChild(aLink)
          // 点击a链接
          aLink.click()
          // 点击完成后记得删除创建的链接
          document.body.removeChild(aLink)
        }).catch(error => {
          console.log(error)
        })
      }
    })
  }
}
