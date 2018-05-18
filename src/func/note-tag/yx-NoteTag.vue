<template>
      <div class="yx-nt-tag" v-if="$store.state.noteTagState">
        <div class="bijibenInfo">
          <h2>标签</h2>
          <img src="@/assets/images/xinjianbiaoqianya.png" alt="" class="xinjian">
          <div class="message">
            <input type="text" class="messageValue" placeholder="查找标签">
          </div>
        </div>
        <div class="tag-cont">
          <div class="nt-tag">
            <div class="sp-z"></div>

            <div class="tag-page" v-for="(item,index) in tagDate" :key="item.id">
              <!--展示标签-->
              <div class="changeedit"
                   @mouseover="overHander(index)"
                   @mouseout="outHander"
              >
                  <div class="s-tag" title="进入标签笔记" @click="JoinTagNotes(item)">
                    <span class="z-cont">{{item.tag}}</span><span class="t-number">{{item.len}}</span>
                  </div>
                  <div class="nt-func" v-if="index===state">
                    <span class="edittag" title="编辑标签" @click.stop="editTagHander(item)"></span>
                    <span class="deletetag" title="删除标签" @click.stop="deleteTagHander(item)"></span>
                  </div>
              </div>
              <div class="edit-tag" v-show="item.tag === editContShow">
                <input type="text" class="editVal"
                       v-model="editValue"
                       ref="editVal"
                       @blur.stop="blurHander(item)"
                >
                <div class="saveedit"></div>
              </div>
            </div>

          </div>
        </div>
        {{filterstag}}
      </div>
</template>

<script>
  export default {
      data(){
        return {
           tagDate:{},
           state:-1, //删除,编辑下标
           editContShow:'', //用来和输入的input框控制显隐
           editValue:'',  //和编辑标签进行双向数据绑定
        }
      },
    methods:{
      overHander(index){
         this.state = index;
      },
      outHander(){
        this.state = -1;
      },
      //进入标签笔记
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
      },
      //编辑标签
      editTagHander(obj){
          // 将被编辑的对象的tag内容同步在当前组件的editValue中,和input进行双向数据绑定
          this.editValue = obj.tag; //用来和input双向数据绑定的
          this.editContShow = obj.tag; //用tag控制显示隐藏
          this.$nextTick(function(){
            let bl = this.$refs.editVal;
             bl[this.state].focus()
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
      }
    },
    computed:{
        filterstag(){
           let arr = [];
           let tagArr = [];
           // 从数据中去到标签的id和数据,同步到当前组件的data中
           let bl = this.$store.state.allList;
           bl.forEach(item => {
             let label = item.label;
              if(label.length >= 1){
                 tagArr.push({
                   obj:item,
                   tag:label
                 })
              }
           });
           // 将tagArr中的内容抽离出需要的部分
           let newArr = [];
           for(let i = 0; i < tagArr.length; i++){
             for(let j = 0; j < tagArr[i].tag.length; j++){
                newArr.push({
                  obj:tagArr[i].obj,
                  tag:tagArr[i].tag[j]
                })
             }
           }

           //给对象先进行排序,再找相同的元素
           newArr.sort(function(a,b){
              return a.tag.charCodeAt() - b.tag.charCodeAt()
           });
          /*----真他妈难搞-----*/
          let _res = []; //
          for (let i = 0; i < newArr.length;) {
            let count = 0;
            for (let j = i; j < newArr.length; j++) {
              if (newArr[i].tag == newArr[j].tag) {
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
          this.tagDate = _res;
        }
    }
  }
</script>

<style scoped>

</style>
