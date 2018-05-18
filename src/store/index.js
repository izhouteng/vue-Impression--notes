import Vuex from 'vuex'
import Vue from 'vue'

import mutations from './mutations'
import actions from  './actions'
import getters from './getters'

Vue.use(Vuex);

let store = new Vuex.Store({
    state:{
      noteList:[], //全部的笔记数据
      allList:[], // 所有的笔记数据列表 all
      noteId:-1,  //初始显示第几阶段笔记,根据id
      navl:true, // nav整块的显示隐藏
      yinxList:true, // 笔记列表区域显示隐藏

      gXshow:true, //共享是否显示
      zKshow:true, // 展开全屏是否显示
      detup:true, //升级是否显示
      cancel:false, //取消是否显示
      writeOk:false, //完成是否显示
    },
    mutations,
    actions,
    getters,
});

export default store;
