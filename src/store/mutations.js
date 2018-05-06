export default {
    // 初始化state中的数据
    success(state,data){
      state.noteList = data;
      state.noteId = data[0].id;
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
    }
}
