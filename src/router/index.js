import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import store from '../store'
import axios from '../axios';



Vue.use(VueRouter)

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}


const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/index',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: () => import('@/views/Index.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach( async (to, from, next) => {
  let hasRoute = store.state.menus.hasRoute
  let menus = store.state.menus.menuList
  let token = localStorage.getItem("token")

  console.log(menus)

  if (to.path == '/login') {
    console.log("login!!!!!!!!!!!")
    next()
  } else if (!token) {
    console.log("还没有token！！！")
    next({
      path: "/login"
    })
  } else if (to.path == '/' || to.path == '') {
    console.log(to.path)
    next({
      path: "/index"
    })
  } else if (!hasRoute) {
    let newRoutes = router.options.routes
    console.log("111111111111111")
    console.log(hasRoute)
    console.log(newRoutes)

    const res=await axios.get("/sys/menu/nav")

    store.commit("setMenuList", res.data.data.nav)
    console.log(store.state.menus.menuList)

    // 拿到用户权限
    store.commit("setPermList", res.data.data.authoritys)
    console.log(store.state.menus.permList)

    console.log(store.state.menus.menuList)
    // 动态绑定路由
    res.data.data.nav.forEach(menu => {
      console.log("开始加路由 "+menu)
      if (menu.children) {
        menu.children.forEach(e => {
          // 转成路由
          let route = menuToRoute(e)
          // 吧路由添加到路由管理中
          if (route) {
            //newRoutes[0] 只home路由
            newRoutes[0].children.push(route)
          }

        })
      }
    })
    console.log("22222222222222222")
    
    console.log(newRoutes)
    console.log(to.path)   ///index
    router.addRoutes(newRoutes)
    store.commit("changeRouteStatus", true)
    hasRoute=store.state.menus.hasRoute
    console.log(hasRoute)
    next({path: to.path})
   
  }else{
    console.log("已经有路由了----------------")
    console.log(to.path)  ///index
    next()
  }
})

//导航转成路由
const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }

  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component + '.vue')

  return route
}


export default router