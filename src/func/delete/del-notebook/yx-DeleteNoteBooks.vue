<template>
  <div class="delpage" v-show="$store.state.delNoteBookShow" @mousedown.prevent>
    <div class="delbox">
      <div class="title">
        <img src="@/assets/images/112.png" alt="">
        <div class="miaoshu">删除笔记本</div>
      </div>
      <div style="height: 58px;"></div>
      <div class="n-note">
        确定删除<strong style="font-weight: normal">{{delDate.title}}</strong>吗?
        <p class="tip" v-show="$store.state.dataList.length <= 1">至少留一个笔记本,你可以创建一个新的笔记本,再删除这个</p>
      </div>
      <div style="height: 66px"></div>
      <div class="btn clearfix">
        <span class="calcel GJDCG5COCC" @click="cancelDelete">取消</span>
        <span class="isdel GJDCG5COCC" @click="yesDelete" @mouseover="overFn" ref="notDel">删除</span>
      </div>
    </div>
    {{delDate}}
  </div>
</template>

<script>
  // 删除笔记本二次确认组件
  export default {
      data(){
         return {

         }
      },
      methods:{
        //取消删除
        cancelDelete(){
           this.$store.commit('cancelDelete')
        },
        //确定删除
        yesDelete(){
            if(this.$store.state.dataList.length > 1){
               this.$store.commit('isDeleteBook');
               this.$router.push({
                  path:'/home/' + Math.random()
               });
              this.message.message.call(this);
            }else{
               console.log('最后一个笔记')
            }
        },
        // 还剩最后一个笔记本,拒绝删除
        overFn(){
           if(this.$store.state.dataList.length <=1){
             let btn = this.$refs.notDel;
             btn.style.cursor = 'not-allowed';
             btn.style.backgroundColor = 'rgb(40,169,85)'
           }
        }
      },
      computed:{
         delDate(){
            return this.$store.state.delNoteBookObj;
         }
      }
  }
</script>

<style scoped>
  .delpage {
    position: absolute;
    z-index: 1006;
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
    position: relative;
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
  .tip {
     font-size: 16px;
     font-weight: 800;
     position: absolute;
     bottom: -30px;
     left: 118px;
     color: red;
  }
</style>
