// 权限控制

// 路由（全局）前置守卫
// 会在所有的路由进入之前触发
import router, { asyncRoutes } from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //如果没有，就获取
    if (!store.state.user.userInfo.userId) {
      // { roles }  store 中的 action，return出去 可以获取用户基本信息
      const { roles } = await store.dispatch('user/getUserInfo')
      // console.log(roles.menus) //返回的用户信息带用户的权限
      // console.log(asyncRoutes) //所有的动态路由
      await store.dispatch('permission/filterRoutes', roles) //将roles传给store、permission中

      // 拿走store ==》  permission
      // const routes = asyncRoutes.filter((item) =>
      //   roles.menus.includes(item.meta.id)
      // )
      // console.log(routes)
      // // 如何添加动态路由：筛选后的routes（通过判断用户信息中的用户权限字段，在所有的动态路由中依据meta.id  去筛选对应的路由信息,）
      // // 以下是注册动态路由的方式  router.addRoutes
      // router.addRoutes([
      //   ...routes,
      //   { path: '*', redirect: '/404', hidden: true }
      // ])

      // 按钮权限
      await store.dispatch('permission/setPointsAction', roles.points) //将roles传给store、permission中

      next(to.path)
    }
    // 1登陆.
    // 是否进入登陆

    if (to.path === '/login') {
      // 是 跳转首页
      next('/')
    } else {
      //放行
      next()
    }
  } else {
    // 2、未登录
    // 是否在白名单
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 在白名单，放行
      next()
    } else {
      // 不在白名单，去登录
      next('/login')
    }
  }
})
