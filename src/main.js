// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
import filters from './filters'
import VueUeditorWrap from 'vue-ueditor-wrap'
import _ from 'lodash'

import './errorLog'
import './permission'
import './plugins/element.js'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/assets/css/common.css'
import './icons'

Vue.config.productionTip = false
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

Vue.prototype._ = _
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
