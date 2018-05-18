export default {
    // 初始化state中的数据
    success(state,data){
      let arr = [];
      state.noteList = data;
      state.noteList.forEach(item => {
         item.children.forEach(el => {
            if(el){
               arr.push(el)
            }
         })
      });
      state.allList = arr;
    },

    /**
     * 更新内容标题 和更新textarea
     * @param state
     * @param params
     * @param id title textarea
     */
    changeTitle(state,params){
      state.noteList.forEach(item => {
        item.children.forEach(el => {
          if(el.id == params.id){
            el.title = params.title;
            el.content = params.textarea;
          }
        })
      })
    },

   // 写笔记 隐藏nav1 yinlist 显示升级和完成
  WriteNotes(state){
      state.navl = false;
      state.yinxList = false;
      state.cancel = true;
      state.gXshow = false;
      state.zKshow = false;
  },

  // 收藏
    collec(state,obj){
        state.allList.forEach(item => {
           if(item === obj){
              item.Shared = true;
           }
        })
    },

    // 取消收藏
  delcollec(state,obj){
    state.allList.forEach(item => {
      if(item === obj){
        item.Shared = false;
      }
    })
  }
}
