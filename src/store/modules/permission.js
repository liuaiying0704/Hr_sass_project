import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //问题背景，菜单的渲染是通过this.router.options.routes获取router中定义的路由，动态路由不在里面，因此菜单侧边栏缺失。
    points: [] //按钮权限
  },
  mutations: {
    setRoutes(state, routes) {
      //静态+动态路由
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    //  filterRoutes(context, roles)  中的roles是传递过来的
    filterRoutes(context, roles) {
      // 筛选出：用户拥有的动态的路由routes
      const routes = asyncRoutes.filter((item) =>
        roles.menus.includes(item.meta.id)
      )
      context.commit('setRoutes', routes)

      console.log(routes)
      // 如何添加动态路由：筛选后的routes（通过判断用户信息中的用户权限字段，在所有的动态路由中依据meta.id  去筛选对应的路由信息,）
      // 以下是注册动态路由的方式  router.addRoutes
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    },
    setPointsAction(context, points) {
      context.commit('setPoints', points)
    }
  }
}
