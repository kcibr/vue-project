import Pdf from '../assets/icon/pdf.png'
import Folder from '../assets/icon/文件夹.png'
import Zip from '../assets/icon/压缩包.png'
import Txt from '../assets/icon/txt.png'
import Unknown from '../assets/icon/原神图标.png'
import Video from '../assets/icon/视频.png'
import Exe from '../assets/icon/exe.png'
import Music from '../assets/icon/music.png'
import Png from '../assets/icon/图片.png'
import Word from '../assets/icon/word.png'
import Ppt from '../assets/icon/ppt.png'
const iconTypeList = [
  { typename: 'folder', typeicon: Folder },
  { typename: 'pdf', typeicon: Pdf },
  { typename: 'txt', typeicon: Txt },
  { typename: 'zip', typeicon: Zip },
  { typename: 'mp3', typeicon: Music },
  { typename: 'wav', typeicon: Music },
  { typename: 'mp4', typeicon: Video },
  { typename: 'exe', typeicon: Exe },
  { typename: 'png', typeicon: Png },
  { typename: 'word', typeicon: Word },
  { typename: 'docx', typeicon: Word },
  { typename: 'doc', typeicon: Word },
  { typename: 'ppt', typeicon: Ppt },
  { typename: 'pptx', typeicon: Ppt },
  { typename: 'jpg', typeicon: Png }

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
