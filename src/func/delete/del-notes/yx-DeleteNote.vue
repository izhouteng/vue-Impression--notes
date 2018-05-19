<template>
  <div class="delpage" v-if="$store.state.noteDelShow">
      <div class="delbox">
        <div class="title">
          <img src="@/assets/images/112.png" alt="">
          <div class="miaoshu">删除笔记</div>
        </div>
        <div style="height: 58px;"></div>
        <div class="n-note">
          确定删除<strong style="font-weight: normal">{{$store.state.delNoteInfo.title}}</strong>吗?
        </div>
        <div style="height: 66px"></div>
        <div class="btn clearfix">
           <span class="calcel GJDCG5COCC" @click="cancelHander">取消</span>
           <span class="isdel GJDCG5COCC" @click="yesDelHander">删除</span>
        </div>
      </div>
  </div>
</template>

<script>
    // 布完局了
    export default {
      data(){
         return {
            routeId:1,
         }
      },
      methods:{
        //取消删除
        cancelHander(){
            this.$store.commit('cancelHander')
        },
        //确定删除
        yesDelHander(){
          //确定删除的时候就根据删除对象的下一个id进行修改路由
           this.$store.commit('isdelHander');
             if(this.$store.state.delnoteNextId){
               this.routeId = this.$store.state.delnoteNextId;
             }else{
               this.routeId = this.$store.state.delNoteInfo.id;
             }

          /**
           * 一定要加 this.$store.state.joinNoteList.length > 0
           * 如果不加的情况下,当笔记本中有一条笔记,那么删除之后会跳转路由 path:'/home/+this.routeId',跳转到刚才删除笔记的id
           * 路由发生跳转的情况下,会执行Home组件的inteContent()函数,刚开始会获取路由原对象,会获取到刚才删除的这个id,通过这个id根据路由元对              象信息从vuex中获取到要展示的数据,因为这个对象已经删除掉了,所以id会找不到。
           * 如果没有过滤到这个对象,就会重定向到/home/,那么就会展示出所有的笔记列表
           * this.$store.state.joinNoteList.length > 0
           */
          let deleteState = this.$store.state.deleteNotesState;  //删除笔记本时状态,确定删除哪方面的笔记
          if(deleteState === 'findlist' || deleteState === 'alllist'){
              if(this.routeId){
                this.$router.push({
                  path:'/home/'+ this.routeId,
                });
              }
          }
          // 从笔记本列表中删除笔记
          else if(deleteState === 'joinlist'){
              // 如果路由需要跳转,那么当前删除的对象必须有下个兄弟元素才行,否则提交mutations修改state中的一个标识,
              // 让home组件进行watch,如果watch到就清空清空当前笔记,并且显示删除完了的提示组件
              if(this.routeId !== this.$store.state.delNoteInfo.id){
                this.$router.push({
                  path:'/home/'+ this.routeId,
                });
              }
              //笔记本列表删除完了
              if(this.$store.state.joinNoteList.length <= 0){
                 this.$store.commit('deleteAll');
              }
          }
          // 删除标签笔记
          else if(deleteState === 'taglist'){
              if(this.routeId !== this.$store.state.delNoteInfo.id){
                this.$router.push({
                  path:'/home/'+ this.routeId,
                });
              }
              //笔记本列表删除完了
              if(this.$store.state.tagAllList.length <= 0){
                this.$store.commit('deleteAll');
              }
          }

             // 确定删除的时候,将删除的对象同步到vuex,供successInfo组件显示
             // 每次删除的时候,先再mutations中隐藏掉这个组件显示的数据,再延迟提交mutations显示,再隐藏
            // 通过call()来调用vue插件方法
            this.message.message.call(this);
        }
      }
    }
</script>

<style scoped>
  .delpage {
    position: absolute;
    z-index: 1002;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: #ffffff;
    cursor: default;
  }
  .delpage .delbox {
    width: 650px;
    height: 100%;
    margin:auto;
    font-family: gotham, helvetica, arial, sans-serif;
  }
  .delpage .title {
    text-align: center;
    padding-top: 273px;
    box-sizing: border-box;
    color: #878787;
  }
  .delpage .miaoshu {
    line-height: 31px;
    font-size: 13px;
    letter-spacing:1px;
    border-bottom: 1px solid #d9d9d9;
    width: 124px;
    margin: 16px auto 0;
    padding-bottom: 4px;
  }
  .delpage .n-note {
    font-size: 32px;
    color: #383838;
    text-align: center;
    font-family: caecilia, times, serif;
  }
  .delpage .btn {
    text-align: center;
  }
  .delpage .calcel {
    background: #ececec;
    color: #606060;
    border: 1px solid #d9d9d9;
  }
  .delpage .calcel:hover{
    background: rgb(217,217,217);
  }
  .delpage .isdel {
    background: rgb(40,169,85);
    border: 1px solid #23944b;
    color: #ffffff;
  }
  .delpage .isdel:hover{
    background: #23944b;
  }
  .delpage .GJDCG5COCC {
    cursor: pointer;
    border-radius:5px;
    display: inline-block;
    margin: 0 4px;
    width: 168px;
    height: 31px;
    line-height: 31px;
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 13px;
  }
</style>
