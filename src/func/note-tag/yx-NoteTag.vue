<template>
      <div class="yx-nt-tag" v-if="$store.state.noteTagState">
        <div class="bijibenInfo">
          <h2>标签</h2>
          <div class="message">
            <input type="text" class="messageValue" placeholder="查找标签" v-focus v-model="searchTag">
          </div>
        </div>
        <div class="tag-cont">
          <div class="nt-tag">
            <div class="sp-z"></div>

            <div class="tag-page" v-for="(item,index) in findTagList" :key="item.id">
              <!--展示标签-->
              <div class="changeedit"
                   @mouseover="overHander(item)"
                   @mouseout="outHander"
              >
                  <div class="s-tag" title="进入标签笔记" @click="JoinTagNotes(item)">
                    <span class="z-cont">{{item.tag}}</span><span class="t-number">{{item.len}}</span>
                  </div>
                <!--v-if="index===state"-->
                  <div class="nt-func" v-if="item === state">
                    <span class="edittag" title="编辑标签" @click.stop="editTagHander(item,index)"></span>
                    <span class="deletetag" title="删除标签" @click.stop="deleteTagHander(item)"></span>
                  </div>
              </div>
              <div class="edit-tag" v-show="item.tag === editContShow">
                <input type="text" class="editVal"
                       v-model="editValue"
                       @blur.stop="blurHander(item)"
                       ref="editVal"
                >
                <div class="saveedit"></div>
              </div>
            </div>

              <!--当标签为空的时候-->
              <div class="xJtagPic" v-if="!this.$store.state.tagAllList.length">
                <div class="xJn-cont">
                  <div class="ico"></div>
                  <p style="font-weight: 700">点击笔记,去新建个自己的专属标签吧!</p>
                  <p class="tipmecces">添加标签,查找更容易</p>
                </div>
              </div>


          </div>
        </div>
      </div>
</template>

<script>
  export default {
      data(){
        return {
           state:-1, //删除,编辑下标
           editContShow:'', //用来和输入的input框控制显隐
           editValue:'',  //和编辑标签进行双向数据绑定
           searchTag:'', //双向绑定搜索的标签
        }
      },
    methods:{
      overHander(index){
         this.state = index;
      },
      outHander(){
        this.state = -1;
      },


      /*
      * join notetag info,
      * @ obj 当前的标签数据
      *  @ tag
      *  @ id
      *  @ len
      * */
      JoinTagNotes(obj){
         this.state = -1;
         this.$store.commit('joinTagNotes',obj.tag); //根据当前标签找到笔记对象

         this.$router.push({
           path:'/home/1111111',
         });
        // 如果当搜索框显示的时候,再提交commit关闭
        if(this.$store.state.searchBox){
          this.$store.commit('hideSearchShow')
        }
        // 进入标签隐藏第几阶段笔记组件信息
        this.$store.commit('closeJdShowTag');
        // 如果点击进入标签,预防当前状态处于查看快捷方式
        this.$store.commit('noteListTrue'); //margin-left为原始值,笔记本列表显示
        this.$store.commit('closeHander'); //显示展开图标
      },
      //编辑标签
      editTagHander(obj,index){
          // 将被编辑的对象的tag内容同步在当前组件的editValue中,和input进行双向数据绑定
          this.editValue = obj.tag; //用来和input双向数据绑定的
          this.editContShow = obj.tag; //用tag控制显示隐藏
          //修正
          let bl = this.$refs.editVal;
          this.$nextTick(function(){
            bl[index].focus()
          })
      },
      // 失去焦点事件
      blurHander(obj){
        // 判断空否
         if(this.editValue !== this.editContShow){
             if(this.editValue.trim()){
               //提交commit 同步最新数据
               this.$store.commit('changeEditHander',{
                 tag:obj.tag,
                 val:this.editValue,
               })
             }
             else{
               this.editValue = this.editContShow;
             }
         }
         // 如果在不做任何修改的情况下,隐藏
         else{
            this.editContShow = '';
         }
      },
      //删除标签
      deleteTagHander(obj){
        this.$store.commit('deleteTagHander',obj.tag)
      },
    },

    /*
    * 通过计算属性 filterstag,从vuex中的笔记列表中过滤标签笔记数据
    * */
    computed:{
        filterstag(){

          let tagArr = [];
          let bl = this.$store.state.allList;

         /*
         * bl @ vuex alllist everyone notedata
         * 1. 遍历每条笔记,通过判断这个笔记的label数组的长度,得到这条笔记有没有标签内容
         * 2. 如果笔记内容有标签
         *    tagArr[]存储
         *    @ obj 当前的笔记对象
         *    @ tag  对应的label数组
         * */

          bl.forEach(item => {
            let label = item.label;
            if(label.length >= 1){
              tagArr.push({
                obj:item,
                tag:label
              })
            }
          });

          /*
          * 1.遍历 tagArr中的每一个对象
          * 2. 遍历tagArr对象中的tag对应的标签数组中的每一个标签和对应的对象
          * 3.newArr[
          *   @obj 笔记对象
          *   @tag 对应的每一个标签
          * ]
          * {obj: {…}, tag: "Vue"}
            {obj: {…}, tag: "Vue"}
            {obj: {…}, tag: "vue-cli"}
            {obj: {…}, tag: "印象笔记"}
            这样的格式
          * */
          let newArr = [];
          for(let i = 0; i < tagArr.length; i++){
            for(let j = 0; j < tagArr[i].tag.length; j++){
              newArr.push({
                obj:tagArr[i].obj,
                tag:tagArr[i].tag[j]
              })
            }
          }

          /*
          * 对newArr数组中的每一个对象的tag对应的标签名进行排序
          * */
          newArr.sort(function(a,b){
            return a.tag.charCodeAt() - b.tag.charCodeAt()
          });


          /*
          * _res 存储要展示的数据格式
          * @ count 记录所有笔记中相同的标签的个数
          * @ tag 标签名
          * @ len 相同标签的个数
          * @ id 每个对象保持唯一的id
          * */
          let _res = [];

          for (let i = 0; i < newArr.length;) {
            let count = 0;
            for (let j = i; j < newArr.length; j++) {
              if (newArr[i].tag === newArr[j].tag) {
                count++;
              }
            }
            _res.push({
              tag:newArr[i].tag,
              len:count,
              id:Math.random(),
            });

            i += count;
          }

          // 将标签数据同步在editValue
          return _res;
      },

      /*
      *   search tag notes list
      *   通过计算属性filterstag数组中的数据,进行搜索标签进行数据的展示
      * */
      findTagList(){
          return this.filterstag.filter(item => {
            return item.tag.match(this.searchTag)
          })
      }
    },

    /*
    * 侦听标签组件的显示和隐藏,进行数据的同步
    * */
    watch:{
       '$store.state.noteTagState':function(){
          if(this.$store.state.noteTagState){
            this.$store.commit('tagdataList',this.filterstag);
          }
       }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>

</style>
