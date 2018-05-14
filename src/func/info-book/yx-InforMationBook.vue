<template>
  <div class="delpage" v-show="$store.state.information">
    <div class="cont-center">
      <div class="nt-h-yxs" @mousedown.prevent>
        <div class="nt-h-p">
          <img src="@/assets/images/note-info-pages.png" alt="">
          <p class="info-p">笔记信息</p>
          <div class="h-x"></div>
          <div class="t-t-nt">{{dataInfo.title}}</div>
        </div>
      </div>
      <div class="g-t-y">
        <div class="g-t-cont">
          <p class="g-ytext" @mousedown.prevent>概要</p>
          <div class="GJDCG5CLIC" @mousedown.prevent>
            <span class="r-t">创建时间:</span><span class="GJDCG5CMIC">2018 四月 12, 星期四, 下午 7:35</span>
          </div>
          <div class="GJDCG5CLIC" @mousedown.prevent>
            <span class="r-t">更新时间:</span><span class="GJDCG5CMIC">2018 五月 2, 星期三, 下午 6:40</span>
          </div>
          <div class="GJDCG5CLIC" @mousedown.prevent>
            <span class="r-t">大小:</span><span class="GJDCG5CMIC">{{dataInfo.size}}</span>
          </div>
          <div class="GJDCG5CLIC" @mousedown.prevent>
            <span class="r-t">历史记录:</span><span class="GJDCG5CMIC" style="color: #23944b">暂无记录</span>
          </div>
          <div class="ads">
            <div class="url">
              <span @mousedown.prevent>URL</span>
              <input type="text" v-model="dataUrl" class="val-my" placeholder="设置链接...">
            </div>
            <div class="url">
              <span @mousedown.prevent>作者</span>
              <input type="text" v-model="dataAuthor" class="val-my">
            </div>
          </div>
        </div>
        <div class="shark" @mousedown.prevent>
          <p class="GJDCG5CLIC">共享设置</p>
          <div>
            <span class="r-t">共享设置:</span><span class="GJDCG5CMIC">未共享</span>
          </div>
        </div>
      </div>
      <div class="btn clearfix" @mousedown.prevent>
        <span class="calcel GJDCG5COCC" @click="closeHander">取消</span>
        <span class="isdel GJDCG5COCC" @click="saveHander">保存</span>
      </div>
    </div>
  </div>
</template>

<script>
  // 笔记信息组件
  export default {
      data(){
        return {
          dataUrl:'',
          dataAuthor:'',
        }
      },
    methods:{
        //取消
      closeHander(){
         this.$store.commit('closeHander');
      },
      // 保存修改笔记信息
      // 将当前对象的id, url地址, 作者信息提交mutations 进行匹配这个数据进行修改数据
      saveHander(){
         this.$store.commit('saveHander',{
            id:this.dataInfo.id,
            url:this.dataUrl,
            author:this.dataAuthor,
         })
      }
    },
     computed:{
        dataInfo(){
           let infoDate = this.$store.state.noteInfos;
           this.dataUrl = infoDate.url;
           this.dataAuthor = infoDate.author;
           return infoDate;
        }
     },
    /**
     * 明天写:
     *   创建时间
     *   更新时间
     *   Kb(根据字数计算)
     *   取消(完成)
     *   保存功能(完成)
     */
  }
</script>

<style scoped>
  .delpage {
     width: 100%;
     height: 100%;
     background: #ffffff;
  }
  .cont-center {
    /*border: solid 1px red;*/
    width: 650px;
    margin: 104px auto 0;
    text-align: center;
  }
  .info-p {
    margin-top: 24px;
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 13px;
    letter-spacing:1px;
  }
  .h-x {
    display: inline-block;
    height: 1px;
    width: 124px;
    background: #d9d9d9;
    margin-top: 19px;
  }
  .t-t-nt {
    margin:14px 0 60px 0;
    color: #383838;
    word-wrap:break-word;
    font-size: 32px;
    line-height: 32px;
    font-weight: 300;
    font-family: "Microsoft YaHei";
  }
  .g-t-y {
    width: 100%;
    text-align: left;
  }
  .g-t-cont {
    width: 472px;
    height: 100%;
    margin-left: 120px;
  }
  .g-ytext {
    color: #4a4a4a;
    margin-bottom: 16px;
  }
  .r-t {
    color: #878787;
    margin-right: 8px;
  }
  .GJDCG5CLIC {
    margin-bottom: 12px;
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 13px;
  }
  .GJDCG5CMIC {
      color: #4a4a4a;
  }
  .ads {

  }
  .url {
    margin-bottom:8px;
    position: relative;
  }
  .val-my {
    width: 472px;
    height: 40px;
    outline: none;
    border: solid 1px #e1e1e1;
    border-radius: 6px;
    font-family: gotham, helvetica, arial, sans-serif;
    color: #4a4a4a;
    font-size: 14px;
    padding-left: 60px;
  }
  .url span {
    position: absolute;
    padding: 4px;
    border: solid 1px #e1e1e1;
    border-radius: 6px;
    left: 8px;
    top: 6px;
    color: #878787;
    background: #ffffff;
  }
  .val-my::placeholder{
    font-size: 10px;
  }
  .shark {
    margin-left: 116px;
    margin-top: 16px;
  }

  .btn {
    text-align: center;
    margin-top: 80px;
  }
  .calcel {
    background: #ececec;
    color: #606060;
    border: 1px solid #d9d9d9;
  }
  .calcel:hover{
    background: rgb(217,217,217);
  }
  .isdel {
    background: rgb(40,169,85);
    border: 1px solid #23944b;
    color: #ffffff;
  }
  .isdel:hover{
    background: #23944b;
  }
  .GJDCG5COCC {
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
