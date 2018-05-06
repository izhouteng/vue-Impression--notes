<template>
    <div class="editCount">
      <div class="root">
        <div class="editTitle">
          <!--<input type="text" value="2018-02-08 dom可视区操作" class="editValue">-->
          <input type="text" v-model="editValue" class="editValue">
        </div>
        <div class="textArea">
                <!--bug  自身内容超过高度,自身产生滚动条-->
                <!--内容被手动修改应该同步vuex数据-->
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
             tranTitle:'',  // 保存用户实时输入的标题信息
             tranTextarea:'', // 保存用户实时输入的内容信息
             tranId:'', //记录修改的内容id
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

            // 在这里将修改的内容提交vuex 修改数据
            // 第一次 this.tranTitle内容为空,是不能提交的
            // this.routeId 是实时的
            if(this.tranTitle && this.tranTextarea){
              
              this.$store.commit('changeTitle',{
                id:this.tranId,
                title:this.tranTitle,
                textarea:this.tranTextarea,
              })
            }

          },
        // 监听 标题信息
        editValue(){
          this.tranTitle = this.editValue;
          this.tranId = this.$route.params.id;
        },

        // 监听 textarea用户的修改
        editTextarea(){
           this.tranTextarea = this.editTextarea;
        }
      }
    }
</script>

<style scoped>

</style>
