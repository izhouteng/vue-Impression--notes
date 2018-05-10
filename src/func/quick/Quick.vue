<template>
    <div class="quick" v-show="$store.state.quickShow">
      <div class="q_biaoti">
        <h2>快捷方式</h2>
      </div>
      <!--快捷信息 收藏的列表-->
      <div class="kuaijieInfo">
        <div class="nokuaijie" v-if="!$store.getters.shortcutHander">
          <img src="@/assets/images/kuaijiefangshiwuneirong.png" alt="" class="logo">
          <div class="quickxinxi">
            <p>工作更高效</p>
            <p>移动鼠标至列表中的某个笔记或笔记本,并点击☆创建快捷方式(这个五角星我是真没图片)</p>
          </div>
        </div>

        <!--有收藏列表内容------------------------------->
        <div class="quickList" v-if="$store.getters.shortcutHander">
          <div class="item clearfix actions"
               v-for="item in datalist"
               :key="item.id"
               @click="clickHander(item)"
          >
            <div class="beforeicon"></div>
            <div class="q_t">
             {{ item.title}}
            </div>
            <!--移出收藏-->
            <div class="delete" title="移除快捷方式" @click.stop="delquickHander(item)"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
      name: "quick",
      data(){
        return {

        }
      },
      methods:{
        //删除快捷方式
        delquickHander(obj){
            this.$store.commit('delquickHander',{
               obj:obj,
            })
        },
        //跳转笔记详情页
        clickHander(obj){
            this.$store.commit('startShow');
            this.$store.commit('noteListshow');
            this.$router.push({
               path:'/home/'+obj.id
            })
        }
      },
     computed:{
         //vuex中的所有笔记列表
         datalist(){
            // return this.$store.state.allList;
            return this.$store.state.allList.filter(item => item.shortcut);
         }
     },
  }
</script>

<style scoped>
   .actions:hover{
     background: #2dbe60;
   }
   .actions:hover .q_t{
     color: #ffffff;
   }
  .actions:hover .beforeicon{
     background: url("../../assets/images/kuaijiefangshihover.png") no-repeat;
  }
  .delete:hover{
     background: #ffffff;
  }
   .delete:hover:after{
      background: #2dbe60;
   }
</style>
