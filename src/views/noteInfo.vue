<template>
    <div class="editCount">
      <div class="root">
        <div class="editTitle">
          <!--<input type="text" value="2018-02-08 dom可视区操作" class="editValue">-->
          <input type="text" v-model="editValue" class="editValue">
        </div>
        <div class="textArea">
                <!--bug  自身内容超过高度,自身产生滚动条-->
                <textarea v-model="editTextarea"></textarea>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
             routeId:'',  //要根据这个id来过滤数据显示content中的内容
             itDate:{},  // 保存要展示content内容的对象
             editValue:'', // 双向数据绑定的Value值  只要在原文上修改之后,切换路由,就同步vuex中的数据
             editTextarea:'',  // 双向绑定textarea中的数据 ?
          }
        },
        created(){
           let userId = this.$route.params.id;
           this.routeId = userId
        },
      watch:{
          // 监听路由信息对象变化
          $route(){
            let userId = this.$route.params.id;
            this.routeId = userId;

            // 接下来要根据id 过滤不同的数据 显示在noteInfo组件中
            let n = this.$store.getters.getNoteinfo(this.routeId);
            this.isDate = n[0];
            this.editValue = this.isDate.title;
            this.editTextarea = this.isDate.content;
          }
      }
    }
</script>

<style scoped>

</style>
