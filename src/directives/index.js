export const imgError = {
  inserted: function (el, { value }) {
    // 参数1：el为自定义指令的名字
    // 参数2：配置对象
    // 监听DOM加载失败的事件
    console.log(el)
    el.onerror = function () {
      el.src = value
    }
  }
}
