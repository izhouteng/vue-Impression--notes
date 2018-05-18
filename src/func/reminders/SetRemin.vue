<template>
    <div class="reminderAdded" v-if="$store.state.setRemin">
      <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
      <p class="tixingok">提醒已添加</p>
      <div class="notice" @click.stop="reminMeHander">
        通知我
      </div>
    </div>
</template>

<script>
  // 设置提醒组件
    export default {
        name: "yx--setremin",
        data(){
          return {

          }
        },
      methods:{
          // 通知我,加载iviews日期组件
        reminMeHander(){
           this.$store.commit('reminMehander');
        }
      }
    }
</script>

<style scoped>

</style>
