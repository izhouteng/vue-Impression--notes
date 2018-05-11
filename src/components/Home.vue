<template>
    <div class="youbian clearfix" @click="closeTag">

      <!--工作群聊滑窗--------------------------------------------------------------->
      <div class="worktoking">
        <div class="header">
          <h2 class="title">工作群聊</h2>
          <img src="@/assets/images/gongzuoqunliaoyousahngjiaotubiao.png" alt="" class="righttPic" title="开始群聊">
          <div class="message">
            <input type="text" class="messageValue" placeholder="搜索联系人或群聊消息">
          </div>
        </div>
        <div class="workWrap">
          <div class="tishineirong">
            <div class="text">
              <p>开始群聊</p>
              <p>在笔记或笔记本中点击"共享",与任何人共享并讨论。或者点击右上角的群聊图标,立即开始聊天</p>
            </div>
          </div>
        </div>
      </div>

      <!--快捷方式滑窗口--------------------------------------------------------------->
      <quick></quick>

      <!--笔记本滑动窗----------------->
      <div class="bijibenHDC">
        <div class="bijibenInfo">
          <h2>笔记本信息</h2>
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
          <div class="liebiao">
            <div class="list_main">
              <div class="bijixinxi">
                <div class="noteTitle">
                  JavaScript_第一阶段笔记
                </div>
                <p class="number">21 条笔记</p>
                <img src="@/assets/images/1shanchubiji.png" alt="" class="delnotes" title="删除笔记本">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--标签滑窗开始----------------------------------->



      <!--标签滑窗结束----------------------------------->

      <!--搜索笔记-------------------------------------------------------------------->
      <div class="searchNote" v-show="$store.state.searchBox">
        <div class="searchChild">
          <input type="text" class="searchValue" placeholder="搜索笔记"
                 v-model="searchValue"
                 @keydown.enter="searchDown"
                 ref="noteSearchVal"
          >
          <img src="@/assets/images/qingchusousuoneirong.png" alt=""
               class="clearSearch"
               v-if="searchValue.trim().length"
               @click="searchValue=''"
          >
          <div class="tishixinxi">
            正在搜索 <span>你的笔记本</span>
          </div>
        </div>
      </div>

      <!-- 笔记列表区域 ------------------------------------------------------->
      <div class="yinxList" @mousedown.prevent v-show="$store.state.dataListShow">
        <div class="yinxTitle">

          <!--首页显示        如果搜索到笔记就不显示-->
          <div class="cuthide" v-show="!$store.state.searchBox">
            <h2 class="notTitle">笔记</h2>
            <div class="yinxcut">
              <span>网页剪藏</span>
            </div>
          </div>

          <!--进入笔记本的时候 显示的笔记本名称-->
          <div class="noteNames">
            <img src="@/assets/images/dijijieduanbijibenxinxi.png" alt="" class="noteinfoPic">
            <div class="title">
              Javascript_第一阶段笔记
            </div>
          </div>


          <!-- 笔记条数和选项 -->
          <div class="noteNumbers clearfix">
            <div class="yinxnum">{{allNoteList.length}} 条笔记</div>
            <div class="select">
              <span>选项</span>
            </div>
            <!-- 选项列表 -->
            <div class="selList">
              <legend class="sortingWay">排序方式</legend>
              <ul class="sortlist">
                <li>创建日期(最早优先)</li>
                <li>创建日期(最新优先)</li>
                <li style="background: url('@/assets/images/duigou.png') no-repeat 162px 11px;">更新日期(最早优先)</li>
                <li>创建日期(最新优先)</li>
                <li>标题(升序排列)</li>
                <li>标题(降序排列)</li>
              </ul>
              <div class="MenuDivider"></div>
              <div class="viewsel">
                <legend>查看选项</legend>
                <div>显示图片</div>
                <div>显示文字</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 笔记内容列表区域----------------------------------- -->
        <div class="NodesTwoList">
          <div class="nodescroll" id="nodescroll">

            <router-link tag="div" class="n-conts"
                         v-for="(item,index) in allNoteList"
                         :key="item.id"
                         :to="/home/+item.id"
                          @click.native="state=item.id"
                         :class="state == item.id ? 'sel' : ''"
                          v-show="true"

            >
              <h2 class="n-title">{{item.title}}</h2>
              <div class="n-times">{{item.createTime}}</div>
              <div class="n-wrap">
                {{item.content}}
              </div>

              <!-- 笔记列表 分享 闹钟 收藏 删除 -->
              <div class="n-fnc">
                <div class="n-shake cont-icon">
                  <img src="@/assets/images/cont_fenxiang1.png" alt="" title="分享">
                </div>
                <div class="n-remind cont-icon">
                  <img src="@/assets/images/tixing24x24.png" alt="" title="设置提醒">
                </div>
                <div class="n-collection cont-icon" :title="!item.shortcut ? '添加快捷方式' : '移除快捷方式'">
                  <img src="@/assets/images/shoucang_white_24x24.png" alt=""
                       v-if="!kJshow && !item.shortcut"
                       @mouseover="kJoverHander"
                  >
                  <img src="@/assets/images/shortcuts_solid_white_24x24.png" alt=""
                       v-if="kJshow || item.shortcut"
                       @mouseout="kJoutHander"
                       @click.stop="addkJHander(item)"
                  >
                </div>
                <div class="n-delete cont-icon" id="delicom" title="删除笔记" @click.stop="delNoteHandel(item)"></div>
              </div>
            </router-link>

            <!--未找到搜索的笔记  动态计算高度----------------->
            <div class="notFound" v-show="!$store.state.Not404">
              <div class="count">
                <img src="@/assets/images/drawers_empty_state_search_icon.png" alt="">
                <p class="tip">未找到"{{NotFindNotesName}}"笔记。</p>
              </div>
            </div>

          </div>
        </div>
      </div>


      <!--最右侧笔记本内容信息区域-------------------------------->
      <!--左侧区域-->
      <!--:style=""-->
      <!--$store.state.quickShow-->
      <!--notWidth  添加class -->
      <div class="yinxDet clearfix" id="yinxdet"
           v-show="$store.state.Not404"
           :class="$store.state.yinxdetWidth ? 'notWidth' : ''"
           :style="this.$store.state.quickShow?'opacity:0.2':''"
      >
        <!--标题功能栏-->
        <div class="dethead" @mousedown.prevent>
          <div class="detfunc">
            <div class="deftimes main">
              <img src="@/assets/images/defshizhong.png" alt="" title="设置提醒">
              <span class="tixingshijian">18/5/5</span>
              <!--提醒已添加 通知我弹窗-->
              <div class="reminderAdded">
                <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
                <p class="tixingok">提醒已添加</p>
                <div class="notice">
                  通知我
                </div>
              </div>

              <!--修改弹窗提醒-->
              <div class="changeTixing">
                <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
                <div class="complete main">
                  标记完成
                </div>
                <div class="main">
                  清除提醒
                </div>
                <div class="main">
                  修改日期
                </div>
              </div>

              <!--撤销 修改提醒 清除日期-->
              <div class="undo">
                <img src="@/assets/images/shangjianjiaohao.png" alt="" class="target">
                <div class="complete main">
                  撤销
                </div>
                <div class="main">
                  清除提醒
                </div>
                <div class="main">
                  修改日期
                </div>
              </div>

            </div>

            <div class="defshake main" :title="!noteContent.shortcut ? '添加快捷方式' : '移除快捷方式'">
              <img src="@/assets/images/defshoucang.png" alt=""
                   v-if="!noteContent.shortcut && !tkJshow"
                   @mouseover="tkJoverHander"
              >
              <img src="@/assets/images/shanchukuaijiefangshiwujiaoxing.png" alt=""
                   v-if="noteContent.shortcut || tkJshow"
                   @mouseout="tkJoutHander"
                   @click.stop="addkJHander(noteContent)"
              >
            </div>
            <div class="definfo main" title="笔记信息">
              <img src="@/assets/images/defbijixinxipng.png" alt="">
              <img src="@/assets/images/bijixinxihover.png" alt="" style="display: none">
            </div>
            <div class="defdelete main" title="删除笔记" @click.stop="delNoteHandel(noteContent)"></div>
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
            <div class="defshared clearfix mains">
              <span class="gongx">共享</span>
              <div class="target"></div>
              <div class="shakeDown">
                <div class="s-notes">
                  共享笔记
                </div>
                <div class="send-email">
                  发送邮件
                </div>
              </div>
            </div>
            <!--展开 全屏-->
            <div class="defscreen mains" title="展开"
                 v-show="!$store.state.unfoldShow"
                 @click="openHander"
            ></div>
            <!--写笔记完成-->
            <div class="writeNotesOk"
                 v-if="$store.state.unfoldShow"
                 @click="closeHander"
            >
              完成
            </div>
          </div>
        </div>

        <!--具体操作交互栏-->
        <div class="stages">

          <!--移动笔记和标签-->
          <div class="liangge" @mousedown.prevent>
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
            <div class="yidong clearfix">
              <img src="@/assets/images/dijijieduanbiji.png" alt="" class="tubiao" title="移动笔记" @mousedown.prevent>
              <div class="notecont" title="移动笔记" @click.stop="clickMove" @mousedown.prevent>
                {{noteBookTitle.title}}
              </div>
              <div class="qianwangBJB" title="前往笔记本" @mousedown.prevent>
                <img src="@/assets/images/qianwangbijiben.png" alt="">
              </div>

              <!--移动笔记本 可查找-->
              <div class="yidongBJB" v-show="moveNote" @click.stop>
                <div class="findnotes">
                  <input type="text" class="findValue" placeholder="查找笔记本" v-model="findNotes" ref="findval">
                </div>
                <div class="chuanjian" @mousedown.prevent>
                  <img src="@/assets/images/chuangjianbijiben.png" alt="" @mousedown.prevent>
                  <span @mousedown.prevent>创建新笔记本</span>
                </div>
                <div class="mynotesbook"
                     v-for="(item,index) in filterNoteBooks"
                     :key="index"
                     :class="item.id === Pid ? 'active' : ''"
                     @click="moveByNotes(item.id)"
                     @mousedown.prevent
                >
                  {{item.title}}
                </div>

              </div>

            </div>

            <!--新建标签-->
            <div class="addtag">
              <!--@mousedown.prevent-->
              <div class="tianjiaBQ">
                <Tag v-for="(item,index) in count" :key="item" :name="item" closable @on-close="handleClose2(item,index)">{{item}}</Tag>
                <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd" v-show="!editTagShow">添加标签</Button>
                <input type="text" class="tagValue"
                       v-show="editTagShow"
                       ref="tagValue"
                       v-model="tagVal"
                       :style="tagWidth"
                       @blur="BlurFn"
                       @keydown.enter="enterFn"
                >
              </div>
            </div>
          </div>
        </div>

        <!--/***********/-->
        <div class="editCount" ref="editScroll">

          <div class="root">
            <div class="editTitle">
              <input type="text" v-model="titleValue" class="editValue">
            </div>
            <div class="textArea">
                <textarea v-model="textareaValue"></textarea>
            </div>
          </div>

        </div>
      </div>


    </div>
</template>

<script>

    import {clientAuto} from '@/assets/js/client'
    import {Tag,Button } from 'iview'
    import quick from '@/func/quick/Quick'

    export default {
        name: "home",
        components:{
          Tag,
          Button,
          quick,
        },
        data(){
           return {
              allNoteBook:[], //全部的第几阶段笔记本
              noteBookTitle:{}, // 显示的第几阶段笔记(单个)
              allNoteList:[], //全部的笔记
              noteContent:{}, // title 和 textarea展示内容的对象
              titleValue:'',  //标题
              textareaValue:'', //内容
              EditTitle:'',     //修改后的标题
              EditTextarea:'', //修改后的内容
              EditId:'', //编辑的Id
              state:1,
              Pid:'', // noteContent对象的pid
              moveNote:false, //移动笔记本显隐

              findNotes:'', //查找笔记本

              // iView数据
              tagVal:'', //绑定tag输入框数据
              count: [],  //保存标签数据
              editTagShow:false, //自定义标签输入框的显示隐藏

              kJshow:false, //快捷方式显示隐藏
              tkJshow:false, //顶部快捷方式显示隐藏
              sCshow:false,  //删除图标显示和隐藏
              delNextId:1,  //删除对象下一个兄弟的id

              searchValue:'', //搜索关键字
              NotFindNotesName:'', //如果没有找到当前输入笔记,保存当前输入的问题当作提示信息
           }
        },
       methods:{
          // 当本地数据为null,请求
          getList(){
            this.https.getList().then(({data}) => {
              this.$store.dispatch('success',data);
              localStorage.setItem('yinxiang',JSON.stringify(data));
            }).then(() => {
              // 请求成功之后
              this.allNoteList = this.$store.state.allList;  //全部的笔记
              this.inteContent();
            });
          },

          // 初始化noteContent
          inteContent(){

              // 只需要修改路由对象,会自动更新全部这个组件需要的所有数据
               // 默认滚动条高度0  当可以获取到这个元素的时候再进行重置0
              let editSroll = this.$refs.editScroll;
              if(editSroll){
                 editSroll.scrollTo(0,0)
              }

              let userId = this.$route.params.id || this.allNoteList[0].id;
              this.state = userId;
              if(userId){

                let n = this.allNoteList.filter(item => item.id == userId)[0];
                if(n){
                  this.noteContent = n;
                  this.titleValue = n.title;
                  this.textareaValue = n.content;
                  this.Pid = n.pid; //单条笔记的pid
                }else{
                   // 重定向
                   this.$router.replace({
                      path:'/home'
                   })
                }
              }

              // 同步标签 此时this.count和this.noteContent引用的是同一个对象label
              this.count = this.noteContent.label;
              // vuex的数据同步到Home组件

              if(this.$store.state.findNotesList.length > 0){
                   this.allNoteList = this.$store.state.findNotesList;
              }else{
                   //全部的笔记 路由跳转实时同步vuex中的笔记列表
                   this.allNoteList = this.$store.state.allList;
              }

              this.allNoteBook = this.$store.state.dataList; // 全部的第几阶段笔记

              // 根据Pid过滤不同阶段的笔记
              // 在笔记本列表中过滤出与Pid一样的数据,就是当前显示数据的父亲
              let dJ = this.allNoteBook.filter(item => item.id == this.Pid)[0];
              this.noteBookTitle = dJ;
              // this.findDateList; //搜索笔记列表


              //切换路由对象的时候 提交更新后的title和textarea内容
              if(this.EditTitle === ''){
                  this.EditTitle = '无标题内容'
              }
            // this.EditTitle === '' || this.EditTextarea === '' &&
            if(this.EditId !== ''){
                  // 提交vuex 修改数据
                  this.$store.commit('editChange',{
                     id:this.EditId,
                     title:this.EditTitle,
                     content:this.EditTextarea,
                  })
              }
          },

         // 点击 移动笔记
         clickMove(){
            this.moveNote = !this.moveNote;
            let bl = this.$refs.findval;
            this.$nextTick(function(){
               bl.focus()
            })

         },

         // 开始移动 移动到哪个阶段笔记本的id----------
         moveByNotes(gId){
            // 向gid的children添加,从pid的children移出
           this.$store.commit('moveNotes',{
              gid:gId,
              pid:this.Pid,
              obj:this.noteContent,
           });
           this.moveNote = false; //关闭移动下拉框
           this.inteContent();  // 从vuex 获取最新的数据 同步到当前的组件

         },

         //关闭某些弹窗
         closeTag(){
            //当第几阶段笔记弹窗为true的时候再执行
            if(this.moveNote){
               this.moveNote = false;
            }
         },


         // iView组件 添加标签点击事件
         handleAdd () {
           this.editTagShow = true;
           let val = this.$refs.tagValue;
           this.$nextTick(function(){
              val.style.width = '26px';
              val.focus();
           })
         },
         handleClose2 (tag,index) {
           // const index = this.count.indexOf(name);
           // this.count.splice(index, 1);
             this.$store.commit('delTaglabel',{
                obj:this.noteContent,
                tag:tag,
                index:index,
             })
         },

         // 失去焦点
         BlurFn(){
            //保存数据 提交mutations 修改当前对象的标签
            let isHsh = this.noteContent.label.some(el => el === this.tagVal);  //判断标签有没有重复的
            if(this.tagVal.length && !isHsh){
               this.$store.commit('saveLabel',{
                  obj:this.noteContent,
                  label:this.tagVal
               })
            }

            this.editTagShow = false;
            this.tagVal = '';
         },
          // 键盘Enter事件保存标签
         enterFn(){
            this.BlurFn();
         },

         // 快捷鼠标移入移出, 鼠标移入
         kJoverHander(){
            this.kJshow = true;
         },
         tkJoverHander(){
             this.tkJshow = true;
         },
         //鼠标移开
         kJoutHander(){
            this.kJshow = false;
         },
         tkJoutHander(){
            this.tkJshow = false;
         },
         //添加快捷方式
         addkJHander(item){
            this.$store.commit('addkJHander',{
               obj:item,
            })
         },

         // 删除笔记点击事件
         delNoteHandel(obj){
            //保存当前删除对象的下一个兄弟对象id
            this.allNoteList.forEach((item,i) => {
                if(item === obj && this.allNoteList.length > 1){
                    if(this.allNoteList[i+1]){
                       // 如果下个兄弟存在
                      this.delNextId = this.allNoteList[i+1].id;
                    }else{
                      this.delNextId = this.allNoteList[i-1].id;
                    }
                    // 新建笔记 待添加 标签 收藏 以及及时删除------------------------
                }else if(this.allNoteList.length <= 1){
                  //笔记删除完了,从mock数据重新请求
                   this.getList();
                   this.searchValue = ''; //笔记删除完了,重新请求
                }
            });

            this.$store.commit('delClickHander',{
               obj:obj,
               id:this.delNextId,
            })
         },

         // searchDown  搜索笔记本列表
         // 从vuex中的笔记列表中过滤,同步到当前组件
         searchDown(){
           let arr = this.$store.state.allList.filter(item => {
              return item.title.match(this.searchValue) || item.content.match(this.searchValue)
           });
           this.allNoteList = arr;
           // this.searchDate = arr;   //保存过滤后的数组  //将搜索到的列表集合同步到vuex中
           this.$store.commit('savefilterNote',{
              obj:arr,
           });
           //判断搜索笔记有没有 -> 如果没有搜索到笔记
           if(arr.length < 1){
               // this.Not404 = false;  //路由跳转到allList的第一个id
               this.$store.commit('isNot404False');
               this.NotFindNotesName = this.searchValue;
               let n = this.$store.state.allList;
           }else if(arr.length >= 1){
               //搜索到了笔记
                this.$store.commit('isNot404Yes');
                this.$router.push({
                  path:'/home/'+arr[0].id
                })
           }
         },

         //笔记本展开
         openHander(){
            this.$store.commit('openHander'); //显示完成按钮
            this.$store.commit('searchNone'); //搜索框隐藏
            this.$store.commit('noteListshow'); //隐藏Home组件笔记本列表
            this.$store.commit('yinLeftHander'); //margin-left 设置为0
         },
         // 笔记本收起 完成
         closeHander(){
            this.$store.commit('closeHander'); //显示展开图标
            this.$store.commit('noteListTrue') //margin-left为原始值,笔记本列表显示
         }
       },


        // 计算属性
        computed:{

           //搜索笔记
           filterNoteBooks(){
               return this.allNoteBook.filter(item => {
                  return item.title.trim().match(this.findNotes)
               })
           },
          //tag输入框的动态宽度计算
          tagWidth(){
           return {
              width:this.tagVal.length * 12 + 26 + 'px'
           }
          },
        },

        // 钩子函数 请求数据同步vuex
        created(){
            let Storage = JSON.parse(localStorage.getItem('yinxiang'));
            if(Storage === null){
                this.getList();
            }else{
                // 从locaLStorage中取数据
                this.$store.dispatch('success',{data:Storage});
                this.allNoteList = this.$store.state.allList;
                this.inteContent();
            }

        },
        mounted(){
           clientAuto()
        },
       // 侦听路由对象变化
       watch:{
          $route(){
            this.inteContent();
            this.moveNote = false;
          },
         // 监听标题信息
         titleValue(){
            this.EditTitle = this.titleValue;
            this.EditId = this.$route.params.id || this.allNoteList[0].id.toString(); // 字符串类型的id
         },
         // 监听textarea内容
         textareaValue(){
             this.EditTextarea = this.textareaValue;
             this.EditId = this.$route.params.id || this.allNoteList[0].id.toString();
         },

         //监听vuex数据状态
         '$store.state.dataList':{
            handler(){
                localStorage.setItem('yinxiang',JSON.stringify(this.$store.state.dataList));
            },
           deep:true,
         }
       },

    }
</script>

<style scoped>

  .notWidth {
    margin-left: 0px;
  }
</style>
