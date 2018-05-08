<template>
      <div id="app" v-cloak>
        <div class="content clearfix">
          <!-- 左侧操作栏 -->
          <div class="yinxleft" id="navl" v-show="navShow" @mousedown.prevent>
            <div class="yinxt">
              <img src="./assets/images/leftToppic.png" alt="">
            </div>
            <!-- 新建搜索分享 -->
            <div class="yinxfcn">
              <router-link tag="div" to="/edit" class="newnotes" @mouseover.native="overxJ" @mouseout.native="outxJ">
                <img src="./assets/images/xinjian1.png" alt="" v-if="xJ">
                <img src="./assets/images/xinjian.png" alt="" v-if="!xJ" title="新建笔记" @click="Edithander">
              </router-link>
              <div class="newSearch">
                <img src="./assets/images/sousuo1.png" alt="">
                <img src="./assets/images/sousuo2.png" alt="" style="display:none" title="搜索">
              </div>
              <div class="newshare">
                <img src="./assets/images/fenxiang1.png" alt="">
                <img src="./assets/images/fenxiang2.png" alt="" style="display:none" title="分享">
              </div>
            </div>
            <!-- 收藏 笔记 笔记本 标签 -->
            <div class="yinxlb">
              <div class="stars">
                <img src="./assets/images/shoucang1.png" alt="">
                <img src="./assets/images/shoucang2png.png" alt="" style="display:none" title="收藏">
              </div>
              <div class="notesbook">
                <img src="./assets/images/biji3.png" alt="" style="display:none">
                <img src="./assets/images/biji2.png" alt="" title="笔记">
              </div>
              <div class="notethis">
                <img src="./assets/images/bijiben1.png" alt="">
                <img src="./assets/images/bijiben2.png" alt="" style="display:none" title="笔记本">
              </div>
              <div class="yinxltag">
                <img src="./assets/images/biaoqian1.png" alt="">
                <img src="./assets/images/biaoqian2.png" alt="" style="display:none" title="标签">
              </div>
            </div>

            <!-- 左侧底部图标 -->
            <div class="yinxbotpic">
              <div class="botpic">
                <img src="./assets/images/leftbottomlogo.png" alt="">
              </div>
            </div>
          </div>

          <router-view></router-view>

        </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data(){
      return {
        xJ:true,   //新建显隐
        navShow:true, // 导航显隐
      }
    },
    methods:{
      // 新建鼠标移入移出事件
      overxJ(){
          this.xJ = false;
      },
      outxJ(){
         this.xJ = true;
      },
      // 新建笔记
      Edithander(){
        console.log(1);
         this.navShow = false;
      }
    }
  }
</script>
<style>
  [v-cloak]{
    display: none;
  }
</style>
