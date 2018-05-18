import Vue from 'vue'

export function clientAuto(){
    const nodescroll = document.querySelector('#nodescroll');
    const yinxTitle = document.querySelector('.yinxTitle');

    const yinxdet = document.querySelector('#yinxdet');
    const yinxleft = document.querySelector('.yinxleft');
    const yinxList = document.querySelector('.yinxList');

    const textarea = document.querySelector('.textArea textarea');
    const stages = document.querySelector('.stages');
    const dethead = document.querySelector('.dethead');
  // 动态计算高度 内容编辑区域高度
    const yinxDet = document.querySelector('.yinxDet');
    const searchNote = document.querySelector('.searchNote'); //搜索 的高度

    const notFound = document.querySelector('.notFound'); // 未找到搜索笔记,提示内容高度计算

    function resize(){
      let clientH = document.documentElement.clientHeight;
      let clientW = document.documentElement.clientWidth;
      nodescroll.style.height = clientH - yinxTitle.offsetHeight + 'px';
      yinxdet.style.width = clientW - yinxleft.offsetWidth - yinxList.offsetWidth + 'px';

      yinxDet.style.height = clientH - searchNote.offsetHeight + 'px';
      searchNote.style.width = clientW - yinxleft.offsetWidth + 'px';  //计算搜索的动态宽度

      notFound.style.height = clientH - yinxTitle.offsetHeight + 'px';
    }
    window.onresize = resize;
    resize();
}


export default {
  install(Vue){
     Vue.prototype._client = {
        clientAuto,
     }
  }
}
