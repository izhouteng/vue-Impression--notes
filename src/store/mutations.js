export default {
  // action异步请求提交
  resSuccess(state,data){
     let arr = [];
     state.dataList = data;
     state.allList = this.getters.tBallList;
  },

  // 请求成功,关闭loadding动画
  closeLoadding(state){
     state.loadingState = false;
  },

  // 同步 title和textarea内容
  editChange(state,params){
      state.allList.forEach(item => {
         if(item.id == params.id){
            item.title = params.title;
            item.content = params.content;
         }
      });
      console.log('title,textarea更新')
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

     //将删除的对象同步到tipsuccessInfo中
      state.tipsuccessInfo = {
        objname:state.delNoteInfo.title,
        tip:'已成功删除笔记',
      };
      state.tipsuccessState = false; //先隐藏,再显示
     //通过调用getters中的方法,将dataList第几阶段中的每条笔记同步到allList
     state.allList = this.getters.tBallList;
     state.noteDelShow = false;
  },


  // 新建笔记 完成
  addNotes(state,params){
     state.dataList.forEach(item => {
        if(item.id == params.id){
          item.children.unshift(params.obj);
        }
     });
     state.allList = this.getters.tBallList;

     // 处理情况,如果当前在笔记本列表中新建笔记的话,如果新建完成,应该回到Home列表笔记本,展示出所有的笔记数据
     // 并且笔记本的bg为不选中的状态
     state.joinNoteList = [];
     state.joinNoteBookObj = {};
     state.noteBookBg = -1;
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
    state.noteBookBg = -1;   // 回Home页,让笔记本bg-color为未选中
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
  //Home组件收起, 显示展开图标   // 隐藏笔记信息组件
  closeHander(state){
    state.unfoldShow = false;
    state.information = false;
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
  },

  //组件显示的笔记信息对象
  infoHander(state,params){
     state.noteInfos = params.obj;
     state.information = true; //展示的组件显示出来
  },
  // 保存笔记信息的 url 作者信息更改
  saveHander(state,params){
     state.allList.forEach(item => {
        if(item.id == params.id){
           item.url = params.url;
           item.author = params.author;
        }
     });
    state.information = false;
  },

  // 选项列表显示
  selectShowHander(state){
    state.selectDown = !state.selectDown;
  },

  /***********同步数据日期****************/

   /*---------七天之内 一天之上的日期 ----------*/
   sevendays(state,params){
      state.allList.forEach(item => {
         if(item === params.obj){
            item.createTime = params.time;
         }
      })
  },
  /***************************/

  // 修改排序方式
  changeSort(state,params){
     state.noteListSortway = params.way;
     state.selectDown = false; //隐藏排序选项列表
  },
  // 点击任何移除,收起选项下拉框
  closeSelectHander(state){
     state.selectDown = false;
  },

  // 修改vuex showTextState状态,作为Home组件vuex过滤条件
  changeShowHander(state,params){
     state.showTextState = params.st;
  },

  // 提示组件2s之后隐藏提示 [successInfo组件提交commit]
  closetipsuccess(state){
    state.tipsuccessState = false;
  },
  // 显示 successinfo提示
  successShow(state){
     state.tipsuccessState = true;
  },


  // 点击任意一处,关闭通知提醒弹窗
  closeRemin(state){
    state.setRemin = false;
    state.changeRemin = false;
    state.undoRemin = false;
    state.setTimersRemin = false;
  },
  // 设置提醒,同步allList数据
  setRemin(state,params){
     state.allList.forEach(item => {
        if(item === params.obj){
           item.remind = true;
        }
     });
    // 通知我组件加载..
    state.setRemin = true;
  },

  // 通知我,加载时间组件
  reminMehander(state){
     state.setRemin = false;
     state.setTimersRemin = true;
  },
  // 设置通知时间
  setTimes(state,params){
     state.allList.forEach(item => {
       if(item === params.obj){
          item.remindTime = params.remint;
       }
     });
    state.setTimersRemin = false; //iview时间组件隐藏
    state.timeShow = true;
  }

}
