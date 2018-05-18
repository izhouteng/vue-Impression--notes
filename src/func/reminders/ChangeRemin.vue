<template>
    <div class="changeTixing" v-if="$store.state.changeRemin">
      <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
      <div class="complete main" @click.stop="tagSuccess" title="标记完成">
        标记完成
      </div>
      <div class="main" title="清除提醒" @click.stop="clearReminHander">
        清除提醒
      </div>
      <div class="main" title="修改日期" @click.stop="changeDate">
        修改日期
      </div>
      {{notecontent}}
    </div>
</template>

<script>
   // 这是修改提醒组件
    export default {
        name: "change-remin",
        data(){
          return {
            noteContent:{},
          }
        },
        methods:{
          //标记完成
          tagSuccess(){
             this.$store.commit('TAGSUCCESS',{
                obj:this.noteContent
             })
          },
          // 清除提醒
          clearReminHander(){
             this.$store.commit('clearReminHander',{
               obj:this.noteContent,
             })
          },
          //修改日期
          changeDate(){
            this.$store.commit('changeDate')
          }
        },
      computed:{
          // 从vuex状态管理中同步过来vuex数据
         notecontent(){
           this.noteContent = this.$store.state.noteContent;
         }
      }
    }
</script>

<style scoped>

</style>
