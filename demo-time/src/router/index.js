import Vue from 'vue'
import Router from 'vue-router'
// import DemoTime from '@/components/demoTime'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: () => import('@/components/demoTime'), // 路由懒加载 (这样就不用没次你新建文件就要在上方引入了)
  }]
})
