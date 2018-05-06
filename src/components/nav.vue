<template>
    <!-- 左侧操作栏  id nav1 显示隐藏由vuex控制 -->
    <div class="yinxleft" id="navl" v-if="$store.state.navl" @mousedown.prevent>
      <div class="yinxt">
        <img src="@/assets/images/leftToppic.png" alt="">
      </div>
      <!-- 新建搜索分享 -->
      <div class="yinxfcn">
        <div class="newnotes" >
          <img src="@/assets/images/xinjian1.png" alt="" v-if="!newNotes" @mouseover="isnewNotes">
          <img src="@/assets/images/xinjian.png" alt="" title="新建笔记"
               v-if="newNotes"
               @mouseout="outNewNotes"
          >
        </div>
        <div class="newSearch">
          <img src="@/assets/images/sousuo1.png" alt="">
          <img src="@/assets/images/sousuo2.png" alt="" style="display:none" title="搜索">
        </div>
        <div class="newshare">
          <img src="@/assets/images/fenxiang1.png" alt="">
          <img src="@/assets/images/fenxiang2.png" alt="" style="display:none" title="分享">
        </div>
      </div>
      <!-- 收藏 笔记 笔记本 标签 -->
      <div class="yinxlb">
        <div class="stars">
          <img src="@/assets/images/shoucang1.png" alt="">
          <img src="@/assets/images/shoucang2png.png" alt="" style="display:none" title="收藏">
        </div>
        <div class="notesbook">
          <img src="@/assets/images/biji3.png" alt="" style="display:none">
          <img src="@/assets/images/biji2.png" alt="" title="笔记">
        </div>
        <div class="notethis">
          <img src="@/assets/images/bijiben1.png" alt="">
          <img src="@/assets/images/bijiben2.png" alt="" style="display:none" title="笔记本">
        </div>
        <div class="yinxltag">
          <img src="@/assets/images/biaoqian1.png" alt="">
          <img src="@/assets/images/biaoqian2.png" alt="" style="display:none" title="标签">
        </div>
      </div>

      <!-- 左侧底部图标 -->
      <div class="yinxbotpic">
        <div class="botpic">
          <img src="@/assets/images/leftbottomlogo.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
             newNotes:false,
          }
        },
        methods:{
          isnewNotes(){
             this.newNotes = !this.newNotes;
          },
          outNewNotes(){
            this.newNotes = !this.newNotes;
          },
          // 新建笔记 提交mutation 隐藏 nav1 yinlist 为false
          // xJnotes(){
          //    // this.$store.commit('WriteNotes');
          //
          // }

        }
    }
</script>

<style scoped>

</style>
