import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    noteList:[], //全部的笔记数据
    noteId:-1,  //初始显示第几阶段笔记,根据id
  },
  mutations:{
    // 初始化state中的数据
    success(state,data){
       state.noteList = data;
       state.noteId = data[0].id;
    }
  },
  actions:{
    requestSuccess(state,{data}){
        state.commit('success',data)
    }
  },

  // 计算state
  getters(){

  }
});

export default store;
