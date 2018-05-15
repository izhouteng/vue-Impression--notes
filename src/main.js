// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import '@/assets/css/index.css'
import router from '@/router'

import iView from 'iView';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 组件用过call()执行的同步笔记列表时间
import dayjs from '@/assets/js/getDateTimes'
Vue.use(dayjs);

import https from '@/server/index'
Vue.use(https);

// 更新笔记本列表
import sortWay from '@/assets/js/sortWay'
Vue.use(sortWay);


import store from '@/store/index'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
