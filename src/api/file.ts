import axios from './'

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
