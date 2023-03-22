import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImage from '@/components/UploadImage'
import Calendar from '@/components/Calendar'
import FullSrcreen from '@/components/FullSrcreen'
import ToggleLang from '@/components/ToggleLang'

// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }
// console.log(PageTools.name)

const components = [
  PageTools,
  UploadExcel,
  UploadImage,
  Calendar,
  FullSrcreen,
  ToggleLang
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
