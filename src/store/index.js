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
      noteContent:{}, //Home组件展示的数据对象

      /*------删除------*/
      noteDelShow:false, //删除组件的显示隐藏
      delNoteInfo:{}, //要删除的对象
      delnoteNextId:-1, //删除对象的下一个兄弟对象Id
      loadingState:true, // 加载loadding状态

      /*------搜索------*/
      findNotesList:[], // 搜索笔记到的数组集合
      searchBox:false,  //控制搜索框和网页剪接的显示和隐藏状态
      Not404:true, //和Home组件的Not404保持一致,返回Home时,App组件要用
      searchValue:'', // 搜索关键字

     /*------快捷方式------*/
      quickShow:false, //控制快捷方式组件的显示和隐藏,控制yinList内容信息的透明度
      dataListShow:true, //快捷方式进入详情笔记本,笔记信息列表隐藏
     // 右侧内容区域的margin-left 值是0还是 350多
     // 点击快捷方式列表的时候设置为true,让它的margin-left值为0
      yinxdetWidth:false,
      yinListopation:false,   //透明度


     /*------ 笔记本功能状态 ------*/
     unfoldShow:false,
     noteBookShow:false,  //笔记本组件显示和隐藏 Notebook 组件
     delNoteBookShow:false,  //删除笔记本组件显隐
     delNoteBookObj:{}, // 要删除的笔记本
     joinNoteList:[], // 进入的笔记本列表数据
     joinNoteBookObj:{}, //当前显示的笔记本
     notelistNumber:false, //笔记列表如果删除完了,显示tip组件信息  如果为true,说明笔记本列表清空了,如果为False说明还有
     createBookShow:false, //创建笔记本组件显隐
     noteBookBg:-1, //笔记本列表的背景颜色控制 和index判断
     information:false, //笔记信息组件
     noteInfos:{}, //组件显示笔记信息对象

     /*------ 选项列表功能状态------*/
     selectDown:false, //选项列表组件的显隐
     noteListSortway:'createLatest', //笔记本列表排序方式,默认 创建日期(最新优先)
     showTextState:true,  // 笔记列表 显示文字功能(yx-SelectSort组件)


     /*------下拉提示------*/
     tipsuccessInfo:{},  // successInfo 组件显示的内容
     tipsuccessState:false, // successInfo 组件显隐状态

     /*------设置提醒功能状态------*/
     setRemin:false, //提醒已添加组件
     changeRemin:false, // 修改弹窗提醒(未标记完成)
     undoRemin:false, // 清除提醒,撤销(已标记完成)
     setTimersRemin:false, // ivews时间组件
     copyurlNotes:false, //复制笔记链接

     /*----标签功能状态-------*/
     noteTagState:false, //标签组件
     tagNoteBookName:'', //进入的笔记标签列表名字
     isJoinNotesTagList:false, // 是否进入标签笔记列表
     tagAllList:[], // 标签笔记列表展示的数据
     noteFindTagList:false, //当标记笔记列表被删除完
     deleteTagName:'', //要删除的标签名字
     deleteTagComponentsShow:false, //删除标签组件

     /*------每次删除笔记本,当前删除的状态------*/
     deleteNotesState:'', //删除笔记列表的状态(allList,noteBookList,tagList)

     /*------分享------*/
     shareState:false, //分享组件状态

   },
   mutations,
   actions,
   getters,
});

export default store;
