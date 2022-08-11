import PageTools from '@/components/PageTools'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }
// console.log(PageTools.name)

const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
