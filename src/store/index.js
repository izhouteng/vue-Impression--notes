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

      findNotesList:[], // 搜索笔记到的数组集合
      searchBox:false,  //控制搜索框和网页剪接的显示和隐藏状态
      Not404:true, //和Home组件的Not404保持一致,返回Home时,App组件要用

      quickShow:false, //控制快捷方式组件的显示和隐藏,控制yinList内容信息的透明度
      dataListShow:true, //快捷方式进入详情笔记本,笔记信息列表隐藏

     // 右侧内容区域的margin-left 值是0还是 350多
     // 点击快捷方式列表的时候设置为true,让它的margin-left值为0
      yinxdetWidth:false,
      yinListopation:false,   //透明度

     //展开和完成状态
     unfoldShow:false,
     noteBookShow:false,  //笔记本组件显示和隐藏 Notebook 组件

     delNoteBookShow:false,  //删除笔记本组件显隐
     delNoteBookObj:{}, // 要删除的笔记本

     joinNoteList:[], // 进入的笔记本列表数据
     joinNoteBookObj:{}, //当前显示的笔记本

   },
   mutations,
   actions,
   getters,
});

export default store;
