import store from '@/store'
export const imgError = {
  // inserted: function (el, { value }) {
  //   // 参数1：el为自定义指令的名字
  //   // 参数2：配置对象
  //   // 监听DOM加载失败的事件
  //   // console.log(el)
  //   if (!el.src) {
  //     el.src = value
  //   } else {
  //     el.onerror = function () {
  //       el.src = value
  //     }
  //   }
  // }
  inserted(el, { value }) {
    // 参数1：el为自定义指令的名字
    // 参数2：配置对象
    // 监听DOM加载失败的事件
    // console.log(el)
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定的元素更新时候触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}
// 按钮权限自定义方式，，在全局注册，只需要在使用处： v-isHas="point.employees.import"  传入用户的当前权限点
export const isHas = {
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
