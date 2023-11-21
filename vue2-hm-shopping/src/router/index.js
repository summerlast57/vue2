import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

// 路由懒加载
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: 'category', component: Category },
        { path: 'cart', component: Cart },
        { path: 'user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确定将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 所有的路由在真正被访问到之前(解析渲染对应组件页面前)，都会先经过全局前置路由守卫
// 只有全局前置守卫放行了，才会到对应的页面

// 全局前置路由守卫
// to:   到哪里去，到哪去的完整路由信息对象（路径，参数）
// from：从哪里来，到哪去的完整路由信息对象（路径，参数）
// next():是否放行
// (1) next() 直接放行，放行到to要去的路径
// (2) next(路径) 进行拦截，拦截到next里面配置的路径

// 创建一个需要权限的路径数组
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // 看to.path是否在authUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
