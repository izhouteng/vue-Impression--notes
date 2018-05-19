<template>
  <!--$store.state.messageShow-->
   <div class="g-message" v-if="state">
      <div class="headers">
        <div class="recipient">
          <span class="recpeople">收件人：</span>
          <span class="resemile">9116895@qq.com</span>
        </div>
        <div class="closeMessage">
          <img src="../../../assets/images/closeMessage.png" alt="" @click="closeMessage">
        </div>
        <slot name="tagget"></slot>
      </div>

     <div class="logos">
        <div class="messagePic">
          <img src="../../../assets/images/qunliaozujianfasongxiaoxipic.png" alt="">
        </div>
     </div>
     <!--共享笔记-->
     <div class="shakenote">
       <p class="s-title">共享笔记</p>
       <div class="c-cont">
        <div class="notepic"></div>
         <div class="shownote">{{data.title}}</div>
         <div class="c-text">可以编辑和共享</div>
         <div class="henggang">
            <div class="yuan">
              <div class="hengxian"></div>
            </div>
         </div>
       </div>
     </div>
     <!--输入消息-->
     <div class="input">
       <input type="text" class="messageVal" value="Hello Vue!">
       <div class="goMes">
         发送
       </div>
     </div>
   </div>
</template>

<script>
    // 这是群聊消息弹窗
    export default {
        name: "yx-group-message",
        props:{
           data:{
             type:Object,
             default:function(){
               return {};
             }
           },
          state:{
             type:Boolean,
             default:false,
          }
        },
      methods:{
        closeMessage(){
           this.$emit('close-hander')
        }
      }
    }
</script>

<style scoped>
  .g-message {
    width: 448px;
    height: 386px;
    position: absolute;
    background: #ffffff;
    left: 68px;
    bottom: 10px;
    border: solid 1px #d9d9d9;
    z-index: 99998;
    border-radius: 2px;
    cursor: pointer;
  }
  .headers {
    width: 100%;
    height: 43px;
    line-height: 43px;
    border-bottom: solid 1px #e1e1e1;
    font-family: gotham, helvetica, arial, sans-serif;
  }
  .recipient {
    float: left;
    margin-left: 12px;
    position: relative;
    font-size: 12px;
  }
  .closeMessage{
    float: right;
    margin-top: 14px;
    margin-right: 14px;
  }
  .recpeople{
    vertical-align: top;
    color: #4a4a4a;
    display: inline-block;
  }
  .resemile {
    background: #ececec;
    height: 22px;
    padding: 6px 8px;
    border-radius: 6px;
    color: #4a4a4a;
    font-size: 12px;
  }
  .logos {
    height: 190px;
    border: solid 1px #e1e1e1;
    position: relative;
    background: #f8f8f8;
  }
  .messagePic {
    width: 49px;
    height: 49px;
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    margin: auto;
  }
  .shakenote {
    padding: 0 12px;
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 11px;
  }
  .s-title {
    line-height: 40px;
    color: #ababab;
  }
  .c-cont {
    height: 34px;
    border: solid 1px #ececec;
    border-radius: 4px;
    position: relative;
  }
 .notepic {
   width: 16px;
   height: 16px;
   background: url("../../../assets/images/kuaijiefangshiyouneirongdetubiao.png") no-repeat;
   position: absolute;
   left: 12px;
   top: 10px;
 }
  .shownote {
    position: absolute;
    left: 32px;
    top: 10px;
    width: 200px;
    height: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .c-text {
    position: absolute;
    right: 48px;
    top: 10px;
    padding-right: 12px;
    background: url("../../../assets/images/gongxiangxiajiantou.png") no-repeat 88px 7px;
  }
  .henggang {
    width: 34px;
    height: 34px;
    border-left: solid 1px #ececec;
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 0 4px 4px 0;
  }
  .yuan {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border: solid 2px #d0d0d0;
  }
  .hengxian {
    width: 8px;
    height: 2px;
    background: #d0d0d0;
    margin: auto;
    margin-top: 5px;
  }
  .input {
    margin-top: 26px;
    padding: 0 18px;
    position: relative;
  }
  .messageVal {
    border: none;
    outline: none;
    width: 100%;
    display: block;
    color: rgba(135, 135, 135, 0.83);
  }
  .goMes {
    width: 90px;
    height: 28px;
    position: absolute;
    right: 24px;
    top: 0px;
    background: #2dbe60;
    text-align: center;
    line-height: 28px;
    color: #ffffff;
    border-radius: 4px;
  }
  .goMes:hover {
    cursor: no-drop;
  }
  .topJiant {
    width: 13px;
    height: 6px;
    position: absolute;
    right: 42px;
    top: -7px;
    background: url("../../../assets/images/shangjianjiaohao.png") no-repeat 0px 0px;
  }
</style>
