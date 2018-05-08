import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = new Vuex.Store({
   state:{
      dataList:[],  //数据列表
      allList:[], // 所有的笔记列表
   },
   mutations,
   actions,
   getters,
});

export default store;
