<template>
      <div class="undo" v-if="$store.state.undoRemin">
        <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
        <div class="complete main" @click.stop="undoHander">
          撤销
        </div>
        <div class="main" @click.stop="clearUndoHander">
          清除提醒
        </div>
        <div class="main" @click.stop="changeDate">
          修改日期
        </div>
        {{undohander}}
      </div>
</template>

<script>
    // 这是撤销提醒组件
    export default {
        name: "undo-remin",
        data(){
          return {
            UndoNoteDate:{},
          }
        },
      methods:{
          //撤销标记完成
        undoHander(){
           this.$store.commit('undoReminHander',{
              obj:this.UndoNoteDate,
           })
        },
        // 标记已完成 清除提醒
        clearUndoHander(){
           this.$store.commit('clearUndoHander',{
              obj:this.UndoNoteDate,
           })
        },
        // 标记已完成 修改日期
        changeDate(){
          this.$store.commit('UndochangeDate')
        }
      },
      computed:{
          undohander(){
            this.UndoNoteDate = this.$store.state.noteContent;
          }
      }
    }
</script>

<style scoped>

</style>
