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
            item.title = params.title;
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
     // 搜索过滤后的数据删除当中要删除的对象
     if(state.findNotesList.length > 0){
       state.findNotesList = state.findNotesList.filter(item => item !== state.delNoteInfo);
     }
     //在详情笔记本列表中删除对象
     if(state.joinNoteList.length >= 0){
        state.joinNoteList = state.joinNoteList.filter(item => item !== state.delNoteInfo);
     }


     //通过调用getters中的方法,将dataList第几阶段中的每条笔记同步到allList
     state.allList = this.getters.tBallList;
     state.noteDelShow = false;
  },

  // 新建笔记
  addNotes(state,params){
     state.dataList.forEach(item => {
        if(item.id == params.id){
          item.children.unshift(params.obj);
        }
     });
     state.allList = this.getters.tBallList;
  },


  // 将搜索到的列表集合同步到vuex中
  savefilterNote(state,params){
     state.findNotesList = params.obj;
  },

  // 搜索框显示隐藏
  searchShow(state){
     state.searchBox = true;
  },
  //回Home页,搜索框隐藏, 搜索关键字清空
  searchNone(state){
    state.searchBox = false;
    state.searchValue = '';
  },
  //未搜索到笔记
  isNot404False(state){
    state.Not404 = false;
  },
  //搜索到笔记
  isNot404Yes(state){
    state.Not404 = true;
  },

  //收藏组件显示和隐藏
  startShow(state){
     state.quickShow = !state.quickShow;
     state.yinListopation = state.quickShow;
  },


  //点击快捷方式的详细信息,隐藏Home组件笔记列表
  noteListshow(state){
     state.dataListShow = false;
  },
  // 让笔记本列表盒模型显示出来
  noteListTrue(state){
     state.dataListShow = true;
     state.yinxdetWidth = false;
  },


  // 删除快捷方式
  delquickHander(state,{obj}){
     state.allList.forEach(item => {
        if(item === obj){
            item.shortcut = false;
        }
     })
  },

  // 修改笔记内容详情的margin-left 设置为0
  yinLeftHander(state){
     state.yinxdetWidth = true;
  },

  //Home组件展开 显示完成按钮
  openHander(state){
     state.unfoldShow = true;
  },
  //Home组件收起, 显示展开图标
  closeHander(state){
    state.unfoldShow = false;
    state.noteBookBg = -1;  //下次进入笔记本列表 默认都没有背景颜色
  },

  //当点击textarea 和 title区域,隐藏快捷方式栏
  closeQuickbox(state){
      if(state.quickShow || state.noteBookShow){
        state.quickShow = false;
        state.noteBookShow = false;
        state.yinListopation = false;
      }
  },

  //第几阶段笔记本列表显示和隐藏
  noteBookHander(state){
     state.noteBookShow = !state.noteBookShow;
     state.yinListopation = state.noteBookShow;
  },



  // Notebook组件
  // 让删除笔记本二次确认组件显示
  deleteNoteBook(state,params){
     state.delNoteBookShow = true;
     state.delNoteBookObj = params.obj;
  },
  // 取消删除
  cancelDelete(state){
    state.delNoteBookShow = false;
    state.delNoteBookObj = {}
  },
  //确定删除
  isDeleteBook(state){
     state.dataList = state.dataList.filter(item => item !== state.delNoteBookObj);
     state.allList = this.getters.tBallList;
     state.delNoteBookShow = false;
  },

  // 进入笔记本详细列表
  inNotelist(state,params){
     state.joinNoteBookObj = params.obj;
     state.joinNoteList = params.obj.children;
     state.noteBookShow = false; //笔记本组件隐藏
     state.yinListopation = false;
  },
  // Home键,清空第几阶段展示的笔记列表
  noteBookList(state){
     state.joinNoteList = [];
     state.joinNoteBookObj = {};
  },
  //Home组件 前往当前笔记本
  QWNOTEBOOK(state,params){
    state.noteBookBg = params.obj.id; //同步笔记本的id
    state.joinNoteBookObj = params.obj;
    state.joinNoteList = params.obj.children;
  },

  // 搜索关键字同步到vuex
  searchHander(state,params){
     state.searchValue = params.text;
  },
  // 清空搜索关键字
  clearHanderValue(state){
    state.searchValue = '';
  },
  //笔记列表删除完了
  deleteAll(state){
    state.notelistNumber = true;
  },
  // 笔记列表中不为空
  showNoteList(state){
    state.notelistNumber = false;
  },


  //创建笔记本组件显示
  createHanderShow(state){
     state.createBookShow = true;
  },
  // 创建笔记本组件隐藏
  createHanderNone(state){
    state.createBookShow = false;
  },
  //创建笔记本同步数据
  addBooks(state,params){
     state.dataList.push(params.obj);
     state.allList = this.getters.tBallList;
  },
  // 笔记本背景颜色下标
  notebookState(state,index){
      state.noteBookBg = index;
  }
}
