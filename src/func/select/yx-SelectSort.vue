<template>
      <div class="selList" v-if="$store.state.selectDown" @mousedown.prevent>
        <legend class="sortingWay">排序方式</legend>
        <ul class="sortlist">
          <li v-for="(item,index) in sortdata"
              :key="item.id"
              :class="[index === state ? 'action' : '']"
              @mouseover="overHander($event,index)"
              @click="clickHander(item,index)"
          >
            {{item.title}}
          </li>
        </ul>
        <div class="MenuDivider"></div>
        <div class="viewsel" @click.stop>
          <legend>查看选项</legend>
          <div v-for="item in lookDate"
               :key="item.id"
               :class="item.checked ? 's-pit' : 's-pit n-pit'"
               @click="showHander(item)"
          >
              {{item.title}}
          </div>
        </div>
      </div>
</template>

<script>
  let lookDate = [
    {
      title:'显示图片',
      checked:true,
      id:1,
    },
    {
      title:'显示文字',
      checked:true,
      id:2
    }
  ];
  import sortData from '@/assets/js/sortdata'
    export default {
        name: "yx--select-sort",
        data(){
           return {
              sortdata:sortData,
              sortway:"createLatest", //默认排序方式
              state:1,
              lookDate,
           }
        },
      methods:{
        overHander(ev,index){
           if(this.state === index){
              if(ev.target.nodeName === 'LI'){
                 let target = ev.target;
                 target.classList.add('item')
              }
           }
        },

        // 显示文字
        showHander(obj){
           if(obj.id === 2){
              obj.checked = !obj.checked;
              // 同步vuex状态
              this.$store.commit('changeShowHander',{
                 st:obj.checked,
              })
           }
        },

        // 更换时间排序日期
        clickHander(item,index){
           if(index !== this.state){
               this.state = index;
               //将点击的排序方式同步到vuex状态,并更新陆游进行笔记列表的排序
               this.$store.commit('changeSort',{
                  way:item.way,
               });
               this.$router.push({
                  path:'/home/' + Math.random()
               });
             // 同步笔记列表时间
             this.getDateTimes.getDateTimes.call(this,this.$store.state.allList)
           }
        }
      }

    }
</script>

<style scoped>
    .action {
      background: url("../../assets/images/duigou.png") no-repeat 173px 12px;
    }
    .sortlist li:hover{
       background: #2dbe60;
       color: #ffffff;
    }
    .sortlist li:hover.item{
      background: url("../../assets/images/duigouhover.png") no-repeat 173px 12px #2dbe60;
    }
    .s-pit:hover {
      color: #ffffff;
      background: url("../../assets/images/checkebox2.png") no-repeat 162px 4px #2dbe60;
    }
    .n-pit:hover {
      color: #ffffff;
      background: url("../../assets/images/xuankuangweixuanzhong.png") no-repeat 162px 4px #2dbe60;
    }

</style>
