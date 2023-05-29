import Pdf from '../assets/icon/pdf.png'
import Folder from '../assets/icon/文件夹.png'
import Zip from '../assets/icon/压缩包.png'
import Txt from '../assets/icon/txt.png'
import Unknown from '../assets/icon/原神图标.png'
import Video from '../assets/icon/视频.png'
import Exe from '../assets/icon/exe.png'
import Music from '../assets/icon/music.png'
import Png from '../assets/icon/其他.png'
const iconTypeList = [
  { typename: 'folder', typeicon: Folder },
  { typename: 'pdf', typeicon: Pdf },
  { typename: 'txt', typeicon: Txt },
  { typename: 'zip', typeicon: Zip },
  { typename: 'mp3', typeicon: Music },
  { typename: 'mp4', typeicon: Video },
  { typename: 'exe', typeicon: Exe },
  { typename: 'png', typeicon: Png }

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
