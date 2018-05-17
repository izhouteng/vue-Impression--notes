<template>
    <div class="meiyouBj" v-show="$store.state.notelistNumber">
      <div class="tishi">
        <img src="@/assets/images/meiyoubijiliebiaoIco.png" alt="">
        <p class="addTip">
          点击 <span class="jiahao"></span>添加笔记
        </p>
        <p class="twotext">创建灵感笔记本，随时收集灵感创意，并与他人共享。</p>
      </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .meiyouBj {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .meiyouBj .tishi {
      width: 100%;
      padding: 0 45px;
      position: absolute;
      text-align: center;
      box-sizing: border-box;
      top: 180px;
    }
    .meiyouBj .jiahao {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url("../../assets/images/plus_gray_16.png") no-repeat;
    }
    .tishi .addTip{
      font-family: caecilia, times, serif;
      font-size: 16px;
      color: #4a4a4a;
      margin-top: 20px;
      word-wrap:break-word
    }
    .twotext {
      font-family: gotham, helvetica, arial, sans-serif;
      font-size: 13px;
      color: #878787;
      line-height: 20px;
    }
</style>
