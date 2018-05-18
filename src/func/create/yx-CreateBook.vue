<template>
  <div class="delpage" v-if="$store.state.createBookShow">
    <div class="delbox">
      <div class="title" @mousedown.prevent >
        <img src="@/assets/images/chuangjianbijibenIco.png" alt="">
        <div class="miaoshu">创建笔记本</div>
      </div>
      <div style="height: 58px;"></div>
      <div class="n-note">
        <input type="text" placeholder="给笔记本起个名称吧" v-model="noteBookName" ref="createValue" v-focus>
      </div>
      <div style="height: 66px"></div>
      <div class="btn clearfix" @mousedown.prevent>
        <span class="calcel GJDCG5COCC" @click="createCancel">取消</span>
        <span class="nosize GJDCG5COCC" :class="noteBookName.length > 0 ? 'isdel' : ''" @click="createOk">创建笔记本</span>
      </div>
    </div>
  </div>
</template>

<script>
  // 创建笔记本
  export default {
      data(){
        return {
           noteBookName:'',  //笔记本名称
        }
      },
    methods:{
        //取消创建
      createCancel(){
         this.$store.commit('createHanderNone');
         this.noteBookName = '';
      },
      // 确认创建
      createOk(){
         if(this.noteBookName.trim()){
           let id = (Math.random()*123456789 + '1').slice(0,7);
           let BookObj = {
              "title":this.noteBookName,
              "id":'f' + id,
              "shared":false,
              "sorting":'',
              "children":[],
           };

           // 同步到vuex状态中的 dataList数据列表
           this.$store.commit('addBooks',{
              obj:BookObj,
           });

           //创建成功,隐藏创建笔记本组件
           this.$store.commit('createHanderNone');
           this.noteBookName = ''; //创建成功之后把笔记本名清空,方便下次创建

         }
      }
    },
    // 自定义指令
    directives:{
        focus:{
          inserted:function(el){
            el.focus();
          }
        }
    }
  }
</script>

<style scoped>
  .delpage {
    position: absolute;
    z-index: 1009;
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
    font-size: 28px;
    text-align: center;
    font-family: caecilia, times, serif;
  }
  .delpage .n-note input {
     border: none;
     outline: none;
     text-align: left;
     color: #c4c4c4;
     margin-left: 80px;
  }
  .delpage .n-note input::placeholder{
    font-size: 28px;
    color: #c4c4c4;
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
  .delpage .nosize {
    background: #96dfb0;
    color: #ffffff;
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
    width: 180px;
    height: 31px;
    line-height: 31px;
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 13px;
  }
</style>
