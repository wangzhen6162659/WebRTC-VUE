import Vue from 'vue'
import Router from 'vue-router'
import store from '@/view/store'
import Home from './../components/Home'
import Whiteboard from './../components/whiteboard'
// 用户中心

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home/',
      name: 'Home',
      component: Home
    },
    {
      path: '/whiteboard/',
      name: 'Whiteboard',
      component: Whiteboard
    }
    // {
    //   path: '/authorityManagement',
    //   name: 'authorityManagement',
    //   component: authorityManagement,
    //   children: [{
    //     path: 'resourceManagement',
    //     component: resourceManagement,
    //     meta: {
    //       pageTitle: '资源管理'
    //     }
    //   }, {
    //     path: 'systemRole',
    //     component: systemRole,
    //     meta: {
    //       pageTitle: '系统角色管理'
    //     }
    //   }, {
    //     path: 'userList/:appId/:id',
    //     name: 'userList',
    //     component: userList,
    //     meta: {
    //       pageTitle: '系统角色管理 / 用户列表'
    //     }
    //   }, {
    //     path: 'userManageList',
    //     component: userManageList,
    //     meta: {
    //       pageTitle: '用户管理'
    //     }
    //   }, {
    //     path: 'ptRole',
    //     component: ptRole,
    //     meta: {
    //       pageTitle: '平台角色管理'
    //     }
    //   }, {
    //     path: 'ptUserList/:appId/:id',
    //     name: 'ptUserList',
    //     component: ptUserList,
    //     meta: {
    //       pageTitle: '平台角色管理 / 用户列表'
    //     }
    //   }]
    // }
    ]
})

router.beforeEach((to, from, next) => {
  window.hy_auth_login() // 登陆验证
  store.commit('GETUSERINFO') // 设置用户信息
  next()
})

export default router
