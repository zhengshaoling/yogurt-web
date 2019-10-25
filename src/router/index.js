import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
import Layout from '../layout'

export const asyncRouterMap = []

export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'index',
      name: 'Dashboard',
      meta: {
        title: '首页'
      },
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    hidden: true,
    children: [{
      path: 'index',
      name: "orderList",
      meta: {
        title: '订单管理'
      },
      component: _import('order/index')
    }]
  },
  {
    path: '/artificier',
    component: Layout,
    name: 'Artificier',
    hidden: true,
    children: [{
      path: 'index',
      name: "artificierList",
      meta: {
        title: '技师管理'
      },
      component: _import('artificier/index')
    }]
  }

]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
