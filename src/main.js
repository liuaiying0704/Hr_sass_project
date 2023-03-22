import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css' //element css

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入自定义指令
import * as directives from '@/directives'
//
import components from '@/components'
// 过滤器
import * as filters from '@/filters'
// // 自定义指令
import Print from 'vue-print-nb'

// 引入vue-i18n
import i18n from '@/i18n/index'

Vue.use(Print)

Vue.use(components)

// mock假数据，例如：模拟登陆（请求接口）。后期删除
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 注册element UI

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}

// 过滤时间
for (let key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
