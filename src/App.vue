<template>
      <div id="app" v-cloak>
        <div class="content clearfix">
          <my-del></my-del>
          <!-- 左侧操作栏 -->
          <div class="yinxleft" id="navl" v-show="navShow" @mousedown.prevent>
            <div class="yinxt">
              <img src="./assets/images/leftToppic.png" alt="">
            </div>
            <!-- 新建搜索分享 -->
            <div class="yinxfcn">
              <router-link tag="div" to="/edit" class="newnotes"
                           @mouseover.native="overxJ"
                           @mouseout.native="outxJ"
              >
                <img src="./assets/images/xinjian1.png" alt="" v-if="xJ">
                <img src="./assets/images/xinjian.png" alt="" v-if="!xJ" title="新建笔记" @click="Edithander">
              </router-link>
              <div class="newSearch" @mouseover="sSoverHander" @mouseout="sSoutHander">
                <img src="./assets/images/sousuo1.png" alt="" v-show="!searchshow ">
                <img src="./assets/images/sousuo2.png" alt="" v-show="searchshow" title="搜索" @click="searchState">
              </div>
              <div class="newshare">
                <img src="./assets/images/fenxiang1.png" alt="">
                <img src="./assets/images/fenxiang2.png" alt="" style="display:none" title="分享">
              </div>
            </div>
            <!-- 收藏 笔记 笔记本 标签 -->
            <div class="yinxlb">
              <div class="stars" title="收藏" @click="startHander">
                <!--<img src="./assets/images/shoucang1.png" alt="">-->
                <!--<img src="./assets/images/shoucang2png.png" alt="" style="display:none" title="收藏">-->
              </div>
              <div class="notesbook" title="笔记">
                <img src="./assets/images/biji3.png" alt="" v-if="false">
                <img src="./assets/images/biji2.png" alt="" @click="goHome">
              </div>
              <div class="notethis" title="笔记本" @click="noteBookHander"></div>
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

  import del from '@/components/Delete'

  export default {
    name: 'App',
    data(){
      return {
        xJ:true,   //新建显隐
        navShow:true, // 导航显隐
        searchshow:false, //搜索显隐
      }
    },
    components:{
      'my-del':del,
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
         this.navShow = false;
      },
      // 鼠标移入搜索框
      sSoverHander(){
         this.searchshow = true;
      },
      sSoutHander(){
        this.searchshow = false;
      },

      // 让搜索框通过vuex中的状态让它显示出来,并且网页剪辑隐藏
      searchState(){
         this.$store.commit('searchShow');
         this.$store.commit('noteListTrue')
      },

      // 跳转到Home页,吧vuex中的404设为true
      goHome(){
         this.$store.commit('savefilterNote',{
            obj:[],
         });
          //删除vuex中管理的 搜索框隐藏
          this.$store.commit('searchNone');
          this.$store.commit('isNot404Yes');
          //定位到/home/1
          let n = this.$store.state.allList;
          this.$router.push({
             path:'/home/11111111'
          });

          //让显示笔记列表的盒模型显示出来
           this.$store.commit('noteListTrue')
          // 让yinList 笔记内容信息展示盒模型的margin-left为300多

      },

      //收藏组件显示和隐藏
      startHander(){
         this.$store.commit('startShow')
      },

      //笔记本组件显示
      noteBookHander(){

      }
    },
    watch:{
        $route(){
          let routeName = this.$route.path.slice(0,5);
          // console.log(routeName);

          if(routeName === '/edit'){
            if(this.navShow !== false){
              this.navShow = false;
            }
          }else if(routeName === '/home'){
              this.navShow = true;
          }
        }
    }
  }
</script>
<style>
  [v-cloak]{
    display: none;
  }
  .content {
    width: 100%;
    height: 100%;
  }
</style>
