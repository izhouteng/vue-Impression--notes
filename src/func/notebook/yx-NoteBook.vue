<template>
      <div class="bijibenHDC" v-show="$store.state.noteBookShow">
        <div class="bijibenInfo">
          <h2>笔记本</h2>
          <img src="@/assets/images/huachuangbijiben.png" alt="" class="xinjian" title="创建笔记本" @click="createHander">
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
          <div class="liebiao"
               v-for="(item,index) in noteBooks"
               :key="item.id" @click="clickHander(item,item.id)"
               :style="{backgroundColor:$store.state.noteBookBg === item.id ? 'rgb(236,236,236)' : ''}"
               @mouseover="state=index"
               @mouseout="state=-1"
          >
            <div class="list_main">
              <div class="bijixinxi">
                <div class="noteTitle">
                  {{item.title}}
                </div>
                <p class="number">{{item.children.length}} 条笔记</p>
                 <div class="delnotes" title="删除笔记本" @click.stop="deleteNoteBook(item)" v-show="state===index"></div>
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
              state:-1,
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
          clickHander(obj,index){
             // 如果当前笔记是全屏状态,那么应该让笔记列表显示
              this.$store.commit('noteListTrue');
              this.$store.commit('closeHander');
             //应该判断点击笔记本列表对象的chilren的长度,不能通过vuex状态判断,不靠谱
             this.$store.commit('notebookState',index);
             if(obj.children.length < 1){
               this.$store.commit('deleteAll')
             }
             this.$store.commit('inNotelist',{
                obj:obj,
             });
             // 跳转路由到详细笔记本列表中的第一个id
             let booklist = this.$store.state.joinNoteList;
             if(booklist.length > 0){
                this.$router.push({
                   path:'/home/1111111'
                })
             }
             // 进入笔记列表,获取最新的笔记创建时间
             this.getDateTimes.getDateTimes.call(this,booklist);
             // 如果当搜索框为显示的时候再关闭
              if(this.$store.state.searchBox){
                this.$store.commit('hideSearchShow')
              }
          },

          //创建笔记本
          createHander(){
             this.$store.commit('createHanderShow')
          },

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
