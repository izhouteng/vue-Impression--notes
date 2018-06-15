import Vue from 'vue'

// Home
export function clientAuto(){

  //Home组件顶部功能栏  (设置提醒,移除快捷方式,笔记信息,删除笔记,更多,升级,共享,全屏)
    const dethead = document.querySelector('.dethead');

  // App组件导航栏, (新建,搜索,群聊,快捷方式..)
    const yinxleft = document.querySelector('.yinxleft');

  // Home组件中的 笔记列表(网页简藏,几条笔记,选项...)
    const yinxList = document.querySelector('.yinxList');


    const nodescroll = document.querySelector('#nodescroll');
    const yinxTitle = document.querySelector('.yinxTitle');

    const yinxdet = document.querySelector('#yinxdet');


    const textarea = document.querySelector('.textArea textarea');
    const stages = document.querySelector('.stages');
  // 动态计算高度 内容编辑区域高度
    const yinxDet = document.querySelector('.yinxDet');
    const searchNote = document.querySelector('.searchNote'); //搜索 的高度

    const notFound = document.querySelector('.notFound'); // 未找到搜索笔记,提示内容高度计算

    function resize(){
      let clientH = document.documentElement.clientHeight;
      let clientW = document.documentElement.clientWidth;
      nodescroll.style.height = clientH - yinxTitle.offsetHeight + 'px';
      yinxDet.style.height = clientH - searchNote.offsetHeight + 'px';
      searchNote.style.width = clientW - yinxleft.offsetWidth + 'px';  //计算搜索的动态宽度
      notFound.style.height = clientH - yinxTitle.offsetHeight + 'px';

      // Home组件顶部导航栏的宽度应该根据 yinxleft的显示和隐藏自动计算高度

    }
    window.onresize = resize;
    resize();
}

  export function editclient() {
}

export default {
  install(Vue){
     Vue.prototype._client = {
       editclient
     }
  }
}
