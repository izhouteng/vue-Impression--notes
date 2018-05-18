<template>
    <div class="deleteTip" v-show="$store.state.tipsuccessState">
      <div class="d-tip-cont">
        <div class="s-cont">
          <div class="duigou">
            <img src="@/assets/images/deleteico.png" alt="">
          </div>
          <div class="shanchuTip">
            {{tip}}<span>{{tipnoteName}}</span>
          </div>
        </div>
      </div>
      {{sucInfo}}
    </div>
</template>

<script>
    //提示组件
    // 将数据映射到组件
    export default {
        name: "del-success",
        data(){
          return {
             tipnoteName:'', // 删除的笔记名称
             tip:'', // 提示类型
          }
        },
      methods:{

      },
      computed:{
          // 计算属性
          sucInfo(){
             let infoSuccess = this.$store.state.tipsuccessInfo;
             this.tipnoteName = infoSuccess.objname;
             this.tip = infoSuccess.tip;
          }
      }
    }
</script>

<style scoped>

</style>
