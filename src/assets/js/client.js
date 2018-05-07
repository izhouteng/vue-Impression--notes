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


  // 测试写笔记
  // 最左侧导航
  // const yinxleft = document.querySelector('.yinxleft');
  // const yinxList = document.querySelector('.yinxList'); //笔记本列表区域
    const root = document.querySelector('.root'); //编辑容器
    const editValue = root.querySelector('.editValue'); //编辑列表
    const textArea = root.querySelector('.textArea textarea'); //编辑内容
    const newnotesImg = document.querySelectorAll('.newnotes img');
    const editCount = document.querySelector('.editCount');

  // 测试搜索
    const newSearch = document.querySelector('.newSearch');
    const searchValue = searchNote.querySelector('.searchValue'); //搜索 input框

    newSearch.onclick = function(){
      yinxDet.style.display = 'none';
      yinxList.style.display = 'none';
      searchNote.style.display = 'block';
      searchValue.focus();
      resize();
    };
}


export default {
  install(Vue){
     Vue.prototype._client = {
       clientAuto,
     }
  }
}
