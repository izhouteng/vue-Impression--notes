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
           this.routeId = this.$store.state.delnoteNextId;
           this.$router.push({
              path:'/home/'+this.routeId,
           })
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
