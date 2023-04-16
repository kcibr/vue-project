import Pdf from '../assets/icon/pdf.png'
import Folder from '../assets/icon/文件夹.png'
import Zip from '../assets/icon/压缩包.png'
import Txt from '../assets/icon/txt.png'
import Unknown from '../assets/icon/原神图标.png'

const iconTypeList = [
  { typename: 'folder', typeicon: Folder },
  { typename: 'pdf', typeicon: Pdf },
  { typename: 'txt', typeicon: Txt },
  { typename: 'zip', typeicon: Zip }
]
// 自动匹配文件图标
function autoMatchIcon (type: string) {
  let icon = Unknown
  iconTypeList.forEach(item => {
    if (item.typename === type) {
      icon = item.typeicon
    }
  })
  return icon
}
export { autoMatchIcon }
