import Find from '@/views/Find'
import Friend from '@/views/Friend'
import My from '@/views/My'
import NotFound from '@/views/NotFound'
import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router=new VueRouter({
  //注意；一旦采用了history模式，地址栏就没有#，需要后台配置访问规则
  mode:'history',
  routes:[
    {
      path:'/',
      redirect:'/find'
    },
    {
      path:'/find',
      component:Find
    },
    {
      name:'friend',
      path:'/friend/:words?',
      component:Friend
    },
    {
      path:'/my',
      component:My
    },
    {
      path:'*',
      component:NotFound
    }
  ],
  //link自定义高亮类名
  linkActiveClass:'active',//配置模糊匹配的类名
  linkExactActiveClass:'exact-active',//配置精确匹配的类名
})
export default router