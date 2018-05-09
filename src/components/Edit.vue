<template>
  <div class="youbian clearfix" @click="closeSelect">
        <!--最右侧笔记本内容信息区域-------------------------------->
        <!--左侧区域-->
        <div class="yinxDet clearfix" id="yinxdet">
          <!--标题功能栏-->
          <div class="dethead">
            <div class="detfunc">

              <div class="defshake main" title="添加快捷方式">
                <img src="@/assets/images/defshoucang.png" alt="">
                <img src="@/assets/images/shanchukuaijiefangshiwujiaoxing.png" alt="" style="display: none;">
              </div>
              <div class="definfo main" title="笔记信息">
                <img src="@/assets/images/defbijixinxipng.png" alt="">
                <img src="@/assets/images/bijixinxihover.png" alt="" style="display: none">
              </div>
              <div class="defdelete main" title="删除笔记">
                <img src="@/assets/images/defshanchu.png" alt="">
                <img src="@/assets/images/shanchubiji.png" alt="" style="display: none">
              </div>
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
              <div class="defscreen mains" title="展开" v-if="false"></div>
              <!--写笔记完成-->
              <div class="writeNotesOk" v-if="editOk">
                完成
              </div>
              <div class="writeCancel">
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
              <!--<div class="addtag">-->
                <!--<div class="tianjiaBQ">-->
                  <!--添加标签-->
                <!--</div>-->
              <!--</div>-->
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
    export default {
        name: "edit",
        data(){
          return {
            inputValue:'写下笔记标题',
            editTextarea:'',
            noteBookList:[],  //第几阶段笔记本列表
            showNoteBook:{},  //当前展示的笔记本对象-----------
            init:false,      // 移动笔记下拉列表的显示和隐藏
            state:"f1",      // 显示第几阶段笔记本标题内容
            findNotes:'', //查找笔记本

            editOk:false,   //完成图标显示
            editCancel:true, // 取消图标显示
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
        }
    }
</script>

<style scoped>

</style>
