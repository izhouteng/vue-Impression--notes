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
      noteDelShow:false, //删除组件的显示隐藏
      delNoteInfo:{}, //要删除的对象
      delnoteNextId:-1, //删除对象的下一个兄弟对象Id
   },
   mutations,
   actions,
   getters,
});

export default store;
