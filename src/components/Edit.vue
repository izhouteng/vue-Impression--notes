<template>
  <div class="youbian clearfix" @click="closeSelect">
        <!--最右侧笔记本内容信息区域-------------------------------->
        <!--左侧区域-->
        <div class="yinxDet clearfix" id="yinxdet">
          <!--标题功能栏-->
          <div class="dethead">
            <div class="detfunc">

              <div class="editDefshake main"
                    :title="!shortcut ? '添加快捷方式' : '移除快捷方式'"
                   :class="shortcut ? 'editshake' : ''"
                   @click="addshakeHander"
              ></div>
              <div class="definfo main" title="笔记信息">
                <img src="@/assets/images/defbijixinxipng.png" alt="">
                <img src="@/assets/images/bijixinxihover.png" alt="" style="display: none">
              </div>
              <div class="editDefdelete main" title="删除笔记" @click="editDelHander"></div>
              <!--复制笔记链接-->
              <div class="defmore main" title="更多">
                <img src="@/assets/images/defgengduo.png" alt="">
                <img src="@/assets/images/gengduo.png" alt="" style="display: none">
                <div class="copynoteUrl">
                  <div class="copytxt">
                    复制笔记链接
                  </div>
                </div>
              </div>
            </div>
            <!--升级共享-->
            <div class="upgrade">
              <div class="detup mains">
                升级
              </div>
              <!--写笔记完成-->
              <div class="writeNotesOk editOk" v-if="editTextarea.trim().length" @click="xJnotesHander">
                完成
              </div>
              <div class="writeCancel" v-if="!editTextarea.trim().length" @click="editCancelHander">
                  取消
              </div>
            </div>
          </div>

          <!--具体操作交互栏-->
          <div class="stages">

            <!--移动笔记和标签-->
            <div class="liangge">
              <div class="movenotes">
                <img src="@/assets/images/dijijieduanbiji.png" alt="" title="移动笔记本">
                <div class="caonima">
                  <img src="@/assets/images/qianwangbijiben.png" alt="" title="前往笔记本">
                </div>
              </div>
              <div class="biaoqian">
                <img src="@/assets/images/xinjianbiaoqian.png" alt="" title="标签">
              </div>
            </div>

            <!--第几阶段笔记-->
            <div class="dijijieduanBJ clearfix">
              <div class="yidong clearfix" @click.stop="moveSelect">
                <img src="@/assets/images/dijijieduanbiji.png" alt="" class="tubiao" title="移动笔记">
                <div class="notecont" title="移动笔记">
                  {{showNoteBook.title}}
                </div>
                <!--移动笔记本 可查找-->
                <div class="yidongBJB" v-show="init">
                  <div class="findnotes" @click.stop>
                    <input type="text" class="findValue" placeholder="查找笔记本" v-model="findNotes" ref="findval">
                  </div>
                  <div class="mynotesbook"
                       v-for="(item,index) in filterNoteBooks"
                       :key="item.id"
                       :class="item.id === state ? 'active' : ''"
                       @click="moveBooksHander(item)"
                  >
                    {{item.title}}
                  </div>
                </div>

              </div>

              <!--新建标签-->
              <div class="addtag">
                <div class="tianjiaBQ">
                  <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{item}}</Tag>
                  <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd" v-show="!tagShow">自定义标签</Button>
                  <input type="text" class="tagValue"
                         ref="tagValue"
                         v-model="tagVal"
                         :style="tagWidth"
                         v-show="tagShow"
                         @blur="inputBlur"
                         @keydown.enter="editEnterHander"
                  >
                </div>
              </div>
            </div>
          </div>

          <!--/***********/-->
          <div class="editCount">

            <div class="root">
              <div class="editTitle">
                <input type="text" v-model="inputValue" class="editValue">
              </div>
              <div class="textArea edit-textarea">
                <textarea v-model="editTextarea" placeholder="写入笔记内容...">

                </textarea>
              </div>
            </div>

          </div>
        </div>
    {{filterNote}}
  </div>
</template>

<script>
    import {editclient} from '@/assets/js/client'
    import {Tag,Button } from 'iview'
    export default {
        name: "edit",
        data(){
          return {
            inputValue:'写下笔记标题',
            editTextarea:'',  // 双向数据绑定textarea框
            noteBookList:[],  //第几阶段笔记本列表
            showNoteBook:{},  //当前展示的笔记本对象-----------
            init:false,      // 移动笔记下拉列表的显示和隐藏
            state:"f1",      // 显示第几阶段笔记本标题内容
            findNotes:'', //查找笔记本

            editOk:false,   //完成图标显示
            count: ['qiqingfu'], //标签
            tagVal:'', //双向数据绑定输入标签的内容
            tagShow:false,//标签input框显示和隐藏
            shortcut:false, //快捷方式状态
          }
        },
        mounted(){
           editclient();
        },


        methods:{
          // 笔记本下拉列表点击的时候,把当前点击的对象传过来
          // 当前的标识状态state就等于点击对象的id, active就会加到点击对象的身上
          // 让当前显示的状态第几阶段笔记标题显示出来
          moveBooksHander(obj){
             this.state = obj.id;
             this.showNoteBook = obj;
          },

          // 移动下拉框显示和隐藏
          moveSelect(){
              this.init = !this.init;
              let bl = this.$refs.findval;
              this.$nextTick(function(){
                bl.focus();
              })
          },
          closeSelect(){
            this.init = false;
          },

          // 取消保存
          editCancelHander(){
             this.$router.go(-1)
          },
          //新建完成
          xJnotesHander(){
             if(this.inputValue.trim() === '写下笔记标题'){
               this.inputValue = '无标题内容'
             }
             // "id":this.$store.state.allList.length + 16,
             // 这样给定新建笔记的Id有bug,如果新建一个笔记。这个笔记的id是根据vuex中的allList笔记本列表的长度加上一个数字
             // 组成的id,如果新建完再随意删除一个笔记,再新建一个笔记。这两个笔记引用同一个Id的Bug
            let obj = {
               "title":this.inputValue,
               "id":parseInt(Math.random()*10000000),
               "pid":this.state,
               "shortcut":this.shortcut,
               "remind":false,
               "label":this.count,
               "sel":false,
               "createTime":"刚刚",
               "Shared":false,
               "size":"1KB",
               "url": "https://github.com/qiqingfu",
               "author": "9116895@qq.com",
               "remindTime":"",
               "content":this.editTextarea,
            };
              // 新建笔记对象保存到vuex状态
            if(obj){
               console.log(obj);
               this.$store.commit('addNotes',{
                  obj:obj,
                  id:this.state
               });
               // 提交到vuex之后,立马存储到本地,因为路由跳转的create的生命周期钩子函数比 watch要早
               // 如果现在不存,跳转到home路由去本地取出的数据还是最新的
              localStorage.setItem('yinxiang',JSON.stringify(this.$store.state.dataList));
              this.$router.push({
                 path:'/home/'+obj.id
              })
            }
          },

            handleAdd () {
              this.tagShow = true;
              this.$nextTick(function(){
                this.$refs.tagValue.focus();
              })
            },
            handleClose2 (event, name) {
              const index = this.count.indexOf(name);
              this.count.splice(index, 1);
            },
           // 失去焦点保存,如果输入的内容不为空
           inputBlur(){
             //添加标签之前先判断有没有重复的
             let isHas = this.count.some(item => item === this.tagVal);
             if(this.tagVal.trim() && !isHas){
                this.count.push(this.tagVal)
             }
             this.tagShow = false;
             this.tagVal = ''; //失去焦点清空双向数据绑定的内容
          },
          //添加快捷方式
          addshakeHander(){
             this.shortcut = !this.shortcut;
          },
          //删除当前新建笔记
          editDelHander(){
             // 判断标题有没有输入内容
             let o = {};
             if(this.inputValue.trim() === '写下笔记标题'){
                o = {title:'无标题内容'};
                // console.log(this.$route.params)
             }else{
               o = {title:this.inputValue};
             }
              this.$store.commit('delClickHander',{
                obj:o,
                id:1,
              })
          },

          //enter事件保存标签
          editEnterHander(){
             this.inputBlur()
          }
        },


        computed:{
           //根据state id 过滤出要展示的第几阶段笔记本
             filterNote(){
              let n = this.noteBookList.filter(item => item.id === this.state)[0]
              this.showNoteBook = n;
              // console.log(this.showNoteBook)
            },

          // 过滤笔记本
          filterNoteBooks() {
            return this.noteBookList.filter(item => {
              return item.title.trim().match(this.findNotes)
            })
          },

          tagWidth(){
            return {
              width:this.tagVal.length * 12 + 26 + 'px'
            }
          }
        },


        created(){
            let n = this.$store.state.dataList;
            // 判断vuex中的数据有没有,如果没有就跳转到Home页
            if(n.length > 0){
               this.noteBookList = n;
            }else if(n.length < 1){
              this.$router.push({
                path:'/home'
              })
            }
        },
    }
</script>

<style scoped>
  .yinxDet{
    margin-left: 0px;
  }
  .youbian {
    margin-left: 0;
  }
</style>
