<template>
    <div class="setdates" v-if="$store.state.setTimersRemin" @click.stop>
      <DatePicker type="date"
                  placeholder="Select date"
                  style="width: 200px"
                  open
                  @on-change="changeHander"
                  format="yy/MM/dd"
      >
      </DatePicker>
      {{showtimerHander}}
    </div>
</template>

<script>
    export default {
        name: "show-times",
        data(){
          return {
            noteContent:{},
          }
        },
        methods:{
          // iview时间组件 正则格式时间格式
          changeHander(t){
            let bl = t.replace(/\/0+/g,function(r){
              return '/'
            });
            // 给当前对象设置用户选择的时间
            this.$store.commit('setTimes',{
              obj:this.noteContent,
              remint:bl,
            })
          }
        },
      computed:{
          showtimerHander(){
            this.noteContent = this.$store.state.noteContent;
          }
      }
    }
</script>

<style>
  .setdates {
    position: absolute;
    left: -94px;
    top: 10px;
  }
  .setdates .ivu-input{
    display: none;
  }
  .setdates .ivu-icon {
    display: none;
  }
</style>
