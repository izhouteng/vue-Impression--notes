<template>
      <div class="bijibenHDC" v-show="$store.state.noteBookShow">
        <div class="bijibenInfo">
          <h2>笔记本</h2>
          <img src="@/assets/images/huachuangbijiben.png" alt="" class="xinjian" title="创建笔记本">
          <div class="message">
            <input type="text" class="messageValue" placeholder="查找笔记本">
          </div>
        </div>
        <!--笔记本列表-->
        <div class="bijibenList">
          <div class="notList">
            暂无笔记本信息...
          </div>
          <!--笔记本数据列表-->
          <div class="liebiao" v-for="item in noteBooks" :key="item.id" @click="clickHander(item)">
            <div class="list_main">
              <div class="bijixinxi">
                <div class="noteTitle">
                  {{item.title}}
                </div>
                <p class="number">{{item.children.length}} 条笔记</p>
                 <div class="delnotes" title="删除笔记本" @click.stop="deleteNoteBook(item)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: "notebook",
        data(){
           return {

           }
        },
        methods:{
          //删除笔记本 提交vuex
          deleteNoteBook(obj){
            this.$store.commit('deleteNoteBook',{
               obj:obj,
            })
          },
          // 进入详细的笔记本信息
          clickHander(obj){
             this.$store.commit('inNotelist',{
                obj:obj,
             });
             // 跳转路由到详细笔记本列表中的第一个id
             let booklist = this.$store.state.joinNoteList;
             if(booklist.length > 0){
                this.$router.push({
                   path:'/home/' + booklist[0].id
                })
             }else if(booklist.length === 0){
                 this.$store.commit('deleteAll')
             }
          }
        },
        computed:{
           //从vuex中取笔记列表
           noteBooks(){
              return this.$store.state.dataList;
           }
        }
    }
</script>

<style scoped>
  .bijibenHDC {
     left: 0px;
  }
  .liebiao .list_main:hover{
      background: rgb(64,188,108);
  }
  .liebiao .list_main:hover .noteTitle{
      color: #ffffff;
  }
  .liebiao .list_main:hover .number{
     color: #c9f2d0;
  }
</style>
