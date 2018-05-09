export default {
  // action异步请求提交
  resSuccess(state,data){
     let arr = [];
     state.dataList = data;
     state.allList = this.getters.tBallList;
  },

  // 同步 title和textarea内容
  editChange(state,params){
      state.allList.forEach(item => {
         if(item.id == params.id){
            item.title = params.title
            item.content = params.content;
         }
      })
  },

  // 移动笔记
  moveNotes(state,params){
      // 从哪个数组中移出的
      params.obj.pid = params.gid;

      state.dataList.forEach(item => {
         if(item.id == params.pid){
            item.children.forEach((el,index) => {
               if(el === params.obj){
                 item.children.splice(index,1)
               }
            })
         }
         // 移动到哪个数组中
         else if(item.id == params.gid){
            item.children.push(params.obj)
         }
      })
  },

  // 修改state,保存标签
  saveLabel(state,params){
      state.allList.forEach(item => {
         if(item === params.obj){
            item.label.push(params.label)
         }
      })
  },

  // 删除tag保存的标签
  delTaglabel(state,params){
      state.allList.forEach(item => {
         if(item === params.obj){
            item.label.splice(params.index,1);
         }
      })
  },

  //添加快捷方式
  addkJHander(state,{obj}){
     state.allList.forEach(item => {
        if(item === obj){
           item.shortcut = !item.shortcut
        }
     })
  },

  //删除笔记Home提交
  delClickHander(state,params){
      state.delNoteInfo = params.obj; //将要删除的对象同步到state状态delNoteInfo,让删除的组件显示这个对象的信息
      state.delnoteNextId = params.id;
      state.noteDelShow = true;
  },
  //取消删除 delete组件commit
  cancelHander(state){
     state.noteDelShow = false;
     state.delNoteInfo = {};
  },
  //确定删除
  isdelHander(state){
    //保持 allList和dataList是同步的数据状态
     state.dataList.forEach(item => {
        if(item.id == state.delNoteInfo.pid){
           item.children = item.children.filter(el => el !== state.delNoteInfo)
        }
     });
     //通过调用getters中的方法,将dataList第几阶段中的每条笔记同步到allList
    state.allList = this.getters.tBallList;
     state.noteDelShow = false;
  },

  // 新建笔记
  addNotes(state,params){
     state.dataList.forEach(item => {
        if(item.id == params.id){
          item.children.push(params.obj)
          console.log(item.children)
        }
     });
     state.allList = this.getters.tBallList;
  }

}
