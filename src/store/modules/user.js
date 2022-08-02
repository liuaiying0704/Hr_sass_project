import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
    }
  }
}
// 其中app.js模块和settings.js模块，功能已经完备，不需要再进行修改。 user.js模块是我们后期需要重点开发的内容，所以这里我们将user.js里面的内容删除，并且导出一个默认配置
