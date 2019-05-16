// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import distApp from './distApp'
import router from '../dist/router'
import store from './../store'
import iview from 'iview'
import 'iview/dist/styles/iview.css' // 使用iview样式
import '@/assets/css/iconfont.css'// 使用全局样式
import echarts from 'echarts'
import hyTable from '@/components/hengyun/table/'
import '@/assets/css/com.css' // 使用全局样式
import 'element-ui/lib/theme-chalk/index.css' //导入样式
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(iview)
Vue.use(hyTable)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#dist',
  router,
  store,
  components: { distApp },
  template: '<distApp/>'
})
