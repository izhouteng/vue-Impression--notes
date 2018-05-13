<template>
  <div class="delpage" @mousedown.prevent>
    <div class="delbox">
      <div class="title">
        <img src="@/assets/images/chuangjianbijibenIco.png" alt="">
        <div class="miaoshu">创建笔记本</div>
      </div>
      <div style="height: 58px;"></div>
      <div class="n-note">
        <input type="text" placeholder="给笔记本起个名称吧" v-model="noteBookName">
      </div>
      <div style="height: 66px"></div>
      <div class="btn clearfix">
        <span class="calcel GJDCG5COCC" >取消</span>
        <span class="nosize GJDCG5COCC" :class="noteBookName.length > 0 ? 'isdel' : ''">创建笔记本</span>
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
