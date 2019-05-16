/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import comApiList from '@/api/comApiList'
import api from '@/api/axiosApi'
import urlConfig from '../../../static/login/config'
Vue.use(Vuex)

const platform = process.env.PLATFORM

const store = new Vuex.Store({
  state: {
    authButton: [],
    parse: '',
    formData: {},
    formItemType: 0,
    isShowMask: false,
    logoutUrl: urlConfig.sso_logout_url, // 退出登陆链接
    indexUrl: urlConfig.center_index_url // 首页链接
  },
  mutations: {
    GETUSERINFO (state) {
      // 解析所有的token到此store下面。
      state.userInfo = loginController.getLoginUserInfo()

      state.userInfo.userId = state.userInfo.userid
    },
    GETAUTHBUTTON (state, params) {
      state.authButton = params
    }
  },
  actions: {
    getAuthButton ({ commit, state }, resourceId) { // 获取后端权限接口数据
      var arr = []
      if (loginController.isLogined()) {
        api(comApiList.getOperateButton, {
          resourceId: resourceId,
          userId: state.userInfo.userId // 本地测试
        }).then((res) => {
          if (res.data.errcode == 0) {
            res.data.data.forEach(function (item) {
              arr.push(item.code)
            })
            commit('GETAUTHBUTTON', arr)
          } else {
            console.log(res.data.errmsg)
          }
        })
      }
    }
  },
  modules: {}
})

export default store
