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
  getters:{
      // 所有的笔记列表
      allList(Store){
        let arr = [];
        Store.noteList.forEach((item) => {
            item.children.forEach((el) => {
              if(el){
                 arr.push(el)
              }
            })
        });
       if(arr.length > 0){
          return arr;
       }
      },

    /**
     *
     * @param Store
     * @param getter
     * @returns {function(*)}
     * @id  string
     * @item.id  number
     * 根据 动态id 过滤textarea内容对象
     */
      getNoteinfo:(Store,getter) => (id) => {
         return getter.allList.filter(item => item.id == id)
      }
  }
});

export default store;
