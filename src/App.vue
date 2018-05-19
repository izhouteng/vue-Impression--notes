<template>
      <div id="app" v-cloak>
        <div class="content clearfix" @click="closeSelect">
          <yxDeleteNote></yxDeleteNote>
          <yxDeleteNoteBooks></yxDeleteNoteBooks>
          <yx-CreateBook></yx-CreateBook>
          <yxInforMationBook></yxInforMationBook>
          <!--删除标签-->
          <yxDeleteTags></yxDeleteTags>
          <yxMessage></yxMessage>
          <div class="loading" v-show="$store.state.loadingState">
              <img src="./assets/images/loadding.gif" alt="" class="loadingPic">
          </div>
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
              <div class="newshare" @mouseover="shareOverHander" @mouseout="shareOutHander">
                <img src="./assets/images/fenxiang1.png" alt="" v-show="!share">
                <img src="./assets/images/fenxiang2.png" alt="" v-show="share" title="分享" @click="shareClickHander">
              </div>
            </div>
            <!-- 收藏 笔记 笔记本 标签 -->
            <div class="yinxlb">
              <div class="stars" title="收藏" @click="startHander"></div>
              <div class="notesbook" title="笔记" @click="goHome"></div>
              <div class="notethis" title="笔记本" @click="noteBookHander"></div>
              <div class="yinxltag" title="标签" @click="tagClickHander"></div>
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
        <!--聊天框-->

  </div>
</template>

<script>

  import yxDeleteNote from '@/func/delete/del-notes/yx-DeleteNote'  //删除笔记组件
  import yxDeleteNoteBooks from '@/func/delete/del-notebook/yx-DeleteNoteBooks' //删除笔记本组件
  import yxCreateBook from '@/func/create/yx-CreateBook'
  import yxInforMationBook from '@/func/info-book/yx-InforMationBook'
  import yxDeleteTags from '@/func/delete/del-notetags/yx-DeleteTags'
  import yxMessage from '@/func/group/message/yx-group-message'

  export default {
    name: 'App',
    data(){
      return {
        xJ:true,   //新建显隐
        navShow:true, // 导航显隐
        searchshow:false, //搜索显隐
        share:false, // 分享显隐
      }
    },
    components:{
       yxDeleteNote,
       yxDeleteNoteBooks,
      'yx-CreateBook':yxCreateBook,
       yxInforMationBook,
       yxDeleteTags,
       yxMessage
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
         this.$store.commit('noteListTrue');
         //预防,如果在群聊组件展示中点击了搜索的情况下
          if(this.$store.state.shareState){
              this.$store.commit('shareNone')
          }
      },

      // 跳转到Home页,吧vuex中的404设为true
      goHome(){
         this.$store.commit('savefilterNote',{
            obj:[],
         });
          //删除vuex中管理的 搜索框隐藏
          this.$store.commit('searchNone');
          this.$store.commit('isNot404Yes');
          this.$store.commit('noteBookList'); //清空第几阶段展示的信息
          //定位到/home/1
          let n = this.$store.state.allList;
          if(n.length > 0){
            this.$router.push({
              path:'/home/11111111'
            });
            this.getDateTimes.getDateTimes.call(this,n)
          }

          //让显示笔记列表的盒模型显示出来
           this.$store.commit('noteListTrue');
          // 让yinList 笔记内容信息展示盒模型的margin-left为300多
           this.$store.commit('closeQuickbox');
           this.$store.commit('closeHander'); //显示展开图标
         // 清空vuex中的标签笔记列表
           this.$store.commit('clearTagList');
          // 去除标签组件信息展示
           this.$store.commit('closeTagShow');
      },

      //收藏组件显示和隐藏
      startHander(){
         this.$store.commit('startShow')
      },

      //笔记本组件显示
      noteBookHander(){
         this.$store.commit('noteBookHander')
      },
      // 选项下拉菜单收起 通知提醒弹框显示
      closeSelect(state){
         if(this.$store.state.selectDown){
            this.$store.commit('closeSelectHander')
         }
         this.$store.commit('closeRemin');
      },
      //标签组件加载...
      tagClickHander(){
        this.$store.commit('noteTagShow');
      },
      // 分享移入
      shareOverHander(){
         this.share = true;
      },
      // 分享移出
      shareOutHander(){
        this.share = false;
      },
      //分享点击
      shareClickHander(){
         this.$store.commit('shareBlock')
      }
    },
    watch:{
        $route(){
          let routeName = this.$route.path.slice(0,5);

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
  .loading {
    position: relative;
    z-index: 99999;
    width: 100%;
    height: 100%;
    background: #5e4674;
  }
  .loadingPic {
    width: 400px;
    height: 325px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
